import { photos } from "../../assets/school";
import { SCHOOL } from "../../config/school";
import useReveal from "../../hooks/useReveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  const textRef = useReveal();
  const photoRef = useReveal(120);

  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid max-w-site items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div ref={textRef} className="reveal min-w-0">
          <SectionHeading title="A Patna school built around one idea">
            Our crest shows two children holding hands over an open book, with the sun rising behind them.
            It carries the school's motto: {SCHOOL.motto}.
          </SectionHeading>

          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-navy-600">
            <p>
              {SCHOOL.name} is a co-educational school affiliated to the Central Board of Secondary Education.
              It opened in {SCHOOL.established} at Neora Ganjpar, on Sarai Neoraganj Road in Patna, and teaches
              children from Nursery through Senior Secondary (Class XII).
            </p>
            <p>
              The school is managed by the {SCHOOL.trust} and led by its principal, {SCHOOL.principal}.
              Students take part in morning assembly, national-day programmes, sports day, science practicals
              and the annual function. Take a look at the photographs on this site to see a school day for yourself.
            </p>
          </div>
        </div>

        <div ref={photoRef} className="reveal relative min-w-0 pb-10 sm:pb-0">
          <img
            src={photos.campusBuilding}
            alt="The Mayfield Global School academic building at Neora, Patna"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
          />
          <figure className="absolute -bottom-2 left-4 flex items-center gap-3 rounded-xl bg-white p-2.5 pr-5 shadow-[0_16px_40px_-14px_rgba(18,31,61,0.5)] ring-1 ring-navy-100 sm:-bottom-8 sm:-left-6">
            <img
              src={photos.principalPortrait}
              alt={`${SCHOOL.principal}, Principal`}
              loading="lazy"
              className="h-20 w-16 rounded-lg object-cover object-top sm:h-24 sm:w-20"
            />
            <figcaption>
              <span className="block font-serif text-lg font-bold leading-tight text-navy-900">{SCHOOL.principal}</span>
              <span className="mt-0.5 block text-sm text-navy-500">Principal</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-site">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          <div>
            <h3 className="font-serif text-2xl font-bold text-navy-900 sm:text-3xl">The people behind the school</h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-navy-600">
              Our teachers and staff, photographed together outside the school building in Patna.
            </p>
          </div>
          <img
            src={photos.staffGroup}
            alt="Teachers and staff of Mayfield Global School standing together outdoors"
            loading="lazy"
            className="aspect-[16/9] w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
