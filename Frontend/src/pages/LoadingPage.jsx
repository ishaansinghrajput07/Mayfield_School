import React, { useEffect, useState } from "react";

const LoadingPage = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 3;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 400);
      }

      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <>
      {/* ================= CUSTOM ANIMATION ================= */}
      <style>{`
        @keyframes logoPulse {
          0% {
            transform: scale(0.94);
            opacity: 0.82;
          }

          50% {
            transform: scale(1);
            opacity: 1;
          }

          100% {
            transform: scale(0.94);
            opacity: 0.82;
          }
        }

        @keyframes ringRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dotAnimation {
          0%,
          20% {
            opacity: 0.2;
          }

          50% {
            opacity: 1;
          }

          100% {
            opacity: 0.2;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(300%);
          }
        }

        .school-logo-loading {
          animation: logoPulse 2.4s ease-in-out infinite;
        }

        .school-loading-ring {
          animation: ringRotate 3s linear infinite;
        }

        .school-loading-content {
          animation: fadeUp 0.8s ease-out forwards;
        }

        .loading-dot-1 {
          animation: dotAnimation 1.4s infinite;
        }

        .loading-dot-2 {
          animation: dotAnimation 1.4s infinite 0.2s;
        }

        .loading-dot-3 {
          animation: dotAnimation 1.4s infinite 0.4s;
        }

        .loading-shimmer {
          animation: shimmer 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* ================= FULL SCREEN LOADER ================= */}
      <div
        className="
          fixed
          inset-0
          z-[99999]
          bg-white
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >

        {/* ================= BACKGROUND DECORATION ================= */}

        <div
          className="
            absolute
            -top-32
            -left-32
            w-[420px]
            h-[420px]
            rounded-full
            bg-[#a71930]/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -right-32
            w-[420px]
            h-[420px]
            rounded-full
            bg-[#172b4d]/5
            blur-3xl
          "
        />


        {/* ================= MAIN CONTENT ================= */}

        <div
          className="
            school-loading-content
            relative
            z-10
            flex
            flex-col
            items-center
            justify-center
            w-full
            max-w-md
            px-6
          "
        >

          {/* ================= LOGO AREA ================= */}

          <div className="relative w-[210px] h-[210px] flex items-center justify-center">

            {/* Rotating Ring */}
            <div
              className="
                school-loading-ring
                absolute
                inset-0
                rounded-full
                border-[2px]
                border-transparent
                border-t-[#a71930]
                border-r-[#a71930]/40
              "
            />

            {/* Second Ring */}
            <div
              className="
                absolute
                inset-[10px]
                rounded-full
                border
                border-[#172b4d]/10
              "
            />

            {/* Logo */}
            <img
              src="/images/school-logo.png"
              alt="Mayfield Global School Logo"
              className="
                school-logo-loading
                relative
                z-10
                w-[175px]
                h-[175px]
                object-contain
                drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]
              "
            />

          </div>


          {/* ================= SCHOOL NAME ================= */}

          <div className="text-center mt-7">

            <h1
              className="
                text-[#172b4d]
                font-serif
                text-2xl
                sm:text-3xl
                font-bold
                tracking-wide
              "
            >
              MAYFIELD GLOBAL SCHOOL
            </h1>

            <div className="flex items-center justify-center gap-3 mt-2">

              <span className="w-8 h-[1px] bg-[#a71930]" />

              <p
                className="
                  text-[#555]
                  text-xs
                  sm:text-sm
                  tracking-[0.22em]
                  uppercase
                "
              >
                Knowledge is Power
              </p>

              <span className="w-8 h-[1px] bg-[#a71930]" />

            </div>

          </div>


          {/* ================= LOADING TEXT ================= */}

          <div className="mt-9 flex items-center gap-1">

            <span
              className="
                text-[#172b4d]
                text-sm
                font-medium
              "
            >
              Loading School Portal
            </span>

            <span className="loading-dot-1 text-[#a71930] font-bold">
              .
            </span>

            <span className="loading-dot-2 text-[#a71930] font-bold">
              .
            </span>

            <span className="loading-dot-3 text-[#a71930] font-bold">
              .
            </span>

          </div>


          {/* ================= PROGRESS BAR ================= */}

          <div className="w-full max-w-[280px] mt-5">

            <div
              className="
                h-[4px]
                w-full
                bg-gray-200
                rounded-full
                overflow-hidden
                relative
              "
            >

              <div
                className="
                  h-full
                  bg-[#a71930]
                  rounded-full
                  relative
                  transition-all
                  duration-200
                  ease-linear
                "
                style={{
                  width: `${progress}%`,
                }}
              >

                {/* Shimmer */}
                <div
                  className="
                    loading-shimmer
                    absolute
                    top-0
                    left-0
                    w-[40%]
                    h-full
                    bg-white/40
                    skew-x-[-20deg]
                  "
                />

              </div>

            </div>


            {/* Progress Percentage */}

            <div className="flex justify-between mt-2">

              <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                Please wait
              </span>

              <span className="text-[10px] text-[#a71930] font-semibold">
                {progress}%
              </span>

            </div>

          </div>


          {/* ================= BOTTOM LOCATION ================= */}

          <p
            className="
              mt-8
              text-[11px]
              text-gray-400
              tracking-wider
            "
          >
            Neora, Patna • Bihar
          </p>

        </div>


        {/* ================= BOTTOM LINE ================= */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-[3px]
            bg-gradient-to-r
            from-[#a71930]
            via-[#172b4d]
            to-[#a71930]
          "
        />

      </div>
    </>
  );
};

export default LoadingPage;