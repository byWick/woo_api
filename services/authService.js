const db = require('../db');
const ip = require('ip');
const errorLoggerService = require('./errorLogger');
const authLoggerService = require('./authLogger');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Wrapping the db query in a promise
const queryAsync = (query, values) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const loginControl = async (browser, platform, username, pass) => {
    try {
        const ip_adr = ip.address();
        const loginTs = Date.now();
        const hashedPass = crypto.createHash('sha256').update(pass).digest('hex');

        // Fetch the user from the database
        const result = await queryAsync("SELECT * FROM firms WHERE vUname = ? AND vPass = ?", [username, hashedPass]);

        if (result.length > 0) {
            if (result[0].vActive == 0){
                return {status:403,message:'firm membership period expired'}
            }
            const userId = result[0].id;
            const token = jwt.sign({ uid: userId }, 'woo_api_secret');

            // Check if the user has any open sessions
            const authLogs = await queryAsync("SELECT * FROM auth_logs WHERE vFirmId = ? AND vLogoutTime IS NULL ORDER BY id DESC", [userId]);

            if (authLogs.length > 0) {
                return { status: 200, message: 'Logged in successfully', token: token };
            } else {
                // Insert a new auth log
                await queryAsync("INSERT INTO auth_logs (vFirmId, vLoginTime, vToken, vBrowser, vPlatform, vIp_Address) VALUES(?,?,?,?,?,?)",
                    [userId, loginTs, token, browser, platform, ip_adr]);

                authLoggerService.loggedIn(userId);

                return { status: 200, message: 'Logged in successfully', token: token };
            }
        } else {
            return { status: 404, message: 'User not found', token: "NULL" };
        }
    } catch (err) {
        errorLoggerService.logToError(err.message);
        return { status: 500, message: 'An error occurred', token: "NULL" };
    }
};


const logoutControl = async(token) => {
    try{
        const result = await queryAsync("SELECT * FROM auth_logs WHERE vToken = ? ", [token]);
        if(result.length > 0 && result[0].vLogoutTime == null){
            let firmId = result[0].vFirmId;
            const lgtime = Date.now();
            await queryAsync("UPDATE auth_logs SET vLogoutTime = ? WHERE vToken = ? ",[lgtime,token]);
            authLoggerService.loggedOut(firmId);
            return {status:200,message:'logged out successfully',ts:lgtime}
        }else{
            return {status:403, message:'not authorized'}
        }
    }catch(err){
        errorLoggerService.logToError(err.message);
        return {status:500,message:'an error occured'}
    }
}

module.exports = {
    loginControl,
    logoutControl
};
