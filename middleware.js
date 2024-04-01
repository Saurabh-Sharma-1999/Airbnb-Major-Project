const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema, userSchema} = require("./schema.js");



module.exports.isLogggedIn = (req, res, next) => {
//    console.log(req.path, "..." , req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async (req, res,next) => {
    try {
		let { id } = req.params;
		let listing = await Listing.findById(id);
		if (!listing.owner.equals(res.locals.currUser._id)) {
			req.flash("error", "You are not the owner of this listing");
			return res.redirect(`/listing/${id}`);
		}
		next();
	} catch (err) {
		next(new ExpressError(400, "This Listing Page is not valid..."));
	}
}
module.exports.isOwnerAll = async (req, res, next) => {
	try {
		let { id } = req.params;
		console.log(id);
		let listing = await Listing.findOne({ owner: id });
		console.log(listing);
		if (!listing) {
			req.flash("error", "You don't have any listings...");
			return res.redirect(`/profile`);
		}
		if (!listing.owner.equals(res.locals.currUser._id)) {
			req.flash("error", "You are not the owner of this listing...");
			return res.redirect(`/listing`);
		}
		next();
	} catch (err) {
		next(new ExpressError(400, "This Listing Page is not valid..."));
	}
};


module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
     throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
     throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async (req, res,next) => {
    try {
		let { id, reviewId } = req.params;
		let review = await Review.findById(reviewId);
		if (!review.author.equals(res.locals.currUser._id)) {
			req.flash("error", "You are not the author of this review");
			return res.redirect(`/listing/${id}`);
		}
		next();
	} catch {
		next(new ExpressError(400, "This Review Page is not valid..."));
	}
}

module.exports.validateUser = (req, res, next) => {
	let { error } = userSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		console.log(error);
		console.log(errMsg);
		req.flash("error", `${errMsg}`);
		if (!req.user) {
			return res.redirect("/signup");
		} 
	} else {
		next();
	}
};
