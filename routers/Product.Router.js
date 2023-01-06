const express = require('express');
const router = express.Router();
const fileUploader = require('../Config/cloudinary.config');

const ProductController = require('../Controllers/Product.Controller');


module.exports = (app) => {
    app.route('/product')
    .get(ProductController.getProduct);
    app.route('/product/getCF')
    .get(ProductController.getCF);
    app.route('/product/count')
    .get(ProductController.getCountProduct);
    app.route('/product/desc')
    .get(ProductController.getProductdDesc);
    app.route('/product/:slug')
    .get(ProductController.getProductbyID);
    app.route('/product/create')
    .post(ProductController.cretenewProduct);
    app.route('/product/category/:categories')
    .get(ProductController.getProductbyCategory);
    app.route('/product/price/greater/:id')
    .get(ProductController.getProductbyPriceGreaterthan);
    app.route('/product/price/smaller/:id')
    .get(ProductController.getProductbyPriceSmallerthan);
    app.route('/product/price/between/:gt/:lt')
    .get(ProductController.getProductbyPriceBetween);
    app.route('/product/updatequantity')
    .post(ProductController.updateProductQuantity) 
    app.route('/product/updatestatus')
    .post(ProductController.updateProductStatus);
    app.route('/product/update')
    .post(ProductController.updateProduct);
    app.post('/product/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
        if (!req.file) {
          next(new Error('No file uploaded!'));
          return;
        }
       
        res.json({ secure_url: req.file.path });
    });
    
}