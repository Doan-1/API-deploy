const res = require("express/lib/response");
const product = require("../Models/Product");
const { mutipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject} = require('../util/mongoose');
const axios = require("axios");


class ProductController{
    getProduct = (req,res) =>   {
        product.find({}, function(err, data) {
            if(!err)
            {
                res.json({data: mutipleMongooseToObject(data)});
            }
            else{
                res.status(400).json({error:'error'})
            }
        })
    }
    getCountProduct = async (req,res) =>   {
        let a = [];
        a= await product.find({});
        //console.log(a.length);
        res.json({data: a.length});
    }
    getProductdDesc = (req,res) =>   {
        product.find({} , function(err, data) {
            if(!err)
            {
                res.json({data: mutipleMongooseToObject(data)});
            }
            else{
                res.status(400).json({error:'error'})
            }
        }).sort({sold_quantity: -1})
    }

    getProductbyID = (req,res)=>{
        product.findOne({slug: req.params.slug}, function(err, data) {
            if(!err)
            {
                //console.log(data);
                res.json({data: mongooseToObject(data)});
            }
            else{
                res.status(400).json({error:'error'})
            }
        })
        
    }

    getProductbyCategory = (req,res)=>{
        //console.log(req.params.categories);
        product.find({categories: req.params.categories}, function(err, data) {
            if(!err)
            {
                //console.log(data);
                res.json({data: mutipleMongooseToObject(data)});
            }
            else{
                res.status(400).json({error:'error'})
            }
        })
        
    }
    getProductbyPriceGreaterthan = (req,res)=>{
        //console.log(req.params.categories);
        product.find({product_price: {$gt: req.params.id}}, function(err, data) {
            if(!err)
            {
                //console.log(data);
                res.json({data: mutipleMongooseToObject(data)});
            }
            else{
                res.status(400).json({error:'error'})
            }
        })
        
    }
    getProductbyPriceSmallerthan = (req,res)=>{
        //console.log(req.params.categories);
        product.find({product_price: {$lt: req.params.id}}, function(err, data) {
            if(!err)
            {
                //console.log(data);
                res.json({data: mutipleMongooseToObject(data)});
            }
            else{
                res.status(400).json({error:'error'})
            }
        })
        
    }
    getProductbyPriceBetween = (req,res)=>{
        //console.log(req.params.categories);
        product.find({product_price: {$gt: req.params.gt, $lt: req.params.lt}}, function(err, data) {
            if(!err)
            {
                //console.log(data);
                res.json({data: mutipleMongooseToObject(data)});
            }
            else{
                res.status(400).json({error:'error'})
            }
        })
        
    }

    cretenewProduct = async (req,res) =>{
        // console.log('hehe')
        // console.log(req.body)
        //console.log('o day')
        let a =[];
        a = await product.find({});
        let countid = 0;
        countid = a.length+1;
        try {
            const product1 = new product(req.body);
            product1.id_product = countid;
            //console.log(product1)
            product1.save()
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }
    }

    updateProductStatus = async (req,res) =>{
        try {
            await product.updateOne({id_product: req.body.id_product},{$set: {status: req.body.status}})
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }
    }
    updateProduct = async (req,res) =>{
        try {
            await product.updateOne({id_product: req.body.id_product},{$set: {product_name: req.body.product_name,
            product_price: req.body.product_price, description: req.body.description, slug: req.body.slug, categories: req.body.categories,
            color: req.body.color, style: req.body.style, detail_info: req.body.detail_info, discount: req.body.discount, discount_percent: req.body.discount_percent,
            classify: req.body.classify}})
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }
    }
    
    getCF = async (req,res) =>{
        try{
            const getRecommendProduct = await axios('http://localhost:8080/getCF?user='+req.query.id_user);
            //console.log(listProduct.data.product_id_array)
            const listProduct = await product.find({
                'id_product': { $in: getRecommendProduct.data.product_id_array }
            })
            //console.log(listProduct)
            res.json({data:listProduct})
        }
        catch(err){
            console.log(err)
            res.status(500).json({msg:err})
            return;
        }
    }
    
}
module.exports = new ProductController();