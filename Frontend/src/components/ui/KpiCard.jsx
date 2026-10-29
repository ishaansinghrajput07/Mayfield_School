import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import useCountUp from "../../hooks/useCountUp";

const THEME = {
  navy: { bg: "bg-navy-50 text-navy-700", ring: "group-hover:ring-navy-100" },
  teal: { bg: "bg-teal-50 text-teal-700", ring: "group-hover:ring-teal-100" },
  amber: { bg: "bg-amber-50 text-amber-700", ring: "group-hover:ring-amber-100" },
  violet: { bg: "bg-violet-50 text-violet-700", ring: "group-hover:ring-violet-100" },
  red: { bg: "bg-red-50 text-red-600", ring: "group-hover:ring-red-100" },
};

/**
 * `trend` is optional and only rendered when the caller actually has a
 * real month-over-month number to show (see Dashboard.jsx) - we never
 * fabricate a percentage just to fill the card out.
 */
export default function KpiCard({ label, value, suffix = "", icon: Icon, accent = "navy", trend, index = 0 }) {
  const t = THEME[accent] || THEME.navy;
  const animatedValue = useCountUp(typeof value === "number" ? value : undefined);
  const displayValue = typeof value === "number" ? animatedValue : value;
  const hasTrend = typeof trend === "number" && Number.isFinite(trend);
  const isUp = trend > 0;
  const isFlat = trend === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-xl border border-navy-100/80 bg-white p-5 shadow-card ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${t.ring}`}
    >
      <div className="relative flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.bg}`}>
          {Icon && <Icon size={18} strokeWidth={1.9} />}
        </div>
        {hasTrend && (
          <span
            className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
              isFlat ? "bg-navy-50 text-navy-400" : isUp ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-600"
            }`}
          >
            {!isFlat && (isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />)}
            {isFlat ? "0%" : `${isUp ? "+" : ""}${trend}%`}
          </span>
        )}
      </div>

      <p className="relative mt-4 font-display text-[26px] font-bold tracking-tight text-navy-900">
        {displayValue}
        {suffix}
      </p>
      <p className="relative mt-1 text-sm font-medium text-navy-400">{label}</p>
      {hasTrend && <p className="relative mt-0.5 text-[11px] text-navy-300">vs last month</p>}
    </motion.div>
  );
}
