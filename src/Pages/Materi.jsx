
import { Link, useParams } from "react-router";
import { ArrowLeft, BookOpen } from "lucide-react";

import { daftarMateri } from "../Data/Material";
import MaterialCard from "../components/MaterialCard";

export function MateriPage() {
  return (
    <main className="min-h-screen bg-[#F5FBFF]">
      {/* HEADER HALAMAN */}
      <section className="relative overflow-hidden bg-linear-to-br from-sky-100 via-sky-50 to-white px-5 py-16 sm:py-20">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-50 border-sky-200/50" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-gerakin-blue shadow-sm">
            <BookOpen size={17} />
            PEMBELAJARAN PJOK KELAS IX
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gerakin-navy sm:text-4xl lg:text-5xl">
            Pilih Materi
            <span className="block text-gerakin-blue">
              Teknik Dasar Bola Voli
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
            Yuk, mulai petualangan belajarmu!
            Pilih salah satu dari enam teknik dasar
            bola voli yang ingin kamu pelajari.
          </p>
        </div>
      </section>

      {/* DAFTAR MATERI */}
      <section className="px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-gerakin-navy">
                Jelajahi Materi
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enam teknik dasar untuk meningkatkan
                kemampuan bermain bola voli.
              </p>
            </div>

            <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
              6 Materi Tersedia
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {daftarMateri.map((materi, index) => (
              <MaterialCard
                key={materi.id}
                materi={materi}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// HALAMAN SEMENTARA UNTUK FASE 5
export function DetailMateriSementara() {
  const { slug } = useParams();

  const materi = daftarMateri.find(
    (item) => item.slug === slug
  );

  if (!materi) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-black text-gerakin-navy">
          Materi Tidak Ditemukan
        </h1>

        <Link
          to="/materi"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gerakin-yellow px-6 py-3 font-bold text-gerakin-navy"
        >
          <ArrowLeft size={18} />
          Kembali ke Materi
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-[65vh] flex-col items-center justify-center bg-sky-50 px-6 py-20 text-center">
      <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
        Materi {materi.id}
      </span>

      <h1 className="mt-5 text-3xl font-black text-gerakin-navy sm:text-4xl">
        {materi.title}
      </h1>

      <p className="mt-4 max-w-lg text-slate-600">
        {materi.description}
      </p>

      <p className="mt-6 text-sm text-slate-500">
        Halaman pembelajaran lengkap akan
        dikembangkan pada Fase 5.
      </p>

      <Link
        to="/materi"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gerakin-yellow px-6 py-3 font-bold text-gerakin-navy"
      >
        <ArrowLeft size={18} />
        Kembali ke Pilihan Materi
      </Link>
    </main>
  );
}
