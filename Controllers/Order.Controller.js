
const order = require("../Models/Order");
const { mutipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject} = require('../util/mongoose');
class OrderController{
    // getComment = (req,res) =>   {
    //     user.find({}, function(err, data) {
    //         if(!err)
    //         {
    //             console.log(data);
    //             res.json({data: mutipleMongooseToObject(data)});
    //         }
    //         else{
    //             res.status(400).json({error:'error'})
    //         }
    //     })
    // }
    getOrderbyIDUser = async (req,res)=>{
        let result
        try {
            result = await order.findOne({id_user: req.params.id});
        }
        catch(err) {
            //console.log(err)
            res.status(500).json({msg: err})
            return;
        }
        if(result === null){
            res.json({data:{0: {orders:[]}}});
            return;
        }
        //res.status(200).json(result)
        else
        {
            order.find({id_user: req.params.id}, function(err, data) {
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
        
    }
    createNewOrder = async (req,res)=> {
        let result
        try {
            result = await order.findOne({id_user: req.body.id_user});
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }
        if(result === null){
            // const newOrder = order(req.body)
            // newOrder.save()
            //console.log("chua ton tai")
            let a = [];
            a.push({id_product: req.body.id_product,
                product_name: req.body.product_name,
                product_price: req.body.product_price,
                thumbnail: req.body.thumbnail,
                color: req.body.color,
                style: req.body.style,
                quantity: req.body.quantity,
                size: req.body.size}) 
            const neworder = order({id_user: req.body.id_user, orders: a})
            try {
                await  neworder.save();
            } catch (err) {
                res.status(550).json({ msg: err });
                return;
            }

        }
        else
        {
            // console.log(result.orders)
            // console.log("ton tai r ")
            // console.log(req.body.id_product);
            
            let a = []
            
            a= result.orders;
            //console.log(a)
            let index = a.findIndex(
                element => element.id_product === req.body.id_product
            )
            if(index === -1)
            {
                //console.log('product chua co')
                let a = [];
                a= result.orders;
                
                a.push({id_product: req.body.id_product,
                        product_name: req.body.product_name,
                        product_price: req.body.product_price,
                        thumbnail: req.body.thumbnail,
                        color: req.body.color,
                        style: req.body.style,
                        quantity: req.body.quantity,
                        size: req.body.size})
                //console.log(a);
                try {
                    await  order.updateOne({id_user: req.body.id_user},{$set: {orders: a}}
                    );
                  } catch (err) {
                    res.status(550).json({ msg: err });
                    return;
                }
            }
            else
            {
                //console.log('ton tai r')
                a.map((item,index)=>{
                    if(item.id_product === req.body.id_product)
                    {
                        //console.log(item.quantity)
                        item.quantity = req.body.quantity;
                        item.color = req.body.color;
                        item.size = req.body.size;
                        //console.log(item.quantity)
                    }
                })
                try {
                    await  order.updateOne({id_user: req.body.id_user},{$set: {orders: a}}
                    );
                  } catch (err) {
                    res.status(550).json({ msg: err });
                    return;
                }
            }
        }
        //res.status(200).json(result)
        // const newOrder = order(req.body)
        // newOrder.save()
    }
    //delete 1 product
    deleteOnebyIdProduct = async(req,res) => {
        let result
        try {
            result = await order.findOne({id_user: req.body.id_user});
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }
        let a = [];
        a = result.orders;
        //console.log(a);
        let newa = a.filter(function(element){
            return element.id_product != req.body.id_product;
        })
        try {
            await  order.updateOne({id_user: req.body.id_user},{$set: {orders: newa}}
            );
          } catch (err) {
            res.status(550).json({ msg: err });
            return;
        }
        
    }
    //delete toan bo
    deleteByIDUser= async (req, res) => {
        await order.deleteMany({ id_user: req.params.id },function(err, data) {
            if(!err)
            {
                console.log('Xoa thanh cong');
            }
            else{
                res.status(400).json({error:'error'})
            }
        })
    }
    getTotalbyID= async (req,res) =>{
        let result
        try {
            result = await order.findOne({id_user: req.params.id});
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }
        if(result !=null)
        {
            let a =[];
            a= result.orders;
            let alltotal = 0;
            a.map((item,index)=>{
                alltotal = Number(alltotal) + Number(item.product_price) * Number(item.quantity);
            })
            res.json({data: alltotal});
        } 
        else{
            res.json({data: 0});
        }  

    }
}
module.exports = new OrderController();