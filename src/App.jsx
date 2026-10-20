import { Routes, Route, Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Lightbulb,
  Target,
  Smartphone,
} from "lucide-react";

import {
  LatihanPage,
  LatihanDetailPage,
} from "./Pages/Latihan";
import Navbar from "./components/Navbar";
import ActionLink from "./components/ActionLink";
import FeatureCard from "./components/FeatureCard";
import SectionHeading from "./components/SectionHeading";
import heroImage from "./assets/volleyball.svg";
import { MateriPage } from "./Pages/Materi";
import DetailMateriPage from "./Pages/DetailMateri";

import {
  KuisPage,
  KuisDetailPage,
} from "./Pages/Kuis";
import {
  RefleksiPage,
  RefleksiDetailPage,
} from "./Pages/Refleksi";


function Beranda() {
  return (
    <main className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#eef8fd]">
        {/* BACKGROUND DASAR */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-full bg-linear-to-r from-[#f3fbff] via-[#eef8fd] to-[#dff3ff]" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl" />
        </div>

        {/* AREA GAMBAR KANAN */}
        <div className="absolute inset-y-0 right-0 hidden w-[52%] overflow-hidden lg:block">
          <img
            src={heroImage}
            alt="Siswa sedang bermain bola voli"
            className="h-full w-full object-cover"
          />

          {/* overlay halus di atas gambar */}
          <div className="absolute inset-0 bg-linear-to-l from-sky-900/10 via-transparent to-transparent" />

          {/* dekorasi */}
          <div className="absolute right-10 top-14 h-36 w-36 rounded-full bg-yellow-300/25 blur-3xl" />
          <div className="absolute bottom-16 left-8 h-28 w-28 rounded-full bg-sky-300/25 blur-2xl" />

          {/* badge */}
          <div className="absolute bottom-10 right-10 rounded-3xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur">
            <p className="text-2xl font-black text-gerakin-navy">6 Teknik Dasar</p>
            <p className="text-sm text-slate-500">Bola Voli</p>
          </div>
        </div>

        {/* PEMBATAS LEKUKAN */}
        <div className="absolute inset-y-0 right-[48%] z-10 hidden h-full w-55 translate-x-1/2 lg:block">
          <svg
            viewBox="0 0 220 900"
            preserveAspectRatio="none"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M120,0 
                 C170,60 170,120 120,180
                 C70,240 70,300 125,360
                 C180,420 180,480 120,540
                 C60,600 60,660 125,720
                 C185,780 185,840 120,900
                 L0,900 L0,0 Z"
              fill="#eef8fd"
            />
          </svg>
        </div>

        {/* KONTEN KIRI */}
        <div className="relative z-20 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-14 lg:px-10">
          <div className="max-w-2xl lg:max-w-[44%]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-sky-700 shadow-sm backdrop-blur">
              <BookOpen size={17} />
              MEDIA PEMBELAJARAN PJOK KELAS IX
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-gerakin-navy sm:text-6xl xl:text-7xl">
              Belajar Bola Voli
              <br />
              <span className="text-gerakin-blue">Lebih Seru</span>
              <span className="text-orange-400">!</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              GERAKIN membantumu memahami teknik dasar bola voli melalui
              materi interaktif, video demonstrasi, latihan praktik, kuis,
              dan refleksi pembelajaran.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <ActionLink to="/materi">
                Mulai Belajar
                <ArrowRight size={20} />
              </ActionLink>

              <ActionLink
                to="/materi"
                variant="secondary"
                className="bg-white/80 backdrop-blur"
              >
                <PlayCircle size={20} />
                Jelajahi Materi
              </ActionLink>
            </div>

            <div className="mt-8 flex items-center gap-3 text-base font-medium text-slate-700">
              <CheckCircle2 size={22} className="text-green-500" />
              Belajar kapan saja dan di mana saja
            </div>
          </div>
        </div>

        {/* VERSI MOBILE/TABLET */}
        <div className="relative z-10 block px-6 pb-8 lg:hidden">
          <div className="overflow-hidden rounded-[28px] border-4 border-white/80 shadow-xl">
            <img
              src={heroImage}
              alt="Siswa sedang bermain bola voli"
              className="h-70 w-full object-cover sm:h-90"
            />
          </div>

          <div className="mt-4 inline-flex rounded-2xl bg-white px-4 py-3 shadow-md">
            <div>
              <p className="text-lg font-black text-gerakin-navy">6 Teknik Dasar</p>
              <p className="text-sm text-slate-500">Bola Voli</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION KEUNGGULAN */}
      <section className="relative bg-white px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="BELAJAR LEBIH MENYENANGKAN"
            title="Kenapa Belajar di GERAKIN?"
            description="Belajar teknik dasar bola voli menjadi lebih mudah, interaktif, dan menyenangkan melalui pengalaman belajar yang dirancang khusus untuk siswa SMP."
          />

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
  element={<MateriPage />}
/>

<Route
  path="/materi/:slug"
  element={<DetailMateriPage />}
/>

<Route
  path="/latihan"
  element={<LatihanPage />}
/>

<Route
  path="/latihan/:slug"
  element={<LatihanDetailPage />}
/>


<Route
  path="/kuis"
  element={<KuisPage />}
/>

<Route
  path="/kuis/:slug"
  element={<KuisDetailPage />}
/>


<Route
  path="/refleksi"
  element={<RefleksiPage />}
/>

<Route
  path="/refleksi/:slug"
  element={<RefleksiDetailPage />}
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