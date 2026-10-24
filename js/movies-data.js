/**
 * CineVerse - بيانات الأفلام الأجنبية وقاعدة البيانات المحلية
 * يحتوي على قائمة أفلام عالمية مميزة بتفاصيلها وسيرفرات المشاهدة وروابط التحميل
 */

const DEFAULT_MOVIES = [
  {
    id: "dune-2-2024",
    title: "Dune: Part Two",
    titleAr: "كثيب: الجزء الثاني",
    year: 2024,
    duration: "2h 46m",
    rating: 8.5,
    votes: "540,000+",
    quality: "4K UHD",
    resolution: "2160p HDR",
    ageRating: "+13",
    language: "الإنجليزية (مترجم بالكامل للعربية)",
    country: "الولايات المتحدة الأمريكية",
    director: "دينيس فيلنوف (Denis Villeneuve)",
    genres: ["أكشن", "خيال علمي", "مغامرة", "دراما"],
    isFeatured: true,
    isTrending: true,
    isTopRated: true,
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5200SV.jpg",
    story: "يواصل بول أتريدس رحلته الأسطورية رفقة تشاني وشعب الفريمن بينما يسعى للانتقام من المتآمرين الذين دمروا عائلته. وفي مواجهة الاختيار بين حب حياته ومصير الكون بأسره، يجب عليه أن يسعى لمنع مستقبل فظيع لا يستطيع أحد سواه توقعه.",
    storyEn: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future.",
    trailerYoutubeId: "Way9Dexny3w",
    cast: [
      { name: "تيموثي شالاماي", role: "بول أتريدس", img: "https://image.tmdb.org/t/p/w200/BE2sdjpgsa2rNTFa66f7upkaOP.jpg" },
      { name: "زيندايا", role: "تشاني", img: "https://image.tmdb.org/t/p/w200/r3A7ev7QkjLVIRKbFArPkOdOhaP.jpg" },
      { name: "ريبيكا فيرجسون", role: "الليدي جيسيكا", img: "https://image.tmdb.org/t/p/w200/6NRbtwpqN5LBD0P6mfa756vQ24z.jpg" },
      { name: "خافيير بارديم", role: "ستيلغار", img: "https://image.tmdb.org/t/p/w200/g9n3gUeWJ3rB8r8WjYw2e008j9.jpg" },
      { name: "أوستن باتلر", role: "فيد-روثا", img: "https://image.tmdb.org/t/p/w200/2jP1Qv9P325R2p5n5k5r6l.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP السريع (1080p/4K)", type: "stream", url: "https://vidsrc.to/embed/movie/693134", tag: "الأسرع" },
      { name: "سيرفر فائق السرعة بديل (HD)", type: "stream", url: "https://www.2embed.cc/embed/693134", tag: "دقة متعددة" },
      { name: "مشغل سينمائي مباشر (Pro)", type: "stream", url: "https://multiembed.mov/?video_id=693134&tmdb=1", tag: "بدون إعلانات" },
      { name: "الإعلان الرسمي 4K (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/Way9Dexny3w?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر رسمي" }
    ],
    downloads: [
      {
        quality: "4K UHD 2160p HDR",
        size: "6.8 GB",
        codec: "x265 10-bit",
        audio: "Dolby Atmos 7.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#dune2-4k-uhd", icon: "cloud" },
          { name: "Google Drive", url: "https://drive.google.com/#dune2-4k", icon: "drive" },
          { name: "MediaFire", url: "https://mediafire.com/#dune2-2160p", icon: "download" },
          { name: "سيرفر مباشر CDN", url: "https://cdn.cineverse.local/download/dune2-4k.mkv", icon: "zap" }
        ]
      },
      {
        quality: "1080p Full HD BluRay",
        size: "2.8 GB",
        codec: "x264 Hi10P",
        audio: "AC3 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#dune2-1080p", icon: "cloud" },
          { name: "Google Drive", url: "https://drive.google.com/#dune2-1080p", icon: "drive" },
          { name: "MediaFire", url: "https://mediafire.com/#dune2-1080p", icon: "download" },
          { name: "سيرفر مباشر CDN", url: "https://cdn.cineverse.local/download/dune2-1080p.mkv", icon: "zap" }
        ]
      },
      {
        quality: "720p HD Web-DL",
        size: "1.1 GB",
        codec: "x264 Fast",
        audio: "AAC 2.0",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#dune2-720p", icon: "cloud" },
          { name: "MediaFire", url: "https://mediafire.com/#dune2-720p", icon: "download" },
          { name: "سيرفر مباشر CDN", url: "https://cdn.cineverse.local/download/dune2-720p.mp4", icon: "zap" }
        ]
      }
    ]
  },
  {
    id: "oppenheimer-2023",
    title: "Oppenheimer",
    titleAr: "أوبنهايمر",
    year: 2023,
    duration: "3h 00m",
    rating: 8.9,
    votes: "820,000+",
    quality: "4K UHD",
    resolution: "2160p IMAX",
    ageRating: "+16",
    language: "الإنجليزية (مترجم للعربية)",
    country: "الولايات المتحدة الأمريكية / بريطانيا",
    director: "كريستوفر نولان (Christopher Nolan)",
    genres: ["دراما", "سيرة ذاتية", "تاريخ"],
    isFeatured: true,
    isTrending: true,
    isTopRated: true,
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    story: "قصة العالم الفيزيائي الأمريكي جي. روبرت أوبنهايمر، ودوره البارز كمدير لمشروع مانهاتن في مختبر لوس ألاموس السري، حيث قاد جهود تطوير أول قنبلة ذرية غيرت مجرى تاريخ البشرية للأبد، وما تلاها من صراعات أخلاقية وسياسية.",
    storyEn: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    trailerYoutubeId: "uYPbbksJxIg",
    cast: [
      { name: "كيليان مورفي", role: "روبرت أوبنهايمر", img: "https://image.tmdb.org/t/p/w200/3D5rT9q9k9l7o9g6b3e7m.jpg" },
      { name: "إميلي بلانت", role: "كاثرين أوبنهايمر", img: "https://image.tmdb.org/t/p/w200/5qBfN8g9f8h.jpg" },
      { name: "مات ديمون", role: "الجنرال ليزلي غروفز", img: "https://image.tmdb.org/t/p/w200/elSlNgV8xV.jpg" },
      { name: "روبرت داوني جونيور", role: "لويس شتراوس", img: "https://image.tmdb.org/t/p/w200/5qHNjhtjkn.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP المشاهدة (1080p)", type: "stream", url: "https://vidsrc.to/embed/movie/872585", tag: "الموصى به" },
      { name: "سيرفر Ultra Player (سريع)", type: "stream", url: "https://www.2embed.cc/embed/872585", tag: "سريع" },
      { name: "سيرفر بديل مباشر", type: "stream", url: "https://multiembed.mov/?video_id=872585&tmdb=1", tag: "مباشر" },
      { name: "التريلر الرسمي 4K (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/uYPbbksJxIg?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "4K UHD IMAX 2160p",
        size: "7.4 GB",
        codec: "HEVC x265",
        audio: "DTS-HD MA 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#oppenheimer-4k", icon: "cloud" },
          { name: "Google Drive", url: "https://drive.google.com/#oppenheimer-4k", icon: "drive" },
          { name: "MediaFire", url: "https://mediafire.com/#oppenheimer-4k", icon: "download" }
        ]
      },
      {
        quality: "1080p BluRay Full HD",
        size: "3.1 GB",
        codec: "x264",
        audio: "AAC 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#oppenheimer-1080p", icon: "cloud" },
          { name: "Google Drive", url: "https://drive.google.com/#oppenheimer-1080p", icon: "drive" },
          { name: "سيرفر مباشر CDN", url: "https://cdn.cineverse.local/download/oppenheimer-1080p.mkv", icon: "zap" }
        ]
      },
      {
        quality: "720p HD خفيف",
        size: "1.2 GB",
        codec: "x264 Fast",
        audio: "Stereo 2.0",
        links: [
          { name: "MediaFire", url: "https://mediafire.com/#oppenheimer-720p", icon: "download" },
          { name: "Google Drive", url: "https://drive.google.com/#oppenheimer-720p", icon: "drive" }
        ]
      }
    ]
  },
  {
    id: "deadpool-and-wolverine-2024",
    title: "Deadpool & Wolverine",
    titleAr: "ديدبول وولفرين",
    year: 2024,
    duration: "2h 08m",
    rating: 7.8,
    votes: "430,000+",
    quality: "4K UHD",
    resolution: "2160p HDR",
    ageRating: "+18",
    language: "الإنجليزية (مترجم بالعربية)",
    country: "الولايات المتحدة الأمريكية",
    director: "شون ليفي (Shawn Levy)",
    genres: ["أكشن", "كوميديا", "خيال علمي"],
    isFeatured: true,
    isTrending: true,
    isTopRated: false,
    poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    story: "تتعرض حياة وايد ويلسون الهادئة للخطر حين تطلب منه هيئة تباين الوقت (TVA) إنقاذ عالمه، مما يدفعه للبحث عن نسخة من وولفرين ليخوضا معاً مغامرة ملحمية مليئة بالأكشن والضحك عبر الأبعاد الزمنية المتعددة.",
    storyEn: "Deadpool's peaceful existence comes crashing down when the TVA recruits him to safeguard the multiverse alongside Wolverine.",
    trailerYoutubeId: "73_1biulkYk",
    cast: [
      { name: "ريان رينولدز", role: "ديدبول / وايد ويلسون", img: "https://image.tmdb.org/t/p/w200/4YAg5.jpg" },
      { name: "هيو جاكمان", role: "وولفرين / لوغان", img: "https://image.tmdb.org/t/p/w200/5Xp2.jpg" },
      { name: "إيما كورين", role: "كاساندرا نوفا", img: "https://image.tmdb.org/t/p/w200/7Jp3.jpg" },
      { name: "ماثيو ماكفادين", role: "السيد بارادوكس", img: "https://image.tmdb.org/t/p/w200/8Bv9.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP المشاهدة 4K", type: "stream", url: "https://vidsrc.to/embed/movie/533535", tag: "أعلى جودة" },
      { name: "سيرفر بديل سريع", type: "stream", url: "https://www.2embed.cc/embed/533535", tag: "سريع" },
      { name: "سيرفر MultiEmbed", type: "stream", url: "https://multiembed.mov/?video_id=533535&tmdb=1", tag: "مباشر" },
      { name: "التريلر الرسمي (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/73_1biulkYk?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "4K UHD 2160p HDR",
        size: "5.6 GB",
        codec: "x265 10-bit",
        audio: "Dolby Atmos 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#dp-wolv-4k", icon: "cloud" },
          { name: "Google Drive", url: "https://drive.google.com/#dp-wolv-4k", icon: "drive" },
          { name: "MediaFire", url: "https://mediafire.com/#dp-wolv-4k", icon: "download" }
        ]
      },
      {
        quality: "1080p BluRay",
        size: "2.3 GB",
        codec: "x264",
        audio: "AC3 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#dp-wolv-1080p", icon: "cloud" },
          { name: "MediaFire", url: "https://mediafire.com/#dp-wolv-1080p", icon: "download" }
        ]
      },
      {
        quality: "720p HD Web-DL",
        size: "950 MB",
        codec: "x264",
        audio: "AAC 2.0",
        links: [
          { name: "MediaFire", url: "https://mediafire.com/#dp-wolv-720p", icon: "download" }
        ]
      }
    ]
  },
  {
    id: "john-wick-4-2023",
    title: "John Wick: Chapter 4",
    titleAr: "جون ويك: الفصل الرابع",
    year: 2023,
    duration: "2h 49m",
    rating: 7.7,
    votes: "380,000+",
    quality: "4K UHD",
    resolution: "2160p HDR",
    ageRating: "+18",
    language: "الإنجليزية (مترجم للعربية)",
    country: "الولايات المتحدة الأمريكية",
    director: "تشاد ستاهلسكي (Chad Stahelski)",
    genres: ["أكشن", "إثارة", "جريمة"],
    isFeatured: true,
    isTrending: true,
    isTopRated: false,
    poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/7I6VUdPj6tQECNHdviJkUHD2389.jpg",
    story: "يكتشف جون ويك طريقاً لهزيمة المجلس الأعلى (The High Table)، ولكن قبل أن يتمكن من نيل حريته، يجب أن يواجه عدواً جديداً يتمتع بتحالفات قوية في جميع أنحاء العالم وقوى تحول الأصدقاء القدامى إلى أعداء لدودين في باريس ونيويورك وأوساكا.",
    storyEn: "John Wick uncovers a path to defeating The High Table, but must face a new enemy with powerful alliances across the globe.",
    trailerYoutubeId: "qEVUtrk8_B4",
    cast: [
      { name: "كيانو ريفز", role: "جون ويك", img: "https://image.tmdb.org/t/p/w200/4D0PpWM.jpg" },
      { name: "دوني ين", role: "كين (Caine)", img: "https://image.tmdb.org/t/p/w200/5O9n0.jpg" },
      { name: "بيل سكارسغارد", role: "الماركيز دي غرامون", img: "https://image.tmdb.org/t/p/w200/9Vb0P.jpg" },
      { name: "لورنس فيشبورن", role: "باوري كينج", img: "https://image.tmdb.org/t/p/w200/8Nk6.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP السريع 1080p", type: "stream", url: "https://vidsrc.to/embed/movie/603692", tag: "سريع" },
      { name: "سيرفر متعدد الجودات", type: "stream", url: "https://www.2embed.cc/embed/603692", tag: "HD" },
      { name: "التريلر الرسمي (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/qEVUtrk8_B4?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "4K UHD 2160p",
        size: "6.2 GB",
        codec: "x265 HDR",
        audio: "Dolby Atmos",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#jw4-4k", icon: "cloud" },
          { name: "Google Drive", url: "https://drive.google.com/#jw4-4k", icon: "drive" }
        ]
      },
      {
        quality: "1080p BluRay",
        size: "2.7 GB",
        codec: "x264",
        audio: "DTS 5.1",
        links: [
          { name: "MediaFire", url: "https://mediafire.com/#jw4-1080p", icon: "download" },
          { name: "Google Drive", url: "https://drive.google.com/#jw4-1080p", icon: "drive" }
        ]
      }
    ]
  },
  {
    id: "interstellar-2014",
    title: "Interstellar",
    titleAr: "بين النجوم",
    year: 2014,
    duration: "2h 49m",
    rating: 8.7,
    votes: "2,000,000+",
    quality: "4K UHD",
    resolution: "2160p Remux",
    ageRating: "+13",
    language: "الإنجليزية (مترجم)",
    country: "الولايات المتحدة الأمريكية",
    director: "كريستوفر نولان (Christopher Nolan)",
    genres: ["خيال علمي", "مغامرة", "دراما"],
    isFeatured: false,
    isTrending: false,
    isTopRated: true,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/rAiYTrKGqDCRIIqo664sY9XZIvQ.jpg",
    story: "في مستقبل يوشك فيه كوكب الأرض على الهلاك بسبب الجفاف والمجاعة، يُكلف فريق من رواد الفضاء والعلماء برحلة فضائية مصيرية عبر ثقب دودي تم اكتشافه حديثاً، في محاولة للبحث عن كوكب صالح لإيواء البشرية.",
    storyEn: "When Earth becomes uninhabitable, a team of researchers must travel across the galaxy to find a new home for mankind.",
    trailerYoutubeId: "zSWdZVtXT7E",
    cast: [
      { name: "ماثيو ماكونهي", role: "كوبّر (Cooper)", img: "https://image.tmdb.org/t/p/w200/sY2AVr5eb6v1Ns41m.jpg" },
      { name: "آن هاثاواي", role: "د. إميليا براند", img: "https://image.tmdb.org/t/p/w200/tLnP4uo.jpg" },
      { name: "جيسيكا شاستاين", role: "ميرفي (Murph)", img: "https://image.tmdb.org/t/p/w200/q9f8V4n.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP السريع 1080p", type: "stream", url: "https://vidsrc.to/embed/movie/157336", tag: "سريع" },
      { name: "سيرفر 2Embed بديل", type: "stream", url: "https://www.2embed.cc/embed/157336", tag: "بديل" },
      { name: "التريلر 4K (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/zSWdZVtXT7E?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "4K UHD 2160p Remux",
        size: "8.1 GB",
        codec: "x265 HDR10",
        audio: "DTS-HD MA 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#interstellar-4k", icon: "cloud" },
          { name: "Google Drive", url: "https://drive.google.com/#interstellar-4k", icon: "drive" }
        ]
      },
      {
        quality: "1080p BluRay",
        size: "2.9 GB",
        codec: "x264",
        audio: "AC3 5.1",
        links: [
          { name: "MediaFire", url: "https://mediafire.com/#interstellar-1080p", icon: "download" }
        ]
      }
    ]
  },
  {
    id: "inception-2010",
    title: "Inception",
    titleAr: "استهلال (بداية)",
    year: 2010,
    duration: "2h 28m",
    rating: 8.8,
    votes: "2,500,000+",
    quality: "4K UHD",
    resolution: "2160p BluRay",
    ageRating: "+13",
    language: "الإنجليزية (مترجم)",
    country: "الولايات المتحدة الأمريكية",
    director: "كريستوفر نولان (Christopher Nolan)",
    genres: ["أكشن", "خيال علمي", "مغامرة", "إثارة"],
    isFeatured: false,
    isTrending: false,
    isTopRated: true,
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    story: "دوم كوب لص ماهر، والأفضل في فن الاستخراج الخطير: سرقة الأسرار القيمة من أعماق العقل الباطن أثناء حالة الحلم. تتاح له فرصة أخيرة لاستعادة حياته الطبيعية ولكن عبر عملية عكسية: زرع فكرة داخل عقل وريث إمبراطورية تجارية.",
    storyEn: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    trailerYoutubeId: "YoHD9XEInc0",
    cast: [
      { name: "ليوناردو دي كابريو", role: "دوم كوب", img: "https://image.tmdb.org/t/p/w200/wo2hx.jpg" },
      { name: "جوزيف جوردون ليفيت", role: "آرثر", img: "https://image.tmdb.org/t/p/w200/4P8n.jpg" },
      { name: "إليوت بيج", role: "أريادني", img: "https://image.tmdb.org/t/p/w200/tp9.jpg" },
      { name: "توم هاردي", role: "إيمز", img: "https://image.tmdb.org/t/p/w200/yA.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP المشاهدة (1080p)", type: "stream", url: "https://vidsrc.to/embed/movie/27205", tag: "سريع" },
      { name: "سيرفر بديل", type: "stream", url: "https://www.2embed.cc/embed/27205", tag: "HD" },
      { name: "التريلر الرسمي (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/YoHD9XEInc0?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "4K UHD 2160p",
        size: "6.5 GB",
        codec: "x265",
        audio: "DTS 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#inception-4k", icon: "cloud" },
          { name: "MediaFire", url: "https://mediafire.com/#inception-4k", icon: "download" }
        ]
      },
      {
        quality: "1080p BluRay",
        size: "2.5 GB",
        codec: "x264",
        audio: "AC3 5.1",
        links: [
          { name: "Google Drive", url: "https://drive.google.com/#inception-1080p", icon: "drive" }
        ]
      }
    ]
  },
  {
    id: "alien-romulus-2024",
    title: "Alien: Romulus",
    titleAr: "فضائي: رومولوس",
    year: 2024,
    duration: "1h 59m",
    rating: 7.3,
    votes: "190,000+",
    quality: "1080p Web-DL",
    resolution: "1080p HDR",
    ageRating: "+18",
    language: "الإنجليزية (مترجم للعربية)",
    country: "الولايات المتحدة الأمريكية",
    director: "فيدي ألفاريز (Fede Álvarez)",
    genres: ["رعب", "خيال علمي", "إثارة"],
    isFeatured: false,
    isTrending: true,
    isTopRated: false,
    poster: "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao8l3fZkyRdfiov.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg",
    story: "أثناء محاولتهم تنقيب محطة فضائية مهجورة بحثاً عن وسيلة للهروب من كوكبهم القاحل، يجد مجموعة من المستعمرين الشباب أنفسهم وجهاً لوجه مع أكثر أشكال الحياة فتكاً ورعباً في الكون.",
    storyEn: "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    trailerYoutubeId: "x0XDEhP4MQs",
    cast: [
      { name: "كايلي سبايني", role: "راين كارادين", img: "https://image.tmdb.org/t/p/w200/9y6p3.jpg" },
      { name: "ديفيد جونسون", role: "آندي", img: "https://image.tmdb.org/t/p/w200/8h2p5.jpg" },
      { name: "أرتشي رينو", role: "تايلر", img: "https://image.tmdb.org/t/p/w200/5k7m8.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP المشاهدة (1080p)", type: "stream", url: "https://vidsrc.to/embed/movie/945961", tag: "سريع" },
      { name: "سيرفر 2Embed بديل", type: "stream", url: "https://www.2embed.cc/embed/945961", tag: "HD" },
      { name: "التريلر الرسمي (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/x0XDEhP4MQs?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "1080p Full HD",
        size: "2.1 GB",
        codec: "x264",
        audio: "AC3 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#alien-romulus-1080p", icon: "cloud" },
          { name: "MediaFire", url: "https://mediafire.com/#alien-romulus-1080p", icon: "download" }
        ]
      },
      {
        quality: "720p HD",
        size: "950 MB",
        codec: "x264",
        audio: "AAC 2.0",
        links: [
          { name: "Google Drive", url: "https://drive.google.com/#alien-romulus-720p", icon: "drive" }
        ]
      }
    ]
  },
  {
    id: "the-batman-2022",
    title: "The Batman",
    titleAr: "باتمان",
    year: 2022,
    duration: "2h 56m",
    rating: 7.9,
    votes: "750,000+",
    quality: "4K UHD",
    resolution: "2160p HDR",
    ageRating: "+16",
    language: "الإنجليزية (مترجم للعربية)",
    country: "الولايات المتحدة الأمريكية",
    director: "مات ريفز (Matt Reeves)",
    genres: ["أكشن", "جريمة", "غموض", "دراما"],
    isFeatured: false,
    isTrending: false,
    isTopRated: true,
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    story: "في عامه الثاني من محاربة الجريمة، يحقق باتمان في خيوط فساد عميقة في مدينة غوثام بينما يطارد قاتلاً متسلسلاً سادياً يُعرف باسم 'ريدلر' يستهدف النخبة السياسية تاركاً ألغازاً غامضة خلفه.",
    storyEn: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    trailerYoutubeId: "mqqft2x_Aa4",
    cast: [
      { name: "روبرت باتينسون", role: "بروس واين / باتمان", img: "https://image.tmdb.org/t/p/w200/5mD8q.jpg" },
      { name: "زوي كرافيتز", role: "سيلينا كايل / كات وومان", img: "https://image.tmdb.org/t/p/w200/6vW2.jpg" },
      { name: "بول دانو", role: "إدوارد ناشتون / ريدلر", img: "https://image.tmdb.org/t/p/w200/8tY7.jpg" },
      { name: "كولين فاريل", role: "أوزوالد كوبلبوت / البطريق", img: "https://image.tmdb.org/t/p/w200/7uM3.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP المشاهدة (1080p)", type: "stream", url: "https://vidsrc.to/embed/movie/414906", tag: "سريع" },
      { name: "سيرفر 2Embed بديل", type: "stream", url: "https://www.2embed.cc/embed/414906", tag: "HD" },
      { name: "التريلر الرسمي (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/mqqft2x_Aa4?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "4K UHD 2160p",
        size: "6.9 GB",
        codec: "x265",
        audio: "Dolby Atmos",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#the-batman-4k", icon: "cloud" },
          { name: "MediaFire", url: "https://mediafire.com/#the-batman-4k", icon: "download" }
        ]
      },
      {
        quality: "1080p BluRay",
        size: "2.8 GB",
        codec: "x264",
        audio: "AC3 5.1",
        links: [
          { name: "Google Drive", url: "https://drive.google.com/#the-batman-1080p", icon: "drive" }
        ]
      }
    ]
  },
  {
    id: "spider-man-across-spider-verse-2023",
    title: "Spider-Man: Across the Spider-Verse",
    titleAr: "سبايدرمان: عبر عالم العنكبوت",
    year: 2023,
    duration: "2h 20m",
    rating: 8.6,
    votes: "390,000+",
    quality: "4K UHD",
    resolution: "2160p HDR",
    ageRating: "PG",
    language: "الإنجليزية (مترجم للعربية)",
    country: "الولايات المتحدة الأمريكية",
    director: "جواكيم دوس سانتوس، كيمب باورز",
    genres: ["رسوم متحركة", "أكشن", "مغامرة", "خيال علمي"],
    isFeatured: false,
    isTrending: false,
    isTopRated: true,
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    story: "ينطلق مايلز موراليس في رحلة عبر الأكوان المتعددة برفقة غوين ستايسي وفريق جديد من أبطال العنكبوت، ليجد نفسه في مواجهة حاسمة مع مجتمع العناكب حول معنى أن تكون بطلاً حقيقياً.",
    storyEn: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    trailerYoutubeId: "cqGjhVJWtEg",
    cast: [
      { name: "شاميك مور", role: "مايلز موراليس (صوت)", img: "https://image.tmdb.org/t/p/w200/9bV1.jpg" },
      { name: "هايلي ستاينفيلد", role: "غوين ستايسي (صوت)", img: "https://image.tmdb.org/t/p/w200/4cW2.jpg" },
      { name: "أوسكار إسحاق", role: "ميغيل أوهارا / سبايدرمان 2099", img: "https://image.tmdb.org/t/p/w200/3rY5.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP المشاهدة (1080p)", type: "stream", url: "https://vidsrc.to/embed/movie/569094", tag: "سريع" },
      { name: "سيرفر 2Embed بديل", type: "stream", url: "https://www.2embed.cc/embed/569094", tag: "HD" },
      { name: "التريلر الرسمي (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/cqGjhVJWtEg?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "4K UHD 2160p",
        size: "5.8 GB",
        codec: "x265",
        audio: "Dolby Atmos 7.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#spider-verse-4k", icon: "cloud" },
          { name: "MediaFire", url: "https://mediafire.com/#spider-verse-4k", icon: "download" }
        ]
      },
      {
        quality: "1080p BluRay",
        size: "2.4 GB",
        codec: "x264",
        audio: "AC3 5.1",
        links: [
          { name: "Google Drive", url: "https://drive.google.com/#spider-verse-1080p", icon: "drive" }
        ]
      }
    ]
  },
  {
    id: "the-substance-2024",
    title: "The Substance",
    titleAr: "المادة (ذا سبستانس)",
    year: 2024,
    duration: "2h 21m",
    rating: 7.6,
    votes: "160,000+",
    quality: "1080p Web-DL",
    resolution: "1080p Full HD",
    ageRating: "+18",
    language: "الإنجليزية (مترجم للعربية)",
    country: "بريطانيا / الولايات المتحدة",
    director: "كورالي فارجيت (Coralie Fargeat)",
    genres: ["رعب", "دراما", "خيال علمي"],
    isFeatured: false,
    isTrending: true,
    isTopRated: false,
    poster: "https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729Fc6rKWx5NmHQ.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/7h6r93ooEjGStIOkTvA93zENalG.jpg",
    story: "نجمة مشهورة يتقدم بها العمر وتُطرد من برنامجها التلفزيوني، تتناول دواءً سرياً من السوق السوداء يُولد نسخة أفضل وأصغر وأكثر كمالاً منها، بشرط احترام قاعدة التوازن الزمني الصارمة.",
    storyEn: "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
    trailerYoutubeId: "LNlrGhPdnms",
    cast: [
      { name: "ديمي مور", role: "إليزابيث سباركل", img: "https://image.tmdb.org/t/p/w200/8d8.jpg" },
      { name: "مارغريت كوالي", role: "سو (Sue)", img: "https://image.tmdb.org/t/p/w200/9k6.jpg" },
      { name: "دينيس كويد", role: "هارفي", img: "https://image.tmdb.org/t/p/w200/4c3.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP المشاهدة (1080p)", type: "stream", url: "https://vidsrc.to/embed/movie/933260", tag: "سريع" },
      { name: "سيرفر 2Embed بديل", type: "stream", url: "https://www.2embed.cc/embed/933260", tag: "HD" },
      { name: "التريلر الرسمي (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/LNlrGhPdnms?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "1080p Web-DL",
        size: "2.4 GB",
        codec: "x264",
        audio: "AC3 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#the-substance-1080p", icon: "cloud" },
          { name: "MediaFire", url: "https://mediafire.com/#the-substance-1080p", icon: "download" }
        ]
      }
    ]
  },
  {
    id: "gladiator-2-2024",
    title: "Gladiator II",
    titleAr: "المصارع 2",
    year: 2024,
    duration: "2h 28m",
    rating: 7.4,
    votes: "110,000+",
    quality: "4K UHD",
    resolution: "2160p HDR",
    ageRating: "+16",
    language: "الإنجليزية (مترجم للعربية)",
    country: "الولايات المتحدة / بريطانيا",
    director: "ريدلي سكوت (Ridley Scott)",
    genres: ["أكشن", "مغامرة", "دراما", "تاريخ"],
    isFeatured: true,
    isTrending: true,
    isTopRated: false,
    poster: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/euYIwmwkmz95mnXvufEmbL69ovr.jpg",
    story: "بعد سنوات من التضحية التي قدمها البطل مكسيموس، يُجبر لوشيوس (ابن لوسيلا) على دخول حلبة الكولوسيوم كمصارع بعد غزو وطنه من قبل الأباطرة المستبدين الذين يحكمون روما بقبضة من حديد، ليبحث في ماضيه عن القوة والشرف لاستعادة مجد روما لشعبها.",
    storyEn: "Years after witnessing the death of Maximus, Lucius must enter the Colosseum after his home is conquered by the tyrannical Emperors.",
    trailerYoutubeId: "4rgYUipGJNo",
    cast: [
      { name: "بول ميسكال", role: "لوشيوس", img: "https://image.tmdb.org/t/p/w200/9J4k2.jpg" },
      { name: "بيدرو باسكال", role: "الجنرال أكاسيوس", img: "https://image.tmdb.org/t/p/w200/7J1b4.jpg" },
      { name: "دينزل واشنطن", role: "ماكرينوس", img: "https://image.tmdb.org/t/p/w200/6rT9w.jpg" },
      { name: "كوني نيلسن", role: "لوسيلا", img: "https://image.tmdb.org/t/p/w200/3oQ2d.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP المشاهدة (1080p)", type: "stream", url: "https://vidsrc.to/embed/movie/558449", tag: "سريع" },
      { name: "سيرفر 2Embed بديل", type: "stream", url: "https://www.2embed.cc/embed/558449", tag: "HD" },
      { name: "التريلر الرسمي (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/4rgYUipGJNo?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "4K UHD 2160p",
        size: "6.1 GB",
        codec: "x265",
        audio: "Dolby Atmos",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#gladiator2-4k", icon: "cloud" },
          { name: "Google Drive", url: "https://drive.google.com/#gladiator2-4k", icon: "drive" },
          { name: "MediaFire", url: "https://mediafire.com/#gladiator2-4k", icon: "download" }
        ]
      },
      {
        quality: "1080p BluRay",
        size: "2.6 GB",
        codec: "x264",
        audio: "AC3 5.1",
        links: [
          { name: "MediaFire", url: "https://mediafire.com/#gladiator2-1080p", icon: "download" }
        ]
      }
    ]
  },
  {
    id: "the-dark-knight-2008",
    title: "The Dark Knight",
    titleAr: "فارس الظلام",
    year: 2008,
    duration: "2h 32m",
    rating: 9.0,
    votes: "2,850,000+",
    quality: "4K UHD",
    resolution: "2160p Remux",
    ageRating: "+16",
    language: "الإنجليزية (مترجم للعربية)",
    country: "الولايات المتحدة الأمريكية",
    director: "كريستوفر نولان (Christopher Nolan)",
    genres: ["أكشن", "جريمة", "دراما", "إثارة"],
    isFeatured: false,
    isTrending: false,
    isTopRated: true,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    story: "عندما يظهر التهديد المعروف باسم 'الجوكر' مسبباً الفوضى والدمار في شوارع غوثام، يجب على باتمان قبول أحد أعظم الاختبارات النفسية والجسدية لقدرته على محاربة الظلم والدفاع عن الأبرياء.",
    storyEn: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    trailerYoutubeId: "EXeTwQWrcwY",
    cast: [
      { name: "كريستيان بيل", role: "بروس واين / باتمان", img: "https://image.tmdb.org/t/p/w200/3k9b7.jpg" },
      { name: "هيث ليدجر", role: "الجوكر", img: "https://image.tmdb.org/t/p/w200/5mD8.jpg" },
      { name: "آرون إيكهارت", role: "هارفي دينت", img: "https://image.tmdb.org/t/p/w200/6yN8.jpg" },
      { name: "مايكل كين", role: "ألفريد", img: "https://image.tmdb.org/t/p/w200/9kM3.jpg" }
    ],
    servers: [
      { name: "سيرفر VIP المشاهدة (1080p)", type: "stream", url: "https://vidsrc.to/embed/movie/155", tag: "سريع" },
      { name: "سيرفر 2Embed بديل", type: "stream", url: "https://www.2embed.cc/embed/155", tag: "HD" },
      { name: "التريلر الرسمي (YouTube)", type: "trailer", url: "https://www.youtube-nocookie.com/embed/EXeTwQWrcwY?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3", tag: "تريلر" }
    ],
    downloads: [
      {
        quality: "4K UHD 2160p Remux",
        size: "7.8 GB",
        codec: "x265 HDR",
        audio: "DTS-HD MA 5.1",
        links: [
          { name: "Mega.nz", url: "https://mega.nz/#dark-knight-4k", icon: "cloud" },
          { name: "Google Drive", url: "https://drive.google.com/#dark-knight-4k", icon: "drive" }
        ]
      },
      {
        quality: "1080p BluRay",
        size: "2.8 GB",
        codec: "x264",
        audio: "AC3 5.1",
        links: [
          { name: "MediaFire", url: "https://mediafire.com/#dark-knight-1080p", icon: "download" }
        ]
      }
    ]
  }
];

