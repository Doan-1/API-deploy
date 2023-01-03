const { param } = require('express/lib/request');
const salesstatus = require('../Models/Salesstatus')
const { mongooseToObject} = require('../util/mongoose');
const { mutipleMongooseToObject } = require('../util/mongoose');

class SalesstatusController{
    getTotalbyMonth= async (req,res)=>{
        // salesstatus.find({year: req.params.year}, function(err, data) {
        //     if(!err)
        //     {
        //         console.log(data);
        //         res.json({data: mutipleMongooseToObject(data)});
        //     }
        //     else{
        //         res.status(400).json({error:'error'})
        //     }
        // })
        let allsales ;
        try {
            allsales = await salesstatus.findOne({year: req.params.year})
        }
        catch(err) {
            console.log(err)
            res.status(500).json({msg: err})
            return;
        }
        //console.log(req.params.year)
        //console.log(req.params.month)
        //console.log(allsales)
        let total = [];
        total = allsales.sales;
        //console.log(total.length)
        if(total[0] != null){
            total.map((item,index)=>{
                if (item.month === req.params.month)
                {
                    //console.log(item.total)
                    res.json({data: item.total});
                }
                else
                {
                    res.json({data: 0});
                }
            })
        }
        else
        {
            res.json({data: 0});
        }
    }
}
module.exports = new SalesstatusController();