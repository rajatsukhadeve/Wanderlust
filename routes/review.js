const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require('../models/listing.js');
const Review = require('../models/reviews.js');
const wrapAsync = require('../utils/wrapAsync.js');
const {validateReview, isLogedIn, isAuthor} = require('../middleware.js');
const reviewController = require("../controllers/review.js");




//Review
//create
router.post("/",isLogedIn,validateReview,wrapAsync(reviewController.createReview));

//Delete review route
router.delete("/:reviewId",isLogedIn,isAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;