// فئات وتصنيفات الأفلام المتاحة للفلترة
const MOVIE_GENRES = [
  "الكل",
  "أكشن",
  "خيال علمي",
  "دراما",
  "رعب",
  "إثارة",
  "جريمة",
  "مغامرة",
  "كوميديا",
  "سيرة ذاتية",
  "رسوم متحركة",
  "تاريخ"
];

// مفاتيح التخزين المحلي (LocalStorage)
const STORAGE_KEYS = {
  MOVIES: "cineverse_movies_db",
  WATCHLIST: "cineverse_watchlist",
  HISTORY: "cineverse_history",
  COMMENTS: "cineverse_comments"
};

// فئة إدارة وتخزين الأفلام
class MovieDB {
  static getMovies() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MOVIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading movies from localStorage", e);
    }
    // حفظ القائمة الافتراضية إذا لم تكن موجودة
    this.saveMovies(DEFAULT_MOVIES);
    return DEFAULT_MOVIES;
  }

  static saveMovies(movies) {
    try {
      localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
      return true;
    } catch (e) {
      console.error("Error saving movies to localStorage", e);
      return false;
    }
  }

  static getMovieById(id) {
    const movies = this.getMovies();
    return movies.find(m => m.id === id) || null;
  }

  static addMovie(newMovie) {
    const movies = this.getMovies();
    // التحقق من وجود المعرف
    if (!newMovie.id) {
      newMovie.id = 'movie-' + Date.now();
    }
    movies.unshift(newMovie);
    this.saveMovies(movies);
    return newMovie;
  }

  static updateMovie(id, updatedData) {
    const movies = this.getMovies();
    const index = movies.findIndex(m => m.id === id);
    if (index !== -1) {
      movies[index] = { ...movies[index], ...updatedData };
      this.saveMovies(movies);
      return movies[index];
    }
    return null;
  }

  static deleteMovie(id) {
    let movies = this.getMovies();
    movies = movies.filter(m => m.id !== id);
    this.saveMovies(movies);
    return true;
  }

  static resetToDefaults() {
    this.saveMovies(DEFAULT_MOVIES);
    return DEFAULT_MOVIES;
  }

  // إدارة قائمة المفضلة
  static getWatchlist() {
    try {
      const list = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      return list ? JSON.parse(list) : [];
    } catch {
      return [];
    }
  }

  static toggleWatchlist(movieId) {
    let list = this.getWatchlist();
    const exists = list.includes(movieId);
    if (exists) {
      list = list.filter(id => id !== movieId);
    } else {
      list.push(movieId);
    }
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(list));
    return !exists;
  }

  static isInWatchlist(movieId) {
    return this.getWatchlist().includes(movieId);
  }

  // إدارة التعليقات والمراجعات لكل فيلم
  static getComments(movieId) {
    try {
      const allComments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || "{}");
      return allComments[movieId] || [];
    } catch {
      return [];
    }
  }

  static addComment(movieId, author, rating, text) {
    try {
      const allComments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || "{}");
      if (!allComments[movieId]) allComments[movieId] = [];
      const newComment = {
        id: "c-" + Date.now(),
        author: author || "مشاهد سينمائي",
        rating: Number(rating) || 10,
        text: text,
        date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })
      };
      allComments[movieId].unshift(newComment);
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
      return newComment;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

// تصدير أو إتاحة في النطاق العام للنافذة
if (typeof window !== "undefined") {
  window.MovieDB = MovieDB;
  window.MOVIE_GENRES = MOVIE_GENRES;
  window.DEFAULT_MOVIES = DEFAULT_MOVIES;
}
