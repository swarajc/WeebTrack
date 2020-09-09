const router = require('express').Router(),
    User = require('../../models/user'),
    auth = require('../../middleware/auth');


require('dotenv').config();


router.route('/add').post(async (req, res) => {

    try {

        let { username, emailId, password } = req.body
        

        let newUser = new User({ username, emailId, password });

        await newUser.save();

        const token = await newUser.generateAuthToken();
        res.status(201).send({ newUser, token });

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.route('/validate').post(async (req, res) => {

    try {

        let { emailId, password } = req.body;

        let user = await User.findByCredentials(emailId, password);

        const token = await user.generateAuthToken();
        res.send({ user, token });

    } catch (error) {
        res.send({ error: 'Login Failed! Check login credentials'});
    }

});

module.exports = router;    