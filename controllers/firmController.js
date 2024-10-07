const db = require('../db');

// Wrapping the db query in a promise
const queryAsync = (query, values) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


const getMyFirm = async (req,res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenRaw = await queryAsync("SELECT * FROM auth_logs WHERE vToken = ? ",[token]);
    if(tokenRaw.length > 0){
        const firmId = tokenRaw[0].vFirmId;
        const firmInfoRaw = await queryAsync("SELECT * FROM firms WHERE id = ? ",[firmId]);
        const storesRaw = await queryAsync("SELECT * FROM stores WHERE vFirmId = ? ",[firmId]);
        const storeObj = []
        for (let store of storesRaw){
            storeObj.push({name:store.vStrName,key:store.vApiKey,secret:store.vApiSecret})
        }
        let firmObject = {
            status:200,
            username:firmInfoRaw[0].vUname,
            email:firmInfoRaw[0].vEmail,
            address:firmInfoRaw[0].vAddress,
            stores:storeObj
            
        }
        res.json(firmObject);
    }else{
        res.json({status:404,message:'firm not found'});
    }

}



module.exports = {
    getMyFirm
}