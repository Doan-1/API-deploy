const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        id_cart: { type: String },
        id_user: {type: String},
        first_name: {type:String},
        last_name:{type:String},
        email:{type:String},
        address: {type: String},
        phone: {type: String},
        shipping: {type:String},
        total: {type: String},
        status: {type: String},

    },
);



module.exports = mongoose.model('Cart', Cart);