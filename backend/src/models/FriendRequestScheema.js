const mongoose = require('mongoose');

const FriendRequestScheema = new mongoose.Schema({
    requester: String,
    recipient: String,
    status: Number
}, { timestamps: true });

const FriendRequest = mongoose.model("friendrequest", FriendRequestScheema);
module.exports = FriendRequest;