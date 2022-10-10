const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment  = new Schema(
    {
        id_user: { type: String },
        user_name: {type: String},
        id_product: {type: String},
        comment: {type: String},
        star: {type: String},
        time: {type: String}
        
    },
);


module.exports = mongoose.model('Comment', Comment);