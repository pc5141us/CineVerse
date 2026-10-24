/**
 * CineVerse - كود لوحة تحكم وإدارة الأفلام (Admin Management Panel)
 */

document.addEventListener("DOMContentLoaded", () => {
  const el = {
    addMovieForm: document.getElementById("addMovieForm"),
    moviesAdminTableBody: document.getElementById("moviesAdminTableBody"),
    totalMoviesBadge: document.getElementById("totalMoviesBadge"),
    resetDefaultBtn: document.getElementById("resetDefaultBtn"),
    exportJsonBtn: document.getElementById("exportJsonBtn"),
    importJsonInput: document.getElementById("importJsonInput"),
    toastContainer: document.getElementById("toastContainer")
  };

  renderAdminTable();

  // إضافة فيلم جديد
  if (el.addMovieForm) {
    el.addMovieForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("movieTitle").value.trim();
      const titleAr = document.getElementById("movieTitleAr").value.trim();
      const year = Number(document.getElementById("movieYear").value) || new Date().getFullYear();
      const duration = document.getElementById("movieDuration").value.trim() || "2h 10m";
      const rating = Number(document.getElementById("movieRating").value) || 8.0;
      const quality = document.getElementById("movieQuality").value || "4K UHD";
      const genresInput = document.getElementById("movieGenres").value.trim();
      const genres = genresInput ? genresInput.split(",").map(g => g.trim()) : ["أكشن", "إثارة"];
      const poster = document.getElementById("moviePoster").value.trim() || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";
      const backdrop = document.getElementById("movieBackdrop").value.trim() || poster;
      const story = document.getElementById("movieStory").value.trim() || "قصة الفيلم المشوقة والمليئة بالأحداث والمغامرات المثيرة.";
      const trailerId = document.getElementById("movieTrailer").value.trim() || "Way9Dexny3w";
      const server1 = document.getElementById("movieServer1").value.trim();
      const download4k = document.getElementById("movieDownload4k").value.trim() || "#";

      const newMovie = {
        id: "movie-" + Date.now(),
        title,
        titleAr: titleAr || title,
        year,
        duration,
        rating,
        quality,
        genres,
        poster,
        backdrop,
        story,
        trailerYoutubeId: trailerId,
        isFeatured: false,
        isTrending: true,
        servers: [
          { name: "سيرفر VIP السريع", type: "stream", url: server1 || `https://vidsrc.to/embed/movie/${Date.now()}` },
          { name: "التريلر الرسمي 4K", type: "trailer", url: `https://www.youtube.com/embed/${trailerId}?autoplay=1` }
        ],
        downloads: [
          {
            quality: quality,
            size: "2.8 GB",
            codec: "x264/x265",
            links: [
              { name: "سيرفر مباشر", url: download4k },
              { name: "Mega.nz", url: download4k }
            ]
          }
        ]
      };

      window.MovieDB.addMovie(newMovie);
      el.addMovieForm.reset();
      showToast("تمت إضافة الفيلم بنجاح إلى قاعدة البيانات! 🎉");
      renderAdminTable();
    });
  }

  // إعادة التعيين للأفلام الافتراضية
  if (el.resetDefaultBtn) {
    el.resetDefaultBtn.addEventListener("click", () => {
      if (confirm("هل أنت متأكد من رغبتك في استعادة قائمة الأفلام الافتراضية؟")) {
        window.MovieDB.resetToDefaults();
        renderAdminTable();
        showToast("تمت استعادة الأفلام الافتراضية بنجاح 🔄");
      }
    });
  }

  // تصدير كـ JSON
  if (el.exportJsonBtn) {
    el.exportJsonBtn.addEventListener("click", () => {
      const data = window.MovieDB.getMovies();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cineverse-movies-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("تم تصدير ملف النسخة الاحتياطية بنجاح 💾");
    });
  }

  // استيراد من JSON
  if (el.importJsonInput) {
    el.importJsonInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            window.MovieDB.saveMovies(imported);
            renderAdminTable();
            showToast(`تم استيراد ${imported.length} فيلماً بنجاح! 🚀`);
          } else {
            alert("الملف غير صالح، يجب أن يحتوي على مصفوفة أفلام.");
          }
        } catch (err) {
          alert("حدث خطأ أثناء قراءة ملف JSON: " + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

  function renderAdminTable() {
    if (!el.moviesAdminTableBody) return;
    const movies = window.MovieDB.getMovies();

    if (el.totalMoviesBadge) {
      el.totalMoviesBadge.textContent = `${movies.length} فيلم مسجل`;
    }

    el.moviesAdminTableBody.innerHTML = movies.map((m, idx) => `
      <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.2s;">
        <td style="padding: 0.85rem 1rem; color: var(--text-dim);">${idx + 1}</td>
        <td style="padding: 0.85rem 1rem;">
          <img src="${m.poster}" alt="${m.title}" style="width: 44px; height: 62px; object-fit: cover; border-radius: 6px;">
        </td>
        <td style="padding: 0.85rem 1rem;">
          <div style="font-weight: 700; color: #fff;">${m.titleAr || m.title}</div>
          <div style="font-size: 0.78rem; color: var(--text-dim);">${m.title}</div>
        </td>
        <td style="padding: 0.85rem 1rem; font-weight: 600;">${m.year}</td>
        <td style="padding: 0.85rem 1rem;">
          <span style="color: var(--accent-gold); font-weight: 700;">★ ${m.rating}</span>
        </td>
        <td style="padding: 0.85rem 1rem;">
          <span class="badge-tag quality" style="font-size: 0.72rem;">${m.quality}</span>
        </td>
        <td style="padding: 0.85rem 1rem;">
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <a href="watch.html?id=${m.id}" target="_blank" style="padding: 0.35rem 0.75rem; background: rgba(255,255,255,0.08); border-radius: 6px; font-size: 0.78rem; color: #fff;">
              معاينة
            </a>
            <button type="button" onclick="deleteMovie('${m.id}')" style="padding: 0.35rem 0.75rem; background: rgba(229, 9, 20, 0.2); border: 1px solid rgba(229, 9, 20, 0.4); border-radius: 6px; font-size: 0.78rem; color: #ff6b72;">
              حذف
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  window.deleteMovie = function(id) {
    if (confirm("هل أنت متأكد من حذف هذا الفيلم؟")) {
      window.MovieDB.deleteMovie(id);
      renderAdminTable();
      showToast("تم حذف الفيلم بنجاح 🗑️");
    }
  };

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
