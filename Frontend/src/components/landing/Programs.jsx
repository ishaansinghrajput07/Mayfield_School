import { photos } from "../../assets/school";
import useReveal from "../../hooks/useReveal";
import SectionHeading from "./SectionHeading";

// Each stage takes one of the four house colours worn by students.
const PROGRAMS = [
  {
    stage: "Pre-Primary",
    range: "Nursery to UKG",
    body: "A first school routine for the youngest learners, with teachers close at hand in a small classroom.",
    src: photos.nurseryClass,
    alt: "Nursery students and teachers in front of a decorated blackboard",
    bar: "bg-house-red",
  },
  {
    stage: "Primary",
    range: "Class I to V",
    body: "The CBSE primary curriculum, with languages, mathematics and environmental studies.",
    src: photos.classroomPrimary,
    alt: "Primary students sitting at their desks",
    bar: "bg-house-yellow",
  },
  {
    stage: "Middle School",
    range: "Class VI to VIII",
    body: "Separate subjects and regular practical work as students move into the middle years.",
    src: photos.classroomJunior,
    alt: "A middle school class with their teacher",
    bar: "bg-house-green",
  },
  {
    stage: "Secondary and Senior Secondary",
    range: "Class IX to XII",
    body: "Preparation for the CBSE board examinations in Class X and Class XII.",
    src: photos.seniorClassroom,
    alt: "Senior students in white shirts at their desks",
    bar: "bg-house-blue",
  },
];

export default function Programs() {
  const headRef = useReveal();

  return (
    <section id="programs" className="bg-white">
      <div className="mx-auto max-w-site">
        <div ref={headRef} className="reveal">
          <SectionHeading title="Programs from Nursery to Class XII">
            Four stages of schooling on one campus, following the CBSE curriculum.
          </SectionHeading>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PROGRAMS.map((p, i) => (
            <Stage key={p.stage} {...p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stage({ stage, range, body, src, alt, bar, delay }) {
  const ref = useReveal(delay);
  return (
    <article ref={ref} className="reveal flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white">
      <span className={`h-1.5 ${bar}`} aria-hidden="true" />
      <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-bold leading-snug text-navy-900">{stage}</h3>
        <p className="mt-1 text-base font-semibold text-school-red">{range}</p>
        <p className="mt-3 text-base leading-relaxed text-navy-600">{body}</p>
      </div>
    </article>
  );
}
