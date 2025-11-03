const Listing = require("../models/listing.js");
const opencage = require('opencage-api-client');

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

};

module.exports.renderNewForm = (req, res) => {

    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing does not exists!");
        return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    // const {title,description,image,price,location,country} = req.body;
    // let data= req.body;
    let response = await opencage.geocode({ q: req.body.listing.location });
    // console.log(response.results[0].geometry);
    // res.send("done");
    const { lat, lng } = response.results[0].geometry;

    const url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    newListing.geometry = {
        type: "Point",              // capital P — GeoJSON requires this
        coordinates: [lng, lat]     // longitude first, latitude second
    };

    
    await newListing.save();
    req.flash("sucess", "New Listing Created");
    res.redirect("/listings");


};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exists!");
        return res.redirect("/listings");
    }
    let orignalImageUrl = listing.image.url;
    orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { listing, orignalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    const url = req.file.path;

    if (typeof req.file !== "undefined") {
        let filename = req.file.filename;
        listing.image = { url, filename }
        await listing.save();
    }
    req.flash("sucess", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("sucess", "Listing Deleted!");
    res.redirect("/listings");
};