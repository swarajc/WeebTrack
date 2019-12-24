const router = require('express').Router(),
    User = require('../../models/user'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');



router.route('/add').post((req, res) => {

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