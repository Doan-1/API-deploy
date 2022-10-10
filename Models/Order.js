const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Order = new Schema(
    {
        id_user: {type: String},
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

// Order.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: 'all',
// });


module.exports = mongoose.model('Order', Order);