const fs = require('fs');
const path = require('path');
const ip = require('ip');


// Log dosyasının yolu
const authLogPath = path.join(__dirname, '../logs', 'auth.log');

// Eğer logs klasörü yoksa oluştur
if (!fs.existsSync(path.join(__dirname, '../logs'))) {
  fs.mkdirSync(path.join(__dirname, '../logs'));
}

// Middleware fonksiyonu
function loggedIn(userId) {
  const clientIP = ip.address();
  let logMessage = `${new Date().toLocaleDateString('tr-TR', {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false, // 24 saat formatı
    timeZone: 'Europe/Istanbul' // Türkiye saat dilimi
  })}\t${clientIP}\t ${userId} logged in`

  fs.appendFile(authLogPath, logMessage, (err) => {
    if (err) {
      console.error('Log yazılırken hata oluştu:', err);
    }
  });


}

function loggedOut(userId) {
    const clientIP = ip.address();
    let logMessage = `${new Date().toLocaleDateString('tr-TR', {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false, // 24 saat formatı
      timeZone: 'Europe/Istanbul' // Türkiye saat dilimi
    })}\t${clientIP}\t ${userId} logged out`
  
    fs.appendFile(authLogPath, logMessage, (err) => {
      if (err) {
        console.error('Log yazılırken hata oluştu:', err);
      }
    });
  
  
  }





module.exports = {loggedIn,loggedOut};
