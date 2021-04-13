const mongoose = require("mongoose");
const express = require("express");
const {createHash} = require("crypto");
const app = express();
const User = require('./user');
const port = process.env.PORT || 8000;
require('dotenv').config();


app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("body-parser").json({limit: "50mb"}));
app.use(express.static(__dirname + "/build"));

mongoose.connect(
    process.env.DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
}).then(() => console.log("Connected to database"))
.catch(err => console.log(`Error while connecting to database ${err}`));


app.post("/login", async(req, res) => {
    const hash = createHash('sha256');
    const {username, password} = req.body;
    const digest = hash.update(password).digest('hex');
    try{
        const user = await User.findOne({username: username});
        if(user){
            if(user.password == digest){
                return res.status(200).json(user.id);
            }
        }
        return res.status(400).json("Login failed");
    }catch(err){
        return res.status(500).json("Could not fetch from database");
    }
})

app.post("/register", async(req, res) => {
    const hash = createHash('sha256');
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json("User input failed");
        }
        const digest = hash.update(password).digest('hex');
        const newUser = new User({username, password: digest});
        await newUser.save();
        return res.status(201).json("Success");
    }catch(err){
        return res.status(500).json("User already exists");
    }
})

//app.post("/imageurl")

app.listen(port, () => {
    console.log(`App running in port ${port}`);
});
