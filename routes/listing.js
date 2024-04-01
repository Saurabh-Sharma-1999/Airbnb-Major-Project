const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLogggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })
// Import the EventEmitter module
const EventEmitter = require('events');

// Increase the default maximum number of listeners
EventEmitter.defaultMaxListeners = 20; // Or set it to a higher number if needed

// Router.route----------------------------------
router.get("/filter/:id", wrapAsync(listingController.filter));                              //Filter Route-----------------

// router.get("/filterbtn",listingController.filterbtn);                                       //FilterButton Route-----------------

router.get("/search", wrapAsync(listingController.search))                                  //SEARCH Route-------------



// Index Route + post new route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLogggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));



// new Route
router.get("/new", isLogggedIn, listingController.renderNewForm);


// Show Route + update +destroy route
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLogggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLogggedIn, isOwner, wrapAsync(listingController.destroyListing));



//  Edit route form
router.get("/:id/edit", isLogggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;
