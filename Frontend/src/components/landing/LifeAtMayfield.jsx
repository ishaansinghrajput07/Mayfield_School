import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { photos } from "../../assets/school";
import useReveal from "../../hooks/useReveal";
import SectionHeading from "./SectionHeading";

// Real photographs from the school. The grid areas give the mosaic its rhythm:
// one large frame, two tall ones, the rest landscape.
const TILES = [
  { src: photos.annualFunction, alt: "Parents, guests and students watching the annual function", caption: "Annual function", area: "lg:col-span-2 lg:row-span-2" },
  { src: photos.nurseryClass, alt: "Nursery students with their teachers in front of a decorated board", caption: "Nursery class", area: "" },
  { src: photos.physicsLab, alt: "Senior students working with apparatus during a physics practical", caption: "Physics practical", area: "" },
  { src: photos.christmasBoard, alt: "A classroom board decorated with Christmas crafts", caption: "Christmas crafts", area: "" },
  { src: photos.prizeDistribution, alt: "A student receives a trophy from guests on a sports prize day", caption: "Prize distribution", area: "" },
  { src: photos.morningPrayer, alt: "Students in uniform standing in rows for morning prayer", caption: "Morning prayer", area: "lg:col-span-2" },
  { src: photos.stageGroup, alt: "Students and teachers posing together on a decorated stage", caption: "Farewell programme", area: "lg:col-span-2" },
  { src: photos.ptDrill, alt: "Rows of students stretching their arms during a physical training drill", caption: "Physical training drill", area: "lg:col-span-2" },
  { src: photos.studentsMat, alt: "Students in red, green and blue polo shirts sitting on a green mat and smiling", caption: "Sports day", area: "" },
  { src: photos.sportsField, alt: "Teachers and students standing on the open sports field", caption: "On the field", area: "" },
];

export default function LifeAtMayfield() {
  const headRef = useReveal();

  return (
    <section id="life" className="bg-paper">
      <div className="mx-auto max-w-site">
        <div ref={headRef} className="reveal flex flex-wrap items-end justify-between gap-6">
          <SectionHeading title="Life at Mayfield">
            Photographs from classrooms, laboratories, assemblies and celebrations.
          </SectionHeading>
          <Link
            to="/?section=gallery"
            className="inline-flex items-center gap-2 text-base font-bold text-school-red hover:text-school-red-dark"
          >
            Open the photo gallery
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-10 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[11.5rem]">
          {TILES.map((tile) => (
            <figure key={tile.caption} className={`group relative overflow-hidden rounded-xl bg-navy-100 ${tile.area}`}>
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/80 to-transparent px-3.5 pb-2.5 pt-8 text-sm font-medium text-white">
                {tile.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
