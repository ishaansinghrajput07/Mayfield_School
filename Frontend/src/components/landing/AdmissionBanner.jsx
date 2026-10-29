import { SCHOOL } from "../../config/school";

// Update this single line when the school announces an admission cycle.
const MESSAGE = `Admissions are open for ${SCHOOL.classes}. Call ${SCHOOL.phones[0].display} or apply online.`;

export default function AdmissionBanner() {
  return (
    <div className="relative z-[60] overflow-hidden bg-school-red py-2.5">
      <div className="animate-marquee-reverse flex w-max items-center gap-10 whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10 pr-10" aria-hidden={copy === 1}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="flex items-center gap-10 text-sm font-semibold text-white sm:text-[15px]">
                {MESSAGE}
                <span className="h-1.5 w-6 rounded-full bg-white/60" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
