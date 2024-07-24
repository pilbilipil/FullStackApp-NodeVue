const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter.js');
const orderRouter = require('./routes/orderRouter.js');

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);

app.listen(port, () => {
    console.log("server running on port " + port);
})