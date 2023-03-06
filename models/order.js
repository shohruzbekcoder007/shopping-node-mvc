const mongoose = require('mongoose')
const Joi = require("joi")

const OrderSchema = new mongoose.Schema({
    machine_id: {
        type: String,
        required: true
    },
    tel_number: {
        type: String,
    },
    delivered: {
        type: Boolean,
        default: false
    }
});

function validateOrder(user) {
    
    const schema = Joi.object({
        machine_id: Joi.string().required(),
        tel_number: Joi.string().required(),
        delivered: Joi.string().required(),
    });

    return schema.validate(user);
}

const Order = mongoose.model("orders", OrderSchema);
module.exports.Order = Order;
module.exports.validateOrder = validateOrder;