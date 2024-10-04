const fs = require('fs').promises;
const path = require('path');

// Log dosyasının yolu
const requestLogPath = path.join(__dirname, '../logs', 'requests.log');

// Eğer logs klasörü yoksa oluştur
(async () => {
  if (!await fs.access(path.join(__dirname, '../logs')).then(() => true).catch(() => false)) {
    await fs.mkdir(path.join(__dirname, '../logs'));
  }
})();

// Asenkron loglama fonksiyonu
async function logToFile(filePath, logMessage) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `${timestamp} - ${logMessage}\n`;
  try {
    await fs.appendFile(filePath, formattedMessage);
  } catch (err) {
    console.error('Log yazılırken hata oluştu:', err);
  }
}

// Request logger metodu (middleware)
async function requestLogger(req, res, next) {
  const logMessage = `${req.method} ${req.url}`;
  await logToFile(requestLogPath, logMessage);
  next(); // Bir sonraki middleware'e geç
}

module.exports = { requestLogger };
