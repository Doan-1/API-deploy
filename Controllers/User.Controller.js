const user = require("../Models/User");
const product = require("../Models/Product")
const { mutipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject} = require('../util/mongoose');
class UserController{
    Userlogin = async(req,res) =>{
        let a = await user.findOne({user_name: req.body.username});
        if( a!= null)
        {
            if(req.body.password == a.user_password)
            {
                //console.log(a.id_user);
                res.json({data: a.id_user});
            }
            else
            {
                res.json({data: 'Sai mk'})
            }
        }
        else
        {
            res.json({data: 'Sai username'})
        }
    }
    UserResigter = async(req,res) =>{
        let a = await user.findOne({user_name: req.body.username});
        if( a == null)
        {
            let b = [];
            b = await user.find({});
            let countid = 0;
            countid = b.length +1;
            const newuser = user({id_user: countid, user_name: req.body.username, user_password: req.body.password, user_email:'', user_phone:'',user_address:'',favorite:[]})
            //console.log(newuser);
            newuser.save();
        }
        else
        {
            res.json({data: 'username da ton tai'})
        }
    }
    updateUser = async(req,res)=>{
        try {
            //console.log('o day');
            await user.updateOne({id_user: req.body.id},{$set: {user_email: req.body.email,user_phone: req.body.phone, user_address: req.body.address}});
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }

    }
    getUser = (req,res) =>   {
        user.find({}, function(err, data) {
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
    getUserbyID = (req,res)=>{
        user.findOne({id_user: req.params.id}, function(err, data) {
            if(!err)
            {
               // console.log(data);
                res.json({data: mongooseToObject(data)});
            }
            else{
                res.status(400).json({error:'error'})
            }
        })
        
    }
    updatefavorProduct = async (req, res)=>{
       let a = [];
       let result = await user.findOne({id_user: req.body.id_user});
       a= result.favorite
       //console.log(a);
       let index = a.findIndex(
        element => element.id_product === req.body.id_product
        )
        if(index === -1)
        {
           let findproduct = await product.findOne({id_product:req.body.id_product});
        //   console.log(findproduct.id_product)
            const id_product1 = findproduct.id_product;
            const product_name1= findproduct.product_name;
            const product_price1= findproduct.product_price;
            const description1= findproduct.description;
            const slug1= findproduct.slug;
            const categories1= findproduct.categories;
            const color1= findproduct.color;
            const style1= findproduct. style;
            const detail_info1= findproduct.detail_info;
            const discount1= findproduct.discount;
            const discount_percent1=findproduct.discount_percent;
            const thumbnail1= findproduct.thumbnail;
            const classify1= findproduct.classify;
        //    console.log(findproduct.id_product)
            a.push({
            id_product: id_product1,
            product_name: product_name1,
            product_price: product_price1,
            description: description1,
            slug: slug1,
            categories: categories1,
            color: color1,
            style:  style1,
            detail_info: detail_info1,
            discount: discount1,
            discount_percent: discount_percent1,
            thumbnail: thumbnail1,
            classify: classify1
           });
           console.log(a);
           try {
            await  user.updateOne({id_user: req.body.id_user},{$set: {favorite: a}}
            );
          } catch (err) {
            res.status(550).json({ msg: err });
            return;
        }
        }
        else{
            console.log('co r ')
        }
    }
    
}
module.exports = new UserController();