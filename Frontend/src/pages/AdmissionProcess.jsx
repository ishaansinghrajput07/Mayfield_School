import React, { useState } from "react";

import {
  GraduationCap,
  BookOpen,
  Globe,
  Award,
  Users,
  Briefcase,
  HeartHandshake,
  ChevronRight,
  Play,
  ArrowRight,
  Quote,
  ChevronLeft,
  Trophy,
  PartyPopper,
  Home,
  ClipboardList,
  FileCheck2,
  UserCheck,
  MessageCircle,
} from "lucide-react";

export default function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        "The admission journey was smooth and well organised. The team guided us at every step and made our child's transition comfortable.",
      name: "Parent",
      role: "Mayfield Global School",
      avatar: "/images/about-confidence.jpg",
    },
    {
      quote:
        "We were impressed by the school's approach to learning, communication and the overall environment provided for students.",
      name: "Parent",
      role: "Mayfield Global School",
      avatar: "/images/mission-vision.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-200">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[640px] lg:min-h-[700px] bg-slate-900 text-white overflow-hidden flex flex-col justify-between">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.65) 50%, rgba(15, 23, 42, 0.75) 100%), url('/images/hero-building.jpg')`,
          }}
        />

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">

              <div className="inline-block">
                <span className="text-amber-400 font-bold text-xs sm:text-sm tracking-widest uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  ADMISSIONS OPEN
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                Building Futures.
                <br />
                Shaping Young Minds.
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed">
                Begin your child's journey at Mayfield Global School through a
                simple, guided and transparent admission process.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">

                <button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3.5 rounded-md transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-400/20 text-sm tracking-wide">
                  APPLY FOR ADMISSION
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#school-video"
                  className="bg-slate-900/60 hover:bg-slate-900/90 text-white font-medium px-6 py-3.5 rounded-md border border-slate-600 transition-all duration-200 flex items-center gap-2.5 backdrop-blur-sm text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center pl-0.5">
                    <Play className="w-2.5 h-2.5 fill-current" />
                  </div>
                  SCHOOL TOUR
                </a>

              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5">

              <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-6 border border-slate-700/60 shadow-2xl space-y-3">

                {[
                  {
                    title: "Admission Enquiry",
                    icon: Users,
                  },
                  {
                    title: "Registration Process",
                    icon: ClipboardList,
                  },
                  {
                    title: "Required Documents",
                    icon: FileCheck2,
                  },
                  {
                    title: "Student Interaction",
                    icon: UserCheck,
                  },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={`#admission-${idx}`}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700/40 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5">

                      <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors duration-200">
                        <item.icon className="w-5 h-5" />
                      </div>

                      <span className="font-semibold text-white text-sm sm:text-base">
                        {item.title}
                      </span>

                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}

              </div>
            </div>

          </div>
        </div>

        {/* ================= STATS BAR ================= */}
        <div className="relative z-10 bg-white border-b border-slate-200 shadow-md">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">

              {[
                {
                  icon: Users,
                  num: "01",
                  label: "Admission Journey",
                },
                {
                  icon: ClipboardList,
                  num: "06",
                  label: "Simple Steps",
                },
                {
                  icon: GraduationCap,
                  num: "K-12",
                  label: "School Education",
                },
                {
                  icon: Award,
                  num: "100%",
                  label: "Guided Process",
                },
                {
                  icon: Globe,
                  num: "Global",
                  label: "Learning Environment",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 ${
                    idx > 0
                      ? "pt-4 md:pt-0 md:pl-4 lg:pl-6"
                      : ""
                  }`}
                >

                  <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700">
                    <stat.icon className="w-5 h-5" />
                  </div>

                  <div>

                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans tracking-tight">
                      {stat.num}
                    </div>

                    <div className="text-xs font-medium text-slate-500">
                      {stat.label}
                    </div>

                  </div>

                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ================= SCHOOL VIDEO ====================== */}
      {/* ===================================================== */}

      <section
        id="school-video"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
      >

        <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl">

          {/* Video */}
          <div className="relative aspect-video w-full overflow-hidden">

            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              poster="/images/hero-building.jpg"
            >
              <source
                src="/videos/school-tour.mp4"
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>

            {/* Video Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />

            <div className="absolute left-5 sm:left-8 bottom-5 sm:bottom-8 pointer-events-none">

              <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">
                MAYFIELD GLOBAL SCHOOL
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mt-1">
                Discover Our School
              </h2>

            </div>

          </div>

        </div>
      </section>

      {/* ================= ADMISSION PROCESS SECTION ================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">

          <div>

            <span className="text-amber-600 font-bold text-xs tracking-widest uppercase">
              ADMISSION PROCESS
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              A Simple Journey to Mayfield
            </h2>

          </div>

          <a
            href="#all-steps"
            className="mt-4 md:mt-0 text-slate-700 hover:text-amber-600 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-colors"
          >
            VIEW ALL STEPS
            <ArrowRight className="w-4 h-4" />
          </a>

        </div>

        {/* 6 Admission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {[
            {
              title: "Admission Enquiry",
              desc: "Connect with our admission team and understand the process.",
              img: "/images/hero-building.jpg",
              icon: MessageCircle,
            },
            {
              title: "Registration",
              desc: "Complete the student registration with the required details.",
              img: "/images/school-calendar.jpg",
              icon: ClipboardList,
            },
            {
              title: "Application",
              desc: "Submit the application and required student information.",
              img: "/images/school-news.jpg",
              icon: FileCheck2,
            },
            {
              title: "Documents",
              desc: "Provide the documents required for admission verification.",
              img: "/images/trophy-or-campus.jpg",
              icon: FileCheck2,
            },
            {
              title: "Interaction",
              desc: "Students and parents may interact with the school team.",
              img: "/images/about-confidence.jpg",
              icon: Users,
            },
            {
              title: "Enrollment",
              desc: "Complete the final formalities and begin the school journey.",
              img: "/images/news-clippings.jpg",
              icon: GraduationCap,
            },
          ].map((program, idx) => (

            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >

              <div className="relative h-48 overflow-hidden">

                <img
                  src={program.img}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg text-amber-400 border border-slate-700/50">
                  <program.icon className="w-5 h-5" />
                </div>

              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">

                <div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {program.desc}
                  </p>

                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">

                  <a
                    href={`#${program.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 tracking-wider uppercase gap-1"
                  >
                    LEARN MORE
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>
      </section>

      {/* ================= VIBRANT SCHOOL LIFE SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Content */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">

              <div>

                <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">
                  SCHOOL LIFE
                </span>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2 leading-tight">
                  Learning Beyond the Classroom
                </h2>

                <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                  Explore a school environment where students learn, create,
                  participate and grow together.
                </p>

              </div>

              <div>

                <button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-5 py-3 rounded-md transition-colors duration-200 text-xs sm:text-sm tracking-wide flex items-center gap-2">
                  DISCOVER SCHOOL LIFE
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </div>

            {/* Middle Main Image */}
            <div className="lg:col-span-4 rounded-xl overflow-hidden min-h-[260px] lg:min-h-full">

              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=85&w=1000"
                alt="School campus"
                className="w-full h-full object-cover"
              />

            </div>

            {/* Right 2x2 Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">

              {[
                {
                  title: "Classroom Learning",
                  sub: "Engaging Learning",
                  img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=85&w=700",
                  icon: BookOpen,
                },
                {
                  title: "Sports & Fitness",
                  sub: "Active Student Life",
                  img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=85&w=700",
                  icon: Trophy,
                },
                {
                  title: "Events & Activities",
                  sub: "Creative Experiences",
                  img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=700",
                  icon: PartyPopper,
                },
                {
                  title: "Campus Environment",
                  sub: "A Place to Belong",
                  img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=85&w=700",
                  icon: Home,
                },
              ].map((card, idx) => (

                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden group min-h-[130px] flex flex-col justify-end p-3 border border-slate-800"
                >

                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.95) 10%, rgba(15, 23, 42, 0.4) 100%), url('${card.img}')`,
                    }}
                  />

                  <div className="relative z-10">

                    <div className="flex items-center gap-1.5 text-amber-400 mb-1">

                      <card.icon className="w-3.5 h-3.5" />

                      <span className="text-xs font-bold text-white line-clamp-1">
                        {card.title}
                      </span>

                    </div>

                    <p className="text-[11px] text-slate-300">
                      {card.sub}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY MAYFIELD SECTION ================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-slate-200">

          <div>

            <span className="text-amber-600 font-bold text-xs tracking-widest uppercase">
              WHY MAYFIELD?
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              A School That Helps Children Grow
            </h2>

          </div>

          <button className="mt-4 md:mt-0 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded border border-slate-300 transition-colors text-xs tracking-wider uppercase flex items-center gap-1.5">
            ABOUT MAYFIELD
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            {
              icon: BookOpen,
              title: "Engaging Learning",
              desc: "Encouraging curiosity, understanding and active learning.",
            },
            {
              icon: Globe,
              title: "Global Outlook",
              desc: "Helping students develop a broad and confident perspective.",
            },
            {
              icon: Briefcase,
              title: "Future Ready",
              desc: "Building skills and confidence for the opportunities ahead.",
            },
            {
              icon: HeartHandshake,
              title: "Supportive Community",
              desc: "A welcoming environment where students feel valued.",
            },
          ].map((item, idx) => (

            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
            >

              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6" />
              </div>

              <h3 className="font-bold text-slate-900 text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>

            </div>

          ))}

        </div>
      </section>

      {/* ================= BOTTOM THREE COLUMNS ================= */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Testimonial */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">

            <div>

              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                WHAT OUR PARENTS SAY
              </span>

              <div className="text-amber-500 my-3">
                <Quote className="w-8 h-8 fill-amber-100" />
              </div>

              <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </p>

            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>

                  <h4 className="font-bold text-slate-900 text-sm">
                    {testimonials[activeTestimonial].name}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {testimonials[activeTestimonial].role}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-1">

                <button
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === 0
                        ? testimonials.length - 1
                        : prev - 1
                    )
                  }
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === testimonials.length - 1
                        ? 0
                        : prev + 1
                    )
                  }
                  className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </div>
          </div>

          {/* Admission Updates */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">

            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase block mb-2">
              ADMISSION UPDATES
            </span>

            {[
              {
                month: "STEP",
                day: "01",
                title: "Admission Enquiry",
                desc: "Connect with the school admission team.",
                img: "/images/hero-building.jpg",
              },
              {
                month: "STEP",
                day: "02",
                title: "Registration",
                desc: "Complete the registration process.",
                img: "/images/school-calendar.jpg",
              },
              {
                month: "STEP",
                day: "03",
                title: "Application & Documents",
                desc: "Submit the required application details.",
                img: "/images/school-news.jpg",
              },
            ].map((event, idx) => (

              <div
                key={idx}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-100 pb-3 last:pb-0"
              >

                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">

                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2">

                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                      {event.month} {event.day}
                    </span>

                    <h4 className="font-bold text-slate-900 text-sm truncate">
                      {event.title}
                    </h4>

                  </div>

                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {event.desc}
                  </p>

                  <a
                    href={`#admission-update-${idx}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-amber-600 mt-1 uppercase"
                  >
                    VIEW DETAILS
                    <ArrowRight className="w-3 h-3" />
                  </a>

                </div>

              </div>

            ))}

          </div>

          {/* CTA */}
          <div className="lg:col-span-3 bg-slate-950 text-white p-6 rounded-xl border border-slate-800 shadow-md flex flex-col justify-between h-full space-y-6">

            <div>

              <h3 className="font-bold text-lg sm:text-xl text-white tracking-wide leading-snug">
                READY TO BEGIN YOUR CHILD'S JOURNEY?
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Take the first step towards becoming part of the Mayfield
                Global School community.
              </p>

            </div>

            <div className="space-y-3 pt-4">

              <button className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-3 px-4 rounded transition-colors text-xs tracking-wider uppercase flex items-center justify-center gap-2">
                APPLY NOW
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#request-info"
                className="block text-center text-slate-300 hover:text-white text-xs font-medium transition-colors pt-1"
              >
                Request Admission Information &rarr;
              </a>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}