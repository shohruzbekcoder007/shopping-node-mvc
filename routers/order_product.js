const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const { OrderProduct, validateOrderProduct } = require('../models/order_product')
const { Product, validateProduct } = require('../models/product')
const { Order, validateOrder } = require('../models/order')

router.post('/create',  async (req, res) => {

    const machine_id = req.body.machine_id
    const product_id = req.body.product_id
    const count = req.body.count || 1

    if (!machine_id) {
        return res.send("machine_id is required")
    }

    let order = await Order.findOne({machine_id: machine_id, delivered: false})

    if (!order || order._id == undefined){
        let new_order = new Order({
            machine_id: machine_id
        })
        order = await new_order.save()
    }

    if (!product_id) {
        return res.send("product_id is required")
    }

    let product = await OrderProduct.findOne({order_id: order._id, product_id: product_id})

    if(!product || product._id == undefined){
        let new_product = new OrderProduct({
            order_id: order._id,
            product_id: product_id,
            count: count
        })
        product = await new_product.save()
    } else {
        product = await OrderProduct.findOneAndUpdate({order_id: order._id, product_id: product_id}, {$set:{count: product.count+count}}, {new: true})
    }

    // let product = await Product.findOneAndUpdate({order_id: order._id, product_id: product_id}, {$set:{count: count}}, {new: true})
    return res.send(product)
})

router.get('/count', async (req, res) => {

    const machine_id = req.query.machine_id
    let products = []
    
    let order = await Order.findOne({machine_id: machine_id, delivered: false})

    if (order){
        products = await OrderProduct.find({order_id: order._id}).populate('product_id')
    }

    return res.send(products)
})

router.delete('/remove', async (req, res) => {

    const product_id = req.body.product_id
    
    let product = await OrderProduct.findByIdAndRemove(product_id);
    if (!product)
        return res.status(400).send({removed: false});

    return res.send({removed: true});
});

router.post('/add', async (req, res) => {

    const product_id = req.body.product_id

    let product = await OrderProduct.findOne({_id: product_id})
    let prod = await Product.findOne({_id: product.product_id})
    
    let new_product = await OrderProduct.findOneAndUpdate({_id: product_id}, {$set:{count: product.count+1}}, {new: true})
    if (!new_product)
        return res.status(400).send({add: false});

    return res.send({add: true, count: new_product.count, price: prod.price*new_product.count});
});

router.post('/subtraction', async (req, res) => {

    const product_id = req.body.product_id

    let product = await OrderProduct.findOne({_id: product_id})
    let prod = await Product.findOne({_id: product.product_id})

    if(product.count == 1){
        return res.send({subtraction: false});
    }
    
    let new_product = await OrderProduct.findOneAndUpdate({_id: product_id}, {$set:{count: product.count-1}}, {new: true})
    if (!new_product)
        return res.status(400).send({subtraction: false});

    return res.send({subtraction: true, count: new_product.count, price: prod.price*new_product.count});
});

module.exports = router;