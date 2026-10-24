/**
 * CineVerse - خادم محلي مدمج وخفيف جداً (Zero Dependencies)
 * يعمل تلقائياً باستخدام وحدات Node.js الأساسية
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 4000;
const PUBLIC_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const isHead = req.method === 'HEAD';

  // تنظيف المسار وإزالة معلمات الاستعلام
  let safePath;
  try {
    safePath = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    safePath = req.url.split('?')[0];
  }

  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  let filePath = path.join(PUBLIC_DIR, safePath);

  // منع الوصول خارج المجلد (Directory Traversal Prevention)
  const rel = path.relative(PUBLIC_DIR, filePath);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // محاولة إضافة .html تلقائياً للمسارات النظيفة
      if (!path.extname(filePath)) {
        const htmlPath = filePath + '.html';
        if (fs.existsSync(htmlPath)) {
          filePath = htmlPath;
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('<h1>404 - الصفحة غير موجودة</h1>');
          return;
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - الملف غير موجود</h1>');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    if (isHead) {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

// استخراج عنوان IP للشبكة المحلية للمشاركة عبر أجهزة الموبايل والتابلت
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

server.listen(PORT, () => {
  const localIp = getLocalIp();
  console.log(`\n======================================================`);
  console.log(`🍿 CineVerse - تم تشغيل خادم موقع الأفلام بنجاح!`);
  console.log(`======================================================`);
  console.log(`💻 الرابط المحلي:  http://localhost:${PORT}`);
  console.log(`📱 رابط الشبكة:    http://${localIp}:${PORT}`);
  console.log(`======================================================\n`);
});
