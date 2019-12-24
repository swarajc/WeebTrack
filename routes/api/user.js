const router = require('express').Router();
const User = require('../../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


require('dotenv').config();

router.route('/add').post((req, res) => {

    let uri = process.env.ATLAS_URI,
        connection = mongoose.connection;

    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

    connection.once('open', () => {
        console.log("MongoDB Connected!");
    })

    let username = req.body.username,
        emailId = req.body.emailId,
        password = req.body.password;

    let salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, emailId, hash });

    newUser.save()
        .then(() => console.log(newUser))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;    