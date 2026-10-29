// Left-aligned section heading used across the public site. The short house
// stripe (red, yellow, green, blue) is the one recurring brand device.
export default function SectionHeading({ title, children, className = "", as: Tag = "h2" }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <span className="house-stripe w-12 rounded-full" aria-hidden="true" />
      <Tag className="mt-4 font-serif text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">{title}</Tag>
      {children && <p className="mt-3 text-base leading-relaxed text-navy-600">{children}</p>}
    </div>
  );
}
