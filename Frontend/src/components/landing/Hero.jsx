import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { photos } from "../../assets/school";
import { SCHOOL } from "../../config/school";
import Logo from "../brand/Logo";

function HeroPhoto({ src, alt, caption, className = "", delay = 0, priority = false }) {
  return (
    <figure className={`hero-photo relative overflow-hidden rounded-2xl bg-navy-100 ${className}`} style={{ "--hero-delay": `${delay}ms` }}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/80 to-transparent px-3.5 pb-2.5 pt-8 text-[13px] font-medium text-white">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto grid max-w-site items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:px-10 lg:pb-24 lg:pt-44 xl:gap-16">
        <div className="min-w-0">
          <span className="house-stripe w-14 rounded-full" aria-hidden="true" />
          <p className="mt-5 text-base font-semibold text-school-red sm:text-lg">
            A co-educational CBSE school in Neora, Patna
          </p>
          <h1 className="mt-3 font-serif text-[clamp(3.4rem,8.4vw,6.75rem)] font-extrabold leading-[0.94] tracking-tight text-navy-900">
            Knowledge
            <br />
            is Power
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
            {SCHOOL.name} teaches {SCHOOL.classes} on the CBSE curriculum, on a campus along Sarai Neoraganj Road in
            Patna. Run by the {SCHOOL.trust}.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/apply"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-school-red px-6 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-school-red-dark"
            >
              Apply for admission
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/?section=contact"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-navy-900 px-6 py-3 text-base font-bold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
            >
              Contact the school
            </Link>
            <a
              href={`tel:${SCHOOL.phones[0].tel}`}
              className="inline-flex min-h-12 items-center gap-2 px-2 text-base font-semibold text-navy-700 hover:text-school-red"
            >
              <Phone size={17} />
              {SCHOOL.phones[0].display}
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-navy-100 border-t border-navy-100 pt-5">
            <div className="pr-4">
              <dt className="text-sm text-navy-500">Established</dt>
              <dd className="mt-1 font-serif text-2xl font-bold text-navy-900">{SCHOOL.established}</dd>
            </div>
            <div className="px-4">
              <dt className="text-sm text-navy-500">Classes</dt>
              <dd className="mt-1 font-serif text-2xl font-bold text-navy-900">Nursery to XII</dd>
            </div>
            <div className="pl-4">
              <dt className="text-sm text-navy-500">CBSE affiliation</dt>
              <dd className="mt-1 font-serif text-2xl font-bold text-navy-900">{SCHOOL.affiliationNo}</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
          <div className="grid aspect-[6/5] grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
            <HeroPhoto
              src={photos.medalGirl}
              alt="A student receives a medal at a school prize ceremony"
              caption="Medal ceremony"
              className="col-span-3 row-span-2"
              priority
            />
            <HeroPhoto
              src={photos.flagAssembly}
              alt="Students in house colours holding flags at the Independence Day assembly"
              caption="Independence Day assembly"
              className="col-span-2"
              delay={140}
              priority
            />
            <HeroPhoto
              src={photos.scienceLab}
              alt="The school science laboratory with blue workbenches and cabinets"
              caption="Science laboratory"
              className="col-span-2"
              delay={260}
            />
          </div>
          <div className="absolute -left-3 -top-8 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-[0_14px_36px_-12px_rgba(18,31,61,0.5)] ring-1 ring-navy-100 sm:-left-8 sm:h-32 sm:w-32">
            <Logo size={100} />
          </div>
        </div>
      </div>
    </section>
  );
}
