const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const { OrderProduct, validateOrderProduct } = require('../models/order_product')
const { Product, validateProduct } = require('../models/product')
const { Order, validateOrder } = require('../models/order')

router.post('/create',  async (req, res) => {

    const machine_id = req.body.machine_id
    const tel_number = req.body.tel_number

    const new_order = await Order.findOneAndUpdate({machine_id: machine_id, delivered: false}, {$set: {delivered: true, tel_number: tel_number}}, {new: true})
    
    return res.send(new_order)
})

router.get('/orders',  async (req, res) => {

    const orders = await Order.find({delivered: true}) || []
    
    return res.send(orders)
})

router.get('/remove',  async (req, res) => {

    const order_id = req.body.order_id
    
    let order = await Order.findByIdAndRemove(order_id);
    if (!order)
        return res.status(400).send({order: false});

    return res.send({order: true});
})

module.exports = router;