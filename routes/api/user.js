const router = require('express').Router();
let User = require('../../models/user');

router.route('/add').post((req, res) => {
    console.log(req.body);
    console.log(req.method);
    const username = req.body.username;
    const emailId = req.body.emailId;
    
    const newUser = new User({username, emailId});  
    newUser.save()
        .then(() => res.json('A new user created')) 
        .catch(err => res.status(400).json('Error: '+ err));    
});

module.exports = router;