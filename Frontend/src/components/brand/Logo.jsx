import { logo, logoSm } from "../../assets/school";
import { SCHOOL } from "../../config/school";

// The school crest. Pass `size` in px; small sizes use the lighter 256px asset.
export default function Logo({ size = 40, className = "" }) {
  return (
    <img
      src={size > 128 ? logo : logoSm}
      width={size}
      height={size}
      alt={`${SCHOOL.name} crest`}
      draggable={false}
      className={`shrink-0 select-none object-contain ${className}`}
    />
  );
}
