/**
 * CineVerse - كود الصفحة الرئيسية وعرض الأفلام والفلترة والبحث والمفضلة
 */

document.addEventListener("DOMContentLoaded", () => {
  // الحالة العامة للتطبيق
  const state = {
    allMovies: [],
    filteredMovies: [],
    selectedGenre: "الكل",
    selectedYear: "الكل",
    selectedQuality: "الكل",
    sortBy: "latest",
    searchQuery: "",
    currentHeroIndex: 0,
    heroTimer: null,
    showingWatchlistOnly: false
  };

  // عناصر واجهة المستخدم
  const el = {
    heroSlider: document.getElementById("heroSlider"),
    sliderDots: document.getElementById("sliderDots"),
    genrePills: document.getElementById("genrePills"),
    moviesGrid: document.getElementById("moviesGrid"),
    moviesCount: document.getElementById("moviesCount"),
    sortSelect: document.getElementById("sortSelect"),
    yearSelect: document.getElementById("yearSelect"),
    qualitySelect: document.getElementById("qualitySelect"),
    searchInput: document.getElementById("searchInput"),
    searchClearBtn: document.getElementById("searchClearBtn"),
    searchResultsDropdown: document.getElementById("searchResultsDropdown"),
    watchlistCountBadge: document.getElementById("watchlistCountBadge"),
    watchlistNavBtn: document.getElementById("watchlistNavBtn"),
    trailerModal: document.getElementById("trailerModal"),
    trailerFrame: document.getElementById("trailerFrame"),
    trailerTitle: document.getElementById("trailerTitle"),
    modalCloseBtn: document.getElementById("modalCloseBtn"),
    toastContainer: document.getElementById("toastContainer")
  };

  // تهيئة التطبيق
  init();

  function init() {
    loadMovies();
    setupHeroSlider();
    setupGenrePills();
    setupFilterSelects();
    setupSearch();
    setupWatchlist();
    setupModals();
    updateWatchlistBadge();
    applyFilters();
  }

  // تحميل الأفلام من MovieDB
  function loadMovies() {
    state.allMovies = window.MovieDB ? window.MovieDB.getMovies() : [];
    state.filteredMovies = [...state.allMovies];
  }

  // ==========================================================================
  // إعداد البانر الرئيسي السينمائي (Hero Banner Slider)
  // ==========================================================================
  function setupHeroSlider() {
    if (!el.heroSlider) return;
    const featuredMovies = state.allMovies.filter(m => m.isFeatured);
    const moviesToShow = featuredMovies.length > 0 ? featuredMovies : state.allMovies.slice(0, 4);

    el.heroSlider.innerHTML = "";
    el.sliderDots.innerHTML = "";

    moviesToShow.forEach((movie, idx) => {
      // شريحة السلايدر
      const slide = document.createElement("div");
      slide.className = `hero-slide ${idx === 0 ? "active" : ""}`;
      slide.innerHTML = `
        <img class="hero-backdrop-img" src="${movie.backdrop || movie.poster}" alt="${movie.title}" loading="${idx === 0 ? 'eager' : 'lazy'}">
        <div class="hero-gradient-overlay"></div>
        <div class="hero-content">
          <div class="hero-info-box">
            <div class="hero-badges-row">
              <span class="badge-tag quality">${movie.quality}</span>
              <span class="badge-tag rating">★ ${movie.rating} IMDb</span>
              <span class="badge-tag year">${movie.year}</span>
              <span class="badge-tag age">${movie.ageRating || '+13'}</span>
              <span class="badge-tag">${movie.duration}</span>
            </div>
            <h1 class="hero-title">${movie.titleAr || movie.title}</h1>
            <div class="hero-title-en">${movie.title} • ${movie.director ? movie.director.split('(')[0] : ''}</div>
            <p class="hero-story">${movie.story}</p>
            <div class="hero-actions">
              <a href="watch.html?id=${movie.id}" class="btn-hero play">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                مشاهدة وتحميل الآن
              </a>
              ${movie.trailerYoutubeId ? `
                <button type="button" class="btn-hero trailer" data-trailer-id="${movie.trailerYoutubeId}" data-title="${movie.titleAr || movie.title}">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                  الإعلان الترويجي
                </button>
              ` : ''}
              <button type="button" class="btn-hero fav ${window.MovieDB.isInWatchlist(movie.id) ? 'active' : ''}" data-movie-id="${movie.id}" title="إضافة لقائمتي">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="${window.MovieDB.isInWatchlist(movie.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
      el.heroSlider.appendChild(slide);

      // نقاط التنقل
      const dot = document.createElement("div");
      dot.className = `slider-dot ${idx === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToHeroSlide(idx));
      el.sliderDots.appendChild(dot);
    });

    // أحداث أزرار التريلر والمفضلة في الهيرو
    el.heroSlider.querySelectorAll(".btn-hero.trailer").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const trailerId = btn.getAttribute("data-trailer-id");
        const title = btn.getAttribute("data-title");
        openTrailerModal(trailerId, title);
      });
    });

    el.heroSlider.querySelectorAll(".btn-hero.fav").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = btn.getAttribute("data-movie-id");
        const isAdded = window.MovieDB.toggleWatchlist(id);
        btn.classList.toggle("active", isAdded);
        const svg = btn.querySelector("svg");
        svg.setAttribute("fill", isAdded ? "currentColor" : "none");
        updateWatchlistBadge();
        showToast(isAdded ? "تمت إضافة الفيلم إلى قائمتك المفضلة بنجاح ❤️" : "تمت إزالة الفيلم من قائمتك");
      });
    });

    startHeroAutoPlay(moviesToShow.length);
  }

  function goToHeroSlide(index) {
    const slides = el.heroSlider.querySelectorAll(".hero-slide");
    const dots = el.sliderDots.querySelectorAll(".slider-dot");
    if (slides.length === 0) return;

    state.currentHeroIndex = index;
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function startHeroAutoPlay(totalSlides) {
    if (state.heroTimer) clearInterval(state.heroTimer);
    state.heroTimer = setInterval(() => {
      const nextIndex = (state.currentHeroIndex + 1) % totalSlides;
      goToHeroSlide(nextIndex);
    }, 7000);
  }

  // ==========================================================================
  // إعداد التصنيفات (Genres)
  // ==========================================================================
  function setupGenrePills() {
    if (!el.genrePills) return;
    el.genrePills.innerHTML = "";
    const genres = window.MOVIE_GENRES || ["الكل", "أكشن", "خيال علمي", "دراما", "رعب"];

    genres.forEach(genre => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = `genre-pill ${state.selectedGenre === genre ? "active" : ""}`;
      pill.textContent = genre;
      pill.addEventListener("click", () => {
        state.selectedGenre = genre;
        state.showingWatchlistOnly = false;
        el.genrePills.querySelectorAll(".genre-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        applyFilters();
      });
      el.genrePills.appendChild(pill);
    });
  }

  // ==========================================================================
  // إعداد الفلاتر (سنة، جودة، ترتيب)
  // ==========================================================================
  function setupFilterSelects() {
    if (el.sortSelect) {
      el.sortSelect.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        applyFilters();
      });
    }

    if (el.yearSelect) {
      // ملء خيارات الأعوام ديناميكياً
      const years = [...new Set(state.allMovies.map(m => m.year))].sort((a, b) => b - a);
      years.forEach(y => {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = `سنة ${y}`;
        el.yearSelect.appendChild(opt);
      });

      el.yearSelect.addEventListener("change", (e) => {
        state.selectedYear = e.target.value;
        applyFilters();
      });
    }

    if (el.qualitySelect) {
      el.qualitySelect.addEventListener("change", (e) => {
        state.selectedQuality = e.target.value;
        applyFilters();
      });
    }
  }

  // ==========================================================================
  // إعداد البحث المباشر السريع (Live Instant Search)
  // ==========================================================================
  function setupSearch() {
    if (!el.searchInput) return;

    let debounceTimer;
    el.searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim().toLowerCase();
      state.searchQuery = query;

      if (el.searchClearBtn) {
        el.searchClearBtn.style.display = query ? "block" : "none";
      }

      debounceTimer = setTimeout(() => {
        applyFilters();
        renderSearchDropdown(query);
      }, 200);
    });

    if (el.searchClearBtn) {
      el.searchClearBtn.addEventListener("click", () => {
        el.searchInput.value = "";
        state.searchQuery = "";
        el.searchClearBtn.style.display = "none";
        if (el.searchResultsDropdown) el.searchResultsDropdown.style.display = "none";
        applyFilters();
      });
    }

    // إخفاء القائمة المنسدلة عند النقر بالخارج
    document.addEventListener("click", (e) => {
      if (el.searchResultsDropdown && !e.target.closest(".search-wrapper")) {
        el.searchResultsDropdown.style.display = "none";
      }
    });
  }

  function renderSearchDropdown(query) {
    if (!el.searchResultsDropdown) return;
    if (!query || query.length < 2) {
      el.searchResultsDropdown.style.display = "none";
      return;
    }

    const matches = state.allMovies.filter(m => 
      m.title.toLowerCase().includes(query) ||
      (m.titleAr && m.titleAr.includes(query)) ||
      (m.genres && m.genres.some(g => g.includes(query)))
    ).slice(0, 5);

    if (matches.length === 0) {
      el.searchResultsDropdown.innerHTML = `
        <div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
          لا توجد نتائج مطابقة لـ "${query}"
        </div>
      `;
      el.searchResultsDropdown.style.display = "block";
      return;
    }

    el.searchResultsDropdown.innerHTML = matches.map(movie => `
      <a href="watch.html?id=${movie.id}" class="search-result-item">
        <img class="search-result-thumb" src="${movie.poster}" alt="${movie.title}">
        <div class="search-result-info">
          <div class="search-result-title">${movie.titleAr || movie.title}</div>
          <div class="search-result-meta">
            <span style="color: var(--accent-gold);">★ ${movie.rating}</span>
            <span>•</span>
            <span>${movie.year}</span>
            <span>•</span>
            <span>${movie.quality}</span>
          </div>
        </div>
      </a>
    `).join("");

    el.searchResultsDropdown.style.display = "block";
  }

  // ==========================================================================
  // تطبيق التصفية والفرز (Filters & Sorting Logic)
  // ==========================================================================
  function applyFilters() {
    let result = [...state.allMovies];

    // فلترة المفضلة
    if (state.showingWatchlistOnly) {
      const watchlistIds = window.MovieDB.getWatchlist();
      result = result.filter(m => watchlistIds.includes(m.id));
    }

    // فلترة التصنيف
    if (state.selectedGenre && state.selectedGenre !== "الكل") {
      result = result.filter(m => m.genres && m.genres.includes(state.selectedGenre));
    }

    // فلترة السنة
    if (state.selectedYear && state.selectedYear !== "الكل") {
      result = result.filter(m => String(m.year) === String(state.selectedYear));
    }

    // فلترة الجودة
    if (state.selectedQuality && state.selectedQuality !== "الكل") {
      result = result.filter(m => m.quality && m.quality.includes(state.selectedQuality));
    }

    // البحث النصي
    if (state.searchQuery) {
      const q = state.searchQuery;
      result = result.filter(m => 
        m.title.toLowerCase().includes(q) ||
        (m.titleAr && m.titleAr.includes(q)) ||
        (m.story && m.story.includes(q)) ||
        (m.genres && m.genres.some(g => g.includes(q)))
      );
    }

    // الفرز والترتيب
    if (state.sortBy === "latest") {
      result.sort((a, b) => b.year - a.year);
    } else if (state.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    state.filteredMovies = result;
    renderMoviesGrid();
  }

  // ==========================================================================
  // رندر بطاقات الأفلام في الشبكة (Render Movies Grid)
  // ==========================================================================
  function renderMoviesGrid() {
    if (!el.moviesGrid) return;
    el.moviesGrid.innerHTML = "";

    if (el.moviesCount) {
      el.moviesCount.textContent = `${state.filteredMovies.length} فيلم`;
    }

    if (state.filteredMovies.length === 0) {
      el.moviesGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎬</div>
          <h3 class="empty-title">لم يتم العثور على أي أفلام</h3>
          <p class="empty-desc">جرب تغيير معايير البحث أو تصفية الفئات للحصول على نتائج أخرى.</p>
        </div>
      `;
      return;
    }

    state.filteredMovies.forEach(movie => {
      const isFav = window.MovieDB.isInWatchlist(movie.id);
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <div class="movie-poster-box">
          <img class="movie-poster-img" src="${movie.poster}" alt="${movie.title}" loading="lazy">
          
          <div class="floating-badges">
            <span class="poster-badge rating">★ ${movie.rating}</span>
            <span class="poster-badge quality">${movie.quality}</span>
          </div>

          <div class="poster-hover-overlay">
            <a href="watch.html?id=${movie.id}" class="quick-play-btn" title="مشاهدة وتحميل">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </a>
            <div class="quick-action-btns">
              ${movie.trailerYoutubeId ? `
                <button type="button" class="quick-sub-btn card-trailer-btn" data-trailer-id="${movie.trailerYoutubeId}" data-title="${movie.titleAr || movie.title}" title="إعلان الفيلم">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                </button>
              ` : ''}
              <button type="button" class="quick-sub-btn card-fav-btn ${isFav ? 'active' : ''}" data-movie-id="${movie.id}" title="إضافة للمفضلة">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="movie-card-info">
          <a href="watch.html?id=${movie.id}">
            <h3 class="movie-card-title">${movie.titleAr || movie.title}</h3>
            <div class="movie-card-en-title">${movie.title}</div>
          </a>
          <div class="movie-card-meta">
            <div class="movie-genres-tags">
              ${(movie.genres || []).slice(0, 2).map(g => `<span class="movie-genre-badge">${g}</span>`).join('')}
            </div>
            <span>${movie.year}</span>
          </div>
        </div>
      `;

      // أحداث الكرت
      const trailerBtn = card.querySelector(".card-trailer-btn");
      if (trailerBtn) {
        trailerBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          openTrailerModal(trailerBtn.dataset.trailerId, trailerBtn.dataset.title);
        });
      }

      const favBtn = card.querySelector(".card-fav-btn");
      if (favBtn) {
        favBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const movieId = favBtn.dataset.movieId;
          const added = window.MovieDB.toggleWatchlist(movieId);
          favBtn.classList.toggle("active", added);
          const svg = favBtn.querySelector("svg");
          svg.setAttribute("fill", added ? "currentColor" : "none");
          updateWatchlistBadge();
          showToast(added ? "تمت إضافة الفيلم إلى قائمتك المفضلة ❤️" : "تمت إزالة الفيلم من قائمتك");
          if (state.showingWatchlistOnly) applyFilters();
        });
      }

      el.moviesGrid.appendChild(card);
    });
  }

  // ==========================================================================
  // إعداد المفضلة (Watchlist)
  // ==========================================================================
  function setupWatchlist() {
    if (!el.watchlistNavBtn) return;
    el.watchlistNavBtn.addEventListener("click", () => {
      state.showingWatchlistOnly = !state.showingWatchlistOnly;
      el.watchlistNavBtn.classList.toggle("primary", state.showingWatchlistOnly);
      if (state.showingWatchlistOnly) {
        showToast("عرض الأفلام الموجودة في قائمتك المفضلة 🔖");
      }
      applyFilters();
    });
  }

  function updateWatchlistBadge() {
    if (!el.watchlistCountBadge) return;
    const count = window.MovieDB ? window.MovieDB.getWatchlist().length : 0;
    el.watchlistCountBadge.textContent = count;
  }

  // ==========================================================================
  // النوافذ المنبثقة ومشغل التريلر (Modals)
  // ==========================================================================
  function setupModals() {
    if (el.modalCloseBtn) {
      el.modalCloseBtn.addEventListener("click", closeTrailerModal);
    }
    if (el.trailerModal) {
      el.trailerModal.addEventListener("click", (e) => {
        if (e.target === el.trailerModal) closeTrailerModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.trailerModal && el.trailerModal.classList.contains("active")) {
        closeTrailerModal();
      }
    });
  }

  function openTrailerModal(youtubeId, title) {
    if (!el.trailerModal || !el.trailerFrame) return;
    el.trailerTitle.textContent = title ? `إعلان: ${title}` : "الإعلان الترويجي الرسمي";
    el.trailerFrame.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`;
    el.trailerModal.classList.add("active");
  }

  function closeTrailerModal() {
    if (!el.trailerModal || !el.trailerFrame) return;
    el.trailerFrame.src = "";
    el.trailerModal.classList.remove("active");
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
