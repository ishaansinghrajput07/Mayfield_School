import React from "react";

const NewsEventsMemories = () => {
  const newsItems = [
    {
      number: "01",
      title: "School News",
      subtitle: "Latest Updates",
      image: "/images/school-news.jpg",
    },
    {
      number: "02",
      title: "News Clippings",
      subtitle: "Media & Highlights",
      image: "/images/news-clippings.jpg",
    },
    {
      number: "03",
      title: "Photo Gallery",
      subtitle: "School Memories",
      image: "/images/photo-gallery.jpg",
    },
    {
      number: "04",
      title: "Newsletter",
      subtitle: "School Publication",
      image: "/images/newsletter.jpg",
    },
    {
      number: "05",
      title: "Video Gallery",
      subtitle: "Watch & Explore",
      image: "/images/trophy-or-campus.jpg",
      video: true,
    },
    {
      number: "06",
      title: "School Calendar",
      subtitle: "Important Dates",
      image: "/images/school-calendar.jpg",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#f3f0ea] font-sans">
      {/* =========================================================
          BACKGROUND ARTWORK
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Sketch Image */}
        <div
          className="news-sketch absolute -inset-[6%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/school-sketch-bg.png')",
          }}
        />

        {/* Paper wash */}
        <div className="absolute inset-0 bg-[#f3f0ea]/[0.88]" />

        {/* Soft premium gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f4]/90 via-[#f3f0ea]/70 to-[#e9edf2]/90" />

        {/* Navy atmosphere */}
        <div className="absolute -left-[220px] top-[18%] h-[520px] w-[520px] rounded-full bg-[#183653]/[0.05] blur-[130px]" />

        {/* Warm atmosphere */}
        <div className="absolute -right-[220px] top-[40%] h-[600px] w-[600px] rounded-full bg-[#c28153]/[0.06] blur-[150px]" />

        {/* Blue atmosphere */}
        <div className="absolute bottom-[-250px] left-[35%] h-[600px] w-[600px] rounded-full bg-[#4c83a9]/[0.045] blur-[160px]" />

        {/* Decorative circles */}
        <div className="absolute right-[4%] top-[9%] h-40 w-40 rounded-full border border-[#173450]/[0.07]" />

        <div className="absolute right-[7%] top-[12%] h-20 w-20 rounded-full border border-[#c28153]/[0.12]" />

        <div className="absolute bottom-[9%] left-[4%] h-32 w-32 rounded-full border border-[#173450]/[0.06]" />

        {/* Moving light */}
        <div className="news-light absolute -left-[30%] top-0 h-full w-[28%] bg-gradient-to-r from-transparent via-white/45 to-transparent blur-3xl" />
      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}
      <style>{`
        .news-sketch {
          opacity: 0.16;
          filter: grayscale(0.25) saturate(0.55) contrast(0.92);
          animation: sketchMovement 24s ease-in-out infinite alternate;
          will-change: transform;
        }

        @keyframes sketchMovement {
          0% {
            transform: scale(1.02) translate3d(0, 0, 0);
          }

          50% {
            transform: scale(1.06) translate3d(-10px, -6px, 0);
          }

          100% {
            transform: scale(1.10) translate3d(8px, 7px, 0);
          }
        }

        .news-light {
          animation: lightMovement 14s linear infinite;
        }

        @keyframes lightMovement {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(520%);
          }
        }

        .hero-campus-image {
          transition:
            transform 1200ms cubic-bezier(.2,.65,.25,1),
            filter 1000ms ease;
        }

        .hero-campus:hover .hero-campus-image {
          transform: scale(1.055);
          filter: saturate(1.05);
        }

        .media-image {
          transition:
            transform 900ms cubic-bezier(.2,.65,.25,1),
            filter 700ms ease;
        }

        .media-card:hover .media-image {
          transform: scale(1.08);
          filter: saturate(1.08);
        }

        .media-shine {
          transform: translateX(-150%) rotate(18deg);
          transition: transform 1100ms ease;
        }

        .media-card:hover .media-shine {
          transform: translateX(250%) rotate(18deg);
        }

        .floating-card {
          animation: floatingCard 5s ease-in-out infinite;
        }

        @keyframes floatingCard {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        .floating-card-slow {
          animation: floatingCardSlow 7s ease-in-out infinite;
        }

        @keyframes floatingCardSlow {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(8px);
          }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeMove 32s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeMove {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .accent-pulse {
          animation: accentPulse 2.8s ease-in-out infinite;
        }

        @keyframes accentPulse {
          0%,
          100% {
            opacity: .55;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .news-sketch,
          .news-light,
          .floating-card,
          .floating-card-slow,
          .marquee-track {
            animation: none !important;
          }
        }
      `}</style>

      {/* =========================================================
          MAIN WRAPPER
      ========================================================= */}
      <div className="relative z-10 mx-auto max-w-[1450px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* =======================================================
            TOP EDITORIAL HEADER
        ======================================================= */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          {/* Left */}
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-12 bg-[#c28153]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#9c6947]">
                Life at Mayfield
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#c28153]" />
            </div>

            <h2 className="font-serif text-[46px] font-bold leading-[0.95] tracking-[-0.045em] text-[#102d49] sm:text-6xl lg:text-[78px]">
              Moments
              <br />

              <span className="ml-[8%] text-[#426b8e]">
                That Matter.
              </span>
            </h2>
          </div>

          {/* Right editorial text */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border-l border-[#173450]/15 pl-6">
              <p className="text-sm leading-7 text-[#5e6d7c]">
                Explore the latest happenings, school highlights,
                memorable moments and important updates from Mayfield
                Global School.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#173450]/50">
                  Neora · Patna
                </span>

                <span className="h-px w-10 bg-[#c28153]/60" />

                <span className="text-[10px] font-bold text-[#173450]/50">
                  2015
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            FLOATING ANNOUNCEMENT CAPSULE
        ======================================================= */}
        <div className="relative z-20 mb-14 flex justify-center lg:justify-end">
          <div className="floating-card relative max-w-full overflow-hidden rounded-full border border-white/70 bg-[#102d49]/95 px-2 py-2 shadow-[0_20px_60px_rgba(16,45,73,0.20)] backdrop-blur-xl">
            <div className="flex max-w-full items-center">
              {/* Label */}
              <div className="hidden shrink-0 items-center gap-2 rounded-full bg-[#c28153] px-4 py-2.5 sm:flex">
                <span className="accent-pulse h-1.5 w-1.5 rounded-full bg-white" />

                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                  Latest
                </span>
              </div>

              {/* Marquee */}
              <div className="max-w-[calc(100vw-50px)] overflow-hidden sm:max-w-[700px]">
                <div className="marquee-track">
                  <div className="flex shrink-0 items-center">
                    <span className="px-6 text-xs font-medium text-white/90">
                      Admissions Open for Classes Nursery to Senior Secondary
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      CBSE Affiliated School
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      CBSE Affiliation No. 330935
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      UDISE Code: 10280701603
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      School Code: 66654
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      Established 2015
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center">
                    <span className="px-6 text-xs font-medium text-white/90">
                      Admissions Open for Classes Nursery to Senior Secondary
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      CBSE Affiliated School
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      CBSE Affiliation No. 330935
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      UDISE Code: 10280701603
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      School Code: 66654
                    </span>

                    <span className="text-[#c28153]">◆</span>

                    <span className="px-6 text-xs font-medium text-white/90">
                      Established 2015
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            UNIQUE EDITORIAL CONTENT
        ======================================================= */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* =====================================================
              LARGE FEATURED CAMPUS
          ===================================================== */}
          <div className="lg:col-span-6">
            <div className="hero-campus group relative">
              {/* Behind frame */}
              <div className="absolute -bottom-5 -right-5 left-8 top-8 bg-[#c28153]" />

              {/* Thin decorative frame */}
              <div className="absolute -bottom-2 -left-2 right-3 top-3 border border-[#102d49]/20" />

              {/* Image */}
              <div className="relative h-[520px] overflow-hidden bg-[#102d49] shadow-[0_35px_90px_rgba(16,45,73,0.22)] sm:h-[620px]">
                <img
                  src="/images/hero-building.jpg"
                  alt="Mayfield Global School"
                  className="hero-campus-image h-full w-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06172a]/95 via-[#06172a]/15 to-transparent" />

                {/* Top number */}
                <div className="absolute left-6 top-6">
                  <span className="font-serif text-6xl font-bold text-white/25">
                    01
                  </span>
                </div>

                {/* Floating Identity Card */}
                <div className="floating-card-slow absolute right-5 top-5 w-[180px] border border-white/20 bg-black/20 p-4 backdrop-blur-xl sm:right-7 sm:top-7">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/60">
                      Identity
                    </span>

                    <span className="h-1.5 w-1.5 rounded-full bg-[#c28153]" />
                  </div>

                  <p className="text-xl font-black text-white">
                    MAYFIELD
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/50">
                    Global School
                  </p>

                  <div className="mt-4 h-px bg-white/10" />

                  <p className="mt-3 text-[9px] leading-4 text-white/60">
                    Neora · Patna · Bihar
                  </p>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-10 bg-[#c28153]" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/65">
                      Our Campus
                    </span>
                  </div>

                  <p className="font-serif text-2xl font-light text-white/90 sm:text-3xl">
                    Welcome to
                  </p>

                  <h3 className="mt-1 max-w-xl font-serif text-3xl font-bold leading-[1.05] text-white sm:text-5xl">
                    Mayfield Global School
                  </h3>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white/75 backdrop-blur-md">
                      Established 2015
                    </span>

                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white/75 backdrop-blur-md">
                      CBSE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT EDITORIAL AREA
          ===================================================== */}
          <div className="lg:col-span-6">
            {/* Intro block */}
            <div className="mb-7 flex items-end justify-between border-b border-[#173450]/10 pb-5">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9c6947]">
                  Discover
                </span>

                <h3 className="mt-1 font-serif text-3xl font-bold text-[#102d49]">
                  School Life
                </h3>
              </div>

              <span className="font-serif text-5xl font-bold text-[#102d49]/10">
                06
              </span>
            </div>

            {/* =================================================
                ASYMMETRIC MEDIA LAYOUT
            ================================================= */}
            <div className="grid grid-cols-2 gap-4">
              {/* CARD 1 LARGE */}
              <div className="media-card group relative col-span-2 h-[235px] overflow-hidden rounded-[3px] bg-[#102d49] shadow-[0_20px_55px_rgba(16,45,73,0.14)]">
                <img
                  src={newsItems[0].image}
                  alt={newsItems[0].title}
                  className="media-image h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#071a2d]/90 via-[#071a2d]/25 to-transparent" />

                <div className="absolute left-6 top-6">
                  <span className="font-serif text-5xl font-bold text-white/20">
                    {newsItems[0].number}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#d9e7f0]/70">
                    {newsItems[0].subtitle}
                  </span>

                  <h4 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
                    {newsItems[0].title}
                  </h4>
                </div>

                <div className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:bg-[#c28153]">
                  ↗
                </div>

                <div className="media-shine pointer-events-none absolute left-[-30%] top-[-30%] h-[160%] w-[30%] bg-white/15 blur-2xl" />
              </div>

              {/* CARD 2 */}
              <div className="media-card group relative h-[185px] overflow-hidden rounded-[3px] bg-[#102d49] shadow-[0_18px_50px_rgba(16,45,73,0.12)]">
                <img
                  src={newsItems[1].image}
                  alt={newsItems[1].title}
                  className="media-image h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06172a]/95 via-[#06172a]/20 to-transparent" />

                <div className="absolute left-5 top-5 font-serif text-4xl font-bold text-white/20">
                  {newsItems[1].number}
                </div>

                <div className="absolute bottom-5 left-5">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/60">
                    {newsItems[1].subtitle}
                  </span>

                  <h4 className="mt-1 text-base font-bold text-white">
                    {newsItems[1].title}
                  </h4>
                </div>

                <div className="media-shine pointer-events-none absolute left-[-30%] top-[-30%] h-[160%] w-[30%] bg-white/15 blur-2xl" />
              </div>

              {/* CARD 3 */}
              <div className="media-card group relative h-[185px] translate-y-6 overflow-hidden rounded-[3px] bg-[#102d49] shadow-[0_18px_50px_rgba(16,45,73,0.12)]">
                <img
                  src={newsItems[2].image}
                  alt={newsItems[2].title}
                  className="media-image h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06172a]/95 via-[#06172a]/20 to-transparent" />

                <div className="absolute left-5 top-5 font-serif text-4xl font-bold text-white/20">
                  {newsItems[2].number}
                </div>

                <div className="absolute bottom-5 left-5">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/60">
                    {newsItems[2].subtitle}
                  </span>

                  <h4 className="mt-1 text-base font-bold text-white">
                    {newsItems[2].title}
                  </h4>
                </div>

                <div className="media-shine pointer-events-none absolute left-[-30%] top-[-30%] h-[160%] w-[30%] bg-white/15 blur-2xl" />
              </div>

              {/* CARD 4 */}
              <div className="media-card group relative h-[165px] overflow-hidden rounded-[3px] bg-[#102d49] shadow-[0_18px_50px_rgba(16,45,73,0.12)]">
                <img
                  src={newsItems[3].image}
                  alt={newsItems[3].title}
                  className="media-image h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06172a]/95 via-[#06172a]/20 to-transparent" />

                <div className="absolute left-5 top-5 font-serif text-3xl font-bold text-white/20">
                  {newsItems[3].number}
                </div>

                <div className="absolute bottom-5 left-5">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/60">
                    {newsItems[3].subtitle}
                  </span>

                  <h4 className="mt-1 text-base font-bold text-white">
                    {newsItems[3].title}
                  </h4>
                </div>

                <div className="media-shine pointer-events-none absolute left-[-30%] top-[-30%] h-[160%] w-[30%] bg-white/15 blur-2xl" />
              </div>

              {/* CARD 5 VIDEO */}
              <div className="media-card group relative h-[165px] translate-y-4 overflow-hidden rounded-[3px] bg-[#102d49] shadow-[0_18px_50px_rgba(16,45,73,0.12)]">
                <img
                  src={newsItems[4].image}
                  alt={newsItems[4].title}
                  className="media-image h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06172a]/95 via-[#06172a]/20 to-transparent" />

                {/* Play */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-xl transition duration-500 group-hover:scale-110 group-hover:bg-white">
                    <span className="ml-1 text-sm text-white group-hover:text-[#c8413b]">
                      ▶
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/60">
                    {newsItems[4].subtitle}
                  </span>

                  <h4 className="mt-1 text-base font-bold text-white">
                    {newsItems[4].title}
                  </h4>
                </div>

                <div className="media-shine pointer-events-none absolute left-[-30%] top-[-30%] h-[160%] w-[30%] bg-white/15 blur-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM CALENDAR / IDENTITY STRIP
        ======================================================= */}
        <div className="mt-16 grid grid-cols-1 gap-5 border-t border-[#173450]/10 pt-8 sm:grid-cols-3">
          {/* Calendar */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#173450]/10 bg-white/60 font-serif text-xl font-bold text-[#173450]">
              06
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9c6947]">
                Explore
              </p>

              <p className="mt-1 text-xs font-semibold text-[#173450]/70">
                School Calendar
              </p>
            </div>
          </div>

          {/* Center */}
          <div className="flex items-center justify-center border-y border-[#173450]/10 py-5 sm:border-y-0 sm:border-x">
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-[#173450]">
                MAYFIELD
              </p>

              <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-[#9c6947]">
                Global School · Neora
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center sm:justify-end">
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9c6947]">
                School Life
              </p>

              <p className="mt-1 text-xs text-[#173450]/55">
                Moments that become memories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEventsMemories;