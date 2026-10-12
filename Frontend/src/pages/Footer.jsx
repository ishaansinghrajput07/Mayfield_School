
import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  Navigation,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
      className:
        "border-pink-400/40 bg-pink-500/15 text-pink-400 hover:bg-pink-500 hover:text-white",
    },
    {
      icon: FaFacebookF,
      href: "#",
      label: "Facebook",
      className:
        "border-blue-400/40 bg-blue-500/15 text-blue-400 hover:bg-blue-600 hover:text-white",
    },
    {
      icon: FaYoutube,
      href: "#",
      label: "YouTube",
      className:
        "border-red-400/40 bg-red-500/15 text-red-400 hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#07111f] font-sans text-white">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-building.jpg"
          alt=""
          className="h-full w-full object-cover object-center opacity-35"
        />

        {/* Dark but not too heavy */}
        <div className="absolute inset-0 bg-[#07111f]/55" />

        {/* Side readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06101d]/75 via-transparent to-[#06101d]/75" />

        {/* Bottom readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030914]/85 via-transparent to-[#07111f]/20" />
      </div>

      {/* Border */}
      <div className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-white/[0.10]" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-6 sm:px-8 sm:py-7 lg:px-10">
        {/* ================= MAIN ROW ================= */}
        <div className="grid items-center gap-5 lg:grid-cols-[0.85fr_1.25fr_0.95fr]">
          {/* ================= CAMPUS ================= */}
          <div className="hidden lg:block">
            <div className="group relative h-[135px] overflow-hidden rounded-[17px] border border-white/15 bg-white/5 shadow-xl">
              <img
                src="/images/trophy-or-campus.jpg"
                alt="Mayfield Global School Campus"
                className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06101d]/90 via-[#06101d]/15 to-transparent" />

              <div className="absolute bottom-3.5 left-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-[2px] w-5 bg-amber-400" />

                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/75">
                    Our Campus
                  </span>
                </div>

                <p className="text-[13px] font-bold text-white">
                  Mayfield Global School
                </p>
              </div>
            </div>
          </div>

          {/* ================= BRAND ================= */}
          <div className="text-center">
            {/* Logo */}
            <div className="mx-auto mb-2.5 flex h-[68px] w-[68px] items-center justify-center rounded-[17px] border border-white/25 bg-white p-1.5 shadow-[0_12px_35px_rgba(0,0,0,.35)] sm:h-[72px] sm:w-[72px]">
              <img
                src="/images/school-logo.png"
                alt="Mayfield Global School"
                className="h-full w-full object-contain"
              />
            </div>

            {/* School Name */}
            <h2 className="font-serif text-[25px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[30px]">
              MAYFIELD{" "}
              <span className="text-amber-300">
                GLOBAL SCHOOL
              </span>
            </h2>

            {/* Location */}
            <div className="mt-2 flex items-center justify-center gap-1.5">
              <MapPin
                size={13}
                strokeWidth={2.5}
                className="text-red-400"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                Neora · Patna · Bihar
              </span>
            </div>

            {/* Divider */}
            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-9 bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="h-px w-9 bg-white/20" />
            </div>

            <p className="mx-auto mt-2 max-w-[400px] text-[10px] leading-4 text-white/70 sm:text-[11px]">
              Shaping confident learners through knowledge,
              character and opportunity.
            </p>
          </div>

          {/* ================= GOOGLE MAP ================= */}
          <div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Mayfield+Global+School+Neora+Patna+Bihar"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-[135px] overflow-hidden rounded-[17px] border border-white/15 bg-white/5 shadow-xl"
            >
              <iframe
                title="Mayfield Global School Location"
                src="https://www.google.com/maps?q=Mayfield%20Global%20School%20Neora%20Patna%20Bihar&output=embed"
                className="pointer-events-none h-full w-full border-0 opacity-75 grayscale-[10%] transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06101d]/85 via-transparent to-transparent" />

              {/* Pin */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-red-500 shadow-[0_6px_25px_rgba(239,68,68,.45)] transition-transform duration-300 group-hover:scale-110">
                  <Navigation
                    size={17}
                    className="text-white"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* Map Label */}
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/70">
                    Our Location
                  </p>

                  <p className="mt-0.5 text-[11px] font-black text-white">
                    View on Google Maps
                  </p>
                </div>

                <MapPin
                  size={14}
                  className="text-red-400"
                  fill="currentColor"
                />
              </div>
            </a>
          </div>
        </div>

        {/* ================= CONTACT + SOCIAL ================= */}
        <div className="mt-5 border-t border-white/[0.12] pt-4">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            {/* Contact */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {/* Phone */}
              <a
                href="tel:+919472597721"
                className="group flex items-center gap-2.5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/15 transition-all duration-300 group-hover:bg-blue-500">
                  <Phone
                    size={13}
                    className="text-blue-300 group-hover:text-white"
                  />
                </span>

                <span className="text-[11px] font-bold text-white/80 transition-colors group-hover:text-white sm:text-[12px]">
                  +91 94725 97721
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:mayfieldglobalschoolpatna@gmail.com"
                className="group flex items-center gap-2.5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/15">
                  <Mail
                    size={13}
                    className="text-amber-300"
                  />
                </span>

                <span className="max-w-[300px] truncate text-[11px] font-bold text-white/80 transition-colors group-hover:text-white sm:text-[12px]">
                  mayfieldglobalschoolpatna@gmail.com
                </span>
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 ${social.className}`}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="mt-4 flex flex-col items-center justify-between gap-1.5 border-t border-white/[0.10] pt-3 text-center sm:flex-row sm:text-left">
          <p className="text-[8px] font-medium text-white/60 sm:text-[9px]">
            © 2026 Mayfield Global School. All rights reserved.
          </p>

          <p className="text-[8px] font-medium text-white/60 sm:text-[9px]">
            Designed & developed by{" "}
            <span className="font-bold text-amber-300">
              PimsInfotech Pvt Ltd.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
