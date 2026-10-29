import { useState } from "react";

/**
 * Floating-label input shared by the sign-in and account forms.
 */
export default function AuthInput({
  id,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  required,
  autoComplete,
  rightAdornment,
  hint,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  // Native <input type="date"> always renders its own browser-drawn
  // "dd-mm-yyyy" placeholder that can't be hidden the way a text input's
  // can - so for date fields the label must always sit in its floated
  // (small, above the border) position, or the two texts overlap.
  const floated = focused || Boolean(value) || type === "date";

  return (
    <div>
      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              focused ? "text-navy-600" : "text-navy-400"
            }`}
          />
        )}
        <input
          id={id}
          type={type}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className={`peer w-full rounded-xl border bg-navy-50/70 py-3.5 text-sm text-navy-900 outline-none transition-all duration-200 placeholder:text-transparent ${
            Icon ? "pl-11" : "pl-4"
          } ${rightAdornment ? "pr-11" : "pr-4"} ${
            focused ? "border-navy-500 bg-white shadow-[0_0_0_4px_rgba(47,86,166,0.12)]" : "border-navy-100 hover:border-navy-300"
          }`}
          {...rest}
        />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 origin-left select-none text-navy-500 transition-all duration-200 ${
            Icon ? "peer-placeholder-shown:left-11" : ""
          } ${
            floated
              ? "-top-2 scale-[0.78] bg-white px-1.5 text-navy-700"
              : "top-1/2 -translate-y-1/2 text-sm"
          }`}
          style={{ left: Icon && !floated ? "2.75rem" : undefined }}
        >
          {label}
        </label>
        {rightAdornment && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightAdornment}</div>}
      </div>
      {hint && <p className="mt-1.5 text-xs text-navy-400">{hint}</p>}
    </div>
  );
}
