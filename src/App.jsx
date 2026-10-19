import { Routes, Route, Link } from "react-router";
import ActionLink from "./components/ActionLink";
import FeatureCard from "./components/FeatureCard";
import SectionHeading from "./components/SectionHeading";

import {
  ArrowRight,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Lightbulb,
  Target,
  Smartphone,
} from "lucide-react";

import Navbar from "./components/Navbar";

function Beranda() {
  return (
    <main className="overflow-hidden">

      <section className="relative bg-linear-to-br from-sky-50 via-white to-sky-100">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">

          {/* HERO TEXT */}

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
              <BookOpen size={17} />
              MEDIA PEMBELAJARAN PJOK KELAS IX
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-gerakin-navy sm:text-5xl lg:text-6xl">
              Belajar Bola Voli
              <br />

              <span className="text-gerakin-blue">
                Lebih Seru
              </span>

              <span className="text-gerakin-yellow">!</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              GERAKIN membantu kamu memahami teknik dasar
              bola voli melalui materi interaktif,
              video demonstrasi, latihan, dan kuis.
            </p>

<div className="mt-8 flex flex-wrap gap-4">

  <ActionLink to="/materi">
    Mulai Belajar
    <ArrowRight size={20} />
  </ActionLink>

  <ActionLink to="/materi" variant="secondary">
    <PlayCircle size={20} />
    Jelajahi Materi
  </ActionLink>

</div>

            <div className="mt-10 flex items-center gap-3 text-sm font-medium text-slate-500">
              <CheckCircle2
                size={21}
                className="text-green-500"
              />

              Belajar kapan saja dan di mana saja
            </div>

          </div>

          {/* AREA VISUAL SEMENTARA */}

          <div className="relative">

            <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-[36px] bg-linear-to-br from-sky-300 via-sky-400 to-blue-600 p-8 shadow-xl shadow-sky-100 sm:min-h-96">

              {/* Decorative Circles */}

              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-35x border-white/20" />

              <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/10" />

              {/* Volleyball Illustration */}

              <svg
                viewBox="0 0 240 240"
                className="relative z-10 h-48 w-48 drop-shadow-2xl sm:h-60 sm:w-60"
                role="img"
                aria-label="Ilustrasi bola voli"
              >
                <circle
                  cx="120"
                  cy="120"
                  r="92"
                  fill="#FFFFFF"
                  stroke="#E0F2FE"
                  strokeWidth="5"
                />

                <g
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="6"
                  strokeLinecap="round"
                >
                  <path d="M55 54 Q125 77 132 30" />
                  <path d="M132 30 Q142 95 206 91" />
                  <path d="M206 91 Q154 128 193 177" />
                  <path d="M193 177 Q122 159 100 208" />
                  <path d="M100 208 Q105 143 34 151" />
                  <path d="M34 151 Q96 117 55 54" />
                  <path d="M55 54 Q117 115 34 151" />
                  <path d="M132 30 Q102 116 193 177" />
                </g>
              </svg>

              <div className="absolute bottom-5 right-5 z-20 rounded-2xl bg-white px-4 py-3 shadow-lg">
                <p className="text-sm font-black text-gerakin-navy">
                  6 Teknik Dasar
                </p>

                <p className="text-xs text-slate-500">
                  Bola Voli
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATUS PENGEMBANGAN */}

      {/* =====================================
    SECTION KEUNGGULAN GERAKIN
===================================== */}

<section className="relative bg-white px-6 py-20 lg:px-10">

  <div className="mx-auto max-w-7xl">

    {/* SECTION HEADING */}

    <SectionHeading
      eyebrow="BELAJAR LEBIH MENYENANGKAN"
      title="Kenapa Belajar di GERAKIN?"
      description="Belajar teknik dasar bola voli menjadi lebih mudah, interaktif, dan menyenangkan melalui pengalaman belajar yang dirancang khusus untuk siswa SMP."
    />

    {/* FEATURE GRID */}

    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

      <FeatureCard
        icon={BookOpen}
        title="Mudah Dipahami"
        description="Materi disajikan dengan bahasa sederhana, ilustrasi menarik, dan penjelasan yang mudah dimengerti."
      />

      <FeatureCard
        icon={Lightbulb}
        title="Interaktif"
        description="Belajar menggunakan video demonstrasi, latihan praktik, kuis, dan refleksi pembelajaran."
      />

      <FeatureCard
        icon={Target}
        title="Fokus pada Praktik"
        description="Membantu siswa memahami dan mempraktikkan enam teknik dasar permainan bola voli."
      />

      <FeatureCard
        icon={Smartphone}
        title="Belajar Kapan Saja"
        description="Materi pembelajaran dapat diakses dengan nyaman melalui smartphone maupun laptop."
      />

    </div>

  </div>

</section>

    </main>
  );
}

function HalamanSementara({ judul, deskripsi }) {
  return (
    <main className="flex min-h-[65vh] flex-col items-center justify-center bg-sky-50 px-6 py-20 text-center">

      <div className="mb-6 rounded-3xl bg-sky-100 p-5 text-gerakin-blue">
        <BookOpen size={42} />
      </div>

      <h1 className="text-3xl font-black text-gerakin-navy sm:text-4xl">
        {judul}
      </h1>

      <p className="mt-4 max-w-md text-slate-500">
        {deskripsi}
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-gerakin-yellow px-6 font-bold text-gerakin-navy"
      >
        Kembali ke Beranda
      </Link>

    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Beranda />}
        />

        <Route
          path="/materi"
          element={
            <HalamanSementara
              judul="Pilihan Materi"
              deskripsi="Enam teknik dasar bola voli akan tersedia di halaman ini."
            />
          }
        />

        <Route
          path="/latihan"
          element={
            <HalamanSementara
              judul="Latihan Praktik"
              deskripsi="Tantangan praktik bola voli akan tersedia di sini."
            />
          }
        />

        <Route
          path="/kuis"
          element={
            <HalamanSementara
              judul="Kuis Interaktif"
              deskripsi="Uji pemahamanmu tentang permainan bola voli."
            />
          }
        />

        <Route
          path="/refleksi"
          element={
            <HalamanSementara
              judul="Refleksi Pembelajaran"
              deskripsi="Evaluasi perkembangan dan pengalaman belajarmu."
            />
          }
        />

        <Route
          path="*"
          element={
            <HalamanSementara
              judul="Halaman Tidak Ditemukan"
              deskripsi="Halaman yang kamu cari belum tersedia."
            />
          }
        />

      </Routes>

      {/* FOOTER */}

      <footer className="border-t border-sky-100 bg-white px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

          <p className="font-black text-gerakin-navy">
            GERAKIN<span className="text-gerakin-sky">.</span>
          </p>

          <p className="text-sm text-slate-400">
            Gerak Aktif, Interaktif, dan Inovatif
          </p>

          <p className="text-xs text-slate-400">
            © 2026 GERAKIN
          </p>

        </div>

      </footer>

    </div>
  );
}