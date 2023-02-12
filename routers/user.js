const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const { User, validateUser } = require('../models/user')

router.post('/', async (req, res) => {

    // try {

        const { error } = validateUser(req.body);

        if (error)
            return res.status(400).send(error.details[0].message);
            
        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)

        let user = new User(req.body)
        let new_user = await user.save()

        return res.send(new_user)

    // } catch (err) {
    //     return res.send("Tizimda xatolik yuzaga keldi")
    // }

})

module.exports = router;