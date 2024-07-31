require('dotenv').config();
const express = require("express");
const app = express();
const port =  process.env.BACKEND_PORT;
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter.js');
const orderRouter = require('./routes/orderRouter.js');
const productRouter = require('./routes/productRouter.js');
const serviceRouter = require('./routes/serviceRouter.js');

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/service', serviceRouter);

app.listen(port, () => {
    console.log("server running on port " + port);
})