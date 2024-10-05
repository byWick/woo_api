const jwt = require('jsonwebtoken');
const db = require('../db');

const login = (req,res) => {
    const {username,pass} = req.body
    
    res.json({username,pass});
}


module.exports = {
    login
}