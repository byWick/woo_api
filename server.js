const express = require('express');
const requestLogger = require('./middleware/requestLogger');

const app = express();
const loggers = [requestLogger];

app.use(...loggers);

app.get('/json',(req,res) =>{
    res.json({status:200,message:'welcome!'});
})

app.listen(3001, () =>{
    console.log('server started...')
})