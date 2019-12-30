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
        .then(() => {
            console.log(newUser);
            res.json('user created');
        })
        .catch(err => res.json('Error: ' + err)); 

});

router.route('/validate').get((req, res) => {

    let emailId = req.body.emailId,
        password = req.body.password;


});



module.exports = router;    