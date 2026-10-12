import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Play } from "lucide-react";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#eef3f9] font-sans text-slate-800"
    >
      {/* =========================================================
          OUTER BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft Blue */}
        <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-[120px]" />

        {/* Soft Violet */}
        <div className="absolute -right-32 top-32 h-[420px] w-[420px] rounded-full bg-violet-200/35 blur-[130px]" />

        {/* Warm Amber */}
        <div className="absolute bottom-[-180px] left-1/3 h-[400px] w-[500px] rounded-full bg-amber-100/50 blur-[130px]" />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #64748b 1px, transparent 1px),
              linear-gradient(to bottom, #64748b 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Decorative Rings */}
        <div className="absolute right-[7%] top-[10%] h-[300px] w-[300px] rounded-full border border-blue-300/20" />

        <div className="absolute right-[11%] top-[15%] h-[180px] w-[180px] rounded-full border border-violet-300/20" />

        <div className="absolute bottom-[8%] left-[5%] h-[160px] w-[160px] rounded-full border border-blue-200/30" />
      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`
        .about-video {
          animation: aboutVideoZoom 16s ease-out forwards;
        }

        @keyframes aboutVideoZoom {
          from {
            transform: scale(1);
          }

          to {
            transform: scale(1.045);
          }
        }

        .about-image {
          transition:
            transform 1000ms cubic-bezier(.2,.65,.25,1),
            filter 700ms ease;
        }

        .about-image-card:hover .about-image {
          transform: scale(1.05);
          filter: saturate(1.08);
        }

        .about-sweep {
          transform: translateX(-180%) rotate(18deg);
          transition: transform 1200ms ease;
        }

        .about-image-card:hover .about-sweep {
          transform: translateX(400%) rotate(18deg);
        }

        .about-float {
          animation: aboutFloat 6s ease-in-out infinite;
        }

        @keyframes aboutFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        .about-pulse {
          animation: aboutPulse 3s ease-in-out infinite;
        }

        @keyframes aboutPulse {
          0%,
          100% {
            opacity: .45;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        .about-read-more:hover .about-arrow {
          transform: translateX(5px);
        }

        .about-arrow {
          transition:
            transform 400ms ease,
            background-color 400ms ease;
        }

        .about-read-more:hover .about-arrow {
          background-color: #f59e0b;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-video,
          .about-float,
          .about-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* =========================================================
          MAIN WHITE CONTAINER
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-[1450px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="relative overflow-hidden rounded-[28px] border border-white/90 bg-white px-5 py-8 shadow-[0_30px_100px_rgba(30,64,175,0.10)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          {/* =====================================================
              INNER WHITE CARD DECORATION
          ===================================================== */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-blue-50/80" />

            <div className="absolute -bottom-32 -left-20 h-[300px] w-[300px] rounded-full bg-violet-50/70" />

            <div className="absolute right-[30%] top-0 h-px w-[25%] bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

            <div className="absolute bottom-0 left-[20%] h-px w-[30%] bg-gradient-to-r from-transparent via-violet-100 to-transparent" />
          </div>

          <div className="relative z-10">
            {/* ===================================================
                HEADER
            =================================================== */}

            <div
              className={`mb-8 grid grid-cols-1 gap-5 transition-all duration-1000 lg:grid-cols-12 lg:items-end ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {/* LEFT */}

              <div className="lg:col-span-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-10 bg-amber-400" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-amber-600">
                    About Mayfield
                  </span>

                  <span className="about-pulse h-1.5 w-1.5 rounded-full bg-amber-400" />
                </div>

                <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  More Than <span className="text-blue-900">A School.</span>
                </h2>
              </div>

              {/* RIGHT */}

              <div className="lg:col-span-4">
                <p className="max-w-md border-l-2 border-blue-100 pl-5 text-xs leading-6 text-slate-600 sm:text-sm">
                  A learning community focused on knowledge, character and
                  confidence — preparing students for a meaningful future.
                </p>
              </div>
            </div>

            {/* ===================================================
                MAIN CONTENT
            =================================================== */}

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-8">
              {/* =================================================
                  VIDEO
              ================================================= */}

              <div className="lg:col-span-7">
                <div
                  className={`about-image-card group relative transition-all duration-1000 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{
                    transitionDelay: "150ms",
                  }}
                >
                  {/* Decorative Frame */}

                  <div className="absolute -bottom-3 -right-3 left-4 top-4 border border-amber-400/30" />

                  <div className="relative h-[360px] overflow-hidden rounded-sm bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.25)] sm:h-[420px] lg:h-[470px]">
                    <video
                      src="/videos/school-about.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="about-video h-full w-full object-cover"
                    />

                    {/* Video Overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />

                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/35 via-transparent to-transparent" />

                    {/* Number */}

                    <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                      <span className="text-6xl font-black leading-none text-white/10 sm:text-7xl">
                        01
                      </span>
                    </div>

                    {/* Identity Card */}

                    <div className="about-float absolute right-4 top-4 w-[165px] border border-white/15 bg-slate-950/55 p-3.5 backdrop-blur-xl sm:right-6 sm:top-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-slate-400">
                          Our Identity
                        </span>

                        <span className="about-pulse h-1.5 w-1.5 rounded-full bg-amber-400" />
                      </div>

                      <p className="mt-3 text-lg font-black tracking-tight text-white">
                        MAYFIELD
                      </p>

                      <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.2em] text-amber-400">
                        Global School
                      </p>
                    </div>

                    {/* Play */}

                    <button
                      type="button"
                      aria-label="Play school video"
                      className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-amber-400 hover:text-slate-950"
                    >
                      <Play
                        className="ml-0.5 h-4 w-4 fill-current"
                        strokeWidth={1.5}
                      />
                    </button>

                    {/* Bottom Content */}

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="h-px w-8 bg-amber-400" />

                        <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-slate-300">
                          The Mayfield Experience
                        </span>
                      </div>

                      <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-4xl">
                        Learn.
                        <br />
                        Grow. <span className="text-amber-400">Become.</span>
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[7px] font-bold uppercase tracking-widest text-slate-200 backdrop-blur-md">
                          Since 2015
                        </span>

                        <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[7px] font-bold uppercase tracking-widest text-slate-200 backdrop-blur-md">
                          CBSE
                        </span>
                      </div>
                    </div>

                    {/* Sweep */}

                    <div className="about-sweep pointer-events-none absolute left-[-30%] top-[-20%] h-[150%] w-[22%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl" />
                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT CONTENT CARD
              ================================================= */}

              <div className="lg:col-span-5">
                <div
                  className={`relative h-full transition-all duration-1000 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{
                    transitionDelay: "300ms",
                  }}
                >
                  <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-slate-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-8">
                    {/* Decorative Circle */}

                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-blue-100" />

                    <div className="absolute right-5 top-5 text-5xl font-black text-slate-900/[0.045]">
                      02
                    </div>

                    {/* Content */}

                    <div className="relative">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="h-px w-8 bg-amber-400" />

                        <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-amber-600">
                          Who We Are
                        </span>
                      </div>

                      <h3 className="max-w-lg text-3xl font-black uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-4xl">
                        A School Built
                        <br />
                        Around{" "}
                        <span className="text-blue-900">Possibilities.</span>
                      </h3>

                      <p className="mt-5 max-w-lg text-xs leading-6 text-slate-600 sm:text-sm">
                        Mayfield Global School combines strong academics with
                        meaningful experiences, helping students develop
                        knowledge, character and confidence.
                      </p>

                      {/* =================================================
                          IMAGE FEATURES
                      ================================================= */}

                      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
                        {/* Knowledge */}

                        <div className="group relative h-[125px] overflow-hidden rounded-sm border border-slate-200 bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:h-[145px]">
                          <img
                            src="/images/school-calendar.jpg"
                            alt="Students learning at Mayfield Global School"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />

                          <div className="absolute left-3 top-3">
                            <span className="text-[8px] font-black tracking-[0.2em] text-white/70">
                              01
                            </span>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-amber-400">
                              Learning
                            </p>

                            <p className="mt-1 text-sm font-black uppercase tracking-tight text-white sm:text-base">
                              Knowledge
                            </p>
                          </div>
                        </div>

                        {/* Character */}

                        <div className="group relative h-[125px] overflow-hidden rounded-sm border border-slate-200 bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:h-[145px]">
                          <img
                            src="/images/newsletter.jpg"
                            alt="Students developing character at Mayfield Global School"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />

                          <div className="absolute left-3 top-3">
                            <span className="text-[8px] font-black tracking-[0.2em] text-white/70">
                              02
                            </span>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-amber-400">
                              Values
                            </p>

                            <p className="mt-1 text-sm font-black uppercase tracking-tight text-white sm:text-base">
                              Character
                            </p>
                          </div>
                        </div>

                        {/* Confidence */}

                        <div className="group relative h-[125px] overflow-hidden rounded-sm border border-slate-200 bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:h-[145px]">
                          <img
                            src="/images/about-confidence.jpg"
                            alt="Students building confidence at Mayfield Global School"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />

                          <div className="absolute left-3 top-3">
                            <span className="text-[8px] font-black tracking-[0.2em] text-white/70">
                              03
                            </span>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-amber-400">
                              Growth
                            </p>

                            <p className="mt-1 text-sm font-black uppercase tracking-tight text-white sm:text-base">
                              Confidence
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        BOTTOM CTA
                    ================================================= */}

                    <div className="relative mt-7 border-t border-slate-200 pt-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-amber-600">
                            Our Journey
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-500">
                            Established in 2015
                          </p>
                        </div>

                        <a
                          href="/about"
                          className="about-read-more group flex items-center gap-3"
                        >
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-900">
                            Read More
                          </span>

                          <span className="about-arrow flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-white">
                            <ArrowRight size={14} strokeWidth={2} />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================
                BOTTOM STRIP
            =================================================== */}

            <div
              className={`mt-7 flex flex-col gap-3 border-t border-slate-200 pt-5 transition-all duration-1000 sm:flex-row sm:items-center sm:justify-between ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{
                transitionDelay: "550ms",
              }}
            >
              <div className="flex items-center gap-3">
                <BookOpen size={15} className="text-blue-900" />

                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Knowledge · Character · Confidence
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-amber-400/70" />

                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Mayfield Global School · Neora
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
