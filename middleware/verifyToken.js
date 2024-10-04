const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

// Token doğrulama
const verifyToken = () => {
    const token = req.headers['Authorization'].split(' ')[1]
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Geçersiz token' });
        }
        // Geçerli token ise, devam et
        next();
    });
}


module.exports = verifyToken