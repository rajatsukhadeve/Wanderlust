const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {isLogedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
.get(wrapAsync(listingController.index)) // index
.post(isLogedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing)); // create route


router.get("/new",isLogedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLogedIn,isOwner,wrapAsync(listingController.destroyListing))



//New route



//show Route


//Create Rouete


//Edit Rotute

router.get("/:id/edit",isLogedIn,isOwner,wrapAsync(listingController.renderEditForm));

//update Route




//Delete Route



module.exports  = router;