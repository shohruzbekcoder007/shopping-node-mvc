const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const { Product, validateProduct } = require('../models/product')

router.post('/create', cookieJwtAuth, async (req, res) => {

    const { error } = validateProduct(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    let product = new Product(req.body)
    let new_product = await product.save()

    return res.send(new_product)

})

router.get('/products', async (req, res) => {

    const products = await Product.find()

    return res.send(products)

})

router.get('/category-products', async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    // const offset = parseInt(req.query.offset) || 0;
    const page = parseInt(req.query.page) || 1;

    const category = req.query.category

    try {

        const products = await Product.find({category: category}).limit(limit).skip((page - 1)*limit)
        const count = await Product.countDocuments()
        const totalPages = Math.ceil(count / limit)
        let result = {}
        result.products = products
        result.page = page
        result.totalPages = totalPages
        return res.send(result)

    } catch (error) {
        
        return res.send([])

    }

})

module.exports = router;