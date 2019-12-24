const router = require('express').Router();
let User = require('../../models/user');
let mongoose = require('mongoose');

require('dotenv').config();

router.route('/add').post((req, res) => {

    const uri = process.env.ATLAS_URI;

    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log("MongoDB Connected!");
    })

    console.log(req.body);
    console.log(req.method);

    const username = req.body.username;
    const emailId = req.body.emailId;

    const newUser = new User({ username, emailId });

    newUser.save()
        .then(() => res.json('A new user created'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;    