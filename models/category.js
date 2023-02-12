const mongoose = require('mongoose')
const Joi = require("joi")

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true
    }
});

function validateCategory(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });

    return schema.validate(user);
}

const Category = mongoose.model("categories", CategorySchema);
module.exports.Category = Category;
module.exports.validateCategory = validateCategory;