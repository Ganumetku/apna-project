const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:mapToken });

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });

};


module.exports.renderNewForm = async(req, res) => {
    // console.log(req.user);
    res.render("listings/new.ejs");
  };


  module.exports.showlisting = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews",populate: {path: "author",}, })
    .populate("owner");
    if(!listing) {
      req.flash("error", "Listings you requested for does not exist !");
      res.redirect("/listings");
    }
    
    res.render("listings/show.ejs", { listing });
  };

  module.exports.createlisting = async (req, res ,next) => {
    let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit : 1,
    })
      .send();
  
    let url = req.file.path;
    let filename = req.file.filename;
 
    const newListing = new Listing(req.body.listing); 

    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;
    
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success","new Listing Created !");
    res.redirect("/listings"); // Redirect to `/listings` instead of `/listing`
     
  };
 
  module.exports.editlisting = async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
      req.flash("error", "Listings you requested for does not exist !");
      res.redirect("/listings");
    }
      let originalImageUrl = listing.image.url;
      originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250");
   res.render("listings/edit.ejs", { listing, originalImageUrl });
  };


module.exports.updatelisting = async (req, res) => {
    const { id } = req.params;

    // Geocode new location using Mapbox
    const geoData = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    // Update the listing
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // If new image is uploaded
    if (typeof req.file !== "undefined") {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
    }

    // Update geometry with new coordinates
    listing.geometry = geoData.body.features[0].geometry;

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

    module.exports.deletelisting = async (req,res) => {
        let {id} = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        req.flash("success","Listing Deleted!");
        res.redirect("/listings");
      };
