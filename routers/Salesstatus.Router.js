const express = require('express');
const router = express.Router();

const SalesstatusController = require('../Controllers/Salesstatus.Controller');


module.exports = (app) => {
    app.route('/salesstatus/total/:year/:month')
    .get(SalesstatusController.getTotalbyMonth);
}