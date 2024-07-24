const express = require("express");
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter.js');

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/v1', userRouter);

app.listen(port, () => {
    console.log("server running on port " + port);
})