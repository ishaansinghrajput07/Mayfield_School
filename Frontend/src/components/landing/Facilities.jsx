import { photos } from "../../assets/school";
import useReveal from "../../hooks/useReveal";
import SectionHeading from "./SectionHeading";

const CLASSROOMS = [
  { src: photos.classroomJunior, alt: "A junior class with their teacher", caption: "Junior classes" },
  { src: photos.classroomMiddle, alt: "Middle school students in a classroom with ceiling fans", caption: "Middle school" },
  { src: photos.classroomBoard, alt: "Senior students in white uniforms in a classroom with a blue wall band", caption: "Senior secondary" },
  { src: photos.classroomSenior, alt: "Senior students at their desks while a teacher walks through the classroom", caption: "Senior classes" },
  { src: photos.classroomBatch, alt: "A senior batch seated at wooden desks", caption: "Class batches" },
  { src: photos.examHall, alt: "Students writing an examination at their desks", caption: "Examination time" },
];

// Only facilities visible in the school's own photographs are listed here.
const FACILITIES = [
  {
    title: "Academic building",
    body: "A multi-storey building on the Neora campus that houses the classrooms and laboratories.",
    src: photos.campusBuilding,
    alt: "The four-storey school building with a glass stairwell",
    span: "lg:col-span-3",
  },
  {
    title: "Science laboratory",
    body: "Fitted workbenches with sinks, shelving and storage cabinets for practical lessons.",
    src: photos.scienceLab,
    alt: "Blue laboratory workbenches with sinks and cabinets",
    span: "",
  },
  {
    title: "Physics practicals",
    body: "Senior students work with measuring apparatus on the laboratory bench.",
    src: photos.physicsLab,
    alt: "Students gathered around physics apparatus on a laboratory bench",
    span: "",
  },
  {
    title: "Classrooms",
    body: "Desks and benches arranged for every age group, from nursery to Class XII.",
    src: photos.classroomPrimary,
    alt: "A primary classroom with students at their desks",
    span: "",
  },
  {
    title: "Sports ground",
    body: "An open field used for sports day, track events and team line-ups.",
    src: photos.sportsLineup,
    alt: "Students in house colours lined up on the school sports field",
    span: "lg:col-span-3",
    flip: true,
  },
  {
    title: "Assembly and events",
    body: "Open-air space with shaded stages for morning prayer, national-day programmes and the annual function.",
    src: photos.flagAssembly,
    alt: "Students in rows under a coloured canopy at an Independence Day assembly",
    span: "lg:col-span-3",
  },
];

export default function Facilities() {
  const headRef = useReveal();

  return (
    <section id="facilities" className="bg-paper">
      <div className="mx-auto max-w-site">
        <div ref={headRef} className="reveal">
          <SectionHeading title="Facilities">
            The spaces where lessons, practicals, sport and celebrations happen at Mayfield.
          </SectionHeading>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {FACILITIES.map((f, i) => (
            <FacilityCard key={f.title} {...f} delay={(i % 3) * 80} />
          ))}
        </div>

        <h3 className="mt-14 font-serif text-2xl font-bold text-navy-900">Inside our classrooms</h3>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {CLASSROOMS.map((c) => (
            <figure key={c.caption} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-100">
              <img src={c.src} alt={c.alt} loading="lazy" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/80 to-transparent px-3 pb-2 pt-7 text-sm font-medium text-white">
                {c.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilityCard({ title, body, src, alt, span, flip, delay }) {
  const ref = useReveal(delay);
  const wide = span.includes("col-span-3");
  return (
    <article
      ref={ref}
      className={`reveal overflow-hidden rounded-2xl border border-navy-100 bg-white ${span} ${
        wide ? `lg:grid ${flip ? "lg:grid-cols-[1fr_1.4fr]" : "lg:grid-cols-[1.4fr_1fr]"}` : "flex flex-col"
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full object-cover ${wide ? `aspect-[16/9] lg:aspect-auto lg:h-full lg:max-h-[26rem] ${flip ? "lg:order-2" : ""}` : "aspect-[16/10]"}`}
      />
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
        <h3 className="font-serif text-xl font-bold text-navy-900">{title}</h3>
        <p className="mt-2 text-base leading-relaxed text-navy-600">{body}</p>
      </div>
    </article>
  );
}
