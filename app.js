var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, ()=>{
    console.log('Server started!');
});