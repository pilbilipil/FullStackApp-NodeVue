require('dotenv').config();
const express = require("express");
const app = express();
const port =  process.env.BACKEND_PORT;
const bodyParser = require('body-parser');
const userRouter = require('./src/routes/userRouter.js');
const orderRouter = require('./src/routes/orderRouter.js');
const productRouter = require('./src/routes/productRouter.js');
const serviceRouter = require('./src/routes/serviceRouter.js');
const errorHandler = require('./src/middleware/errorHandler.js');

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/service', serviceRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log("server running on port " + port);
})