const dialogflow = require('dialogflow');
const config = require('../config/devkey')

const projectId = config.googleProjectId;
const sessionId = config.dialogFlowSessionId;

const credentials={
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({projectId,credentials});
const sendMessage = async(userText, userId)=>{
    const sessionPath = sessionClient.sessionPath(projectId, sessionId+userId);
    const request = {
        session: sessionPath,
        queryInput:{
            text:{
                text:userText,
                languageCode: config.dialogFlowSessionLanguageCode
            }
        }
    }

    try{
        const responses = await sessionClient.detectIntent(request);
        return responses[0].queryResult
    }catch(err){
        console.log(err)
    }

}

module.exports = {
    sendMessage
}