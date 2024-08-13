const FriendRequest = require("../models/FriendRequestScheema");
const Users = require("../models/UserSchema");

const getAllReq = async (req, res) => {
    const requests = await FriendRequest.find();
    res.send(requests);
}

const newReq = async (req, res) => {
    const request = new FriendRequest({
        requester: req.body.requester,
        recipient: req.body.recipient,
        status: req.body.status
    });
    try {
        await request.save();
        res.json({ data: request, message: null })
    } catch (error) {
        res.status(400).send(error);
    }
}

const specificReq = async (req, res) => {
    // Find friend requests with status 0 sent to the specified user
    const request = await FriendRequest.find({ recipient: req.params.id, status: 0 });
    // Get the IDs of the requesters of those requests
    const requesterID = request.map(request => request.requester);
    // Find the users with those IDs
    const requesters = await Users.find({ _id: { $in: requesterID } });
    // Create a new array by combining the requests and requesters objects
    const combined = request.map((requests, index) => ({
        requests: requests,
        requester: requesters[index]
    }))
    res.json(combined);
}

const getAllFriends = async (req, res) => {
    // Find friend requests with status 1 where the requester or recipient is the specified user
    const requests = await FriendRequest.find({ $or: [{ requester: req.params.id }, { recipient: req.params.id }], status: 1 });

    // console.log(`requests ${requests}`);

    // Get the IDs of the requesters and recipients of those requests
    const requesterID = requests.map(request => request.requester);
    const recipientID = requests.map(request => request.recipient);
    // Combine the arrays of IDs and remove any duplicates
    const friendID = [...new Set(requesterID.concat(recipientID))];
    // Exclude the user with the ID specified in the request parameters from the list of IDs
    const filterdID = friendID.filter(id => id !== req.params.id);
    // Find the users with those IDs
    const friends = await Users.find({ _id: { $in: filterdID } });

    res.json(friends);
}

// update a request
// const updtReq = async (req, res) => {
//     const request = await FriendRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     const reqsave = await request.save();
//     res.send(reqsave);
// };

const updtReq = async (req, res) => {
    try {
        const request = await FriendRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!request) {
            return res.status(404).send("Request not found");
        }
        res.send(request);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};



// delete a request
const delReq = async (req, res) => {
    const request = await FriendRequest.findOneAndDelete({ requester: req.params.id });
    res.send(request);
}

module.exports = { newReq, getAllReq, specificReq, getAllFriends, updtReq, delReq }