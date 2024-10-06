const agent = require('useragent');
const db = require('../db');
const ip = require('ip');
const errorLoggerService = require('./errorLogger');
const authLoggerService = require('./authLogger');


const loginLogger = (userId,token) => {
    const browser = agent.browser;
    const platform = agent.platform;
    const ip_adr = ip.address();
    const loginTs = Date.now();

    db.query("INSERT INTO auth_logs (vFirmId,vLoginTime,vToken,vBrowser,vPlatform,vIp_Adress) VALUES(?,?,?,?,?,?)",[userId,loginTs,token,browser,platform,ip_adr], (err,result) => {
        if(err){
            errorLoggerService.errorLogger(err.message)
        }else{
            authLoggerService.loggedIn(userId)
        }
    });
}


module.exports = {
    loginLogger
}