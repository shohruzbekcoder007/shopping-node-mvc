const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')

router.get("/", (req, res) => {
    return res.render('login', {
    })
});

router.get("/admin", cookieJwtAuth, (req, res) => {
    return res.render('main_admin', {
    })
});

router.get("/admin-product", cookieJwtAuth, (req, res) => {
    return res.render('admin_product', {
    })
});

router.get("/order", cookieJwtAuth, (req, res) => {
    return res.render('admin_order', {
    })
});

module.exports = router;