const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartInfo = new Schema(
    {
        id_cart: {type: String},
        orders:{
            type:[
                {
                    id_product: String,
                    product_name: String,
                    product_price: String,
                    thumbnail: String,
                    color: String,
                    style: String,
                    quantity: String,
                    size: String
                }
            ],
            required : true,
            minlength: 1,
        }
    
    },
);



module.exports = mongoose.model('CartInfo', CartInfo);