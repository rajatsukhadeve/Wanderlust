const Listing = require('../models/listing.js');
const Review = require('../models/reviews.js');

module.exports.createReview =async(req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    let data= req.body;
    
    let newreview =  new Review(data.review);
    newreview.author=res.locals.currUser._id;
    listing.reviews.push(newreview);
    
    await newreview.save();
    await listing.save();
    req.flash("sucess","New Review Created");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async(req,res)=>{
    const {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("sucess","Review Deleted");
    res.redirect(`/listings/${id}`);
};