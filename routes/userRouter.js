const express = require('express');

const authController = require('../controllers/authController');

const Router = express.Router();

Router
    .route('/signup')
    .post(authController.signUp);

module.exports = Router;