const chatbot = require('../chatbot/chatbot')
module.exports = app =>{
    app.post('/sendMessage', async(req,res)=>{
        const {text, userId}= req.body;
        const resultQuery = await chatbot.sendMessage(text,userId)
        const resObj ={
            answer: resultQuery.fulfillmentText
        }
        res.json(resObj)
    })
}