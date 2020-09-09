const router = require('express').Router(),
    User = require('../../models/user'),
    auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
var ObjectID = require('mongodb').ObjectID;

router.route('/u').get(auth, async (req, res) => {
    // res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send({ error });
    }

});

router.route('/update').post(auth, async (req, res) => {
    // res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    try {

        let updates = req.body.updateObj.updates;
        let currentUser = req.body.updateObj.checker;
        console.log(updates, currentUser);
        let user = await User.findOne({ emailId: currentUser });
        console.log(typeof (user._id));
        if (updates.username !== '' && updates.password !== '') {
            let HashedPassw = await bcrypt.hash(updates.password, 8);
            await user.updateOne({ $set: { username: updates.username, password: String(HashedPassw) } });
        }
        else if (updates.username !== '' && updates.password === '') {
            await user.updateOne({ $set: { username: updates.username } });
        }
        else if (updates.password !== '' && updates.username === '') {
            let HashedPassw = await bcrypt.hash(updates.password, 8);
            await user.updateOne({ $set: { password: String(HashedPassw) } });
        }
        return res.json({ status: 'success', message: 'Updated successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
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