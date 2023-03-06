const mongoose = require('mongoose')
const Joi = require("joi")

const OrderProductSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});

function validateOrderProduct(user) {

    const schema = Joi.object({
        order_id: Joi.string().required(),
        product_id: Joi.string().required(),
        count: Joi.number().required()
    });

    return schema.validate(user);
}

const OrderProduct = mongoose.model("order-products", OrderProductSchema);
module.exports.OrderProduct = OrderProduct;
module.exports.validateOrderProduct = validateOrderProduct;