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

router.route('/validate').post((req, res) => {

    let emailId = req.body.emailId,
        password = req.body.password;

    User.findOne({
        
        emailId: emailId
    
    }).then((user) => {

        if (!user) {

            res.json({ status: "failure", message: "not registered" });
        
        }
        else {

            console.log(user);
            if (bcrypt.compareSync(password, user.hash)) {

                const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                res.json({ status: "success", message: "user found!!!", data: { user: user, token: token } });  

            }
            else {

                res.json({ status: "error", message: "Invalid email/password!!!", data: null });

            }
        }
    })


});



module.exports = router;    