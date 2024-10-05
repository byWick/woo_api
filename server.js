const express = require('express');
require('dotenv').config();
const router = require('./routes');
const xss = require('xss-clean');

const app = express();
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(router);



app.listen(3001, () =>{
    console.log('server started...')
})