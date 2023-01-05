const cart = require("../Models/Cart");
const cartinfo = require("../Models/CartInfo");
const order = require("../Models/Order");
const product = require("../Models/Product");
const salesstatus = require("../Models/Salesstatus");
 const { mutipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject} = require('../util/mongoose');
class CartController{
    getCartbyIDUser = (req,res)=>{
        cart.find({id_user: req.params.id}, function(err, data) {
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
    getCartbyStatus = (req,res)=>{
        cart.find({status: req.params.id}, function(err, data) {
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
    getCountCartbyStatus = async(req,res)=>{
        let a = [];
        a= await cart.find({status: req.params.id});
        //console.log(a.length);
        res.json({data: a.length});
        
    }
    createNewCart = async (req,res)=> {
        let cartFind ;
        try {
            cartFind = await cart.find({})
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }
        let a= [];
        a=cartFind;
        //
        let countid = 0;
        countid = a.length+1; 
        const newcart = cart({id_cart: countid, 
                            id_user: req.body.id_user,
                            first_name:req.body.first_name,
                            last_name:req.body.last_name,
                            email: req.body.email,
                            shipping: req.body.shipping,
                            total: req.body.total, 
                            address: req.body.address, 
                            phone: req.body.phone, 
                            status:"da nhan don hang"}); 
        newcart.save();
        let orderFind = await order.findOne({id_user: req.body.id_user});
        if(orderFind != null)
        {
        //console.log(orderFind.orders)
        // let allcartinfo = [];
        // allcartinfo = await cartinfo.find({});
        // let countidcartinfo = 0;
        // countidcartinfo = allcartinfo.length + 1 ;
        const newcartinfo = cartinfo({id_cart: countid, orders: orderFind.orders});
        //console.log(newcartinfo)
        try {
            newcartinfo.save();
            var time = new Date();
            var monthnow = time.getMonth()+1;
            //searh trong sales xem co time chua
            let salesfind = await salesstatus.findOne({year: time.getFullYear()});
            if( salesfind != null)
            {
                let alltotal = [];
                alltotal = salesfind.sales;
                //console.log('hihi')
                //console.log(alltotal);
                let index = alltotal.findIndex(
                    element => element.month ==  monthnow
                )
                if( index === -1 )
                {
                    alltotal.push({month:  monthnow, total: req.body.total});
                    //console.log(alltotal);
                    try {
                        await salesstatus.updateOne({year: time.getFullYear()},{$set: {sales: alltotal}}
                        );
                      } catch (err) {
                        res.status(550).json({ msg: err });
                        return;
                    }
                }
                else
                {
                    //console.log('1 lan o day')
                    alltotal.map((item,index)=>{
                        if (item.month ==  monthnow)
                        {
                            item.total = (Number(item.total) + Number(req.body.total)).toString();
                            //console.log('1 lan o day nua ne')
                        }
                    })
                    console.log(alltotal)
                    try {
                        await salesstatus.updateOne({year: time.getFullYear()},{$set: {sales: alltotal}}
                        );
                      } catch (err) {
                        res.status(550).json({ msg: err });
                        return;
                    }
                }
            }
            let b = [];
            b = orderFind.orders;
            b.map(async (item,index)=> {
                let findpro = await product.findOne({id_product: item.id_product});
                let newsoldquantity = Number(findpro.sold_quantity) + Number(item.quantity);
                //console.log(newsoldquantity.toString())
                await  product.updateOne({id_product: item.id_product},{$set: {sold_quantity: newsoldquantity}}
                );
            })
            await order.deleteMany({id_user: req.body.id_user});
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        } 
    }      
    }
    updateCartStatus = async (req,res) =>{
        try {
            //console.log(req.body.id_cart, req.body.status)
            await cart.updateOne({id_cart: req.body.id_cart},{$set: {status: req.body.status}})
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }
    }
    
}
module.exports = new CartController();