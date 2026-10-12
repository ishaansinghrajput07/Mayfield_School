import React, { useState } from "react";
import {
  Search,
  Menu,
  X,
  Megaphone,
  ChevronRight,
  UserRound,
  GraduationCap,
  CreditCard,
  Info,
  Building2,
  CalendarDays,
  Image,
  Phone,
  Home,
  BookOpenCheck,
  ShieldCheck,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ================= ANNOUNCEMENTS =================
  const announcements = [
    "Welcome to MAYFIELD GLOBAL SCHOOL",
    "Admissions Open - Academic Session 2026-27",
    "Explore Our School & Facilities",
    "Important Dates & Events",
  ];

  // ================= QUICK LOGIN LINKS =================
  const quickLinks = [
    {
      name: "Parent Login",
      icon: UserRound,
      link: "/parent-login",
    },
    {
      name: "Teacher Login",
      icon: GraduationCap,
      link: "/teacher-login",
    },
    {
      name: "Admin Login",
      icon: ShieldCheck,
      link: "/admin-login",
    },
  ];

  // ================= MAIN MENU =================
  const menuItems = [
    {
      name: "ABOUT US",
      icon: Info,
      link: "/about",
    },
    {
      name: "ADMISSION PROCESS",
      icon: Building2,
      link: "/admission-process",
    },
    {
      name: "LIFE AT SCHOOL",
      icon: Home,
      link: "/school-life",
    },
    {
      name: "FACILITIES",
      icon: Building2,
      link: "/facilities",
    },
    {
      name: "EVENTS & ACTIVITIES",
      icon: CalendarDays,
      link: "/events",
    },
    {
      name: "CLASSES & FEES",
      icon: BookOpenCheck,
      link: "/classes-fees",
    },
    {
      name: "GALLERY",
      icon: Image,
      link: "/gallery",
    },
    {
      name: "CONTACT US",
      icon: Phone,
      link: "/contact",
    },
  ];

  return (
    <header className="relative z-50 w-full font-serif bg-white shadow-sm">

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}
      <nav
        className="
          relative
          flex
          items-center
          justify-between
          h-[72px]
          md:h-20
          bg-white
          border-b
          border-gray-200
          px-1.5
          sm:px-3
          md:px-12
          min-w-0
        "
      >

        {/* ================= LEFT SIDE ================= */}
        <div
  className="
    flex
    items-center
    h-full
    gap-1.5
    sm:gap-3
    md:gap-5
    py-2
    min-w-0
    flex-1
  "
>

          {/* ================= LOGO ================= */}
          <a
            href="/"
            className="
              h-full
              flex
              items-center
              shrink-0
            "
          >
            <img
              src="/images/school-logo.png"
              alt="Mayfield Global School Logo"
              className="
                h-[46px]
                w-auto
                object-contain
                sm:h-[58px]
                md:h-full
              "
            />
          </a>


          {/* ================= SCHOOL NAME ================= */}
         <a
  href="/"
  className="
    flex
    min-w-[145px]
    sm:min-w-0
    flex-1
    flex-col
    justify-center
    overflow-visible
  "
>

           <span
  className="
  block
  text-[#202020]
  text-[8px]
  min-[360px]:text-[8.5px]
  min-[400px]:text-[9px]
  sm:text-xl
  md:text-2xl
  font-bold
  tracking-[-0.45px]
  sm:tracking-wide
  uppercase
  leading-tight
  whitespace-nowrap
"
>
  MAYFIELD GLOBAL SCHOOL
</span>


            <span
              className="
                block
                text-gray-600

                text-[6.5px]
                min-[360px]:text-[7px]
                sm:text-[11px]
                md:text-xs

                tracking-[1px]
                sm:tracking-[2px]

                mt-1

                uppercase
                font-sans

                whitespace-nowrap
              "
            >
              NEORA (PATNA)
            </span>

          </a>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div
          className="
            flex
            items-stretch
            h-full
            py-2
            shrink-0
          "
        >

          {/* ================= SEARCH ================= */}
          <button
            aria-label="Search"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsMenuOpen(false);
            }}
            className="
              hidden
              sm:flex

              bg-[#171717]
              hover:bg-[#28518e]

              text-white

              w-10
              md:w-14

              items-center
              justify-center

              transition-all
              duration-300
            "
          >
            {isSearchOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>


          {/* =====================================================
              PREMIUM APPLY NOW BUTTON
          ===================================================== */}
          <a
            href="/apply"
            className="
              group
              relative
              overflow-hidden

              bg-gradient-to-br
              from-[#EF3340]
              via-[#E51F2B]
              to-[#B91420]

              hover:from-[#F44752]
              hover:via-[#EC2B37]
              hover:to-[#C91825]

              text-white

              px-1.5
              min-[360px]:px-2
              sm:px-3
              md:px-6

              flex
              items-center
              justify-center

              gap-1
              sm:gap-1.5
              md:gap-2

              text-[9px]
              min-[360px]:text-[10px]
              sm:text-xs
              md:text-sm

              font-sans
              font-bold

              tracking-[0.2px]
              sm:tracking-[0.8px]

              uppercase

              transition-all
              duration-300

              shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]

              hover:shadow-[0_6px_18px_rgba(229,31,43,0.30)]

              hover:-translate-y-[1px]

              shrink-0
            "
          >

            {/* Shine */}
            <span
              className="
                absolute
                inset-y-0
                -left-full
                w-1/2

                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent

                skew-x-[-20deg]

                group-hover:left-[130%]

                transition-all
                duration-700
              "
            />

            <span
              className="
                relative
                z-10
                whitespace-nowrap
              "
            >
              APPLY NOW
            </span>


            {/* Arrow Circle */}
            <span
              className="
                relative
                z-10

                flex
                items-center
                justify-center

                w-[15px]
                h-[15px]

                sm:w-5
                sm:h-5

                rounded-full

                bg-white/15
                border
                border-white/20

                group-hover:bg-white/25

                transition-all
                duration-300

                shrink-0
              "
            >
              <ChevronRight
                className="
                  w-2.5
                  h-2.5

                  sm:w-3.5
                  sm:h-3.5

                  group-hover:translate-x-[2px]

                  transition-transform
                  duration-300
                "
              />
            </span>

          </a>


          {/* =====================================================
              MENU BUTTON
          ===================================================== */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsSearchOpen(false);
            }}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            className="
              group
              relative
              overflow-hidden

              bg-[#1C398E]

              hover:bg-[#162F78]

              text-white

              px-1.5
              min-[360px]:px-2
              sm:px-3
              md:px-5

              flex
              items-center

              gap-1
              sm:gap-2

              font-sans

              text-[9px]
              min-[360px]:text-[10px]
              sm:text-xs
              md:text-sm

              font-semibold
              uppercase

              tracking-[0.3px]
              sm:tracking-wide

              transition-all
              duration-300

              shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]

              hover:shadow-[0_6px_18px_rgba(28,57,142,0.30)]

              hover:-translate-y-[1px]

              shrink-0
            "
          >

            {/* Subtle Shine */}
            <span
              className="
                absolute
                inset-0

                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent

                -translate-x-full

                group-hover:translate-x-full

                transition-transform
                duration-700
              "
            />

            <span className="relative z-10">
              MENU
            </span>


            {isMenuOpen ? (
              <X
                className="
                  relative
                  z-10

                  w-4
                  h-4

                  sm:w-5
                  sm:h-5
                "
              />
            ) : (
              <Menu
                className="
                  relative
                  z-10

                  w-4
                  h-4

                  sm:w-5
                  sm:h-5
                "
              />
            )}

          </button>

        </div>


        {/* =====================================================
            SEARCH PANEL
        ===================================================== */}
        {isSearchOpen && (
          <div
            className="
              absolute
              top-full
              right-0

              w-full
              md:w-[420px]

              bg-white
              shadow-2xl

              border
              border-gray-200

              p-4

              z-50

              animate-in
              fade-in
              slide-in-from-top-2
              duration-200
            "
          >

            <form
              onSubmit={(e) => {
                e.preventDefault();

                const query = e.currentTarget.search.value;

                if (query.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(
                    query
                  )}`;
                }
              }}
              className="
                flex
                items-center

                border
                border-gray-300

                focus-within:border-[#28518e]

                transition-colors
              "
            >

              <input
                name="search"
                type="search"
                placeholder="Search school..."
                className="
                  w-full
                  px-4
                  py-3

                  outline-none

                  font-sans
                  text-sm
                  text-gray-800
                "
              />

              <button
                type="submit"
                className="
                  bg-gradient-to-br
                  from-[#315B9B]
                  to-[#17396F]

                  text-white

                  p-3

                  hover:from-[#3B68AD]
                  hover:to-[#1B427D]

                  transition-all
                "
              >
                <Search size={18} />
              </button>

            </form>

          </div>
        )}


        {/* =====================================================
            PREMIUM MENU OVERLAY + SIDEBAR
        ===================================================== */}
        {isMenuOpen && (
          <>

            {/* Overlay */}
            <div
              onClick={() => setIsMenuOpen(false)}
              className="
                fixed
                inset-0

                top-[72px]
                md:top-20

                bg-black/55
                backdrop-blur-[2px]

                z-40
              "
            />


            {/* ================= SIDEBAR ================= */}
            <div
              className="
                absolute
                right-0
                top-full

                w-[310px]
                sm:w-[370px]
                md:w-[410px]

                max-w-[calc(100vw-12px)]

                max-h-[calc(100vh-80px)]

                overflow-y-auto

                bg-gradient-to-b
                from-[#315B9B]
                via-[#244C87]
                to-[#16376D]

                shadow-2xl

                z-50

                font-sans

                animate-in
                slide-in-from-right
                duration-300
              "
            >

              {/* ================= SIDEBAR HEADER ================= */}
              <div
                className="
                  relative

                  px-5
                  pt-5
                  pb-5

                  bg-gradient-to-r
                  from-[#17396F]
                  via-[#28518E]
                  to-[#17396F]

                  border-b
                  border-white/15
                "
              >

                <div className="flex items-center gap-4">

                  {/* SCHOOL LOGO */}
                  <div
                    className="
                      w-14
                      h-14

                      rounded-xl

                      bg-white
                      border
                      border-white/30

                      flex
                      items-center
                      justify-center

                      p-1.5

                      shadow-lg

                      shrink-0
                    "
                  >
                    <img
                      src="/images/school-logo.png"
                      alt="Mayfield Global School Logo"
                      className="
                        w-full
                        h-full
                        object-contain
                      "
                    />
                  </div>


                  {/* SCHOOL MENU TEXT */}
                  <div className="min-w-0">

                    <p
                      className="
                        text-white
                        text-base
                        md:text-[17px]

                        font-bold
                        tracking-wide
                        leading-tight
                      "
                    >
                      SCHOOL MENU
                    </p>

                    <p
                      className="
                        text-white/65

                        text-[10px]
                        md:text-[11px]

                        tracking-[1.5px]

                        uppercase

                        mt-1

                        truncate
                      "
                    >
                      MAYFIELD GLOBAL SCHOOL
                    </p>

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        mt-2
                      "
                    >

                      <span
                        className="
                          w-6
                          h-[2px]

                          bg-[#D6B45A]

                          rounded-full
                        "
                      />

                      <span
                        className="
                          text-[8px]
                          text-white/45
                          tracking-[1px]
                          uppercase
                        "
                      >
                        Neora • Patna
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* ================= LOGIN SECTION ================= */}
              <div className="px-4 pt-5 pb-4">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-3
                  "
                >

                  <span
                    className="
                      h-px
                      flex-1
                      bg-white/20
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      text-white/60

                      font-bold
                      uppercase

                      tracking-[1.5px]
                    "
                  >
                    LOGIN PORTAL
                  </span>

                  <span
                    className="
                      h-px
                      flex-1
                      bg-white/20
                    "
                  />

                </div>


                <div className="grid grid-cols-3 gap-2">

                  {quickLinks.map((item, index) => {

                    const Icon = item.icon;

                    return (
                      <a
                        key={index}
                        href={item.link}
                        onClick={() => setIsMenuOpen(false)}
                        className="
                          group
                          relative
                          overflow-hidden

                          flex
                          flex-col
                          items-center
                          justify-center

                          min-h-[82px]

                          rounded-lg

                          bg-white/[0.08]
                          hover:bg-white/[0.16]

                          border
                          border-white/[0.12]
                          hover:border-white/25

                          text-white

                          transition-all
                          duration-300

                          hover:-translate-y-0.5
                        "
                      >

                        <div
                          className="
                            w-9
                            h-9

                            rounded-full

                            bg-white/10
                            group-hover:bg-white/20

                            flex
                            items-center
                            justify-center

                            mb-2

                            transition-all
                          "
                        >
                          <Icon
                            size={18}
                            className="text-white"
                          />
                        </div>

                        <span
                          className="
                            text-[10px]
                            sm:text-[11px]

                            font-semibold
                            text-center

                            leading-tight

                            px-1
                          "
                        >
                          {item.name}
                        </span>

                      </a>
                    );

                  })}

                </div>

              </div>


              {/* ================= DIVIDER ================= */}
              <div className="mx-4 border-t border-white/15" />


              {/* ================= MAIN NAVIGATION ================= */}
              <div className="px-4 py-5">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-3
                  "
                >

                  <span
                    className="
                      text-[10px]
                      text-white/60

                      font-bold
                      uppercase

                      tracking-[1.5px]
                    "
                  >
                    Explore School
                  </span>

                  <span
                    className="
                      h-px
                      flex-1
                      bg-white/15
                    "
                  />

                </div>


                <div className="space-y-2">

                  {menuItems.map((item, index) => {

                    const Icon = item.icon;

                    return (
                      <a
                        key={index}
                        href={item.link}
                        onClick={() => setIsMenuOpen(false)}
                        className="
                          group
                          relative
                          overflow-hidden

                          flex
                          items-center

                          min-h-[48px]

                          bg-white/[0.07]
                          hover:bg-white/[0.15]

                          border
                          border-white/[0.08]
                          hover:border-white/20

                          text-white

                          rounded-lg

                          transition-all
                          duration-300

                          hover:translate-x-1
                        "
                      >

                        {/* Gold Accent */}
                        <span
                          className="
                            absolute
                            left-0
                            top-0
                            bottom-0

                            w-1

                            bg-gradient-to-b
                            from-[#E2C56F]
                            to-[#A77D20]

                            opacity-0
                            group-hover:opacity-100

                            transition-opacity
                            duration-300
                          "
                        />


                        {/* Icon */}
                        <div
                          className="
                            w-12
                            min-h-[48px]

                            flex
                            items-center
                            justify-center

                            shrink-0

                            border-r
                            border-white/[0.08]
                          "
                        >
                          <Icon
                            size={18}
                            className="
                              text-white/80

                              group-hover:text-[#E2C56F]

                              transition-colors
                              duration-300
                            "
                          />
                        </div>


                        {/* Name */}
                        <span
                          className="
                            flex-1
                            pl-3

                            text-[12px]
                            md:text-[13px]

                            font-semibold

                            tracking-[0.5px]
                          "
                        >
                          {item.name}
                        </span>


                        {/* Arrow */}
                        <ChevronRight
                          size={17}
                          className="
                            mr-3

                            text-white/35

                            group-hover:text-[#E2C56F]

                            group-hover:translate-x-1

                            transition-all
                            duration-300
                          "
                        />

                      </a>
                    );

                  })}

                </div>

              </div>


              {/* ================= CLASSES & FEES HIGHLIGHT ================= */}
              <div className="px-4 pb-5">

                <a
                  href="/classes-fees"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    group
                    relative
                    overflow-hidden

                    block

                    rounded-lg

                    p-4

                    bg-gradient-to-r
                    from-[#C49A35]
                    via-[#D6B45A]
                    to-[#A77D20]

                    shadow-lg

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-10
                        h-10

                        rounded-full

                        bg-white/15

                        flex
                        items-center
                        justify-center
                      "
                    >
                      <CreditCard
                        size={19}
                        className="text-white"
                      />
                    </div>

                    <div className="flex-1">

                      <p
                        className="
                          text-white
                          text-sm
                          font-bold
                        "
                      >
                        Classes & Fee Structure
                      </p>

                      <p
                        className="
                          text-white/80
                          text-[10px]
                          mt-0.5
                        "
                      >
                        View classes, subjects & fees
                      </p>

                    </div>

                    <ChevronRight
                      size={18}
                      className="
                        text-white

                        group-hover:translate-x-1

                        transition-transform
                      "
                    />

                  </div>

                </a>

              </div>


              {/* ================= SIDEBAR FOOTER ================= */}
              <div
                className="
                  border-t
                  border-white/15

                  mx-4

                  py-5

                  text-center
                  text-white
                "
              >

                <p
                  className="
                    text-sm
                    font-bold
                    tracking-wide
                  "
                >
                  MAYFIELD GLOBAL SCHOOL
                </p>

                <p
                  className="
                    text-[11px]
                    text-white/55

                    mt-1

                    tracking-[1.5px]
                  "
                >
                  NEORA • PATNA
                </p>

              </div>

            </div>

          </>
        )}

      </nav>


      {/* =========================================================
          ANNOUNCEMENT BAR
      ========================================================= */}
      <div
        className="
          relative
          flex
          items-center

          h-9

          bg-[#e9e9e9]

          border-b
          border-gray-300

          overflow-hidden

          font-sans
        "
      >

        {/* Announcement Heading */}
        <div
          className="
            relative
            z-10

            flex
            items-center
            gap-1.5

            bg-[#e9e9e9]

            px-4
            md:px-8

            h-full

            shrink-0

            border-r
            border-gray-400
          "
        >

          <Megaphone
            className="
              w-4
              h-4

              text-[#28518e]

              shrink-0
            "
          />

          <span
            className="
              text-xs

              font-bold

              text-gray-800

              uppercase

              tracking-wider
            "
          >
            ANNOUNCEMENT
          </span>

        </div>


        {/* Scrolling Announcements */}
        <div
          className="
            flex-1
            overflow-hidden

            h-full

            flex
            items-center
          "
        >

          <div
            className="
              flex
              items-center

              gap-5

              whitespace-nowrap

              animate-school-marquee

              text-xs
              md:text-sm

              text-gray-800
            "
          >

            {[...announcements, ...announcements].map(
              (announcement, index) => (
                <React.Fragment key={index}>

                  <a
                    href="/updates"
                    className="
                      hover:text-[#28518e]
                      transition-colors
                    "
                  >
                    {announcement}
                  </a>

                  <span
                    className="
                      w-1.5
                      h-1.5

                      rounded-full

                      bg-[#C49A35]

                      shrink-0
                    "
                  />

                </React.Fragment>
              )
            )}

          </div>

        </div>

      </div>


      {/* =========================================================
          MARQUEE ANIMATION
      ========================================================= */}
      <style>{`

        @keyframes school-marquee {

          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }

        }

        .animate-school-marquee {

          animation:
            school-marquee
            35s
            linear
            infinite;

          width: max-content;

        }

        .animate-school-marquee:hover {

          animation-play-state: paused;

        }

      `}</style>

    </header>
  );
};

export default Header;