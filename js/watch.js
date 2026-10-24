/**
 * CineVerse - كود صفحة المشاهدة والبث المباشر والتحميل
 */

document.addEventListener("DOMContentLoaded", () => {
  // استخراج معرف الفيلم من الرابط
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  let movie = null;
  if (window.MovieDB) {
    movie = window.MovieDB.getMovieById(movieId);
    if (!movie) {
      // إذا لم يتم العثور على المعرف، اختر أول فيلم كافتراضي
      const all = window.MovieDB.getMovies();
      movie = all[0];
    }
  }

  if (!movie) {
    document.body.innerHTML = `
      <div style="text-align: center; padding: 5rem 1rem;">
        <h2>عذراً، لم يتم العثور على الفيلم المطلوب!</h2>
        <a href="index.html" style="color: var(--accent-gold); text-decoration: underline; margin-top: 1rem; display: inline-block;">العودة للصفحة الرئيسية</a>
      </div>
    `;
    return;
  }

  // تحديث عنوان الصفحة
  document.title = `مشاهدة وتحميل فيلم ${movie.titleAr || movie.title} (${movie.year}) مترجم - CineVerse`;

  // عناصر الصفحة
  const el = {
    streamingIframe: document.getElementById("streamingIframe"),
    nativeVideoPlayer: document.getElementById("nativeVideoPlayer"),
    playerSpinner: document.getElementById("playerSpinner"),
    serversTabsList: document.getElementById("serversTabsList"),
    lightsOffBtn: document.getElementById("lightsOffBtn"),
    lightsOffOverlay: document.getElementById("lightsOffOverlay"),
    reloadServerBtn: document.getElementById("reloadServerBtn"),
    fullscreenBtn: document.getElementById("fullscreenBtn"),
    playerTheaterWrapper: document.getElementById("playerTheaterWrapper"),
    
    // تفاصيل الفيلم
    watchMovieTitle: document.getElementById("watchMovieTitle"),
    watchMovieEnTitle: document.getElementById("watchMovieEnTitle"),
    watchPosterImg: document.getElementById("watchPosterImg"),
    watchMetaBadges: document.getElementById("watchMetaBadges"),
    watchStoryText: document.getElementById("watchStoryText"),
    watchSpecsGrid: document.getElementById("watchSpecsGrid"),
    watchCastRow: document.getElementById("watchCastRow"),
    
    // روابط التحميل
    downloadCardsList: document.getElementById("downloadCardsList"),
    
    // المفضلة والمشاركة
    watchFavBtn: document.getElementById("watchFavBtn"),
    watchShareBtn: document.getElementById("watchShareBtn"),
    
    // التعليقات
    commentForm: document.getElementById("commentForm"),
    commentNameInput: document.getElementById("commentNameInput"),
    commentRatingSelect: document.getElementById("commentRatingSelect"),
    commentTextInput: document.getElementById("commentTextInput"),
    commentsList: document.getElementById("commentsList"),
    
    // أفلام مشابهة
    relatedMoviesGrid: document.getElementById("relatedMoviesGrid"),
    toastContainer: document.getElementById("toastContainer")
  };

  // تهيئة الصفحة
  renderMovieDetails();
  setupPlayer();
  setupDownloads();
  setupComments();
  renderRelatedMovies();
  setupTools();

  // ==========================================================================
  // عرض تفاصيل الفيلم
  // ==========================================================================
  function renderMovieDetails() {
    if (el.watchMovieTitle) el.watchMovieTitle.textContent = movie.titleAr || movie.title;
    if (el.watchMovieEnTitle) el.watchMovieEnTitle.textContent = `${movie.title} (${movie.year})`;
    if (el.watchPosterImg) {
      el.watchPosterImg.src = movie.poster;
      el.watchPosterImg.alt = movie.title;
    }
    if (el.watchStoryText) el.watchStoryText.textContent = movie.story;

    // البادجات
    if (el.watchMetaBadges) {
      el.watchMetaBadges.innerHTML = `
        <span class="badge-tag quality">${movie.quality}</span>
        <span class="badge-tag rating">★ ${movie.rating} IMDb (${movie.votes || 'تقييمات'})</span>
        <span class="badge-tag year">${movie.year}</span>
        <span class="badge-tag age">${movie.ageRating || '+13'}</span>
        <span class="badge-tag">${movie.duration}</span>
        ${(movie.genres || []).map(g => `<span class="badge-tag">${g}</span>`).join('')}
      `;
    }

    // المواصفات الفنية
    if (el.watchSpecsGrid) {
      el.watchSpecsGrid.innerHTML = `
        <div class="spec-item">
          <span class="spec-label">المخرج:</span>
          <span class="spec-val">${movie.director || 'غير محدد'}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">الدولة:</span>
          <span class="spec-val">${movie.country || 'الولايات المتحدة'}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">اللغة والترجمة:</span>
          <span class="spec-val">${movie.language || 'الإنجليزية (مترجم)'}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">الدقة الأصلية:</span>
          <span class="spec-val">${movie.resolution || '2160p 4K UHD'}</span>
        </div>
      `;
    }

    // الممثلون
    if (el.watchCastRow && movie.cast) {
      el.watchCastRow.innerHTML = movie.cast.map(c => `
        <div class="cast-card">
          <img class="cast-img" src="${c.img || 'https://via.placeholder.com/100x100?text=Actor'}" alt="${c.name}" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'">
          <div class="cast-name">${c.name}</div>
          <div class="cast-role">${c.role}</div>
        </div>
      `).join('');
    }

    // زر المفضلة
    if (el.watchFavBtn) {
      const isFav = window.MovieDB.isInWatchlist(movie.id);
      updateFavButtonState(isFav);
      el.watchFavBtn.addEventListener("click", () => {
        const added = window.MovieDB.toggleWatchlist(movie.id);
        updateFavButtonState(added);
        showToast(added ? "تمت إضافة الفيلم إلى مفضلتك بنجاح ❤️" : "تمت إزالة الفيلم من مفضلتك");
      });
    }

    // زر المشاركة
    if (el.watchShareBtn) {
      el.watchShareBtn.addEventListener("click", () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          showToast("تم نسخ رابط الفيلم بنجاح! يمكنك مشاركته الآن 🔗");
        } else {
          showToast("رابط الفيلم: " + window.location.href);
        }
      });
    }
  }

  function updateFavButtonState(isFav) {
    if (!el.watchFavBtn) return;
    el.watchFavBtn.classList.toggle("primary", isFav);
    el.watchFavBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      <span>${isFav ? 'في قائمتك المفضلة' : 'إضافة للمفضلة'}</span>
    `;
  }

  // ==========================================================================
  // إعداد مشغل الفيديو وسيرفرات البث
  // ==========================================================================
  function setupPlayer() {
    let servers = [...(movie.servers || [])];

    // التأكد من توفر سيرفر نقي رسمي محمي من الإعلانات في البداية
    const hasCleanServer = servers.some(s => s.tag && s.tag.includes('إعلانات'));
    if (!hasCleanServer) {
      servers.unshift({
        name: "سيرفر البث النقي VIP (بدون إعلانات)",
        type: "trailer-clean",
        url: `https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`,
        tag: "نقي 100%"
      });
    }

    if (!el.serversTabsList) return;
    el.serversTabsList.innerHTML = "";

    servers.forEach((srv, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `server-tab-btn ${index === 0 ? "active" : ""}`;
      btn.innerHTML = `
        <span class="server-status-dot"></span>
        <span>${srv.name}</span>
        ${srv.tag ? `<small style="opacity: 0.85; font-size: 0.72rem; margin-right: 4px; color: var(--accent-gold);">(${srv.tag})</small>` : ''}
      `;

      btn.addEventListener("click", () => {
        el.serversTabsList.querySelectorAll(".server-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        switchServer(srv);
      });

      el.serversTabsList.appendChild(btn);
    });

    // تشغيل السيرفر الأول افتراضياً
    if (servers.length > 0) {
      switchServer(servers[0]);
    }
  }

  function switchServer(srv) {
    let url = typeof srv === "string" ? srv : srv.url;
    const type = typeof srv === "object" ? srv.type : "stream";

    // تنظيف روابط اليوتيوب لاستخدام خادم يوتيوب الخالي من التتبع والإعلانات
    if (url.includes("youtube.com/embed/")) {
      const vidId = url.split("/embed/")[1].split("?")[0];
      url = `https://www.youtube-nocookie.com/embed/${vidId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`;
    }

    // إذا كان مشغل فيديو مباشر MP4 / Native
    if (type === "native" || url.endsWith(".mp4") || url.endsWith(".webm")) {
      if (el.streamingIframe) {
        el.streamingIframe.style.display = "none";
        el.streamingIframe.src = "";
      }
      if (el.nativeVideoPlayer) {
        el.nativeVideoPlayer.style.display = "block";
        el.nativeVideoPlayer.src = url;
        el.nativeVideoPlayer.play().catch(() => {});
      }
      if (el.playerSpinner) {
        el.playerSpinner.style.opacity = "0";
        el.playerSpinner.style.pointerEvents = "none";
      }
      return;
    }

    // المشغل المحمي بخاصية Sandbox لحجب النوافذ المنبثقة والإعلانات
    if (el.nativeVideoPlayer) {
      el.nativeVideoPlayer.pause();
      el.nativeVideoPlayer.style.display = "none";
      el.nativeVideoPlayer.src = "";
    }

    if (!el.streamingIframe) return;
    el.streamingIframe.style.display = "block";
    el.streamingIframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-presentation");
    el.streamingIframe.setAttribute("referrerpolicy", "no-referrer");

    if (el.playerSpinner) {
      el.playerSpinner.style.opacity = "1";
      el.playerSpinner.style.pointerEvents = "auto";
    }

    el.streamingIframe.src = url;

    el.streamingIframe.onload = () => {
      setTimeout(() => {
        if (el.playerSpinner) {
          el.playerSpinner.style.opacity = "0";
          el.playerSpinner.style.pointerEvents = "none";
        }
      }, 500);
    };
  }

  // ==========================================================================
  // أدوات المشغل (إطفاء الأنوار، إعادة التحميل، ملء الشاشة)
  // ==========================================================================
  function setupTools() {
    // وضع إطفاء الأنوار
    if (el.lightsOffBtn) {
      el.lightsOffBtn.addEventListener("click", toggleLights);
    }
    if (el.lightsOffOverlay) {
      el.lightsOffOverlay.addEventListener("click", toggleLights);
    }

    // إعادة تحميل السيرفر
    if (el.reloadServerBtn) {
      el.reloadServerBtn.addEventListener("click", () => {
        if (el.streamingIframe) {
          const current = el.streamingIframe.src;
          el.streamingIframe.src = "";
          setTimeout(() => switchServer(current), 150);
          showToast("جاري إعادة تحميل سيرفر المشاهدة...");
        }
      });
    }

    // ملء الشاشة
    if (el.fullscreenBtn && el.playerTheaterWrapper) {
      el.fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          if (el.playerTheaterWrapper.requestFullscreen) {
            el.playerTheaterWrapper.requestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }
  }

  function toggleLights() {
    document.body.classList.toggle("cinema-lights-off");
    const isOff = document.body.classList.contains("cinema-lights-off");
    if (el.lightsOffBtn) {
      el.lightsOffBtn.innerHTML = isOff ? `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        تشغيل الأنوار
      ` : `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        إطفاء الأنوار
      `;
    }
  }

  // ==========================================================================
  // إعداد قسم التحميل المباشر
  // ==========================================================================
  function setupDownloads() {
    if (!el.downloadCardsList) return;
    const downloads = movie.downloads || [
      {
        quality: "1080p Full HD BluRay",
        size: "2.5 GB",
        codec: "x264 Hi10P",
        links: [
          { name: "Mega.nz", url: "#" },
          { name: "Google Drive", url: "#" },
          { name: "MediaFire", url: "#" }
        ]
      }
    ];

    el.downloadCardsList.innerHTML = downloads.map(tier => `
      <div class="download-tier-card">
        <div class="download-tier-info">
          <div class="tier-quality-badge">${tier.quality}</div>
          <div class="tier-specs">
            <span class="tier-size">الحجم: ${tier.size}</span>
            <span class="tier-codec">${tier.codec || 'x265 HEVC'} • ${tier.audio || 'Dolby Audio 5.1'}</span>
          </div>
        </div>
        <div class="tier-buttons-row">
          ${tier.links.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn-download-link" onclick="handleDownloadClick(event, '${movie.title}', '${tier.quality}', '${link.name}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>${link.name}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  window.handleDownloadClick = function(event, title, quality, host) {
    showToast(`جاري فتح رابط التحميل المباشر لـ ${title} [${quality}] عبر سيرفر ${host} ⚡`);
  };

  // ==========================================================================
  // إعداد نظام التعليقات والتقييمات
  // ==========================================================================
  function setupComments() {
    renderCommentsList();

    if (el.commentForm) {
      el.commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const author = el.commentNameInput ? el.commentNameInput.value.trim() : "";
        const rating = el.commentRatingSelect ? el.commentRatingSelect.value : 10;
        const text = el.commentTextInput ? el.commentTextInput.value.trim() : "";

        if (!text) {
          showToast("الرجاء كتابة تعليقك أو رأيك في الفيلم!");
          return;
        }

        window.MovieDB.addComment(movie.id, author, rating, text);
        el.commentTextInput.value = "";
        showToast("شكراً لمشاركتك! تم نشر تقييمك ومراجعتك للفيلم 🌟");
        renderCommentsList();
      });
    }
  }

  function renderCommentsList() {
    if (!el.commentsList) return;
    const comments = window.MovieDB.getComments(movie.id);

    if (comments.length === 0) {
      el.commentsList.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-dim); font-size: 0.9rem;">
          لا توجد مراجعات أو تعليقات بعد لهذا الفيلم. كن أول من يشارك برأيه!
        </div>
      `;
      return;
    }

    el.commentsList.innerHTML = comments.map(c => `
      <div class="comment-card">
        <div class="comment-top">
          <span class="comment-author">👤 ${c.author}</span>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="comment-rating">★ ${c.rating}/10</span>
            <span class="comment-date">${c.date}</span>
          </div>
        </div>
        <p class="comment-body">${c.text}</p>
      </div>
    `).join('');
  }

  // ==========================================================================
  // أفلام مشابهة ومقترحة (Related Movies)
  // ==========================================================================
  function renderRelatedMovies() {
    if (!el.relatedMoviesGrid) return;
    const all = window.MovieDB.getMovies();
    // استبعاد الفيلم الحالي واختيار أفلام من نفس التصنيف أو الأحدث
    const related = all.filter(m => m.id !== movie.id).slice(0, 4);

    el.relatedMoviesGrid.innerHTML = related.map(m => `
      <div class="movie-card">
        <div class="movie-poster-box">
          <img class="movie-poster-img" src="${m.poster}" alt="${m.title}" loading="lazy">
          <div class="floating-badges">
            <span class="poster-badge rating">★ ${m.rating}</span>
            <span class="poster-badge quality">${m.quality}</span>
          </div>
          <div class="poster-hover-overlay">
            <a href="watch.html?id=${m.id}" class="quick-play-btn" title="مشاهدة وتحميل">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </a>
          </div>
        </div>
        <div class="movie-card-info">
          <a href="watch.html?id=${m.id}">
            <h3 class="movie-card-title">${m.titleAr || m.title}</h3>
            <div class="movie-card-en-title">${m.title}</div>
          </a>
          <div class="movie-card-meta">
            <span>${m.year}</span>
            <span>${(m.genres || [])[0] || 'أكشن'}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // إشعار Toast سريع
  function showToast(message) {
    if (!el.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
      <span>${message}</span>
    `;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(15px)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
});
