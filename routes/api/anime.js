const router = require('express').Router(),
    User = require('../../models/user'),
    auth = require('../../middleware/auth');

router.route('/addAnime').post(auth, async (req, res) => {

    try {
        let anime = req.body.animeObj;
        console.log(anime);
        console.log(typeof (anime));
        let user = await User.findOne({ emailId: req.user.emailId });
        user.animes = user.animes.concat({ anime });
        await user.save()
        res.send({ success: 'Anime added' });

    } catch (error) {
        res.status(400).send(error);
    }
});

router.route('/delAnime').post(auth, async (req, res) => {

    try {

        let user = await User.findOne({ emailId: req.user.emailId });
        user.animes = user.animes.filter((anime) => {
            return anime.anime.title !== req.body.animeObj.title;
        })
        await user.save()
        res.send({ success: 'Anime removed' });

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;