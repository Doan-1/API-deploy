const express = require('express');
const router = express.Router();

const CommentController = require('../Controllers/Comment.Controller');


module.exports = (app) => {
    // app.route('/user')
    // .get(UserController.getUser);
    app.route('/comment/:id')
    .get(CommentController.getCommentbyId);
    app.route('/comment/create')
    .post(CommentController.createNewComment);
}