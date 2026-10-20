import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  Target,
  Trophy,
} from "lucide-react";

import { daftarMateri } from "../Data/Material";
import { latihanPerMateri } from "../Data/latihan";

const STORAGE_KEY = "gerakin-latihan-v1";

function bacaProgres() {
  if (typeof window === "undefined") return {};
  try {
    const data = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function simpanProgres(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

function tercentang(progres, slug) {
  return Array.isArray(progres[slug]) ? progres[slug] : [];
}

function ProgressBar({ selesai, total }) {
  const persen = total > 0 ? (selesai / total) * 100 : 0;
  return (
    <div
      role="progressbar"
      aria-label="Progres latihan"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={selesai}
      className="h-2.5 w-full overflow-hidden rounded-full bg-sky-100"
    >
      <div
        className="h-full rounded-full bg-sky-500 transition-all duration-300"
        style={{ width: `${persen}%` }}
      />
    </div>
  );
}

export function LatihanPage() {
  const [progres] = useState(bacaProgres);

  return (
    <main className="min-h-screen bg-[#F4FAFF]">
      <section className="bg-linear-to-br from-sky-100 via-white to-cyan-100 px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
            <ClipboardCheck size={18} /> GERAKIN • BELAJAR SAMBIL PRAKTIK
          </span>
          <h1 className="mt-5 text-3xl font-black text-gerakin-navy sm:text-5xl">
            Latihan <span className="text-gerakin-blue">Praktik Bola Voli</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Pilih teknik yang sudah kamu pelajari, kemudian coba tantangan praktiknya
            secara bertahap. Tandai setiap kegiatan setelah benar-benar dilakukan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <h2 className="mb-7 text-2xl font-black text-gerakin-navy">Pilih Latihan</h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {daftarMateri.map((materi) => {
            const daftar = latihanPerMateri[materi.slug] || [];
            const terisi = tercentang(progres, materi.slug);
            const jumlahSelesai = daftar.filter((t) => terisi.includes(t.id)).length;

            return (
              <Link
                key={materi.slug}
                to={`/latihan/${materi.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-3 focus-visible:outline-blue-600"
              >
                <div className="relative aspect-video overflow-hidden bg-linear-to-br from-sky-300 to-blue-600">
                  {materi.image ? (
                    <img
                      src={materi.image}
                      alt={`Ilustrasi ${materi.title}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white">
                      <BookOpen size={48} />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-blue-900">
                    MATERI {String(materi.id).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-black text-gerakin-navy">{materi.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{materi.description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm font-bold text-sky-700">
                    <span>{jumlahSelesai} dari {daftar.length} latihan selesai</span>
                    {jumlahSelesai === daftar.length && daftar.length > 0 ? (
                      <CheckCircle2 size={20} className="text-green-600" />
                    ) : (
                      <Target size={20} />
                    )}
                  </div>
                  <div className="mt-3">
                    <ProgressBar selesai={jumlahSelesai} total={daftar.length} />
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-sky-100 pt-4 text-sm font-extrabold text-gerakin-blue">
                    {jumlahSelesai > 0 ? "Lanjutkan Latihan" : "Mulai Latihan"}
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-slate-500">
          Progres tersimpan di browser pada perangkat ini, bukan di akun siswa atau perangkat lain.
        </p>
      </section>
    </main>
  );
}

export function LatihanDetailPage() {
  const { slug } = useParams();
  const materi = daftarMateri.find((item) => item.slug === slug);
  const daftar = latihanPerMateri[slug] || [];
  const [progres, setProgres] = useState(bacaProgres);
  const [gagalSimpan, setGagalSimpan] = useState(false);
  const [konfirmasiReset, setKonfirmasiReset] = useState(false);
  const terisi = tercentang(progres, slug);
  const jumlahSelesai = daftar.filter((item) => terisi.includes(item.id)).length;
  const semuaSelesai = daftar.length > 0 && jumlahSelesai === daftar.length;

  function perbaruiProgres(ids) {
    const berikut = { ...progres, [slug]: ids };
    setProgres(berikut);
    setGagalSimpan(!simpanProgres(berikut));
  }

  function toggleLatihan(id) {
    const berikut = terisi.includes(id)
      ? terisi.filter((item) => item !== id)
      : [...terisi, id];
    perbaruiProgres(berikut);
  }

  if (!materi || daftar.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-black text-gerakin-navy">Latihan Tidak Ditemukan</h1>
        <Link to="/latihan" className="mt-6 inline-flex rounded-full bg-gerakin-yellow px-6 py-3 font-bold">
          Kembali ke Daftar Latihan
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4FAFF]">
      <section className="bg-linear-to-br from-sky-100 via-white to-cyan-100 px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Link to="/latihan" className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline">
            <ArrowLeft size={18} /> Daftar Latihan
          </Link>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700">
            <Target size={18} /> LATIHAN PRAKTIK
          </div>
          <h1 className="mt-5 text-3xl font-black text-gerakin-navy sm:text-5xl">
            {materi.title}
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Ikuti empat tantangan berikut setelah membaca materi dan menonton video demonstrasi.
            Mulai dari latihan yang paling mudah.
          </p>
          <Link
            to={`/materi/${slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gerakin-blue hover:underline"
          >
            <BookOpen size={18} /> Pelajari Kembali Materi
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black text-gerakin-navy">Progres Latihan</h2>
            <span className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-extrabold text-sky-700">
              {jumlahSelesai} / {daftar.length} selesai
            </span>
          </div>
          <ProgressBar selesai={jumlahSelesai} total={daftar.length} />
          <p className="mt-3 text-sm text-slate-500">
            Centang hanya setelah tugas benar-benar dipraktikkan. Checklist bukan penilaian kualitas gerakan.
          </p>
          {gagalSimpan && (
            <p role="alert" className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              Perubahan terlihat sekarang, tetapi browser tidak mengizinkan penyimpanan progres.
              Progres mungkin hilang ketika halaman dimuat ulang.
            </p>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {daftar.map((tugas, index) => {
            const checked = terisi.includes(tugas.id);
            return (
              <label
                key={tugas.id}
                className={`flex cursor-pointer items-start gap-4 rounded-3xl border p-5 transition sm:p-6 ${
                  checked ? "border-sky-300 bg-sky-50" : "border-sky-100 bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleLatihan(tugas.id)}
                  className="mt-2 h-5 w-5 shrink-0 cursor-pointer accent-sky-600"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-800">
                      LATIHAN {index + 1}
                    </span>
                    <h3 className="text-lg font-extrabold text-gerakin-navy">{tugas.judul}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{tugas.instruksi}</p>
                  <p className="mt-4 inline-flex rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-900">
                    Target: {tugas.target}
                  </p>
                </div>
                {checked && <CheckCircle2 size={24} className="mt-1 shrink-0 text-green-600" aria-hidden="true" />}
              </label>
            );
          })}
        </div>

        <div className="mt-7 rounded-3xl border border-sky-100 bg-white p-5 sm:p-7">
          {semuaSelesai ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-700">
                <Trophy size={26} />
                <h2 className="text-xl font-black">Semua latihan telah ditandai selesai!</h2>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Kamu telah menandai empat aktivitas sebagai selesai. Lanjutkan menguji pemahaman melalui kuis ketika fiturnya tersedia pada Fase 7.
              </p>
              <Link to={`/kuis/${slug}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gerakin-yellow px-6 py-3 font-extrabold text-gerakin-navy">
                Menu Kuis <ArrowRight size={19} />
              </Link>
            </div>
          ) : (
            <p className="text-sm leading-7 text-slate-600">
              Masih ada {daftar.length - jumlahSelesai} aktivitas yang belum ditandai selesai.
              Kerjakan sesuai kemampuan dan utamakan keselamatan saat berlatih.
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
            <Link to="/latihan" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-sky-200 px-5 py-2.5 text-sm font-bold text-sky-800">
              <ArrowLeft size={18} /> Pilih Latihan Lain
            </Link>
            <button
              type="button"
              onClick={() => setKonfirmasiReset(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
            >
              <RotateCcw size={17} /> Atur Ulang Progres
            </button>
          </div>
          {konfirmasiReset && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-bold text-amber-900">
                Hapus tanda selesai pada empat latihan {materi.title}?
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    perbaruiProgres([]);
                    setKonfirmasiReset(false);
                  }}
                  className="min-h-11 rounded-full bg-amber-400 px-5 text-sm font-bold text-slate-900"
                >
                  Ya, Atur Ulang
                </button>
                <button
                  type="button"
                  onClick={() => setKonfirmasiReset(false)}
                  className="min-h-11 rounded-full bg-white px-5 text-sm font-bold text-slate-700"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Progres tersimpan pada browser dan perangkat ini. Tidak otomatis dikirim ke guru.
        </p>
      </section>
    </main>
  );
}
