const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>MOI</h1>");
});

app.listen(8000, () => {
    console.log("piippiip");
});
