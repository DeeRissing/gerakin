import { Link } from "react-router";

export function VolleyballMark({ size = 48, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="32" cy="32" r="29" fill="#FFFFFF" stroke="#137CC8" strokeWidth="2.5" />
      <path d="M15 10C23 19 34 22 47 15" stroke="#078BD3" strokeWidth="5" strokeLinecap="round" />
      <path d="M23 5C33 18 31 27 22 35C18 39 12 40 6 42" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
      <path d="M48 13C43 22 42 29 48 36C51 40 55 43 59 44" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
      <path d="M7 42C20 34 31 37 36 47C38 51 37 56 36 61" stroke="#078BD3" strokeWidth="5" strokeLinecap="round" />
      <path d="M48 36C38 37 32 40 28 48C26 52 24 55 20 57" stroke="#137CC8" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="32" r="29" stroke="#137CC8" strokeWidth="2.5" />
    </svg>
  );
}

export default function GerakinLogo({ compact = false }) {
  return (
    <Link
      to="/"
      className="inline-flex min-w-0 items-center gap-2.5 sm:gap-3"
      aria-label="GERAKIN, kembali ke Beranda"
    >
      <VolleyballMark size={46} className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
      <span className="block min-w-0">
        <span className="block whitespace-nowrap text-[22px] font-black leading-none tracking-[-0.055em] text-gerakin-navy sm:text-[26px]">
          GERAKIN<span className="text-gerakin-blue">.</span>
        </span>
        {!compact && (
          <span className="mt-1 hidden whitespace-nowrap text-[9px] font-semibold tracking-wide text-slate-500 sm:block">
            GERAK AKTIF, INTERAKTIF, DAN INOVATIF
          </span>
        )}
      </span>
    </Link>
  );
}
