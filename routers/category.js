const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const { Category, validateCategory } = require('../models/category')

router.post('/create', cookieJwtAuth,  async (req, res) => {

    const { error } = validateCategory(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);
    

    let category = new Category(req.body)
    let new_category = await category.save()

    return res.send(new_category)

})

router.get('/categories', async (req, res) => {

    const categories = await Category.find()

    return res.send(categories)

})

module.exports = router;