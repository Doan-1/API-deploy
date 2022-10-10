const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User.Controller');


module.exports = (app) => {
    app.route('/user')
    .get(UserController.getUser);
    app.route('/user/:id')
    .get(UserController.getUserbyID);
    app.route('/user/favorite')
    .post(UserController.updatefavorProduct);
    app.route('/user/login')
    .post(UserController.Userlogin);
    app.route('/user/resigter')
    .post(UserController.UserResigter);
    app.route('/user/update')
    .post(UserController.updateUser);
    
}

