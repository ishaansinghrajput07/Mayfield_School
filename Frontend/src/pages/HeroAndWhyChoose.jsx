import React from "react";
import {
  Users,
  GraduationCap,
  Award,
  Globe,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const HeroAndWhyChoose = () => {
  return (
    <div className="relative w-full overflow-hidden bg-slate-100/70 font-sans text-slate-800">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section className="relative flex h-[85vh] min-h-[550px] max-h-[780px] w-full items-center justify-center overflow-hidden">

        {/* =======================================================
            VIDEO BACKGROUND
        ======================================================= */}

        <div className="absolute inset-0 overflow-hidden">

          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="/videos/school-hero.mp4"
              type="video/mp4"
            />
          </video>

          {/* Slow cinematic zoom layer */}
          <div className="hero-video-zoom absolute inset-0" />

          {/* Light dark overlay — reduced so video stays visible */}
          <div className="absolute inset-0 bg-slate-950/30" />

          {/* Subtle bottom readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />

          {/* Very subtle cinematic vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.18)_100%)]" />

          {/* ===================================================
              SOFT ATMOSPHERIC GLOWS
              Very subtle — background remains clearly visible
          =================================================== */}

          <div className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-blue-500/[0.045] blur-[150px]" />

          <div className="absolute -right-32 bottom-10 h-[380px] w-[380px] rounded-full bg-amber-400/[0.045] blur-[150px]" />

          {/* Moving light sweep */}
          <div className="hero-light-sweep pointer-events-none absolute inset-y-0 -left-[35%] w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.045] to-transparent" />

        </div>


        {/* =======================================================
            SMALL MOVING BACKGROUND PARTICLES
        ======================================================= */}

        <span className="hero-particle hero-particle-1" />
        <span className="hero-particle hero-particle-2" />
        <span className="hero-particle hero-particle-3" />
        <span className="hero-particle hero-particle-4" />


        {/* =======================================================
            HERO CONTENT
        ======================================================= */}

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center -mt-10 md:-mt-14">

          {/* Top Badge */}
          <div className="hero-content-animation inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-300 shadow-[0_10px_40px_rgba(245,158,11,0.08)] backdrop-blur-md sm:text-sm">

            <span className="relative flex h-4 w-4 items-center justify-center">

              <span className="absolute h-4 w-4 animate-ping rounded-full bg-amber-400/20" />

              <Sparkles className="relative h-4 w-4 text-amber-400" />

            </span>

            <span>Empowering Young Minds Since 2015</span>

          </div>


          {/* Main Heading */}
          <h1 className="hero-content-animation-delay-1 mt-5 text-3xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-7xl">

            MAYFIELD{" "}

            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              GLOBAL SCHOOL
            </span>

          </h1>


          {/* Subtitle */}
          <p className="hero-content-animation-delay-2 mt-4 max-w-2xl text-xs font-medium uppercase tracking-[3px] text-slate-300 drop-shadow sm:text-sm sm:tracking-[5px] md:text-base">

            KNOWLEDGE IS POWER | CBSE AFFILIATED (NURSERY TO CLASS 12)

          </p>


          {/* CTA Buttons */}
          <div className="hero-content-animation-delay-3 mt-8 flex flex-wrap items-center justify-center gap-4">

            <a
              href="/apply"
              className="group flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-[0_15px_40px_rgba(245,158,11,0.20)] transition-all duration-500 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.30)] active:scale-95 sm:text-sm"
            >

              <span>Apply for Admission</span>

              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />

            </a>


            <a
              href="#tour"
              className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold text-white shadow-[0_10px_35px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/20 active:scale-95 sm:text-sm"
            >

              <span>Explore Campus</span>

              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 transition-transform duration-500 group-hover:scale-150" />

            </a>

          </div>


          {/* Slider Indicators */}
          <div className="hero-content-animation-delay-4 mt-10 flex items-center gap-3 text-amber-400/80">

            <span className="cursor-pointer text-lg font-light transition-transform hover:-translate-x-1">
              &larr;
            </span>

            <span className="h-[2px] w-12 rounded-full bg-amber-400/60" />

            <span className="cursor-pointer text-lg font-light transition-transform hover:translate-x-1">
              &rarr;
            </span>

          </div>

        </div>


        {/* =======================================================
            BOTTOM GLASS EDGE
        ======================================================= */}

        <div className="absolute bottom-0 left-0 right-0 z-20 h-20 bg-gradient-to-t from-slate-950/30 to-transparent" />

        <div className="absolute bottom-0 left-1/2 z-20 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      </section>


      {/* =========================================================
          WHY CHOOSE US CARD
      ========================================================= */}

      <section className="relative z-20 mx-auto -mt-28 max-w-6xl px-4 pb-20 md:-mt-36">

        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-2xl md:grid-cols-12">


          {/* =====================================================
              LEFT IMAGE
          ===================================================== */}

          <div className="relative h-72 min-h-[300px] md:col-span-5 md:h-auto">

            <img
              src="/images/trophy-or-campus.jpg"
              alt="Mayfield Global School Campus"
              className="h-full w-full object-cover object-center transition-transform duration-[1800ms] hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />


            {/* Floating Image Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-2.5 text-white shadow-lg backdrop-blur-md">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-sm font-black text-slate-950">
                10+
              </div>

              <div>

                <p className="text-xs font-bold leading-none text-slate-100">
                  Years of Excellence
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Established in 2015
                </p>

              </div>

            </div>

          </div>


          {/* =====================================================
              RIGHT CONTENT
          ===================================================== */}

          <div className="flex flex-col justify-center bg-white p-6 md:col-span-7 sm:p-8 md:p-10">

            {/* Sub-tag */}
            <div className="mb-3">

              <span className="rounded-md border border-amber-200/60 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-600">
                Quality Education
              </span>

            </div>


            {/* Heading */}
            <h2 className="mb-3 text-2xl font-black uppercase tracking-tight text-slate-900 sm:text-3xl">
              WHY CHOOSE MAYFIELD?
            </h2>


            {/* Description */}
            <p className="mb-8 text-xs leading-relaxed text-slate-600 sm:text-sm">

              At Mayfield Global School, we believe in providing quality
              education that builds knowledge, develops character, and
              prepares students for a successful future. A co-educational,
              CBSE-affiliated institution offering education from Nursery
              to Senior Secondary (Class 12).

            </p>


            {/* =================================================
                FEATURE CARDS
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


              {/* Card 1 */}
              <div className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-amber-400 shadow-md shadow-blue-900/10 transition-transform duration-500 group-hover:scale-105">

                  <Award className="h-5 w-5 stroke-[2]" />

                </div>

                <div>

                  <h3 className="text-sm font-bold leading-tight text-slate-900 sm:text-base">
                    2015
                  </h3>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Established Year
                  </p>

                </div>

              </div>


              {/* Card 2 */}
              <div className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-amber-400 shadow-md shadow-blue-900/10 transition-transform duration-500 group-hover:scale-105">

                  <GraduationCap className="h-5 w-5 stroke-[2]" />

                </div>

                <div>

                  <h3 className="text-sm font-bold leading-tight text-slate-900 sm:text-base">
                    CBSE Board
                  </h3>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Fully Affiliated
                  </p>

                </div>

              </div>


              {/* Card 3 */}
              <div className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-amber-400 shadow-md shadow-blue-900/10 transition-transform duration-500 group-hover:scale-105">

                  <Globe className="h-5 w-5 stroke-[2]" />

                </div>

                <div>

                  <h3 className="text-sm font-bold leading-tight text-slate-900 sm:text-base">
                    Class 12
                  </h3>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Nursery to Sr. Sec.
                  </p>

                </div>

              </div>


              {/* Card 4 */}
              <div className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-lg">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-amber-400 shadow-md shadow-blue-900/10 transition-transform duration-500 group-hover:scale-105">

                  <Users className="h-5 w-5 stroke-[2]" />

                </div>

                <div>

                  <h3 className="text-sm font-bold leading-tight text-slate-900 sm:text-base">
                    Co-Ed Campus
                  </h3>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Inclusive Growth
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FLOATING BACK TO TOP
      ========================================================= */}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 rounded-2xl border border-slate-700 bg-slate-900 p-3.5 text-amber-400 shadow-2xl transition-all hover:scale-110 hover:bg-slate-800 active:scale-95"
        aria-label="Back to top"
      >

        <span className="block text-base font-black">
          &uarr;
        </span>

      </button>


      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`

        /* =========================================
           VIDEO CINEMATIC ZOOM
        ========================================= */

        @keyframes heroVideoZoom {

          0% {
            transform: scale(1.02);
          }

          50% {
            transform: scale(1.08);
          }

          100% {
            transform: scale(1.02);
          }

        }

        .hero-video-zoom {
          animation: heroVideoZoom 18s ease-in-out infinite;
          background: transparent;
        }


        /* =========================================
           LIGHT SWEEP
        ========================================= */

        @keyframes heroLightSweep {

          0% {
            left: -40%;
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          50% {
            opacity: 1;
          }

          75% {
            opacity: 0;
          }

          100% {
            left: 140%;
            opacity: 0;
          }

        }

        .hero-light-sweep {
          animation: heroLightSweep 10s ease-in-out infinite;
        }


        /* =========================================
           PARTICLES
        ========================================= */

        @keyframes heroParticleFloat {

          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.15;
          }

          50% {
            transform: translate3d(25px, -35px, 0);
            opacity: 0.7;
          }

        }

        .hero-particle {
          position: absolute;
          z-index: 5;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(251, 191, 36, 0.75);
          box-shadow: 0 0 18px rgba(251, 191, 36, 0.55);
          animation: heroParticleFloat 7s ease-in-out infinite;
        }

        .hero-particle-1 {
          left: 15%;
          top: 30%;
          animation-delay: 0s;
        }

        .hero-particle-2 {
          right: 18%;
          top: 26%;
          animation-delay: 1.5s;
        }

        .hero-particle-3 {
          left: 25%;
          bottom: 25%;
          animation-delay: 3s;
        }

        .hero-particle-4 {
          right: 30%;
          bottom: 30%;
          animation-delay: 4.5s;
        }


        /* =========================================
           CONTENT ENTRANCE
        ========================================= */

        @keyframes heroContentReveal {

          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .hero-content-animation {
          animation: heroContentReveal 1s ease-out 0.2s both;
        }

        .hero-content-animation-delay-1 {
          animation: heroContentReveal 1s ease-out 0.4s both;
        }

        .hero-content-animation-delay-2 {
          animation: heroContentReveal 1s ease-out 0.6s both;
        }

        .hero-content-animation-delay-3 {
          animation: heroContentReveal 1s ease-out 0.8s both;
        }

        .hero-content-animation-delay-4 {
          animation: heroContentReveal 1s ease-out 1s both;
        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .hero-video-zoom,
          .hero-light-sweep,
          .hero-particle {
            animation: none;
          }

        }

      `}</style>

    </div>
  );
};

export default HeroAndWhyChoose;