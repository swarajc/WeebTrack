const router = require('express').Router(),
    User = require('../../models/user'),
    auth = require('../../middleware/auth');

router.route('/u').get(auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send({error});
    }

});

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

module.exports = router;    