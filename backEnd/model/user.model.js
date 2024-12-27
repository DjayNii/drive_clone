const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, //When a field is mandatory to fill then in that case we mention it as required
    trim: true, //Removes leading and trailing whitespace
    lowercase: true,
    unique: true, // Ensures no duplicate emails exist in the collection
    minlength: [13, "email should be at least 13 characters long"], //The email must have at least 13 characters; an error message is provided if not.
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, "username should be at least 3 characters long"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "password  should be at least 5 characters long"],
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
