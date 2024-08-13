const multer = require("multer");
const Post = require("../models/PostScheema");
const Users = require("../models/UserSchema");

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage: Storage }).single('postImage');

const creatPost = async (req, res) => {
    upload(req, res, async (err) => {
        if (!err) {
            const { userId, description } = req.body;
            const image = req.file.originalname;
            if (!userId || !description || !image) {
                return res.status(422).json({ error: "Please fill the fields" });
            } else {
                console.log(userId, description.image);
            }
            try {
                const user = await Users.findById(userId);
                const newPost = new Post({
                    userId,
                    userImage: user.image,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    location: user.location,
                    description,
                    image,
                    likes: {},
                    comments: []
                })
                const postAdd = await newPost.save();
                if (postAdd) {
                    const post = await Post.find();
                    res.status(201).json(post);
                }
            } catch (error) {
                res.json({ message: error.message });
            }
        } else {
            console.log(err);
        }
    })
}

const getFeedPost = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = { creatPost, getFeedPost, getUserPosts }