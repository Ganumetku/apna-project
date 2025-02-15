const express = require("express");
const router = express.Router({mergeParams: true});
// const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview, isLoggedIn, isreviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");






  //POST ROUTE
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview)
    );

    
    //delete Route review
    router.delete("/:reviewId", isLoggedIn, isreviewAuthor,wrapAsync (reviewController.deleteReview));

     module.exports = router;