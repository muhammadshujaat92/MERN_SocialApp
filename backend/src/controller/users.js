const Users = require('../models/UserSchema');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const serachUser = async (req, res) => {
    try {
        const { q } = req.query;
        // console.log(q);
        const user = await Users.find({ $text: { $search: `"${q}"` } });
        // console.log("this is user" + user)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await Users.findById(id);
        const friend = await Users.findById(friendId);
        user.friends.push(friendId);
        friend.friends.push(id);
        const userSave1 = await user.save();
        const userSave2 = await friend.save();
        re.status(200).json(userSave1);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);

        // const friends = await Promise.all(
        //     user.friends.map((id) => {
        //         Users.findById(id)
        //     })
        // )

        const friendIds = user.friends;

        // Find the details of the friends using the IDs
        const friendsDetails = await Users.find({ _id: { $in: friendIds } });

        res.status(200).json({
            user: user,
            friends: friendsDetails,
        });

        // const formattedFriends = friends.map(({ _id, firstName, lastName, email, password, dateofBirth }) => {
        //     return { _id, firstName, lastName, email, password, dateofBirth };
        // })

        // res.status(200).json(friends)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getUser, serachUser, addRemoveFriend, getUserFriends }