const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    // No need to explicitly define `password`
});

// Enable passport-local-mongoose for the schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
