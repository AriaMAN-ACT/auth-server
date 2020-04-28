const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'A User Must Have A email'],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'A User Must Have Valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'A User Must Have A password'],
        minLength: 8,
        maxLength: 100,
        select: false
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;