const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://thanhlong:992001@cluster0.fqkrn.mongodb.net/doan1?retryWrites=true&w=majority', {
            useNewUrlParser: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };