export default function PageHeader({ title, description, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-navy-100/80 pb-3">
      <div>
        <p className="mb-1 text-xs font-semibold text-school-red">Mayfield Global School</p>
        <h1 className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-[28px]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-navy-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
