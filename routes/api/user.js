const router = require('express').Router();
let User = require('../../models/user');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const emailId = req.body.emailId;

    const newUser = new User({username, emailId});  

    newUser.save()
        .then(() => res.json('A new user created')) 
        .catch(err => res.status(400).json('Error: '+ err));    
});

module.exports = router;