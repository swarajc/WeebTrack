const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log(token);
    const data = jwt.verify(token, process.env.JWT_KEY)
    console.log(data);
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        const sendUser = {
            _id: user._id,
            username: user.username,
            emailId: user.emailId,
            animes: user.animes
        }

        console.log(sendUser)

        req.user = sendUser
        req.token = token
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}

module.exports = auth