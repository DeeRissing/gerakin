import { Link } from "react-router";

const variants = {
  primary:
    "bg-gerakin-yellow text-gerakin-navy hover:bg-yellow-300",

  secondary:
    "border-2 border-sky-200 bg-white text-gerakin-blue hover:bg-sky-50",
};

export default function ActionLink({
  to,
  children,
  variant = "primary",
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`
        inline-flex
        min-h-12
        items-center
        justify-center
        gap-2
        rounded-full
        px-7
        py-3
        text-sm
        font-bold
        transition-colors
        sm:text-base
        ${variants[variant] || variants.primary}
        ${className}
      `}
    >
      {children}
    </Link>
  );
}