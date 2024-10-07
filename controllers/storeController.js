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