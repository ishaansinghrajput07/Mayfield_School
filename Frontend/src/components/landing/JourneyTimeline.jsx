import { photos } from "../../assets/school";
import useReveal from "../../hooks/useReveal";
import SectionHeading from "./SectionHeading";

// A year at the school, told through its own photographs. No invented dates:
// only the occasions that are visible in the pictures.
const MOMENTS = [
  {
    title: "Morning prayer",
    body: "Each school day starts with students standing in rows in the school ground for prayer.",
    src: photos.morningPrayer,
    alt: "Rows of students in uniform with folded hands during morning prayer",
  },
  {
    title: "Independence Day",
    body: "On 15 August students in house colours gather under a canopy with flags in their hands.",
    src: photos.flagAssembly,
    alt: "Young students in red, yellow, green and blue holding small flags",
  },
  {
    title: "National flag hoisting",
    body: "The flag goes up on a tricolour platform, with a rangoli map of India on the ground below.",
    src: photos.flagHoisting,
    alt: "A flag being hoisted beside a tricolour rangoli of the map of India",
  },
  {
    title: "Sports day",
    body: "Teams stand in line by house colour on the field, and winners receive medals and trophies.",
    src: photos.sportsLineup,
    alt: "Students lined up on the sports field wearing different house colours",
  },
  {
    title: "Practical lessons",
    body: "Senior students gather around apparatus in the physics laboratory.",
    src: photos.physicsLab,
    alt: "Students at a physics laboratory bench",
  },
  {
    title: "Christmas",
    body: "Students decorate a classroom board with Santa figures, trees and cards.",
    src: photos.christmasBoard,
    alt: "A red board decorated with Christmas trees, Santa figures and a Merry Christmas banner",
  },
  {
    title: "Annual function and farewell",
    body: "The year closes with programmes on a decorated stage and a farewell for outgoing students.",
    src: photos.farewellStage,
    alt: "Students on a decorated stage at the annual function",
  },
];

export default function JourneyTimeline() {
  const headRef = useReveal();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site">
        <div ref={headRef} className="reveal">
          <SectionHeading title="A year at Mayfield">
            What the school calendar looks like, in photographs from our own campus.
          </SectionHeading>
        </div>

        <ol className="mt-12 space-y-10 lg:space-y-14">
          {MOMENTS.map((m, i) => (
            <Moment key={m.title} {...m} flip={i % 2 === 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Moment({ title, body, src, alt, flip }) {
  const ref = useReveal();
  return (
    <li ref={ref} className="reveal grid items-center gap-5 lg:grid-cols-2 lg:gap-12">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`aspect-[16/10] w-full rounded-2xl object-cover ${flip ? "lg:order-2" : ""}`}
      />
      <div className="max-w-md">
        <h3 className="font-serif text-2xl font-bold text-navy-900">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-navy-600">{body}</p>
      </div>
    </li>
  );
}
