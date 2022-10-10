const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        id_cart: { type: String },
        id_user: {type: String},
        total: {type: String},
        address: {type: String},
        phone: {type: String},
        status: {type: String}
    
    },
);



module.exports = mongoose.model('Cart', Cart);