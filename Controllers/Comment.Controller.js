const axios = require("axios");
const comment = require("../Models/Comment");
const { mutipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject} = require('../util/mongoose');

class CommentController{
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
    getCommentbyId= (req,res)=>{
        comment.find({id_product: req.params.id}, function(err, data) {
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
    createNewComment = async(req,res)=> {
        const newComment = comment(req.body)
        //console.log(newComment.star)
        try{
            await newComment.save()
            //console.log("http://localhost:8080/addDataCF?user="+newComment.id_user+"&item="+newComment.id_product+"&rating="+newComment.star);
            try{
                const res = await axios.post("http://localhost:8080/addDataCF?user="+newComment.id_user+"&item="+newComment.id_product+"&rating="+newComment.star)
                //console.log(res)
            }
            catch(err){
                console.log(err)
                res.status(500).json({msg: err})
                return;
            }
            res.status(200).json({msg:'OK'})
        }
        catch{
            res.status(400).json({error:'error'})
        }
    }
    
}
module.exports = new CommentController();