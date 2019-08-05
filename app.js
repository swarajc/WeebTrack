var express = require('express');
// var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
    

//====ROUTES=====//
app.get('/', function(req, res){
    res.render('home');
});
app.listen(3000, ()=>{
    console.log('Server started!');
});