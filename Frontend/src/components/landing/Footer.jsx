import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Globe } from "lucide-react";
import Logo from "../brand/Logo";
import { SCHOOL, fullAddress } from "../../config/school";

const COLUMNS = [
  { heading: "Quick links", links: [["Home", "/"], ["About us", "/?section=about"], ["Academics", "/?section=academics"], ["Admissions", "/?section=admissions"]] },
  { heading: "School life", links: [["Gallery", "/?section=gallery"], ["Facilities", "/?section=facilities"], ["Programs", "/?section=programs"], ["A year at Mayfield", "/?section=story"]] },
  { heading: "Resources", links: [["Syllabus", "/?section=academics"], ["Fee structure", "/?section=admissions"], ["FAQ", "/?section=faq"], ["Contact", "/?section=contact"]] },
  { heading: "Portal", links: [["Parent portal login", "/login"], ["Student login", "/login"], ["Apply for admission", "/apply"], ["Notices and events", "/?section=notices"]] },
];

const SOCIAL = [
  { Icon: Facebook, href: SCHOOL.social.facebook, label: "Facebook" },
  { Icon: Instagram, href: SCHOOL.social.instagram, label: "Instagram" },
  { Icon: Youtube, href: SCHOOL.social.youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <span className="house-stripe" aria-hidden="true" />
      <div className="mx-auto max-w-site pt-12">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_1.6fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white">
                <Logo size={46} />
              </span>
              <div className="leading-tight">
                <p className="font-serif text-xl font-bold text-white">{SCHOOL.name}</p>
                <p className="mt-0.5 text-sm text-white/65">{SCHOOL.motto}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-white/70">
              A co-educational CBSE school for {SCHOOL.classes}, managed by the {SCHOOL.trust}.
            </p>

            <div className="mt-6 space-y-3 text-base text-white/80">
              <p className="flex items-start gap-2.5"><MapPin size={16} className="mt-1 shrink-0" /> {fullAddress}</p>
              <div className="flex items-start gap-2.5">
                <Phone size={16} className="mt-1 shrink-0" />
                <div className="space-y-0.5">
                  {SCHOOL.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-white">{p.display}</a>
                  ))}
                </div>
              </div>
              {SCHOOL.emails.map((e) => (
                <p key={e} className="flex items-center gap-2.5 break-all"><Mail size={16} className="shrink-0" /><a href={`mailto:${e}`} className="hover:text-white">{e}</a></p>
              ))}
              <p className="flex items-center gap-2.5"><Globe size={16} className="shrink-0" /> {SCHOOL.website}</p>
            </div>

            <div className="mt-6 flex gap-3">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${SCHOOL.name} on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white hover:text-navy-900"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="text-base font-bold text-white">{col.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link to={href} className="text-base text-white/70 hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <p className="text-base font-bold text-white">Find the campus</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="Campus map"
                src={SCHOOL.mapEmbed}
                className="block h-[170px] w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 py-6 text-sm text-white/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.</p>
          <p>CBSE affiliation no. {SCHOOL.affiliationNo}. School code {SCHOOL.schoolCode}. UDISE {SCHOOL.udise}.</p>
        </div>
      </div>
    </footer>
  );
}
