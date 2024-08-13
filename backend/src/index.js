const express = require('express');
const app = express();
const PORT = "4000";
require("./DB/conn");
const multer = require("multer");
const Users = require("./models/UserSchema");
const cors = require('cors');
const userRoutes = require('./router/users')
const friendrequestRoutes = require("./router/friendrequest");
const postRoutes = require("./router/post");

app.use(express.json());
app.use(cors());

//Routes
app.use("/users", userRoutes);
app.use("/friendrequest", friendrequestRoutes);
app.use("/post", postRoutes);

app.get('/', (req, res) => {
    res.send("Hello App")
});

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/src/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage: Storage }).single('image');

app.post('/register', async (req, res) => {
    upload(req, res, async (err) => {
        if (!err) {
            const { firstname, lastname, email, password, dateofBirth, location, occupation } = req.body;
            const image = req.file.originalname
            if (!firstname, !lastname, !email, !password, !dateofBirth, !location, !occupation, !image) {
                return res.status(422).json({ error: "Please fill the all fields" })
            }
            try {
                const userExist = await Users.findOne({ email })
                if (userExist) {
                    return res.status(422).json({ error: "Email already exist!" });
                }
                const user = new Users({ firstname, lastname, email, password, image, dateofBirth, location, occupation });

                const userReg = await user.save();

                if (userReg) {
                    res.status(200).json(user);
                }
            } catch (error) {
                console.log(`Erro while registering ${error}`)
            }
        } else {
            console.log(`Error while register + file ${err}`)
        }
    })
})

app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'please fill the data' })
        }
        const userLogin = await Users.findOne({ email: email });
        if (!userLogin) {
            res.status(404).json({ error: 'Please Signup first!' });
        } else {
            if (password == userLogin.password) {
                // res.status(200).send(req.body)
                res.status(200).json(userLogin);
            } else {
                res.status(404).json({ error: 'incorrect password' });
            }
        }
    } catch (error) {
        console.log(`Erro while Login ${error}`)
    }
})

app.listen(PORT, () => {
    console.log(`App Started at ${PORT}`)
})