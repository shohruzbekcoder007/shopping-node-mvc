const mongoose = require('mongoose')
const Joi = require("joi")

const ProductSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img_url: {
        type: String,
        required: true
    }
});

function validateProduct(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        text: Joi.string().min(3).max(50).required(),
        price: Joi.number().required(),
        img_url: Joi.string().min(3).max(50).required(),
    });

    return schema.validate(user);
}

const Product = mongoose.model("products", ProductSchema);

module.exports.Product = Product;
module.exports.validateProduct = validateProduct;