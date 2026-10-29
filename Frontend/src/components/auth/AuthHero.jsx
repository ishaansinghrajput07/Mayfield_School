import { motion } from "framer-motion";
import { CalendarCheck, IdCard, BookOpen, Award, Wallet, Megaphone } from "lucide-react";
import Logo from "../brand/Logo";
import { photos } from "../../assets/school";
import { SCHOOL } from "../../config/school";

const PORTAL_FEATURES = [
  { icon: CalendarCheck, label: "Attendance" },
  { icon: BookOpen, label: "Homework" },
  { icon: Award, label: "Results" },
  { icon: Wallet, label: "Fee status" },
  { icon: Megaphone, label: "Notices" },
  { icon: IdCard, label: "Digital ID" },
];

export default function AuthHero() {
  return (
    <div className="relative hidden overflow-hidden bg-white lg:flex lg:w-[56%] lg:flex-col lg:justify-between lg:p-12 xl:p-16">
      <span className="house-stripe absolute inset-x-0 top-0" aria-hidden="true" />

      {/* Crest + school name */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 flex items-center gap-4">
        <Logo size={64} />
        <div>
          <p className="font-serif text-2xl font-bold leading-tight text-navy-900">{SCHOOL.name}</p>
          <p className="text-sm text-navy-500">Neora, Patna. CBSE, {SCHOOL.classes}</p>
        </div>
      </motion.div>

      {/* Welcome copy */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }} className="relative z-10 max-w-lg">
        <h1 className="font-serif text-4xl font-extrabold leading-[1.05] text-navy-900 xl:text-5xl">
          Your school day, in one place
        </h1>
        <p className="mt-5 text-base leading-relaxed text-navy-600">
          Sign in to see attendance, homework, results, fee status, notices and your digital ID card.
        </p>

        <ul className="mt-7 flex flex-wrap gap-2.5">
          {PORTAL_FEATURES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 rounded-full border border-navy-100 bg-paper px-3.5 py-2 text-sm font-medium text-navy-700">
              <Icon size={15} className="text-school-red" />
              {label}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Photo + facts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="relative z-10">
        <img
          src={photos.flagAssembly}
          alt="Students in house colours at the Independence Day assembly"
          className="aspect-[16/7] w-full rounded-2xl object-cover"
        />
        <p className="mt-4 text-sm text-navy-500">
          Established {SCHOOL.established}. CBSE affiliation no. {SCHOOL.affiliationNo}. Managed by the {SCHOOL.trust}.
        </p>
      </motion.div>
    </div>
  );
}
