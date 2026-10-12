import React, { useEffect, useRef, useState } from "react";
import {
  Award,
  Trophy,
  Medal,
  Star,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
} from "lucide-react";

const AchievementSection = () => {
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
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      number: "01",
      icon: Trophy,
      title: "Academic Excellence",
      description:
        "Building strong academic foundations through focused learning, discipline and continuous growth.",
      accent: "blue",
    },
    {
      number: "02",
      icon: Medal,
      title: "Holistic Development",
      description:
        "Encouraging students to grow through academics, creativity, activities, leadership and participation.",
      accent: "indigo",
    },
    {
      number: "03",
      icon: Star,
      title: "Student Recognition",
      description:
        "Celebrating student achievements while building confidence, character and a spirit of excellence.",
      accent: "violet",
    },
  ];

  const accentMap = {
    blue: {
      iconBg: "bg-blue-50",
      iconText: "text-blue-700",
      line: "bg-blue-600",
      number: "text-blue-700",
      soft: "bg-blue-100/50",
    },
    indigo: {
      iconBg: "bg-indigo-50",
      iconText: "text-indigo-700",
      line: "bg-indigo-600",
      number: "text-indigo-700",
      soft: "bg-indigo-100/50",
    },
    violet: {
      iconBg: "bg-violet-50",
      iconText: "text-violet-700",
      line: "bg-violet-600",
      number: "text-violet-700",
      soft: "bg-violet-100/50",
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f1f5fa] font-sans"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-200/30 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-200/25 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #334155 1px, transparent 1px),
              linear-gradient(to bottom, #334155 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div
          className={`mb-8 flex flex-col gap-5 transition-all duration-1000 sm:mb-10 lg:flex-row lg:items-end lg:justify-between ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-9 bg-amber-400" />

              <span className="text-[8px] font-black uppercase tracking-[0.28em] text-amber-600">
                Achievements & Recognition
              </span>

              <Sparkles size={11} className="text-amber-500" />
            </div>

            <h2 className="max-w-[720px] text-3xl font-black uppercase leading-[0.95] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Celebrating
              <br />
              <span className="text-blue-900">
                Achievement & Excellence.
              </span>
            </h2>
          </div>

          <div className="max-w-[360px] lg:pb-1">
            <p className="text-[11px] leading-5 text-slate-500 sm:text-xs sm:leading-6">
              Every achievement reflects the dedication of our students,
              teachers and school community.
            </p>
          </div>
        </div>

        {/* =====================================================
            MAIN SHOWCASE
        ====================================================== */}
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {/* =================================================
              LEFT — VISUAL
          ================================================== */}
          <div
            className={`group relative overflow-hidden rounded-[28px] bg-slate-950 shadow-[0_25px_70px_rgba(15,23,42,0.14)] transition-all duration-[1200ms] ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* IMAGE */}
            <div className="relative h-[430px] sm:h-[480px] lg:h-[545px]">
              <img
                src="/images/trophy-or-campus.jpg"
                alt="Mayfield Global School achievements"
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.045]"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/10 to-slate-950/95" />

              <div className="absolute inset-0 bg-gradient-to-r from-blue-950/50 via-transparent to-transparent" />

              {/* TOP BADGE */}
              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 px-3 py-2 backdrop-blur-xl">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400">
                    <Award
                      size={14}
                      className="text-slate-950"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <p className="text-[7px] font-black uppercase tracking-[0.2em] text-white/55">
                      Mayfield Global School
                    </p>

                    <p className="text-[9px] font-bold text-white">
                      Excellence Since 2015
                    </p>
                  </div>
                </div>
              </div>

              {/* TOP RIGHT NUMBER */}
              <div className="absolute right-5 top-5 sm:right-7 sm:top-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                  <span className="text-[10px] font-black tracking-widest text-white">
                    01
                  </span>
                </div>
              </div>

              {/* DECORATIVE LINE */}
              <div className="absolute left-5 top-[43%] hidden h-px w-20 bg-white/30 sm:left-7 lg:block" />

              {/* BOTTOM CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-9">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-[2px] w-8 bg-amber-400" />

                  <span className="text-[8px] font-black uppercase tracking-[0.24em] text-white/60">
                    Our Journey
                  </span>
                </div>

                <h3 className="max-w-[580px] text-3xl font-black leading-[0.98] tracking-tight text-white sm:text-4xl lg:text-[48px]">
                  Where every
                  <br />
                  <span className="text-blue-200">
                    achievement matters.
                  </span>
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur-md">
                    Academic Growth
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur-md">
                    Student Development
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur-md">
                    Excellence
                  </span>
                </div>
              </div>

              {/* IMAGE FRAME */}
              <div className="pointer-events-none absolute inset-4 rounded-[22px] border border-white/10 sm:inset-5" />
            </div>

            {/* BOTTOM INFO BAR */}
            <div className="flex items-center justify-between bg-[#0c223b] px-5 py-3.5 sm:px-7">
              <div className="flex items-center gap-2">
                <GraduationCap size={13} className="text-amber-400" />

                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/50">
                  Learning • Growth • Excellence
                </span>
              </div>

              <ArrowUpRight
                size={14}
                className="text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber-400"
              />
            </div>
          </div>

          {/* =================================================
              RIGHT — ACHIEVEMENTS
          ================================================== */}
          <div
            className={`flex flex-col transition-all delay-150 duration-[1200ms] ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* SMALL HEADER */}
            <div className="mb-4 flex items-end justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-6 bg-blue-600" />

                  <span className="text-[8px] font-black uppercase tracking-[0.25em] text-blue-700">
                    Milestones
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase leading-none tracking-tight text-slate-900 sm:text-3xl">
                  Our
                  <span className="text-blue-900"> Achievements.</span>
                </h3>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Since
                </p>

                <p className="text-xl font-black tracking-tight text-slate-900">
                  2015
                </p>
              </div>
            </div>

            {/* CARDS */}
            <div className="flex flex-1 flex-col gap-3">
              {achievements.map((item, index) => {
                const Icon = item.icon;
                const accent = accentMap[item.accent];

                return (
                  <div
                    key={item.number}
                    className={`group relative flex-1 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)] sm:p-5 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${250 + index * 120}ms`,
                    }}
                  >
                    {/* SOFT HOVER SHAPE */}
                    <div
                      className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${accent.soft} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                    />

                    <div className="relative flex h-full gap-4">
                      {/* NUMBER COLUMN */}
                      <div className="flex w-10 shrink-0 flex-col items-center">
                        <span
                          className={`text-[10px] font-black tracking-widest ${accent.number}`}
                        >
                          {item.number}
                        </span>

                        <div className="mt-3 h-full w-px bg-slate-200 transition-colors duration-300 group-hover:bg-slate-300" />

                        <div
                          className={`mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] ${accent.iconBg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                        >
                          <Icon
                            size={18}
                            className={accent.iconText}
                            strokeWidth={1.8}
                          />
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="min-w-0 flex-1 pb-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="mb-1 text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">
                              Recognition
                            </p>

                            <h4 className="text-[17px] font-black tracking-tight text-slate-900 sm:text-[18px]">
                              {item.title}
                            </h4>
                          </div>

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-50 transition-all duration-300 group-hover:bg-blue-900">
                            <ArrowUpRight
                              size={12}
                              className="text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                            />
                          </div>
                        </div>

                        <p className="mt-2 max-w-[430px] text-[11px] leading-5 text-slate-500 sm:text-xs sm:leading-6">
                          {item.description}
                        </p>

                        {/* PROGRESS LINE */}
                        <div className="mt-4 h-[2px] overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full w-0 ${accent.line} transition-all duration-700 group-hover:w-full`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTTOM STATS */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="group rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50">
                    <GraduationCap
                      size={15}
                      className="text-blue-700"
                    />
                  </div>

                  <span className="text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Established
                  </span>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <p className="text-2xl font-black tracking-tight text-slate-900">
                    2015
                  </p>

                  <span className="text-[7px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Since
                  </span>
                </div>
              </div>

              <div className="group rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-50">
                    <Award size={15} className="text-violet-700" />
                  </div>

                  <span className="text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Affiliation
                  </span>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <p className="text-2xl font-black tracking-tight text-slate-900">
                    CBSE
                  </p>

                  <span className="text-[7px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    School
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM ACCENT
        ====================================================== */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

            <span className="ml-1 text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">
              Mayfield Global School
            </span>
          </div>

          <span className="hidden text-[7px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:block">
            Neora · Patna · Bihar
          </span>
        </div>
      </div>

      {/* =====================================================
          REDUCED MOTION
      ====================================================== */}
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

export default AchievementSection;