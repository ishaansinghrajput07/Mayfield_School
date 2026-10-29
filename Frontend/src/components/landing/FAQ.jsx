import { useState } from "react";
import { ChevronDown } from "lucide-react";
import useReveal from "../../hooks/useReveal";
import SectionHeading from "./SectionHeading";
import { SCHOOL, fullAddress } from "../../config/school";

// Answers stick to what the school has published. Anything that depends on
// the current year (fees, seats, dates, documents) is routed to the office.
const FAQS = [
  {
    q: "Which classes does the school teach?",
    a: `${SCHOOL.name} teaches ${SCHOOL.classes} (Senior Secondary), following the ${SCHOOL.board} curriculum. The school is co-educational.`,
  },
  {
    q: "How do I apply for admission?",
    a: `Use the Apply Now form on this site, or call the school office on ${SCHOOL.phones[0].display}. The office will tell you which class has seats and what to bring.`,
  },
  {
    q: "Which documents and fees should I prepare?",
    a: "Documents and fees depend on the class and on whether your child is joining from another school. Please check with the school office before you visit so that you carry the right papers.",
  },
  {
    q: "Where is the school?",
    a: `${fullAddress}. The campus is on Sarai Neoraganj Road at Neora. You can find directions in the map on the Contact page.`,
  },
  {
    q: "How can I reach the office?",
    a: `Call ${SCHOOL.phones.map((p) => p.display).join(", ")}, or write to ${SCHOOL.emails.join(" or ")}.`,
  },
];

export default function FAQ() {
  const headRef = useReveal();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl">
        <div ref={headRef} className="reveal">
          <SectionHeading title="Admissions, answered" />
        </div>

        <div className="mt-10 divide-y divide-navy-100 border-y border-navy-100">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-serif text-lg font-bold text-navy-900">{f.q}</span>
                <ChevronDown size={20} className={`shrink-0 text-navy-400 transition-transform ${open === i ? "rotate-180 text-school-red" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="pb-5 text-base leading-relaxed text-navy-600">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
