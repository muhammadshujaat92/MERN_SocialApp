const mongoose = require("mongoose")
// const db = "mongodb+srv://umuhammadshujaat:mernsocial@cluster0.k9yjnhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const db = "mongodb+srv://mshujaat:cluster123@cluster0.iheopal.mongodb.net/mernsocialapp?retryWrites=true&w=majority";
mongoose.connect(db).then(() => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log(`DB not connected ${err}`);
})