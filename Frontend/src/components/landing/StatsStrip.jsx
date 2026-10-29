import { SCHOOL } from "../../config/school";

// The school's registration details, exactly as printed on its information
// board. Each entry takes one of the four house colours.
const RECORD = [
  { label: "Established", value: String(SCHOOL.established), tone: "border-house-red" },
  { label: "Affiliation", value: `CBSE, no. ${SCHOOL.affiliationNo}`, tone: "border-house-yellow" },
  { label: "Classes", value: SCHOOL.classes, tone: "border-house-green" },
  { label: "Managed by", value: SCHOOL.trust, tone: "border-house-blue" },
  { label: "Principal", value: SCHOOL.principal, tone: "border-house-red" },
  { label: "School code", value: `${SCHOOL.schoolCode}, UDISE ${SCHOOL.udise}`, tone: "border-house-yellow" },
];

export default function StatsStrip() {
  return (
    <section aria-label="School details" className="bg-navy-900 text-white">
      <div className="mx-auto max-w-site">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">The school at a glance</h2>
          <p className="mt-2 text-white/70">Recognition and registration details of {SCHOOL.name}.</p>
        </div>
        <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {RECORD.map((item) => (
            <div key={item.label} className={`border-l-4 pl-5 ${item.tone}`}>
              <dt className="text-sm text-white/65">{item.label}</dt>
              <dd className="mt-1 font-serif text-xl font-semibold leading-snug text-white sm:text-2xl">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
