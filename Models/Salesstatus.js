const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Salesstatus = new Schema(
    {
        year: { type: String },
        sales:{
            type:[
                {
                    month: {type: String},
                    total: {type: String}
                }
            ],
            required : true,
            minlength: 1,
        }
        
    },
);


module.exports = mongoose.model('Salesstatus', Salesstatus);