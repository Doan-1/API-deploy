const express = require('express');
const router = express.Router();

const CartController = require('../Controllers/Cart.Controller');


module.exports = (app) => {
    // app.route('/user')
    // .get(UserController.getUser);
    app.route('/cart/:id')
    .get(CartController.getCartbyIDUser);
    app.route('/cart/status/:id')
    .get(CartController.getCartbyStatus);
    app.route('/cart/status/count/:id')
    .get(CartController.getCountCartbyStatus);
    app.route('/cart/create')
    .post(CartController.createNewCart);
    app.route('/cart/updatestatus')
    .post(CartController.updateCartStatus);
}