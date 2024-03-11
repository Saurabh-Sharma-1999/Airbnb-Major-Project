const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async(req, res, next) => {
    try{
        let {username, email, password} = req.body;
        let newUser = new User({username, email});
        let registerUser = await User.register(newUser, password);
        // console.log(registerUser);
        req.login(registerUser, (err) => {
            if(err){
               return  next(err);
            }
            req.flash("success", "Welcome to Wonderlust!");
            res.redirect("/listing");
        })
       
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wonderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect( redirectUrl);
}

module.exports.logout =  (req, res, next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/listing");
    })
}