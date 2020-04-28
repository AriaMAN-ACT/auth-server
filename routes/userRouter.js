const express = require('express');

const authController = require('../controllers/authController');

const Router = express.Router();

Router
    .route('/signup')
    .post(authController.signUp);

Router
    .route('/signin')
    .post(authController.signIn);

Router
    .route('/checkToken')
    .get(
        authController.protect,
        authController.checkToken
    );

module.exports = Router;