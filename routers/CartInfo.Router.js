const express = require('express');
const router = express.Router();

const CartInfoController = require('../Controllers/CartInfo.Controller');


module.exports = (app) => {
    app.route('/cartinfo')
    .get(CartInfoController.getCartInfo);
    app.route('/cartinfo/:id')
    .get(CartInfoController.getCartInfobyIDCart);
}