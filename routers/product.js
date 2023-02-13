const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const { Product, validateProduct } = require('../models/product')

router.post('/create', async (req, res) => {

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

module.exports = router;