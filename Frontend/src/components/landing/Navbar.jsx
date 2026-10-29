import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../brand/Logo";
import { SCHOOL } from "../../config/school";

const LINKS = [
  { label: "About Our School", section: "about", group: "about" },
  { label: "Academics & Syllabus", section: "academics", group: "about" },
  { label: "Facilities", section: "facilities", group: "about" },
  { label: "Programs", section: "programs", group: "about" },
  { label: "A Year at Mayfield", section: "story", group: "about" },
  { label: "School Values", section: "values", group: "about" },
  { label: "Recognition & Toppers", section: "achievements", group: "about" },
  { label: "Gallery", section: "gallery", group: "media" },
  { label: "Notices", section: "notices", group: "media" },
  { label: "Latest News", section: "news", group: "media" },
  { label: "Events", section: "events", group: "media" },
  { label: "Parents Say", section: "reviews", group: "media" },
  { label: "FAQs", section: "faq", group: "media" },
  { label: "Contact", section: "contact", group: "media" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const { user } = useAuth();
  const location = useLocation();
  const active = location.pathname === "/" ? new URLSearchParams(location.search).get("section") || "" : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openDropdown && !mobileOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setOpenDropdown("");
        setMobileOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown("");
        setMobileOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openDropdown, mobileOpen]);

  useEffect(() => {
    setOpenDropdown("");
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  const closeMenus = () => {
    setOpenDropdown("");
    setMobileOpen(false);
  };

  const sectionPath = (section) => `/?section=${section}`;

  const renderLinks = (links) =>
    links.map((link) => {
      const isActive = active === link.section;
      return (
        <Link
          key={link.section}
          to={sectionPath(link.section)}
          onClick={closeMenus}
          aria-current={isActive ? "page" : undefined}
          className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive ? "bg-red-50 text-school-red" : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
          }`}
        >
          {link.label}
          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-school-red" />}
        </Link>
      );
    });

  const topLink = (isActive) =>
    `rounded-md px-3 py-2.5 text-[15px] font-semibold text-navy-800 transition-colors hover:bg-navy-50 hover:text-school-red ${
      isActive ? "bg-navy-50 text-school-red" : ""
    }`;

  const renderDropdown = (name, label, links) => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpenDropdown((value) => (value === name ? "" : name))}
        aria-expanded={openDropdown === name}
        aria-controls={`landing-${name}-menu`}
        className="inline-flex items-center gap-1.5 rounded-md px-3 py-2.5 text-[15px] font-semibold text-navy-800 transition-colors hover:bg-navy-50 hover:text-school-red"
      >
        {label}
        <ChevronDown size={15} className={`transition-transform duration-200 ${openDropdown === name ? "rotate-180" : ""}`} />
      </button>
      {openDropdown === name && (
        <div
          id={`landing-${name}-menu`}
          className="absolute left-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-slate-200 bg-white p-2 text-slate-800 shadow-[0_18px_40px_-16px_rgba(18,31,61,0.45)]"
        >
          {renderLinks(links)}
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`relative z-50 bg-white text-navy-900 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_12px_32px_-16px_rgba(18,31,61,0.4)]" : "shadow-[0_6px_22px_-18px_rgba(18,31,61,0.3)]"
      }`}
    >
      {/* Contact strip - desktop only */}
      <div className="hidden bg-navy-900 text-white sm:block">
        <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-5 py-1.5 text-[13px] sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-white/85">
            <a href={`tel:${SCHOOL.phones[0].tel}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone size={13} /> {SCHOOL.phones[0].display}
            </a>
            <a href={`mailto:${SCHOOL.emails[0]}`} className="hidden items-center gap-1.5 hover:text-white md:inline-flex">
              <Mail size={13} /> {SCHOOL.emails[0]}
            </a>
          </div>
          <p className="hidden text-white/70 lg:block">CBSE affiliation no. {SCHOOL.affiliationNo}</p>
        </div>
      </div>

      <nav ref={navRef} className="relative mx-auto max-w-site px-4 sm:px-8 lg:px-10">
        <div className="flex min-h-[76px] items-center justify-between gap-3 py-2.5">
          <Link to="/" onClick={closeMenus} className="flex min-w-0 items-center gap-3">
            <Logo size={48} />
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-lg font-bold text-navy-900 sm:text-xl">{SCHOOL.name}</span>
              <span className="mt-0.5 hidden text-[11px] font-medium text-navy-500 sm:block sm:text-xs">Neora, Patna. CBSE, Nursery to Class XII</span>
            </span>
          </Link>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {user ? (
              <Link
                to={`/${user.role}`}
                className="rounded-lg bg-school-red px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-school-red-dark"
              >
                Go to portal
              </Link>
            ) : (
              <>
                <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50 hover:text-school-red">
                  Portal Login
                </Link>
                <Link
                  to="/apply"
                  className="rounded-lg bg-school-red px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-school-red-dark"
                >
                  Apply Now
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="landing-mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-navy-100 bg-white text-navy-900 transition-colors hover:bg-navy-50 lg:hidden"
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <div className="hidden border-t border-slate-100 lg:block">
          <div className="flex h-[54px] items-center justify-center gap-2">
            <Link
              to="/"
              onClick={closeMenus}
              aria-current={!active && location.pathname === "/" ? "page" : undefined}
              className={topLink(!active && location.pathname === "/")}
            >
              Home
            </Link>
            {renderDropdown("about", "About Us", LINKS.filter((link) => link.group === "about"))}
            {renderDropdown("media", "Media", LINKS.filter((link) => link.group === "media"))}
            <Link
              to={sectionPath("admissions")}
              onClick={closeMenus}
              aria-current={active === "admissions" ? "page" : undefined}
              className={topLink(active === "admissions")}
            >
              Admission
            </Link>
          </div>
        </div>

        {mobileOpen && (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenus}
              className="fixed inset-0 z-[60] bg-navy-950/45 backdrop-blur-[2px] lg:hidden"
            />
            <aside
              id="landing-mobile-menu"
              aria-label="Main navigation"
              className="fixed inset-y-0 right-0 z-[70] flex h-dvh w-[min(22rem,calc(100vw-1.25rem))] flex-col bg-white text-slate-800 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Logo size={40} />
                  <div className="min-w-0">
                    <p className="truncate font-serif text-base font-bold text-navy-900">{SCHOOL.name}</p>
                    <p className="text-xs text-navy-500">Explore Mayfield</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeMenus}
                  aria-label="Close navigation menu"
                  className="rounded-lg p-2 text-navy-700 transition-colors hover:bg-navy-50"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3">
                <Link
                  to="/"
                  onClick={closeMenus}
                  className={`mb-2 flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold ${!active && location.pathname === "/" ? "bg-red-50 text-school-red" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  Home
                  <span aria-hidden="true">›</span>
                </Link>
                <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase text-navy-400">About Us</p>
                {renderLinks(LINKS.filter((link) => link.group === "about"))}
                <p className="px-3 pb-1 pt-4 text-[11px] font-bold uppercase text-navy-400">Media & Community</p>
                {renderLinks(LINKS.filter((link) => link.group === "media"))}
                <Link
                  to={sectionPath("admissions")}
                  onClick={closeMenus}
                  className={`mt-2 flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold ${active === "admissions" ? "bg-red-50 text-school-red" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  Admission
                  <span aria-hidden="true">›</span>
                </Link>
              </div>

              <div className="border-t border-slate-200 p-4">
                {user ? (
                  <Link to={`/${user.role}`} onClick={closeMenus} className="block rounded-lg bg-school-red px-4 py-3 text-center text-sm font-bold text-white hover:bg-school-red-dark">
                    Go to portal
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login" onClick={closeMenus} className="rounded-lg border border-slate-200 px-3 py-3 text-center text-sm font-semibold text-navy-800 hover:bg-navy-50">
                      Portal Login
                    </Link>
                    <Link to="/apply" onClick={closeMenus} className="rounded-lg bg-school-red px-3 py-3 text-center text-sm font-bold text-white hover:bg-school-red-dark">
                      Apply Now
                    </Link>
                  </div>
                )}
                <a href={`tel:${SCHOOL.phones[0].tel}`} className="mt-3 flex items-center justify-center gap-2 py-1 text-xs font-medium text-navy-600">
                  <Phone size={14} /> {SCHOOL.phones[0].display}
                </a>
              </div>
            </aside>
          </>
        )}
      </nav>
      <span className="house-stripe" aria-hidden="true" />
    </header>
  );
}
