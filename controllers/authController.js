const validator = require('validator');

const User = require('../models/User');
const Catch = require('../utils/catch');
const AppError = require('../utils/AppErorr');

exports.signUp = Catch(
    async (req, res, next) => {
        const {email, password} = req.body;
        if (!email || !password || !validator.isEmail(email) || password.length < 8 || password.length > 100) {
            throw new AppError('The Request body must have valid email and password', 404);
        }
        const user = await User.create({email, password});
        user.password = undefined;
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
);