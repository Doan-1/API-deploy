const express = require('express');

const cors = require('cors')
const app = express();
const port = 4001;

const db = require('./Config/db');
const productrouter = require('./routers/Product.Router');
const userrouter = require('./routers/User.Router');
const commnetrouter = require('./routers/Comment.Router');
const cartrouter = require('./routers/Cart.Router');
const cartinforouter = require('./routers/CartInfo.Router');
const orderrouter = require('./routers/Order.Router')
const salesrouter = require('./routers/Salesstatus.Router');
const chatbot = require('./routers/df.route');

db.connect();
app.use(cors())
app.use(express.json());
productrouter(app);
userrouter(app);
commnetrouter(app);
cartinforouter(app);
cartrouter(app);
orderrouter(app);
salesrouter(app);
chatbot(app)

app.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
}
);