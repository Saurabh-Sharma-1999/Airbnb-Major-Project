if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");


app.use(express.static(path.join(__dirname, "public")));

const dbUrl = process.env.ATLASDB_URL;
// const dbUrl = "mongodb://127.0.0.1:27017/wanderlust1"


main().then(() => {
    console.log("Connection establish successfully.");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(dbUrl);
}
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,

})
store.on("error", () => {
    console.log("Error in Mongo session store", err);
})


const sessionOption = {
    store,
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success  = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// user middleware

app.use("/", userRouter);

// Listing Middleware
app.use("/listing", listingRouter);

// reviews middleware
app.use("/listing/:id/reviews", reviewRouter);



app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!" ));
})

// Error handler middleware
app.use((err, req, res, next) => {
    let{status = 500, message = "Something went wrong!"} = err;
    res.status(status).render("error.ejs", {message});
   
})


app.listen(port, () => {
    console.log(`App is listening port ${port}`);
})