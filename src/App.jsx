import { BookOpen, PlayCircle } from "lucide-react";
import { Routes, Route, Link } from "react-router";

function Beranda() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sky-50 px-6 text-center">

      <div className="mb-6 rounded-3xl bg-sky-500 p-5 text-white">
        <BookOpen size={48} />
      </div>

      <h1 className="text-5xl font-extrabold text-blue-950">
        GERAKIN
      </h1>

      <p className="mt-3 text-lg font-semibold text-sky-600">
        Gerak Aktif, Interaktif, dan Inovatif
      </p>

      <p className="mt-6 max-w-md text-gray-600">
        Website pembelajaran PJOK interaktif untuk
        siswa SMP kelas IX.
      </p>

      <Link
        to="/materi"
        className="mt-8 flex items-center gap-3 rounded-full bg-yellow-400 px-8 py-4 font-bold text-blue-950 transition hover:bg-yellow-300"
      >
        <PlayCircle size={24} />
        Mulai Belajar
      </Link>

      <p className="mt-12 text-sm text-gray-400">
        GERAKIN Development Version 0.1.0
      </p>

    </div>
  );
}

function Materi() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sky-50 px-6 text-center">

      <h1 className="text-3xl font-bold text-blue-950">
        Halaman Materi
      </h1>

      <p className="mt-4 text-gray-600">
        Halaman materi akan dikembangkan pada fase berikutnya.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-full bg-sky-500 px-6 py-3 font-semibold text-white"
      >
        Kembali ke Beranda
      </Link>

    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/materi" element={<Materi />} />
    </Routes>
  );
}