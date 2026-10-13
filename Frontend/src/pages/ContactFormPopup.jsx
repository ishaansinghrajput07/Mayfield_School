import React, { useEffect, useState } from "react";
import {
  X,
  ArrowUpRight,
  MapPin,
  Sparkles,
  Phone,
} from "lucide-react";

const ContactFormPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  /* =====================================================
     POPUP TIMING

     First popup  -> 20 seconds
     Next popup   -> 50 seconds after closing
  ====================================================== */

  useEffect(() => {
    let reopenTimer;

    const firstTimer = setTimeout(() => {
      setIsOpen(true);
    }, 20000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(reopenTimer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      setIsOpen(true);
    }, 500000);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes popupOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popupReveal {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes imageReveal {
          from {
            opacity: 0;
            transform: scale(1.08);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slowZoom {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.045);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-150%) skewX(-18deg);
          }

          100% {
            transform: translateX(300%) skewX(-18deg);
          }
        }

        .popup-overlay {
          animation: popupOverlay 0.35s ease forwards;
        }

        .popup-main {
          animation: popupReveal 0.65s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .popup-image {
          animation: imageReveal 1s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .popup-image-slow {
          animation: slowZoom 16s ease-in-out infinite;
        }

        .popup-cta:hover .popup-shine {
          animation: shine 0.9s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .popup-overlay,
          .popup-main,
          .popup-image,
          .popup-image-slow {
            animation: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <div
        className="popup-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/45 p-3 backdrop-blur-md sm:p-5 lg:p-8"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        {/* =====================================================
            MAIN POPUP
        ====================================================== */}

        <div className="popup-main relative h-[min(700px,92vh)] w-full max-w-[1180px] overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_35px_100px_rgba(15,23,42,0.25)] sm:rounded-[34px]">

          {/* Premium soft background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-[100px]" />

            <div className="absolute -right-32 top-20 h-[380px] w-[380px] rounded-full bg-violet-100/60 blur-[100px]" />

            <div className="absolute bottom-[-180px] left-[30%] h-[400px] w-[500px] rounded-full bg-amber-50/80 blur-[110px]" />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #475569 1px, transparent 1px),
                  linear-gradient(to bottom, #475569 1px, transparent 1px)
                `,
                backgroundSize: "70px 70px",
              }}
            />
          </div>

          {/* =================================================
              CLOSE
          ================================================== */}

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close popup"
            className="group absolute right-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-lg backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:bg-slate-900 hover:text-white sm:right-5 sm:top-5 sm:h-10 sm:w-10"
          >
            <X size={18} />
          </button>

          {/* =================================================
              CONTENT
          ================================================== */}

          <div className="relative z-10 flex h-full flex-col p-4 sm:p-5 lg:p-7">

            {/* =================================================
                TOP BRAND
            ================================================== */}

            <div className="flex min-w-0 items-center justify-between gap-3 pr-9 sm:pr-12">

              <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-1.5 shadow-md sm:h-12 sm:w-12">
                  <img
                    src="/images/school-logo.png"
                    alt="Mayfield Global School"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <p className="break-words text-[9px] font-black uppercase leading-tight tracking-[0.12em] text-slate-900 sm:text-[10px] sm:tracking-[0.24em]">
                    Mayfield Global School
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                    <MapPin
                      size={11}
                      className="text-red-500"
                    />

                    <span className="text-[7px] font-semibold uppercase leading-tight tracking-[0.08em] text-slate-500 sm:text-[9px] sm:tracking-[0.15em]">
                      Neora · Patna · Bihar
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">
                  Admissions Open
                </span>
              </div>

            </div>

            {/* =================================================
                DESKTOP IMAGE / VIDEO GRID
            ================================================== */}

            <div className="mt-5 hidden min-h-0 flex-1 gap-4 lg:grid lg:grid-cols-[0.75fr_1.45fr_0.75fr]">

              {/* LEFT */}
              <div className="grid min-h-0 grid-rows-[1.2fr_0.8fr] gap-4">

                <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100 shadow-sm">

                  <img
                    src="/images/trophy-or-campus.jpg"
                    alt="Mayfield Global School Campus"
                    className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/70">
                      Campus
                    </span>

                    <p className="mt-1 text-sm font-black text-white">
                      A place to grow.
                    </p>
                  </div>

                </div>

                <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100 shadow-sm">

                  <img
                    src="/images/school-calendar.jpg"
                    alt="Mayfield Global School"
                    className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent" />

                  <div className="absolute bottom-3 left-4">
                    <span className="text-[8px] font-black uppercase tracking-[0.18em] text-amber-300">
                      School Life
                    </span>
                  </div>

                </div>
              </div>

              {/* =================================================
                  CENTER VIDEO
              ================================================== */}

              <div className="group relative min-h-0 overflow-hidden rounded-[26px] border border-slate-200 bg-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.15)]">

                <video
                  src="/videos/school-about.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="popup-image-slow h-full w-full object-cover"
                />

                {/* Video overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/25 via-transparent to-transparent" />

                {/* Top badge */}
                <div className="absolute left-5 top-5">

                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2 shadow-lg backdrop-blur-xl">

                    <Sparkles
                      size={11}
                      className="text-amber-400"
                    />

                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/90">
                      Excellence
                    </span>

                  </div>

                </div>

                {/* Center tiny video indicator */}
                <div className="absolute right-5 top-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
                  </div>
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-5 left-5 right-5">

                  <p className="mb-2 text-[9px] font-black uppercase tracking-[0.25em] text-amber-400">
                    More Than A School
                  </p>

                  <h2 className="max-w-[430px] text-3xl font-black uppercase leading-[0.95] tracking-tight text-white xl:text-5xl">
                    Where Every
                    <br />
                    Child Can{" "}
                    <span className="text-amber-400">
                      Shine.
                    </span>
                  </h2>

                </div>
              </div>

              {/* RIGHT */}
              <div className="grid min-h-0 grid-rows-[0.8fr_1.2fr] gap-4">

                <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100 shadow-sm">

                  <img
                    src="/images/newsletter.jpg"
                    alt="Mayfield Global School"
                    className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

                  <div className="absolute bottom-3 left-4">
                    <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/75">
                      Learning
                    </span>
                  </div>

                </div>

                <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100 shadow-sm">

                  <img
                    src="/images/about-confidence.jpg"
                    alt="Mayfield Global School Students"
                    className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4">

                    <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/70">
                      Confidence
                    </span>

                    <p className="mt-1 text-sm font-black text-white">
                      Learn. Grow. Lead.
                    </p>

                  </div>

                </div>
              </div>
            </div>

            {/* =================================================
                MOBILE VIDEO
            ================================================== */}

            <div className="mt-5 flex min-h-0 flex-1 flex-col lg:hidden">

              <div className="relative min-h-0 flex-1 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-900 shadow-xl">

                <video
                  src="/videos/school-about.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">

                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.22em] text-amber-400">
                    Mayfield Global School
                  </p>

                  <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-4xl">
                    Where Every
                    <br />
                    Child Can{" "}
                    <span className="text-amber-400">
                      Shine.
                    </span>
                  </h2>

                </div>
              </div>

            </div>

            {/* =================================================
                BOTTOM CTA
            ================================================== */}

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="hidden sm:block">

                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Begin your child's journey
                </p>

                <p className="mt-1 text-[10px] font-medium text-slate-500">
                  Discover a place built for learning and growth.
                </p>

              </div>

              <div className="flex w-full gap-2.5 sm:w-auto">

                {/* APPLY */}
                <a
                  href="/apply"
                  onClick={handleClose}
                  className="popup-cta group relative flex h-11 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-900 px-5 text-[9px] font-black uppercase tracking-[0.16em] text-white shadow-[0_10px_30px_rgba(30,64,175,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900 sm:flex-none"
                >

                  <span className="popup-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  <span className="relative z-10">
                    Apply Now
                  </span>

                  <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-blue-900 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={12} />
                  </span>

                </a>

                {/* CALL */}
                <a
                  href="tel:+919472597721"
                  onClick={handleClose}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-[9px] font-black uppercase tracking-[0.16em] text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-900 hover:bg-blue-900 hover:text-white sm:flex-none"
                >
                  <Phone size={13} />

                  <span>
                    Talk To Us
                  </span>
                </a>

              </div>
            </div>
          </div>

          {/* Bottom premium accent */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-blue-600 via-violet-500 to-amber-400" />
        </div>
      </div>
    </>
  );
};

export default ContactFormPopup;