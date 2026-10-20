
import { Link } from "react-router";
import { ArrowUpRight, BookOpen, ImageIcon } from "lucide-react";

const categories = [
  "PASSING",
  "PASSING",
  "SERVIS",
  "SERVIS",
  "SERANGAN",
  "PERTAHANAN",
];

export default function MaterialCard({ materi, index }) {
  return (
    <Link
      to={`/materi/${materi.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
    >
      {/* GAMBAR MATERI */}
      <div className="relative aspect-16/10 overflow-hidden bg-linear-to-br from-sky-300 to-blue-600">
        {materi.image ? (
          <img
            src={materi.image}
            alt={`Demonstrasi ${materi.title}`}
            loading="lazy"
            decoding="async"
            style={{
              objectPosition: materi.imagePosition || "center center",
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white">
            <ImageIcon size={48} />
          </div>
        )}

        {/* GRADASI FOTO */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-blue-950/50 via-transparent to-transparent" />

        {/* NOMOR MATERI */}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-xs font-black text-blue-900 shadow-sm">
          MATERI {String(materi.id).padStart(2, "0")}
        </span>

        {/* KATEGORI */}
        <span className="absolute right-4 top-4 rounded-full border border-white/50 bg-blue-950/35 px-3 py-2 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
          {categories[index] || "BOLA VOLI"}
        </span>

        {/* LABEL GAMBAR */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-semibold text-white">
          <BookOpen size={16} />
          Teknik Dasar Bola Voli
        </div>
      </div>

      {/* KONTEN KARTU */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-black tracking-tight text-gerakin-navy sm:text-2xl">
          {materi.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
          {materi.description}
        </p>

        {/* TOMBOL */}
        <div className="mt-6 flex items-center justify-between border-t border-sky-100 pt-4">
          <span className="text-sm font-extrabold text-gerakin-blue">
            Pelajari Materi
          </span>

          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gerakin-yellow text-gerakin-navy transition-all duration-300 group-hover:bg-yellow-300 group-hover:rotate-45 motion-reduce:transform-none">
            <ArrowUpRight size={21} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}
