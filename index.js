const env = require("dotenv").config();//? Init environment
const express = require('express');
//? Init express
const app = express();
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const productsRouter = require('./routes/products.route');
//? parse requests of content-type: application/json
//? parses incoming requests with JSON payloads
app.use(express.json());
//? enabling cors for all requests by using cors middleware
app.use(cors());
//? Enable pre-flight
app.options("*", cors());

const PORT = process.env.PORT || 3000;

app.use(`/api/`, productsRouter);

//? 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

//? Error middleware
app.use(errorMiddleware);

//? starting the server
app.listen(PORT, () => {
    console.log(`🚀 server is running at port no ${PORT}`);
})