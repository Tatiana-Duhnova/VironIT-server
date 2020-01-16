const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name: String,
    surname: String
});

const User = mongoose.model("User", userScheme);

module.exports = User;