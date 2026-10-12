import React, { useEffect, useRef, useState } from "react";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Eye,
  Phone,
  Trophy,
  X,
} from "lucide-react";

/* =========================================================
   MAYFIELD GLOBAL SCHOOL — PREMIUM ABOUT PAGE
   DESIGN: WHITE + BLACK + RED + GOLD
   RED = ACCENT ONLY
   ========================================================= */

const schoolInfo = {
  name: "Mayfield Global School",
  established: "2015",
  principal: "Mr. Nishant Singh",
  affiliation: "330935",
  udise: "10280701603",
  schoolCode: "66654",
  curriculum: "Nursery to Senior Secondary",
  address: "Neora Ganjipar, Sarai Neoraganj Road, Patna, Bihar — 801113",
  phones: ["+91 9472597721", "+91 9835218820", "+91 8409975011"],
  emails: ["mayfieldglobalschoolpatna@gmail.com", "mgschoolpatna17@gmail.com"],
};

const RED = "#E51F2B";
const DARK_RED = "#C81724";
const BLACK = "#171717";
const GOLD = "#C5A34A";
const LIGHT_RED = "#FFF7F7";

/* =========================================================
   REVEAL COMPONENT
   ========================================================= */

const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: "translate3d(0, 45px, 0)",
    down: "translate3d(0, -45px, 0)",
    left: "translate3d(-55px, 0, 0)",
    right: "translate3d(55px, 0, 0)",
  };

  return (
    <div
      ref={ref}
      style={{
        transform: visible ? "translate3d(0,0,0)" : transforms[direction],
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${className}`}
    >
      {children}
    </div>
  );
};

/* =========================================================
   ICON BOX
   ========================================================= */

const IconBox = ({
  icon: Icon,
  iconColor = RED,
  bgColor = LIGHT_RED,
  size = "normal",
}) => {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl ${
        size === "large" ? "h-16 w-16" : "h-12 w-12"
      }`}
      style={{
        backgroundColor: bgColor,
        color: iconColor,
      }}
    >
      <Icon size={size === "large" ? 28 : 22} strokeWidth={1.8} />
    </div>
  );
};

/* =========================================================
   SECTION LABEL
   ========================================================= */

const SectionLabel = ({ children, centered = false }) => (
  <div
    className={`mb-5 flex items-center gap-3 ${
      centered ? "justify-center" : ""
    }`}
  >
    <span className="h-px w-9 bg-[#E51F2B]" />

    <span className="text-[10px] font-bold uppercase tracking-[.3em] text-[#C81724]">
      {children}
    </span>

    {centered && <span className="h-px w-9 bg-[#E51F2B]" />}
  </div>
);

/* =========================================================
   MAIN PAGE
   ========================================================= */

