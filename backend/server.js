const mongoose = require("mongoose");
const express = require("express");
const {createHash} = require("crypto");
const app = express();
const User = require('./user');
const Clarifai = require("clarifai");
const port = process.env.PORT || 8000;
require('dotenv').config();

app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("body-parser").json({limit: "50mb"}));
app.use(express.static(__dirname + "/build"));
const clarifaiApp = new Clarifai.App({
    apiKey: `${process.env.APIKEY}`
})

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
                return res.status(200).json(user);
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
        return res.status(201).json(newUser);
    }catch(err){
        return res.status(500).json("User already exists");
    }
})

app.post("/imageurl", (req, res) => {
    clarifaiApp.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)
    .then(data => res.json(data)) //Oikeat tiedot löytyvät data.outputs.regions.region_info.bounding_box
    .catch(err => res.status(500).json(err));
})


app.put("/image", async(req, res) => {
    const id = req.body.id;
    try{
        const user = await User.findByIdAndUpdate(id, {$inc: {imageCount: 1}})
        console.log(user);
        return res.status(202).json("Success")
    }catch(err){
        return res.status(500).json("Could not update the imagecount")
    }
})
app.listen(port, () => {
    console.log(`App running in port ${port}`);
});
