export default function AuthSelect({ id, label, value, onChange, children, icon: Icon }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-navy-700">
        {label}
      </label>
      <div className="relative">
        {Icon && <Icon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />}
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-xl border border-navy-100 bg-navy-50/70 py-3.5 pr-9 text-sm text-navy-900 outline-none transition-all duration-200 hover:border-navy-300 focus:border-navy-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,86,166,0.12)] ${
            Icon ? "pl-11" : "pl-4"
          }`}
        >
          {children}
        </select>
        <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
