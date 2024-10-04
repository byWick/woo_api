const express = require('express');
require('dotenv').config();
const requestLogger = require('./middleware/requestLogger');
const verifyToken = require('./middleware/verifyToken');

const app = express();
const loggers = [requestLogger];

app.use(...loggers);

app.get('/json',(req,res) =>{
    res.json({status:200,message:'welcome!'});
})

app.listen(3001, () =>{
    console.log('server started...')
})