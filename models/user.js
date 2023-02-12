const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require("joi")

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        enum: [1, 2],
        default: 1
    }
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, status: this.status, name: this.name }, "q1y1npar0l",
        // {expiresIn: '300s'}
    );
    return token;
}

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        user_name: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
        status: Joi.number(),
    });

    return schema.validate(user);
}

const User = mongoose.model("users", UserSchema);
module.exports.User = User;
module.exports.validateUser = validateUser;