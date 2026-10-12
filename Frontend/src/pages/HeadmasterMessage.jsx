import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Quote,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const HeadmasterMessage = () => {
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
        threshold: 0.12,
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
      className="relative w-full overflow-hidden bg-[#edf3f9] font-sans"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Soft blue */}
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-blue-200/30 blur-[120px]" />

        {/* Soft violet */}
        <div className="absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-200/30 blur-[120px]" />

        {/* Warm accent */}
        <div className="absolute bottom-[-180px] left-[35%] h-[350px] w-[450px] rounded-full bg-amber-100/40 blur-[120px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #475569 1px, transparent 1px),
              linear-gradient(to bottom, #475569 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className={`mb-6 flex flex-col gap-3 transition-all duration-1000 sm:flex-row sm:items-end sm:justify-between ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >

          <div>

            <div className="mb-2 flex items-center gap-3">

              <span className="h-px w-9 bg-amber-400" />

              <span className="text-[8px] font-black uppercase tracking-[0.28em] text-amber-600">
                Leadership
              </span>

              <Sparkles
                size={11}
                className="text-amber-500"
              />

            </div>

            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              A Message From{" "}
              <span className="text-blue-900">
                Our Principal.
              </span>
            </h2>

          </div>

          <p className="max-w-xs text-[10px] leading-5 text-slate-500 sm:text-right">
            Leading with purpose. Inspiring every learner.
          </p>

        </div>

        {/* ===================================================
            MAIN CARD
        =================================================== */}

        <div
          className={`relative overflow-hidden rounded-[26px] border border-white/80 bg-white shadow-[0_25px_80px_rgba(30,64,175,0.10)] transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >

          {/* Card decoration */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-blue-50/80" />

            <div className="absolute -bottom-24 left-[30%] h-[250px] w-[250px] rounded-full bg-violet-50/70" />

            <div className="absolute right-8 top-8 text-[150px] font-black leading-none tracking-[-0.12em] text-blue-900/[0.025]">
              01
            </div>

          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="relative z-10 grid lg:grid-cols-[0.85fr_1.15fr]">

            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="relative p-4 sm:p-5 lg:p-6">

              <div className="absolute bottom-2 right-2 left-3 top-3 border border-amber-400/30" />

              <div className="group relative overflow-hidden rounded-[20px] bg-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.18)]">

                <div className="relative h-[360px] sm:h-[400px] lg:h-[420px]">

                  <img
                    src="/images/headmaster-office.jpg"
                    alt="Mr. Nishant Singh, Principal of Mayfield Global School"
                    className={`h-full w-full object-cover object-center transition-all duration-[1600ms] ease-out ${
                      isVisible
                        ? "scale-100 opacity-100"
                        : "scale-[1.08] opacity-0"
                    } group-hover:scale-105`}
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

                  {/* Top badge */}

                  <div className="absolute left-4 top-4">

                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/90 px-3 py-2 backdrop-blur-md">

                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

                      <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-900">
                        School Leadership
                      </span>

                    </div>

                  </div>

                  {/* Bottom identity */}

                  <div className="absolute bottom-5 left-5 right-5">

                    <div className="flex items-end justify-between gap-4">

                      <div>

                        <p className="mb-1 text-[7px] font-bold uppercase tracking-[0.25em] text-white/55">
                          Principal
                        </p>

                        <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                          Mr. Nishant Singh
                        </h3>

                        <div className="mt-2 flex items-center gap-2">

                          <span className="h-px w-7 bg-amber-400" />

                          <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/55">
                            Mayfield Global School
                          </span>

                        </div>

                      </div>

                      <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md sm:flex">

                        <GraduationCap
                          size={17}
                          className="text-white"
                          strokeWidth={1.5}
                        />

                      </div>

                    </div>

                  </div>

                </div>

                {/* Image bottom bar */}

                <div className="flex items-center justify-between bg-[#0e2a47] px-4 py-2.5">

                  <div className="flex items-center gap-2">

                    <Sparkles
                      size={12}
                      className="text-amber-400"
                    />

                    <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Leadership Message
                    </span>

                  </div>

                  <span className="text-[7px] font-bold tracking-widest text-white/25">
                    01 / 04
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                MESSAGE
            ================================================= */}

            <div className="flex items-center px-5 py-7 sm:px-8 sm:py-9 lg:px-10 xl:px-12">

              <div className="w-full">

                {/* Quote */}

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-blue-900 shadow-lg">

                    <Quote
                      size={18}
                      strokeWidth={1.5}
                      className="text-amber-400"
                    />

                  </div>

                  <div className="hidden items-center gap-2 sm:flex">

                    <span className="h-px w-8 bg-slate-200" />

                    <span className="text-[7px] font-black uppercase tracking-[0.22em] text-slate-400">
                      Principal's Message
                    </span>

                  </div>

                </div>

                {/* Main Quote */}

                <h3
                  className={`max-w-[650px] text-2xl font-black uppercase leading-[1.05] tracking-tight text-slate-900 transition-all duration-1000 sm:text-3xl lg:text-[34px] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                >
                  Every child has{" "}
                  <span className="text-blue-900">
                    potential.
                  </span>

                  <br />

                  Our role is to help them{" "}
                  <span className="text-amber-500">
                    discover it.
                  </span>
                </h3>

                {/* Divider */}

                <div className="my-5 flex items-center gap-2">

                  <span className="h-[2px] w-12 rounded-full bg-amber-400" />

                  <span className="h-px w-14 bg-amber-400/20" />

                </div>

                {/* Short Message */}

                <p
                  className={`max-w-[600px] text-xs leading-6 text-slate-600 transition-all duration-1000 sm:text-sm ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                >
                  At Mayfield Global School, we create an environment where
                  students learn with confidence, grow with values and prepare
                  themselves for the future.
                </p>

                {/* =================================================
                    MINI HIGHLIGHTS
                ================================================= */}

                <div className="mt-6 grid grid-cols-3 gap-2.5">

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">

                    <p className="text-lg font-black tracking-tight text-blue-900">
                      2015
                    </p>

                    <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Established
                    </p>

                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">

                    <p className="text-lg font-black tracking-tight text-blue-900">
                      K–12
                    </p>

                    <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Education
                    </p>

                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">

                    <p className="text-lg font-black tracking-tight text-blue-900">
                      CBSE
                    </p>

                    <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Affiliated
                    </p>

                  </div>

                </div>

                {/* Signature + CTA */}

                <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-lg font-black tracking-tight text-slate-900">
                      Mr. Nishant Singh
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="h-px w-5 bg-amber-400" />

                      <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-amber-600">
                        Principal
                      </span>

                    </div>

                  </div>

                  <a
                    href="#read-more"
                    className="group inline-flex w-fit items-center gap-2 rounded-full bg-blue-900 py-1.5 pl-4 pr-1.5 text-[8px] font-black uppercase tracking-[0.16em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
                  >

                    <span>
                      Read Full Message
                    </span>

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-900 transition-all duration-300 group-hover:rotate-45 group-hover:bg-amber-400">

                      <ArrowUpRight size={13} />

                    </span>

                  </a>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              BOTTOM STRIP
          ================================================= */}

          <div className="grid grid-cols-3 border-t border-slate-200 bg-slate-50/80">

            <div className="border-r border-slate-200 px-4 py-3 text-center">

              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">
                Knowledge
              </p>

            </div>

            <div className="border-r border-slate-200 px-4 py-3 text-center">

              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">
                Character
              </p>

            </div>

            <div className="px-4 py-3 text-center">

              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">
                Confidence
              </p>

            </div>

          </div>

          {/* Bottom Accent */}

          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-violet-500 to-amber-400" />

        </div>

      </div>

      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
            animation: none !important;
            transition-duration: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeadmasterMessage;