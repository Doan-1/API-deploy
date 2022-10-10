const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        id_user: { type: String },
        user_name: {type: String},
        user_password: {type: String},
        user_email: {type: String},
        user_phone: {type: String},
        user_address: {type: String},
        favorite:{
            type:[
                {
                    id_product: String,
                    product_name: String,
                    product_price: String,
                    description: String,
                    slug: String,
                    categories: String,
                    color: String,
                    style: String,
                    detail_info: String,
                    discount: String,
                    discount_percent: String,
                    thumbnail: String,
                    classify:String
                }
            ],
            required : true,
            minlength: 1,
        }
        
    },
);


module.exports = mongoose.model('User', User);