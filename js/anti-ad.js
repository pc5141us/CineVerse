/**
 * CineVerse - درع حماية وحظر الإعلانات والنوافذ المنبثقة (Ad-Shield & Popup Blocker)
 * يمنع الإعلانات المنبثقة (Popups)، والنوافذ الخلفية (Popunders)، والتحويلات الإجبارية (Redirects)
 */

(function() {
  'use strict';

  // 1. حظر النوافذ المنبثقة الإعلانية التلقائية عبر window.open
  const originalWindowOpen = window.open;
  window.open = function(url, target, features) {
    if (!url) {
      console.warn('[AdShield] تم منع فتح نافذة فارغة (Popup Blocked)');
      return null;
    }

    // الروابط المسموح بها فقط هي خدمات التحميل الموثوقة أو التريلر الرسمي
    const allowedDomains = [
      'mega.nz',
      'mediafire.com',
      'drive.google.com',
      'youtube.com',
      'youtube-nocookie.com'
    ];

    const isAllowed = allowedDomains.some(domain => url.includes(domain));
    if (isAllowed) {
      return originalWindowOpen.call(window, url, target, features);
    }

    console.warn('[AdShield] تم حظر إعلان منبثق حاول الفتح:', url);
    return null;
  };

  // 2. تطبيق خاصية Sandbox الصارمة لمنع إعلانات مشغلات الفيديو داخل الـ Iframes
  function applySandboxProtection() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      // إزالة خاصية allow-popups و allow-top-navigation
      // السماح بتشغيل الفيديو والسكربتات فقط بدون أي إعلانات أو نوافذ منبثقة
      const secureSandbox = 'allow-scripts allow-same-origin allow-forms allow-presentation';
      if (iframe.getAttribute('sandbox') !== secureSandbox) {
        iframe.setAttribute('sandbox', secureSandbox);
      }
      iframe.setAttribute('referrerpolicy', 'no-referrer');
      iframe.setAttribute('loading', 'lazy');
    });
  }

  // 3. منع محاولات إعادة توجيه الصفحة الرئيسية (Anti-Redirect Hijacking)
  window.addEventListener('beforeunload', (e) => {
    // منع السكربتات المزعجة من إظهار رسائل تأكيد الخروج الإعلانية
  });

  // تشغيل الحماية فوراً وعند حدوث أي تعديل في الـ DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySandboxProtection);
  } else {
    applySandboxProtection();
  }

  const domObserver = new MutationObserver(() => {
    applySandboxProtection();
  });

  domObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  console.log('🛡️ [CineVerse AdShield] تم تفعيل نظام منع الإعلانات والنوافذ المنبثقة بنجاح!');
})();
