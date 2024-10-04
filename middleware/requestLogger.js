const fs = require('fs');
const path = require('path');
const ip = require('ip');


// Log dosyasının yolu
const requestLogPath = path.join(__dirname, '../logs', 'requests.log');

// Eğer logs klasörü yoksa oluştur
if (!fs.existsSync(path.join(__dirname, '../logs'))) {
  fs.mkdirSync(path.join(__dirname, '../logs'));
}

// Middleware fonksiyonu
function requestLogger(req, res, next) {
  const clientIP = ip.address();

  // Yanıtın tamamlandığı anda status kodunu almak için 'finish' olayını kullanıyoruz
  res.on('finish', () => {
    const statusCode = res.statusCode;
    const logMessage = `(${statusCode})\t${new Date().toLocaleDateString('tr-TR', {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false, // 24 saat formatı
      timeZone: 'Europe/Istanbul' // Türkiye saat dilimi
    })}\t${req.method}\t${req.url}\t${clientIP}\n`;

    fs.appendFile(requestLogPath, logMessage, (err) => {
      if (err) {
        console.error('Log yazılırken hata oluştu:', err);
      }
    });
  });

  next(); // Bir sonraki middleware'e geç
}

module.exports = requestLogger;
