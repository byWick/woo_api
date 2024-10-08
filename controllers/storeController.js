const axios = require('axios');
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


const getProducts = async (req,res) => {
    const {storeName} = req.body
    console.log(req.body)
    if(!storeName) return res.json({status:500,message:'store name required'});
    let storeInfoRaw = await queryAsync("SELECT * FROM stores WHERE vStrName = ? LIMIT 1",[storeName]);
    if(storeInfoRaw.length > 0 ){
        const apiKey = storeInfoRaw[0].vApiKey;
        const apiSecret = storeInfoRaw[0].vApiSecret;
        const baseUrl = storeInfoRaw[0].vUrl + "/wp-json/wc/v3";

        const response = await axios.get(`http://localhost/wordpress/wp-json/wc/v3/orders?consumer_key=ck_874c7e26ee76b70fded70349ddd13a4672a291cb&consumer_secret=cs_94c38d586d3016aaaf0faf7b1c08f0a41bb81ae0`);
        res.json(response);

    }else{
        resç.json({status:404,message:'store not found'});
    }
} 


module.exports = {
    getProducts
}