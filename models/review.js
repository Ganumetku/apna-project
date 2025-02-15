const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,  // Ensures the comment is provided
        trim: true       // Removes leading/trailing spaces
    },
    rating: {
        type: Number,
        min: 1,          // Minimum rating
        max: 5,          // Maximum rating
        required: true   // Ensures a rating is provided
    },
    createdAt: {
        type: Date,
        default: Date.now // Dynamically sets the current timestamp
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:"User",
    },
});

// Export the Review model
module.exports = mongoose.model("Review", reviewSchema);
