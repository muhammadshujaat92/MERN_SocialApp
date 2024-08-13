const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    image: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    location: String,
    occupation: String,
    dateofBirth: Date,
}, { timestamps: true })

userSchema.index({ firstname: 'text', lastname: 'text' });
const Users = mongoose.model("users", userSchema);
Users.createIndexes();
module.exports = Users