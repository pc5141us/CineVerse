#!/bin/bash
# CineVerse - تشغيل موقع الأفلام بنقرة واحدة لأجهزة Mac
export PATH="$PATH:/usr/local/bin:/opt/homebrew/bin"
cd "$(dirname "$0")"

echo "======================================================"
echo "🍿 تشغيل موقع الأفلام الأجنبية CineVerse..."
echo "======================================================"

# تشغيل خادم Node.js في الخلفية
node server.js &
SERVER_PID=$!

# الانتظار ثانية واحدة حتى يبدأ السيرفر
sleep 1

# فتح المتصفح تلقائياً
if command -v open > /dev/null; then
  open "http://localhost:4000"
elif command -v xdg-open > /dev/null; then
  xdg-open "http://localhost:4000"
fi

echo "🚀 تم فتح المتصفح على: http://localhost:4000"
echo "اضغط Ctrl+C لإيقاف السيرفر."

# انتظار انتهاء العملية
wait $SERVER_PID
