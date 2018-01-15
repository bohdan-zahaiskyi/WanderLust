const express = require("express");
const path = require("path");

const app = express();

app.set("client", path.join(__);

app.get('/', function(req, res){  
    res.render("./client/index.html");
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})