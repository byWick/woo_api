const jwt = require('jsonwebtoken');
const db = require('../db');
const authService = require('../services/authService');
const useragent = require('useragent');

const login = async (req,res) => {
    const {username,password} = req.body
    const agent = useragent.parse(req.headers['user-agent']);
    const browser = agent.toAgent();
    const platform = agent.toString();
    let result = await authService.loginControl(browser,platform,username,password)
    res.json(result);
}


const logout = async (req,res) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if(!token) return res.json({status:403,message:'not authorized'});
    let result = await authService.logoutControl(token);
    res.json(result) 
} 

module.exports = {
    login,
    logout
}