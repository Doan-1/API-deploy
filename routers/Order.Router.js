const express = require('express');
const router = express.Router();

const OrderController = require('../Controllers/Order.Controller');


module.exports = (app) => {
    app.route('/order/:id')
    .get(OrderController.getOrderbyIDUser);
    app.route('/order/create')
    .post(OrderController.createNewOrder);
    app.route('/order/delete/:id')
    .get(OrderController.deleteByIDUser);
    app.route('/order/deleteOne')
    .post(OrderController.deleteOnebyIdProduct);
    app.route('/order/total/:id')
    .get(OrderController.getTotalbyID);
}