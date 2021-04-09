const mongoose = require("mongoose");
const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.static(__dirname + "/build"));

mongoose.connect(
    process.env.DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
}).then(() => console.log("Connected to database"))
.catch(err => console.log(`Error while connecting to database ${err}`));

//app.post("/login")

//app.post("/register")

//app.post("/imageurl")

app.listen(process.env.PORT || 8000, () => {
    console.log(`App running in port ${process.env.PORT}`);
});
