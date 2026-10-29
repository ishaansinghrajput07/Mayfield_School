import { photos } from "../../assets/school";
import useReveal from "../../hooks/useReveal";
import SectionHeading from "./SectionHeading";

const WALL = [
  { src: photos.awardCeremony, alt: "School representatives receiving a trophy and certificate on stage at an award ceremony", caption: "Receiving an award on stage", area: "lg:col-span-2 lg:row-span-2" },
  { src: photos.prizeDistribution, alt: "A student in a yellow shirt receiving a trophy from guests", caption: "Prize distribution", area: "" },
  { src: photos.certificates, alt: "Students holding certificates beside their teacher", caption: "Students with their certificates", area: "" },
  { src: photos.medalGirl, alt: "A young student wearing a medal beside a guest", caption: "A medal for a young athlete", area: "lg:col-span-2" },
];

export default function AchievementWall() {
  const headRef = useReveal();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site">
        <div ref={headRef} className="reveal">
          <SectionHeading title="Recognition and awards">
            Moments when the school and its students were recognised on stage and on the sports field.
          </SectionHeading>
        </div>

        <div className="mt-10 grid auto-rows-[12rem] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[13rem]">
          {WALL.map((w) => (
            <figure key={w.caption} className={`relative overflow-hidden rounded-xl bg-navy-100 ${w.area}`}>
              <img src={w.src} alt={w.alt} loading="lazy" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/80 to-transparent px-3.5 pb-2.5 pt-8 text-sm font-medium text-white">
                {w.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
