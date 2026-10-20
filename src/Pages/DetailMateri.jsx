
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  PlayCircle,
  ImageIcon,
} from "lucide-react";

import { daftarMateri } from "../Data/Material";
import { detailMateri } from "../Data/detailMateri";

const navigasi = [
  { id: "pengertian", label: "Pengertian & Tujuan" },
  { id: "tahapan", label: "Tahapan Gerakan" },
  { id: "video", label: "Video Demonstrasi" },
  { id: "kesalahan", label: "Kesalahan Umum" },
  { id: "tips", label: "Tips Gerakan" },
];

export default function DetailMateriPage() {
  const { slug } = useParams();

  const materi = daftarMateri.find(
    (item) => item.slug === slug
  );

  const detail = detailMateri[slug];

  if (!materi) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-black text-gerakin-navy">
          Materi Tidak Ditemukan
        </h1>
        <Link
          to="/materi"
          className="mt-8 inline-flex rounded-full bg-yellow-400 px-6 py-3 font-bold"
        >
          Kembali ke Pilihan Materi
        </Link>
      </main>
    );
  }

  if (!detail) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <BookOpen
          size={48}
          className="mx-auto text-sky-500"
        />
        <h1 className="mt-6 text-3xl font-black text-gerakin-navy">
          {materi.title}
        </h1>
        <p className="mt-4 text-slate-600">
          Materi pembelajaran ini sedang disiapkan.
        </p>
        <Link
          to="/materi"
          className="mt-8 inline-flex rounded-full bg-yellow-400 px-6 py-3 font-bold text-gerakin-navy"
        >
          Kembali ke Pilihan Materi
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4FAFF]">

      {/* HEADER MATERI */}
      <section className="overflow-hidden bg-linear-to-br from-sky-100 via-white to-blue-100">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 lg:grid-cols-2 lg:px-10 lg:py-16">
          <div>
            <Link
              to="/materi"
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline"
            >
              <ArrowLeft size={17} />
              Kembali ke Pilihan Materi
            </Link>

            <div className="mt-8 inline-flex rounded-full bg-sky-200 px-4 py-2 text-xs font-black uppercase tracking-wider text-sky-800">
              Materi {String(materi.id).padStart(2, "0")}
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-gerakin-navy sm:text-5xl lg:text-6xl">
              {materi.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              {materi.description}
            </p>
          </div>

          <div className="overflow-hidden rounded-[30px] border-4 border-white shadow-xl shadow-sky-200/40">
            <img
              src={materi.image}
              alt={`Demonstrasi ${materi.title}`}
              className="aspect-16/10 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* NAVIGASI MOBILE */}
      <nav
        aria-label="Bagian materi"
        className="border-b border-sky-100 bg-white px-5 py-3 lg:hidden"
      >
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1">
          {navigasi.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full bg-sky-100 px-4 py-3 text-sm font-semibold text-sky-800"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* KONTEN PEMBELAJARAN */}
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[245px_minmax(0,1fr)] lg:px-10">

        {/* SIDEBAR DESKTOP */}
        <aside className="hidden lg:block">
          <nav
            aria-label="Navigasi detail materi"
            className="sticky top-28 rounded-3xl border border-sky-100 bg-white p-4 shadow-sm"
          >
            <p className="mb-4 px-3 text-xs font-black uppercase tracking-wider text-slate-400">
              Isi Pembelajaran
            </p>

            {navigasi.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-sky-100 hover:text-sky-700"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="min-w-0 space-y-8">

          {/* PENGERTIAN */}
          <section
            id="pengertian"
            className="scroll-mt-28 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="flex items-center gap-3 text-2xl font-black text-gerakin-navy">
              <BookOpen className="shrink-0 text-sky-500" />
              Pengertian dan Tujuan
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              {detail.pengertian}
            </p>

            <div className="mt-7 rounded-2xl bg-amber-50 p-5">
              <h3 className="font-extrabold text-gerakin-navy">
                Tujuan {materi.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {detail.tujuan.map((tujuan) => (
                  <li
                    key={tujuan}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                  >
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-sky-600"
                    />
                    {tujuan}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* TAHAPAN */}
          <section
            id="tahapan"
            className="scroll-mt-28 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-2xl font-black text-gerakin-navy">
              Tahapan Melakukan Gerakan
            </h2>

            <p className="mt-3 text-slate-500">
              Pelajari setiap tahapan secara berurutan.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {detail.langkah.map((langkah) => (
                <article
                  key={langkah.nomor}
                  className="overflow-hidden rounded-2xl border border-sky-100 bg-sky-50/50"
                >
                  <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-sky-100">
                    {langkah.image ? (
                      <img
                        src={langkah.image}
                        alt={`Tahap ${langkah.nomor}: ${langkah.judul}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3 p-5 text-center text-sky-600">
                        <ImageIcon size={36} />
                        <p className="text-sm font-semibold">
                          Foto demonstrasi tahap {langkah.nomor} akan ditambahkan
                        </p>
                      </div>
                    )}

                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-lg font-black text-white shadow-md">
                      {langkah.nomor}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-gerakin-navy">
                      {langkah.judul}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {langkah.deskripsi}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* VIDEO */}
          <section
            id="video"
            className="scroll-mt-28 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="flex items-center gap-3 text-2xl font-black text-gerakin-navy">
              <PlayCircle className="shrink-0 text-sky-500" />
              Video Demonstrasi
            </h2>

            <p className="mt-3 text-slate-500">
              Amati contoh gerakan sebelum mempraktikkannya.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl bg-slate-900">
              {detail.videoUrl ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={materi.image}
                  className="aspect-video w-full"
                >
                  <source
                    src={detail.videoUrl}
                    type="video/mp4"
                  />
                  Browser tidak mendukung pemutaran video.
                </video>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center gap-3 px-5 text-center text-white">
                  <PlayCircle
                    size={52}
                    className="text-sky-400"
                  />
                  <p className="font-bold">
                    Video demonstrasi belum ditambahkan
                  </p>
                  <p className="max-w-md text-sm text-slate-300">
                    Video pembelajaran akan tersedia setelah
                    aset demonstrasi disiapkan.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* KESALAHAN UMUM */}
          <section
            id="kesalahan"
            className="scroll-mt-28 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="flex items-center gap-3 text-2xl font-black text-gerakin-navy">
              <AlertCircle className="shrink-0 text-amber-500" />
              Kesalahan Umum
            </h2>

            <div className="mt-6 space-y-4">
              {detail.kesalahan.map((item) => (
                <div
                  key={item.masalah}
                  className="rounded-2xl border border-slate-100 p-5"
                >
                  <p className="font-bold text-red-600">
                    {item.masalah}
                  </p>

                  <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-green-600"
                    />
                    {item.solusi}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* TIPS */}
          <section
            id="tips"
            className="scroll-mt-28 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="flex items-center gap-3 text-2xl font-black text-gerakin-navy">
              <Lightbulb className="shrink-0 text-amber-500" />
              Tips Melakukan Gerakan
            </h2>

            <ul className="mt-6 space-y-4">
              {detail.tips.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 text-slate-600"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* NAVIGASI BAWAH */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-sky-100 p-6">
            <Link
              to="/materi"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-sky-800"
            >
              <ArrowLeft size={18} />
              Daftar Materi
            </Link>

            <Link
              to="/latihan"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gerakin-yellow px-6 py-3 text-sm font-bold text-gerakin-navy"
            >
              Menu Latihan
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
