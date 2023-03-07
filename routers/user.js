const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const { User, validateUser } = require('../models/user')

router.post('/', async (req, res) => {

    try {

        const { error } = validateUser(req.body);

        if (error)
            return res.status(400).send(error.details[0].message);
            
        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)

        let user = new User(req.body)
        let new_user = await user.save()

        return res.send(new_user)

    } catch (err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }

})

router.post('/login', async (req, res) => {

    let user = await User.findOne({ user_name: req.body.user_name });
    if (!user)
        return res.render('login', {
            message: 'Email yoki parol noto\'g\'ri'
        })

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword)
        return res.render('login', {
            message: 'Email yoki parol noto\'g\'ri'
        })

    const token = user.generateAuthToken();

    res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        // maxAge: 1000000,
        // signed: true
    })

    return res.render('main_admin', {
        
    })

})

module.exports = router;