import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import logoGerakin from "../assets/logo-gerakin.svg";

const navigation = [
  { name: "Beranda", path: "/" },
  { name: "Materi", path: "/materi" },
  { name: "Latihan", path: "/latihan" },
  { name: "Kuis", path: "/kuis" },
  { name: "Refleksi", path: "/refleksi" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navStyle = ({ isActive }) =>
    `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-sky-100 text-sky-700"
        : "text-slate-600 hover:bg-sky-50 hover:text-sky-700"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-10">
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="GERAKIN - Beranda"
        >
          <img
            src={logoGerakin}
            alt="Logo GERAKIN"
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />

          <div>
            <h1 className="text-2xl font-black tracking-tight text-gerakin-navy">
              GERAKIN<span className="text-gerakin-sky">.</span>
            </h1>

            <p className="hidden text-[10px] font-semibold tracking-wide text-slate-400 sm:block">
              GERAK AKTIF, INTERAKTIF, DAN INOVATIF
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={navStyle}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/materi"
          className="hidden items-center gap-2 rounded-full bg-gerakin-yellow px-5 py-3 text-sm font-bold text-gerakin-navy transition hover:bg-yellow-300 lg:flex"
        >
          Mulai Belajar
          <ArrowRight size={17} />
        </NavLink>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-gerakin-navy lg:hidden"
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-sky-100 bg-white px-5 pb-5 pt-3 lg:hidden"
          aria-label="Navigasi seluler"
        >
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMobileOpen(false)}
                className={navStyle}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <NavLink
            to="/materi"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gerakin-yellow px-5 font-bold text-gerakin-navy"
          >
            Mulai Belajar
            <ArrowRight size={18} />
          </NavLink>
        </nav>
      )}
    </header>
  );
}