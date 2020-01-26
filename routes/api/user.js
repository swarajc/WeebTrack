const router = require('express').Router(),
    User = require('../../models/user'),
    auth = require('../../middleware/auth');


router.route('/add').post(async (req, res) => {

    try {

        let { username, emailId, password } = req.body

        let newUser = new User({ username, emailId, password });

        await newUser.save()

        const token = await newUser.generateAuthToken();
        res.status(201).send({ newUser, token })

    } catch (error) {
        res.status(400).send(error);
    }
});

router.route('/validate').post(async (req, res) => {

    try {

        let { emailId, password } = req.body;

        let user = await User.findByCredentials(emailId, password);

        if (!user) {
            return res.status(401).send({ error: 'Login Failed! Check authentication credentials' });
        }

        const token = await user.generateAuthToken();
        res.send({ user, token });

    } catch (error) {
        res.send({ error });
    }

});


router.route('/u/').get(auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user);
});

// router.route('/u/:me').get(auth, async (req, res) => {

// });


router.post('/u/logout', auth, async (req, res) => {

    try {

        let user = await User.findOne({ emailId: req.user.emailId });

        user.tokens = user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await user.save()
        res.send({ success: 'Logged out' });
    } catch (error) {
        res.status(500).send({ error })
    }
})



router.post('/me/logoutall', auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router;    