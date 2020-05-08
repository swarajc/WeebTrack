const router = require('express').Router(),
    User = require('../../models/user'),
    auth = require('../../middleware/auth');

router.route('/addAnime').post(auth, async (req, res) => {

    try {
        let anime = req.body.anime;
        console.log(anime);
        console.log(typeof(anime));
        let user = await User.findOne({ emailId: req.user.emailId });
        user.animes = user.animes.concat({ anime });
        await user.save()
        res.send({ success: 'Anime added' });

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;