const AboutPage = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  // Principal's Guidance animation
  const principalSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = principalSectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -80px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* -------------------------------------------------------
     VIDEO BODY LOCK
  ------------------------------------------------------- */

  useEffect(() => {
    if (!videoOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [videoOpen]);

  /* -------------------------------------------------------
     ESCAPE CLOSE
  ------------------------------------------------------- */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#171717]">
      {/* =====================================================
          CUSTOM ANIMATIONS
      ====================================================== */}

      <style>{`
        :root {
          --school-red: #E51F2B;
          --school-dark-red: #C81724;
          --school-black: #171717;
          --school-white: #FFFFFF;
          --school-gold: #C5A34A;
        }

        /* -------------------------------
           FLOATING ANIMATIONS
        -------------------------------- */

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-12px) rotate(1deg);
          }
        }

        @keyframes floatCardOne {
          0%, 100% {
            transform: translate3d(0,0,0) rotate(-8deg);
          }

          50% {
            transform: translate3d(0,-14px,0) rotate(-6deg);
          }
        }

        @keyframes floatCardTwo {
          0%, 100% {
            transform: translate3d(0,0,0) rotate(5deg);
          }

          50% {
            transform: translate3d(0,-18px,0) rotate(7deg);
          }
        }

        @keyframes floatCardThree {
          0%, 100% {
            transform: translate3d(0,0,0) rotate(-2deg);
          }

          50% {
            transform: translate3d(0,-10px,0) rotate(1deg);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-120%);
          }

          50%, 100% {
            transform: translateX(140%);
          }
        }

        @keyframes lineMove {
          0% {
            transform: translateX(-20%);
          }

          100% {
            transform: translateX(120%);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: .06;
            transform: scale(.96);
          }

          50% {
            opacity: .12;
            transform: scale(1.03);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slowZoom {
          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.055);
          }
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        /* -------------------------------
           ANIMATION CLASSES
        -------------------------------- */

        .hero-card-one {
          animation: floatCardOne 5.5s ease-in-out infinite;
        }

        .hero-card-two {
          animation: floatCardTwo 6.5s ease-in-out infinite;
        }

        .hero-card-three {
          animation: floatCardThree 5.8s ease-in-out infinite;
        }

        .slow-float {
          animation: floatSlow 5s ease-in-out infinite;
        }

        .moving-line {
          animation: lineMove 4s linear infinite;
        }

        .pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .orbit-ring {
          animation: orbit 22s linear infinite;
        }

        .slow-zoom {
          animation: slowZoom 9s ease-in-out infinite;
        }

        .marquee-track {
          animation: marquee 28s linear infinite;
        }

        /* -------------------------------
           SHINE
        -------------------------------- */

        .shine-effect {
          position: relative;
        }

        .shine-effect::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 35%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.32),
            transparent
          );
          transform: translateX(-120%);
          animation: shine 5s ease-in-out infinite;
          pointer-events: none;
        }

        /* -------------------------------
           PRIMARY BUTTON
        -------------------------------- */

        .school-primary-btn {
          background: linear-gradient(
            135deg,
            #E51F2B 0%,
            #C81724 100%
          );

          color: white;

          box-shadow:
            0 10px 25px rgba(23,23,23,.14);

          transition:
            transform .35s ease,
            box-shadow .35s ease,
            background .35s ease;
        }

        .school-primary-btn:hover {
          transform: translateY(-3px);

          box-shadow:
            0 16px 32px rgba(23,23,23,.18);
        }

        /* -------------------------------
           HERO LIGHT
           VERY SUBTLE
        -------------------------------- */

        .school-red-glow {
          background: radial-gradient(
            circle,
            rgba(229,31,43,.035) 0%,
            rgba(229,31,43,.015) 38%,
            transparent 68%
          );
        }

        /* -------------------------------
           ACCESSIBILITY
        -------------------------------- */

        @media (prefers-reduced-motion: reduce) {
          .hero-card-one,
          .hero-card-two,
          .hero-card-three,
          .slow-float,
          .pulse-glow,
          .orbit-ring,
          .slow-zoom,
          .marquee-track,
          .moving-line {
            animation: none !important;
          }
        }

        /* -------------------------------
           MOBILE
        -------------------------------- */

        @media (max-width: 640px) {
          .hero-card-one {
            left: 0;
          }

          .hero-card-two {
            right: 0;
          }

          .hero-card-three {
            left: 20%;
          }
        }
      `}</style>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[500px] overflow-hidden bg-[#171717] lg:min-h-[570px]">
        {/* BACKGROUND */}

        <div className="absolute inset-0">
          {/* Actual Background Image */}
          <img
            src="/images/hero-building.jpg"
            alt="Mayfield Global School"
            className="h-full w-full object-cover opacity-[0.62]"
          />

          {/* 
            DARK OVERLAY
            Kept light so the campus image remains visible.
          */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,23,23,.90)_0%,rgba(23,23,23,.68)_34%,rgba(23,23,23,.34)_64%,rgba(23,23,23,.12)_100%)]" />

          {/* 
            Very subtle bottom cinematic shade.
            This does NOT hide the image.
          */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,.08)_0%,transparent_45%,rgba(23,23,23,.30)_100%)]" />

          {/* Extremely subtle red accent */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_42%,rgba(229,31,43,.045),transparent_28%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[500px] max-w-[1440px] items-center px-[30px] py-16 lg:min-h-[570px] lg:py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_.95fr] lg:gap-12">
            {/* LEFT */}

            <Reveal direction="left">
              <div className="max-w-[650px]">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#E51F2B]" />

                  <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#EAC66C]">
                    Est. {schoolInfo.established} · Patna
                  </span>
                </div>

                <h1 className="max-w-[650px] text-4xl font-black leading-[.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-[64px]">
                  Shaping Minds.
                  <span className="block text-[#EAC66C]">
                    Building Futures.
                  </span>
                </h1>

                <p className="mt-6 max-w-[590px] text-sm leading-7 text-white/70 sm:text-base">
                  Discover the vision, values and journey behind Mayfield Global
                  School — a learning community committed to nurturing
                  confident, curious and responsible young minds.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#school-story"
                    className="school-primary-btn group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-bold"
                  >
                    Explore Our Story
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>

                  <a
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                  >
                    Apply Now
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <div className="mt-9 flex flex-wrap gap-7 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-2xl font-black text-white">2015</p>

                    <p className="mt-1 text-[10px] uppercase tracking-[.2em] text-white/45">
                      Established
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-black text-white">CBSE</p>

                    <p className="mt-1 text-[10px] uppercase tracking-[.2em] text-white/45">
                      Affiliated
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-black text-white">Nursery–12</p>

                    <p className="mt-1 text-[10px] uppercase tracking-[.2em] text-white/45">
                      Curriculum
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT — 3D CARDS */}

            <Reveal direction="right" delay={180}>
              <div className="relative mx-auto h-[380px] w-full max-w-[540px] sm:h-[430px]">
                {/* VERY SUBTLE CENTER LIGHT */}

                <div className="pulse-glow school-red-glow absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

                {/* ORBIT */}

                <div className="orbit-ring absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08] border-dashed" />

                {/* CARD ONE */}

                <div className="hero-card-one absolute left-[4%] top-[8%] h-[270px] w-[190px] overflow-hidden rounded-[24px] border border-white/15 bg-white shadow-[0_30px_70px_rgba(0,0,0,.35)] sm:h-[310px] sm:w-[215px]">
                  <img
                    src="/images/hero-building.jpg"
                    alt="Mayfield campus"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[9px] uppercase tracking-[.25em] text-white/60">
                      01 / CAMPUS
                    </p>

                    <p className="mt-1 text-lg font-bold text-white">
                      A Place to Belong
                    </p>
                  </div>
                </div>

                {/* CARD TWO */}

                <div className="hero-card-two absolute right-[3%] top-[13%] h-[250px] w-[175px] overflow-hidden rounded-[24px] border border-white/15 bg-white shadow-[0_30px_70px_rgba(0,0,0,.35)] sm:h-[285px] sm:w-[200px]">
                  <img
                    src="/images/mission-vision.jpg"
                    alt="Learning at Mayfield Global School"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[9px] uppercase tracking-[.25em] text-white/60">
                      02 / LEARNING
                    </p>

                    <p className="mt-1 text-base font-bold text-white">
                      Learn With Purpose
                    </p>
                  </div>
                </div>

                {/* CARD THREE */}

                <div className="hero-card-three absolute bottom-[1%] left-[28%] h-[185px] w-[230px] overflow-hidden rounded-[24px] border border-[#EAC66C]/40 bg-[#171717] shadow-[0_30px_80px_rgba(0,0,0,.45)] sm:h-[205px] sm:w-[255px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,31,43,.10),transparent_55%)]" />

                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E51F2B] text-white">
                        <GraduationCap size={21} />
                      </div>

                      <span className="text-[10px] font-bold tracking-[.2em] text-white/40">
                        MGS
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[.22em] text-[#EAC66C]">
                        Our Philosophy
                      </p>

                      <p className="mt-2 text-xl font-bold leading-tight text-white">
                        Learn.
                        <br />
                        Grow.
                        <br />
                        Lead.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FLOATING LABEL */}

                <div className="slow-float absolute right-[15%] bottom-[4%] z-20 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E51F2B] text-white">
                    <Sparkles size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      Global Perspective
                    </p>

                    <p className="text-[9px] uppercase tracking-[.16em] text-white/45">
                      Since 2015
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <a
          href="#school-story"
          className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-[9px] font-bold uppercase tracking-[.25em] text-white/40 md:flex"
        >
          Scroll to explore
          <ArrowDown size={13} />
        </a>
      </section>

      {/* =====================================================
          ABOUT SCHOOL
      ====================================================== */}

      <section
        id="school-story"
        className="scroll-mt-20 bg-white px-[30px] py-20 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            {/* LEFT */}

            <Reveal direction="left">
              <div>
                <SectionLabel>About the School</SectionLabel>

                <h2 className="max-w-[590px] text-4xl font-black leading-[1.03] tracking-[-.04em] text-[#171717] sm:text-5xl">
                  More than a school.
                  <span className="block text-[#E51F2B]">
                    A foundation for life.
                  </span>
                </h2>

                <p className="mt-7 text-base leading-8 text-slate-600">
                  Mayfield Global School was established in 2015 under the
                  management of Nandan Prashant Educational Trust. Our approach
                  brings together academic learning, personal growth and a wider
                  perspective of the world.
                </p>

                <p className="mt-5 text-base leading-8 text-slate-600">
                  From Nursery to Senior Secondary, we aim to create an
                  environment where students can explore ideas, develop
                  confidence and prepare themselves for the opportunities ahead.
                </p>

                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  <div className="flex gap-4 rounded-2xl border border-black/[0.06] bg-[#FAFAFA] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,23,23,.07)]">
                    <IconBox icon={Building2} />

                    <div>
                      <p className="font-bold text-[#171717]">
                        Established 2015
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Built with a long-term educational vision.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-2xl border border-black/[0.06] bg-[#FAFAFA] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,23,23,.07)]">
                    <IconBox icon={BookOpen} />

                    <div>
                      <p className="font-bold text-[#171717]">
                        Holistic Learning
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Learning beyond textbooks and classrooms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT */}

            <Reveal direction="right" delay={140}>
              <div className="relative">
                <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full border border-black/[0.08]" />

                <div className="shine-effect relative overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(23,23,23,.14)]">
                  <img
                    src="/images/mission-vision.jpg"
                    alt="Mayfield Global School"
                    className="h-[420px] w-full object-cover sm:h-[500px]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/75 via-transparent to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7">
                    <div className="flex items-end justify-between gap-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[.25em] text-white/60">
                          MAYFIELD GLOBAL SCHOOL
                        </p>

                        <p className="mt-2 text-2xl font-bold text-white">
                          Learning with purpose.
                        </p>
                      </div>

                      <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-white text-[#E51F2B] sm:flex">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* FLOATING YEAR CARD */}

                <div className="absolute -bottom-7 -left-4 rounded-2xl border border-black/[0.05] bg-white p-4 shadow-[0_20px_45px_rgba(0,0,0,.12)] sm:-left-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7F7] text-[#E51F2B]">
                      <Award size={21} />
                    </div>

                    <div>
                      <p className="text-lg font-black text-[#171717]">2015</p>

                      <p className="text-[9px] font-bold uppercase tracking-[.18em] text-slate-400">
                        Our Beginning
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          SCHOOL FACTS
      ====================================================== */}

      <section className="border-y border-black/[0.06] bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <div className="border-b border-black/[0.06] px-[30px] py-8 lg:border-b-0 lg:border-r lg:px-8">
              <div className="flex items-center gap-4">
                <IconBox icon={CalendarDays} />

                <div>
                  <p className="text-2xl font-black text-[#171717]">2015</p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[.18em] text-slate-400">
                    Established
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border-b border-black/[0.06] px-[30px] py-8 lg:border-b-0 lg:border-r lg:px-8">
              <div className="flex items-center gap-4">
                <IconBox icon={GraduationCap} />

                <div>
                  <p className="text-2xl font-black text-[#171717]">
                    Nursery–12
                  </p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[.18em] text-slate-400">
                    Curriculum
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="px-[30px] py-8 lg:border-r lg:px-8">
              <div className="flex items-center gap-4">
                <IconBox icon={ShieldCheck} />

                <div>
                  <p className="text-2xl font-black text-[#171717]">CBSE</p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[.18em] text-slate-400">
                    Affiliation
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="px-[30px] py-8 lg:px-8">
              <div className="flex items-center gap-4">
                <IconBox icon={Users} />

                <div>
                  <p className="text-2xl font-black text-[#171717]">MGS</p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[.18em] text-slate-400">
                    School Community
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          PREMIUM DIVIDER
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#171717] py-10">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E51F2B]/[0.08] blur-[90px]" />

        <div className="relative mx-auto max-w-[1440px] px-[30px]">
          <div className="relative flex h-[74px] items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.025]">
            <div className="absolute inset-x-[8%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#E51F2B]/45 to-transparent" />

            <div className="moving-line absolute left-0 top-1/2 h-[2px] w-[28%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#EAC66C] to-transparent blur-[1px]" />

            <div className="relative flex items-center gap-4 whitespace-nowrap">
              <Sparkles size={15} className="text-[#EAC66C]" />

              <span className="text-[9px] font-bold uppercase tracking-[.38em] text-white/55 sm:text-[10px]">
                Education · Character · Future
              </span>

              <Sparkles size={15} className="text-[#EAC66C]" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION / VISION / VALUES
      ====================================================== */}

      {/* =====================================================
          PRINCIPAL'S GUIDANCE
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#FAFAFA] px-[30px] py-20 lg:py-24">
        {/* =====================================================
      PREMIUM EDITORIAL BACKGROUND
  ===================================================== */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-180px] top-[18%] h-[420px] w-[420px] rounded-full bg-[#E51F2B]/[0.035] blur-[120px]" />

          <div className="absolute right-[-180px] bottom-[5%] h-[500px] w-[500px] rounded-full bg-[#C5A34A]/[0.055] blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage: `
          linear-gradient(rgba(23,23,23,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(23,23,23,0.025) 1px, transparent 1px)
        `,
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        {/* =====================================================
      MAIN CONTENT
  ===================================================== */}

        <div className="relative">
          {/* ===================================================
        HEADER
    =================================================== */}

          <Reveal>
            <div className="max-w-[720px]">
              <SectionLabel>Leadership</SectionLabel>

              <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[.28em] text-[#171717]/35">
                    A Message From
                  </p>

                  <h2 className="text-4xl font-black leading-[.95] tracking-[-.045em] text-[#171717] sm:text-5xl lg:text-[56px]">
                    Principal&apos;s
                    <span className="text-[#E51F2B]"> Guidance</span>
                  </h2>
                </div>

                <p className="max-w-[400px] text-[13px] leading-6 text-slate-500 lg:text-right">
                  Leadership rooted in purpose, discipline and a belief that
                  every learner has the potential to grow.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ===================================================
        MAIN EDITORIAL AREA
    =================================================== */}

          <Reveal direction="up" delay={140}>
            <div className="mt-14 grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
              {/* =================================================
            LEFT — PRINCIPAL IMAGE
        ================================================= */}

              <div className="relative">
                {/* gold editorial frame */}

                <div
                  className={`absolute -left-3 -top-3 h-[calc(100%-10px)] w-[calc(100%-10px)] border border-[#C5A34A]/45 transition-all duration-[1400ms] ${
                    isVisible
                      ? "translate-x-0 translate-y-0 opacity-100"
                      : "-translate-x-5 -translate-y-5 opacity-0"
                  }`}
                />

                {/* image wrapper */}

                <div className="group relative overflow-hidden bg-[#171717]">
                  <div className="relative h-[430px] overflow-hidden sm:h-[500px] lg:h-[540px]">
                   <img
  src="/images/headmaster-office.jpg"
  alt="Principal"
  className="h-full w-full object-cover"
/>

                    {/* cinematic overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/10 to-transparent" />

                    {/* subtle red light */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#E51F2B]/10 via-transparent to-transparent mix-blend-screen" />

                    {/* image number */}

                    <span className="absolute right-6 top-5 select-none font-serif text-[100px] font-bold leading-none tracking-[-.08em] text-white/[0.08]">
                      01
                    </span>

                    {/* floating quote */}

                    <div className="slow-float absolute right-5 top-5 flex h-14 w-14 items-center justify-center border border-white/25 bg-white/10 backdrop-blur-xl">
                      <Quote
                        size={21}
                        strokeWidth={1.5}
                        className="text-[#EAC66C]"
                      />
                    </div>

                    {/* Principal information */}

                    <div className="absolute bottom-7 left-7 right-7">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="h-px w-9 bg-[#EAC66C]" />

                        <span className="text-[9px] font-bold uppercase tracking-[.28em] text-white/60">
                          School Leadership
                        </span>
                      </div>

                      <h3 className="text-3xl font-black tracking-[-.025em] text-white sm:text-4xl">
                        {schoolInfo.principal}
                      </h3>

                      <p className="mt-2 text-[11px] uppercase tracking-[.18em] text-white/45">
                        Principal · Mayfield Global School
                      </p>
                    </div>
                  </div>

                  {/* bottom image strip */}

                  <div className="flex items-center justify-between border-t border-white/10 bg-[#171717] px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <GraduationCap size={15} className="text-[#C5A34A]" />

                      <span className="text-[9px] font-bold uppercase tracking-[.2em] text-white/45">
                        Leadership & Education
                      </span>
                    </div>

                    <span className="text-[9px] font-bold tracking-[.15em] text-white/25">
                      MAYFIELD / 01
                    </span>
                  </div>
                </div>

                {/* bottom corner accent */}

                <div className="absolute -bottom-2 -right-2 h-16 w-16 border-b border-r border-[#E51F2B]" />
              </div>

              {/* =================================================
            RIGHT — MESSAGE
        ================================================= */}

              <div className="relative">
                {/* large background quote */}

                <Quote
                  size={180}
                  strokeWidth={0.7}
                  className="pointer-events-none absolute -right-5 -top-16 text-[#171717]/[0.035]"
                />

                <div className="relative max-w-[680px]">
                  {/* label */}

                  <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-[#E51F2B]" />

                    <span className="text-[10px] font-bold uppercase tracking-[.3em] text-[#C81724]">
                      Principal&apos;s Message
                    </span>
                  </div>

                  {/* headline */}

                  <h3 className="mt-6 text-3xl font-black leading-[1.08] tracking-[-.04em] text-[#171717] sm:text-4xl lg:text-[46px]">
                    Every learner deserves a place where
                    <span className="text-[#E51F2B]">
                      {" "}
                      curiosity becomes confidence.
                    </span>
                  </h3>

                  {/* editorial divider */}

                  <div className="mt-7 flex items-center gap-2">
                    <span className="h-[2px] w-12 bg-[#C5A34A]" />

                    <span className="h-px w-16 bg-[#C5A34A]/30" />

                    <span className="h-px w-6 bg-[#C5A34A]/15" />
                  </div>

                  {/* message */}

                  <div className="mt-7 max-w-[650px] space-y-4 text-[13px] leading-7 text-slate-500 sm:text-[14px]">
                    <p>
                      It gives me immense pleasure to welcome you to Mayfield
                      Global School, a co-educational CBSE-affiliated
                      institution committed to providing quality education and
                      nurturing the overall development of every student.
                    </p>

                    <p>
                      Established in 2015 and managed by Nandan Prashant
                      Educational Trust, our school strives to create an
                      environment where students can learn, grow and develop the
                      knowledge, skills and values needed for a successful
                      future.
                    </p>

                    <p>
                      We offer education from Nursery to Senior Secondary (Class
                      12), with a focus on academic excellence, character
                      development and the holistic growth of our students.
                    </p>

                    <p>
                      I sincerely thank our parents, teachers and the entire
                      school community for their continued support and
                      cooperation. Together, we remain committed to creating
                      meaningful learning experiences and helping every child
                      realise their potential.
                    </p>
                  </div>

                  {/* =================================================
                PRINCIPLES
            ================================================= */}

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {/* Academic */}

                    <div className="group flex items-center gap-3 border-t border-[#171717]/10 pt-4 transition-all duration-300 hover:border-[#E51F2B]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#E51F2B]/[0.07] text-[#E51F2B] transition-all duration-300 group-hover:bg-[#E51F2B] group-hover:text-white">
                        <GraduationCap size={18} />
                      </div>

                      <div>
                        <p className="text-[12px] font-bold text-[#171717]">
                          Academic Growth
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Knowledge with purpose
                        </p>
                      </div>
                    </div>

                    {/* Character */}

                    <div className="group flex items-center gap-3 border-t border-[#171717]/10 pt-4 transition-all duration-300 hover:border-[#C5A34A]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#C5A34A]/[0.09] text-[#9B7B28] transition-all duration-300 group-hover:bg-[#C5A34A] group-hover:text-white">
                        <Sparkles size={17} />
                      </div>

                      <div>
                        <p className="text-[12px] font-bold text-[#171717]">
                          Character
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Values that last
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                SIGNATURE
            ================================================= */}

                  <div className="mt-9 flex flex-col gap-5 border-t border-[#171717]/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-serif text-[24px] tracking-[-.025em] text-[#171717]">
                        {schoolInfo.principal}
                      </p>

                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="h-px w-6 bg-[#C5A34A]" />

                        <span className="text-[9px] font-bold uppercase tracking-[.2em] text-[#9B7B28]">
                          Principal · Mayfield Global School
                        </span>
                      </div>
                    </div>

                    {/* read full message */}

                    <a
                      href="#read-more"
                      className="group inline-flex w-fit items-center gap-3 border-b border-[#171717]/20 pb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#171717] transition-all duration-300 hover:border-[#E51F2B] hover:text-[#E51F2B]"
                    >
                      <span>Read Full Message</span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#171717] text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#E51F2B]">
                        <ArrowUpRight size={13} />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ===================================================
        BOTTOM INFORMATION STRIP
    =================================================== */}

         <Reveal direction="up" delay={260}>
  <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

    {/* =========================
        01 — ESTABLISHED
    ========================== */}
    <div className="group relative h-[300px] overflow-hidden rounded-[22px] bg-[#B91C1C] shadow-[0_18px_50px_rgba(185,28,28,0.16)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(185,28,28,0.24)]">

      <img
        src="/images/mission-vision.jpg"
        alt="Mayfield Global School campus"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />

      {/* color overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#7F1111]/95 via-[#B91C1C]/55 to-[#B91C1C]/10" />

      {/* top number */}
      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[10px] font-bold text-white backdrop-blur-md">
          01
        </span>

        <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/70">
          Foundation
        </span>
      </div>

      {/* large background number */}
      <span className="absolute -right-3 -top-7 font-serif text-[150px] font-black leading-none text-white/[0.08] transition-transform duration-700 group-hover:translate-x-3">
        01
      </span>

      {/* content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">

        <div className="mb-4 h-[2px] w-10 bg-white/80 transition-all duration-500 group-hover:w-16" />

        <p className="font-serif text-[48px] font-medium leading-none tracking-[-0.05em] text-white">
          2015
        </p>

        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/65">
          Established
        </p>

        <p className="mt-3 max-w-[190px] text-[11px] leading-5 text-white/70">
          A growing educational journey built on strong foundations.
        </p>
      </div>

      {/* corner detail */}
      <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
        <span className="text-white">↗</span>
      </div>
    </div>


    {/* =========================
        02 — K12
    ========================== */}
    <div className="group relative h-[300px] overflow-hidden rounded-[22px] bg-[#0F4C81] shadow-[0_18px_50px_rgba(15,76,129,0.16)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(15,76,129,0.24)]">

      <img
        src="/images/photo-gallery.jpg"
        alt="Students at Mayfield Global School"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#082F49]/95 via-[#0F4C81]/55 to-[#0F4C81]/10" />

      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[10px] font-bold text-white backdrop-blur-md">
          02
        </span>

        <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/70">
          Learning
        </span>
      </div>

      <span className="absolute -right-3 -top-7 font-serif text-[150px] font-black leading-none text-white/[0.08] transition-transform duration-700 group-hover:translate-x-3">
        02
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-6">

        <div className="mb-4 h-[2px] w-10 bg-[#C5A34A] transition-all duration-500 group-hover:w-16" />

        <p className="font-serif text-[48px] font-medium leading-none tracking-[-0.05em] text-white">
          K–12
        </p>

        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/65">
          Education
        </p>

        <p className="mt-3 max-w-[190px] text-[11px] leading-5 text-white/70">
          A structured learning journey designed for every stage.
        </p>
      </div>

      <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
        <span className="text-white">↗</span>
      </div>
    </div>


    {/* =========================
        03 — CBSE
    ========================== */}
    <div className="group relative h-[300px] overflow-hidden rounded-[22px] bg-[#7C3AED] shadow-[0_18px_50px_rgba(124,58,237,0.16)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(124,58,237,0.24)]">

      <img
        src="/images/school-calendar.jpg"
        alt="Classroom at Mayfield Global School"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#3B176D]/95 via-[#6D28D9]/55 to-[#7C3AED]/10" />

      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[10px] font-bold text-white backdrop-blur-md">
          03
        </span>

        <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/70">
          Recognition
        </span>
      </div>

      <span className="absolute -right-3 -top-7 font-serif text-[150px] font-black leading-none text-white/[0.08] transition-transform duration-700 group-hover:translate-x-3">
        03
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-6">

        <div className="mb-4 h-[2px] w-10 bg-[#F6D98D] transition-all duration-500 group-hover:w-16" />

        <p className="font-serif text-[48px] font-medium leading-none tracking-[-0.05em] text-white">
          CBSE
        </p>

        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/65">
          Affiliated
        </p>

        <p className="mt-3 max-w-[190px] text-[11px] leading-5 text-white/70">
          A recognised academic framework supporting holistic growth.
        </p>
      </div>

      <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
        <span className="text-white">↗</span>
      </div>
    </div>


    {/* =========================
        04 — PRINCIPAL
    ========================== */}
    <div className="group relative h-[300px] overflow-hidden rounded-[22px] bg-[#B8860B] shadow-[0_18px_50px_rgba(184,134,11,0.16)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(184,134,11,0.24)]">

      <img
        src="/images/school-news.jpg"
        alt="Principal of Mayfield Global School"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#4A3204]/95 via-[#8A650A]/55 to-[#B8860B]/10" />

      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[10px] font-bold text-white backdrop-blur-md">
          04
        </span>

        <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/70">
          Leadership
        </span>
      </div>

      <span className="absolute -right-3 -top-7 font-serif text-[150px] font-black leading-none text-white/[0.08] transition-transform duration-700 group-hover:translate-x-3">
        04
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-6">

        <div className="mb-4 h-[2px] w-10 bg-white/80 transition-all duration-500 group-hover:w-16" />

        <p className="font-serif text-[48px] font-medium leading-none tracking-[-0.05em] text-white">
          01
        </p>

        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/65">
          Principal
        </p>

        <p className="mt-3 max-w-[190px] text-[11px] leading-5 text-white/70">
          Guided leadership shaping the culture and direction of the school.
        </p>
      </div>

      <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
        <span className="text-white">↗</span>
      </div>
    </div>

  </div>
</Reveal>

          {/* ===================================================
        BOTTOM ACCENT
    =================================================== */}

          <div
            className={`mt-5 h-[2px] origin-left bg-gradient-to-r from-[#E51F2B] via-[#C5A34A] to-transparent transition-all duration-[1600ms] ${
              isVisible ? "w-full" : "w-0"
            }`}
          />
        </div>
      </section>

      {/* =====================================================
          CAMPUS
      ====================================================== */}

      

      {/* =====================================================
          COMPACT CTA
      ====================================================== */}

      <section className="bg-white px-[30px] py-8 lg:py-10">
        <Reveal>
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-gradient-to-r from-[#C81724] via-[#E51F2B] to-[#D51D29] px-7 py-8 shadow-[0_25px_60px_rgba(23,23,23,.15)] sm:px-10 lg:px-12">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/20" />

            <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full border border-white/15" />

            <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[.28em] text-white/75">
                  Begin the journey
                </p>

                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                  Give your child a place to discover their potential.
                </h2>
              </div>

              <a
                href="/apply"
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#E51F2B] shadow-[0_10px_30px_rgba(0,0,0,.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFF7F7]"
              >
                Apply Now
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          CINEMATIC VIDEO
      ====================================================== */}

      <section className="bg-white px-[30px] pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <div className="mb-9 text-center">
              <SectionLabel centered>Experience Mayfield</SectionLabel>

              <h2 className="text-4xl font-black tracking-[-.04em] text-[#171717] sm:text-5xl">
                See the school.
                <span className="text-[#E51F2B]"> Feel the journey.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              role="button"
              tabIndex={0}
              aria-label="Watch Mayfield Global School video"
              onClick={() => setVideoOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setVideoOpen(true);
                }
              }}
              className="group relative cursor-pointer overflow-hidden rounded-[34px] bg-[#171717] shadow-[0_35px_90px_rgba(0,0,0,.16)]"
            >
              <div className="relative h-[390px] sm:h-[500px] lg:h-[620px]">
                <video
                  src="/videos/school-about.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover opacity-70 transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/10 to-[#171717]/20" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-[#E51F2B]">
                    <span className="absolute inset-[-10px] rounded-full border border-white/10" />

                    <Play size={28} fill="currentColor" className="ml-1" />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12">
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#EAC66C]">
                        Mayfield Global School
                      </p>

                      <h3 className="mt-2 max-w-[700px] text-3xl font-black text-white sm:text-4xl">
                        A glimpse into our world of learning.
                      </h3>
                    </div>

                    <div className="hidden items-center gap-2 text-xs font-semibold text-white/60 md:flex">
                      <Play size={13} />
                      Watch Story
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SCHOOL INFORMATION
      ====================================================== */}

     <section
  id="contact"
  className="scroll-mt-20 overflow-hidden bg-[#F7F7F5] px-[30px] py-20 lg:py-24"
>
  <div className="mx-auto w-full max-w-[1500px]">
    <Reveal>
      {/* =========================================
          SECTION HEADER
      ========================================== */}
      <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-[720px]">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#E51F2B]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C81724]">
              Connect With Us
            </span>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#171717] sm:text-5xl lg:text-[58px]">
            Everything you need,
            <br />
            <span className="text-[#E51F2B]">in one place.</span>
          </h2>
        </div>

        <div className="max-w-[340px] lg:pb-1">
          <p className="text-[13px] leading-6 text-slate-500">
            Stay connected with Mayfield Global School through our
            official contact channels, leadership information and
            institutional details.
          </p>
        </div>
      </div>

      {/* =========================================
          MAIN LAYOUT
      ========================================== */}
      <div className="grid gap-5 lg:grid-cols-[1.02fr_1fr]">

        {/* =====================================
            LEFT — CINEMATIC SCHOOL PANEL
        ====================================== */}
        <div className="group relative min-h-[620px] overflow-hidden rounded-[32px] bg-[#171717] shadow-[0_30px_80px_rgba(23,23,23,0.16)]">

          {/* School image */}
          <img
            src="/images/hero-building.jpg"
            alt="Mayfield Global School campus"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
          />

          {/* cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#171717]/65 to-[#171717]/10" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/55 via-transparent to-transparent" />

          {/* red atmospheric glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#E51F2B]/20 blur-[90px]" />

          {/* gold atmospheric glow */}
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#C5A34A]/10 blur-[90px]" />

          {/* top identity */}
          <div className="absolute left-7 right-7 top-7 flex items-start justify-between sm:left-9 sm:right-9 sm:top-9">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/20 bg-white/10 text-white backdrop-blur-xl">
                <Building2 size={21} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Official
                </p>

                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  School Information
                </p>
              </div>
            </div>

            <div className="rounded-full border border-white/15 bg-black/20 px-4 py-2 backdrop-blur-xl">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#EAC66C]">
                Est. 2015
              </span>
            </div>
          </div>

          {/* giant background number */}
          <span className="pointer-events-none absolute -right-5 top-[22%] select-none font-serif text-[190px] font-black leading-none text-white/[0.055]">
            15
          </span>

          {/* bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#E51F2B]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/55">
                Mayfield Global School
              </span>
            </div>

            <h3 className="max-w-[580px] text-3xl font-black leading-[1.02] tracking-[-0.035em] text-white sm:text-4xl lg:text-[46px]">
              A place where
              <br />
              <span className="text-[#EAC66C]">
                learning becomes a journey.
              </span>
            </h3>

            <p className="mt-5 max-w-[570px] text-[13px] leading-6 text-white/55">
              {schoolInfo.address}
            </p>

            {/* bottom information strip */}
            <div className="mt-8 grid grid-cols-2 border-t border-white/10 pt-6 sm:grid-cols-3">

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
                  Curriculum
                </p>

                <p className="mt-2 text-[12px] font-semibold text-white/80">
                  {schoolInfo.curriculum}
                </p>
              </div>

              <div className="border-l border-white/10 pl-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
                  Affiliation
                </p>

                <p className="mt-2 text-[12px] font-semibold text-white/80">
                  CBSE · {schoolInfo.affiliation}
                </p>
              </div>

              <div className="hidden border-l border-white/10 pl-5 sm:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
                  School Code
                </p>

                <p className="mt-2 text-[12px] font-semibold text-white/80">
                  {schoolInfo.schoolCode}
                </p>
              </div>

            </div>
          </div>

          {/* decorative frame */}
          <div className="pointer-events-none absolute inset-5 rounded-[25px] border border-white/[0.08] transition-all duration-700 group-hover:inset-4 group-hover:border-white/[0.14]" />
        </div>


        {/* =====================================
            RIGHT — PREMIUM CONTACT GRID
        ====================================== */}
        <div className="grid gap-5 sm:grid-cols-2">

          {/* =================================
              PHONE CARD
          ================================== */}
          <div className="group relative min-h-[285px] overflow-hidden rounded-[30px] border border-black/[0.06] bg-white p-7 shadow-[0_15px_45px_rgba(23,23,23,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(23,23,23,0.10)]">

            {/* decorative background */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#E51F2B]/[0.07] blur-2xl transition-transform duration-700 group-hover:scale-125" />

            <div className="relative z-10 flex items-start justify-between">

              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#FFF1F2] text-[#E51F2B] transition-all duration-500 group-hover:rotate-3 group-hover:scale-105">
                <Phone size={23} />
              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.07] text-[#171717] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#171717] group-hover:text-white">
                ↗
              </span>
            </div>

            <div className="relative z-10 mt-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C81724]">
                Contact
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#171717]">
                Call the School
              </h3>

              <div className="mt-5 space-y-2">
                {schoolInfo.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block text-[13px] font-semibold text-slate-500 transition-colors duration-300 hover:text-[#E51F2B]"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            {/* bottom accent */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#E51F2B] transition-all duration-500 group-hover:w-full" />
          </div>


          {/* =================================
              EMAIL CARD
          ================================== */}
          <div className="group relative min-h-[285px] overflow-hidden rounded-[30px] border border-black/[0.06] bg-[#FFF9EC] p-7 shadow-[0_15px_45px_rgba(23,23,23,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(23,23,23,0.10)]">

            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C5A34A]/10 blur-2xl transition-transform duration-700 group-hover:scale-125" />

            <div className="relative z-10 flex items-start justify-between">

              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white text-[#A47F1C] shadow-sm transition-all duration-500 group-hover:-rotate-3 group-hover:scale-105">
                <Mail size={23} />
              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C5A34A]/20 text-[#A47F1C] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#C5A34A] group-hover:text-white">
                ↗
              </span>
            </div>

            <div className="relative z-10 mt-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9B7B28]">
                Email
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#171717]">
                Write to Us
              </h3>

              <div className="mt-5 space-y-3">
                {schoolInfo.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="block break-all text-[12px] font-semibold leading-5 text-slate-500 transition-colors duration-300 hover:text-[#9B7B28]"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#C5A34A] transition-all duration-500 group-hover:w-full" />
          </div>


          {/* =================================
              PRINCIPAL CARD
          ================================== */}
          <div className="group relative min-h-[285px] overflow-hidden rounded-[30px] bg-[#171717] shadow-[0_15px_45px_rgba(23,23,23,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(23,23,23,0.18)]">

            {/* Principal image */}
            <img
              src="/images/principal.jpg"
              alt={schoolInfo.principal}
              className="absolute inset-0 h-full w-full object-cover object-top opacity-65 transition-transform duration-1000 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#171717]/70 to-[#171717]/20" />

            <div className="relative z-10 flex h-full min-h-[285px] flex-col justify-between p-7">

              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/15 bg-white/10 text-white backdrop-blur-xl">
                  <GraduationCap size={24} />
                </div>

                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.22em] text-white/50 backdrop-blur-md">
                  Leadership
                </span>

              </div>

              <div>
                <div className="mb-3 h-[2px] w-8 bg-[#E51F2B] transition-all duration-500 group-hover:w-14" />

                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#F58B91]">
                  Principal
                </p>

                <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">
                  {schoolInfo.principal}
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-white/50">
                  Principal, Mayfield Global School.
                </p>
              </div>
            </div>
          </div>


          {/* =================================
              SCHOOL IDENTITY CARD
          ================================== */}
          <div className="group relative min-h-[285px] overflow-hidden rounded-[30px] border border-black/[0.06] bg-white p-7 shadow-[0_15px_45px_rgba(23,23,23,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(23,23,23,0.10)]">

            {/* decorative circles */}
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full border-[35px] border-[#C5A34A]/10 transition-transform duration-700 group-hover:scale-110" />

            <div className="relative z-10 flex items-start justify-between">

              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#FFF9EC] text-[#A47F1C]">
                <Trophy size={23} />
              </div>

              <span className="text-[32px] font-serif leading-none text-[#171717]/10">
                ID
              </span>
            </div>

            <div className="relative z-10 mt-7">

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C81724]">
                School Identity
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#171717]">
                Official Records
              </h3>

              <div className="mt-6 overflow-hidden rounded-2xl border border-black/[0.06] bg-[#FAFAFA]">

                <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    UDISE
                  </span>

                  <span className="text-[11px] font-black text-[#171717]">
                    {schoolInfo.udise}
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    School Code
                  </span>

                  <span className="text-[11px] font-black text-[#171717]">
                    {schoolInfo.schoolCode}
                  </span>
                </div>

              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#C5A34A] transition-all duration-500 group-hover:w-full" />
          </div>
        </div>
      </div>
    </Reveal>
  </div>
</section>

      {/* =====================================================
          FOOTER MINI STRIP
      ====================================================== */}

      <section className="overflow-hidden border-t border-black/[0.06] bg-white py-5">
        <div className="marquee-track flex w-max">
          {[
            "LEARN",
            "GROW",
            "DISCOVER",
            "CREATE",
            "LEAD",
            "LEARN",
            "GROW",
            "DISCOVER",
            "CREATE",
            "LEAD",
          ].map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <span className="mx-6 text-[10px] font-black tracking-[.35em] text-slate-400">
                {item}
              </span>

              <span className="text-[#C5A34A]">✦</span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* =====================================================
          VIDEO MODAL
      ====================================================== */}

      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]/90 p-4 backdrop-blur-md"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-[1100px] overflow-hidden rounded-[26px] bg-black shadow-[0_40px_100px_rgba(0,0,0,.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-[#E51F2B] hover:text-white"
              aria-label="Close video"
            >
              <X size={19} />
            </button>

            <video
              src="/videos/school-about.mp4"
              controls
              autoPlay
              playsInline
              className="max-h-[82vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default AboutPage;
