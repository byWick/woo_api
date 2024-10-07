const fs = require('fs');
const path = require('path');
const ip = require('ip');


// Log dosyasının yolu
const errorLogPath = path.join(__dirname, '../logs', 'error.log');

// Eğer logs klasörü yoksa oluştur
if (!fs.existsSync(path.join(__dirname, '../logs'))) {
  fs.mkdirSync(path.join(__dirname, '../logs'));
}

// Middleware fonksiyonu
function logToError(message) {
  const clientIP = ip.address();
  let logMessage = `${new Date().toLocaleDateString('tr-TR', {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false, // 24 saat formatı
    timeZone: 'Europe/Istanbul' // Türkiye saat dilimi
  })}\t${clientIP}\t ${message}\n`

  fs.appendFile(errorLogPath, logMessage, (err) => {
    if (err) {
      console.error('Log yazılırken hata oluştu:', err);
    }
  });


}

module.exports = {logToError};
