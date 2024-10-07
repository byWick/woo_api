const express = require('express');
require('dotenv').config();
const router = require('./routes');
const xss = require('xss-clean');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(xss());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
app.use(router);



app.listen(3001, () =>{
    //let a = crypto.createHash('sha256').update('hakan').digest('hex');
    console.log('server started...')
    //console.log(a)
})