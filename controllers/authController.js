const validator = require('validator');
const jsonWebToken = require('jsonwebtoken');

const User = require('../models/User');
const Catch = require('../utils/catch');
const AppError = require('../utils/AppErorr');

const signToken = ({ _id }) => {
    return jsonWebToken.sign(
        {
            id: _id
        },
        process.env.JSON_WEB_TOKEN_SECRET,
        {
            expiresIn: process.env.JSON_WEB_TOKEN_TIME
        }
    );
};

const sendToken = (user, statusCode, res) => {
    const token = signToken(user);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signUp = Catch(
    async (req, res, next) => {
        const {email, password} = req.body;
        if (!email || !password || !validator.isEmail(email) || password.length < 8 || password.length > 100) {
            throw new AppError('The Request body must have valid email and password', 404);
        }
        const user = await User.create({email, password});
        user.password = undefined;
        sendToken(user, 201, res);
    }
);

exports.signIn = Catch(async (req, res) => {
    const { email, password } = req.body;
    if (
        !email ||
        !password ||
        !validator.isEmail(email) ||
        password.length < 8 ||
        password.length > 100) {
        throw new AppError('request body should have valid email and password.', 400);
    }
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new AppError('Incorrect email or password', 401);
    }


    sendToken(user, 200, res);
});
