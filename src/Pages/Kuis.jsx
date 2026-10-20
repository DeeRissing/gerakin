import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";

import { daftarMateri } from "../Data/Material";
import { kuisPerMateri } from "../Data/kuis";

const STORAGE_KEY = "gerakin-kuis-v1";

function bacaRiwayat() {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function simpanRiwayat(riwayat) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(riwayat));
    return true;
  } catch {
    return false;
  }
}

function ProgressBar({ value, total, label }) {
  const persen = total > 0 ? Math.max(0, Math.min(100, (value / total) * 100)) : 0;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={value}
      className="h-2.5 w-full overflow-hidden rounded-full bg-sky-100"
    >
      <div
        className="h-full rounded-full bg-sky-500 transition-[width] duration-300"
        style={{ width: `${persen}%` }}
      />
    </div>
  );
}

export function KuisPage() {
  const [riwayat] = useState(bacaRiwayat);

  return (
    <main className="min-h-screen bg-[#F4FAFF]">
      <section className="bg-linear-to-br from-sky-100 via-white to-cyan-100 px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
            <ClipboardList size={18} /> GERAKIN • UJI PEMAHAMANMU
          </span>
          <h1 className="mt-5 text-3xl font-black text-gerakin-navy sm:text-5xl">
            Kuis <span className="text-gerakin-blue">Bola Voli</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Pilih teknik yang telah dipelajari. Jawab lima soal pilihan ganda,
            lihat skormu, lalu pelajari pembahasan tiap jawaban.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <h2 className="mb-7 text-2xl font-black text-gerakin-navy">Pilih Kuis</h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {daftarMateri.map((materi) => {
            const soal = kuisPerMateri[materi.slug] || [];
            const riwayatMateri = riwayat[materi.slug];
            return (
              <Link
                key={materi.slug}
                to={`/kuis/${materi.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-3 focus-visible:outline-blue-600 motion-reduce:transform-none"
              >
                <div className="relative aspect-video overflow-hidden bg-linear-to-br from-sky-300 to-blue-600">
                  {materi.image ? (
                    <img
                      src={materi.image}
                      alt={`Demonstrasi ${materi.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white">
                      <BookOpen size={48} />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-blue-900">
                    KUIS {String(materi.id).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-black text-gerakin-navy">{materi.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{materi.description}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
                    <span>{soal.length} soal pilihan ganda</span>
                    {riwayatMateri && Number.isFinite(riwayatMateri.bestScore) ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-800">
                        <Trophy size={15} /> Skor terbaik {riwayatMateri.bestScore}
                      </span>
                    ) : (
                      <span className="text-slate-400">Belum dikerjakan</span>
                    )}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-sky-100 pt-4 text-sm font-extrabold text-gerakin-blue">
                    {riwayatMateri ? "Kerjakan Lagi" : "Mulai Kuis"}
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-slate-500">
          Hasil kuis disimpan di browser pada perangkat ini dan tidak otomatis dikirim kepada guru.
        </p>
      </section>
    </main>
  );
}

function KuisRunner({ materi, soal }) {
  const [jawaban, setJawaban] = useState(() => Array(soal.length).fill(null));
  const [indeks, setIndeks] = useState(0);
  const [tuntas, setTuntas] = useState(false);
  const [riwayat, setRiwayat] = useState(bacaRiwayat);
  const [gagalSimpan, setGagalSimpan] = useState(false);

  const terjawab = jawaban.filter((nilai) => nilai !== null).length;
  const soalSaatIni = soal[indeks];
  const benar = soal.filter((pertanyaan, i) => jawaban[i] === pertanyaan.jawaban).length;
  const skor = Math.round((benar / soal.length) * 100);
  const riwayatMateri = riwayat[materi.slug];

  function pilihJawaban(pilihan) {
    setJawaban((sebelumnya) => sebelumnya.map((nilai, i) => i === indeks ? pilihan : nilai));
  }

  function selesaikanKuis() {
    const pertamaKosong = jawaban.findIndex((nilai) => nilai === null);
    if (pertamaKosong !== -1) {
      setIndeks(pertamaKosong);
      return;
    }

    const sebelumnya = riwayat[materi.slug];
    const terbaikSebelumnya = Number.isFinite(sebelumnya?.bestScore)
      ? sebelumnya.bestScore
      : 0;
    const jumlahSebelumnya = Number.isFinite(sebelumnya?.attempts)
      ? sebelumnya.attempts
      : 0;

    const berikut = {
      ...riwayat,
      [materi.slug]: {
        lastScore: skor,
        bestScore: Math.max(terbaikSebelumnya, skor),
        attempts: jumlahSebelumnya + 1,
        total: soal.length,
        updatedAt: new Date().toISOString(),
      },
    };
    setRiwayat(berikut);
    setGagalSimpan(!simpanRiwayat(berikut));
    setTuntas(true);
  }

  function ulangiKuis() {
    setJawaban(Array(soal.length).fill(null));
    setIndeks(0);
    setTuntas(false);
    setGagalSimpan(false);
  }

  if (tuntas) {
    return (
      <main className="min-h-screen bg-[#F4FAFF] px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Link to="/kuis" className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline">
            <ArrowLeft size={18} /> Daftar Kuis
          </Link>
          <div className="mt-7 rounded-3xl border border-sky-100 bg-white p-6 text-center shadow-sm sm:p-9">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Trophy size={36} />
            </div>
            <p className="mt-5 text-sm font-bold uppercase tracking-wider text-sky-700">
              Hasil Kuis {materi.title}
            </p>
            <h1 className="mt-2 text-5xl font-black text-gerakin-navy sm:text-6xl">
              {skor}<span className="text-2xl text-slate-400">/100</span>
            </h1>
            <p className="mt-4 text-slate-600">{benar} dari {soal.length} jawaban benar.</p>
            <p className="mt-2 text-sm text-slate-500">
              {skor === 100
                ? "Semua jawaban benar. Pertahankan pemahamanmu!"
                : "Baca pembahasan di bawah untuk memahami jawaban yang perlu diperbaiki."}
            </p>
            <p className="mt-4 text-sm font-semibold text-sky-800">
              Skor terbaik di perangkat ini: {riwayatMateri?.bestScore ?? skor}
            </p>
            {gagalSimpan && (
              <p role="alert" className="mx-auto mt-4 max-w-xl rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
                Hasil dapat dilihat sekarang, tetapi browser tidak mengizinkan penyimpanan. Skor mungkin hilang setelah halaman ditutup.
              </p>
            )}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={ulangiKuis}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gerakin-yellow px-6 py-3 text-sm font-extrabold text-gerakin-navy hover:bg-yellow-300"
              >
                <RotateCcw size={18} /> Ulangi Kuis
              </button>
              <Link
                to="/kuis"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-sky-200 bg-white px-6 py-3 text-sm font-bold text-sky-800"
              >
                Pilih Kuis Lain
                <Link
  to={`/refleksi/${materi.slug}`}
  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-sky-100 px-6 py-3 text-sm font-bold text-sky-800"
>
  Isi Refleksi
  <ArrowRight size={18} />
</Link>
              </Link>
            </div>
          </div>

          <h2 className="mt-10 text-2xl font-black text-gerakin-navy">Pembahasan Jawaban</h2>
          <p className="mt-2 text-sm text-slate-600">Periksa jawabanmu pada setiap soal.</p>
          <div className="mt-5 space-y-4">
            {soal.map((pertanyaan, i) => {
              const tepat = jawaban[i] === pertanyaan.jawaban;
              return (
                <article key={pertanyaan.id} className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:p-7">
                  <div className="flex items-start gap-3">
                    {tepat ? (
                      <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={22} />
                    ) : (
                      <XCircle className="mt-0.5 shrink-0 text-red-600" size={22} />
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gerakin-navy">{i + 1}. {pertanyaan.pertanyaan}</h3>
                      <p className="mt-3 text-sm text-slate-600">
                        Jawabanmu: <span className={tepat ? "font-bold text-green-700" : "font-bold text-red-700"}>
                          {String.fromCharCode(65 + jawaban[i])}. {pertanyaan.opsi[jawaban[i]]}
                        </span>
                      </p>
                      {!tepat && (
                        <p className="mt-2 text-sm text-slate-700">
                          Jawaban benar: <span className="font-bold text-green-700">
                            {String.fromCharCode(65 + pertanyaan.jawaban)}. {pertanyaan.opsi[pertanyaan.jawaban]}
                          </span>
                        </p>
                      )}
                      <p className="mt-4 rounded-xl bg-sky-50 p-4 text-sm leading-7 text-slate-700">
                        <span className="font-bold text-sky-800">Pembahasan: </span>{pertanyaan.pembahasan}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={`/materi/${materi.slug}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-sky-800 shadow-sm">
              <BookOpen size={18} /> Pelajari Materi
            </Link>
            <Link to={`/latihan/${materi.slug}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-sky-100 px-6 py-3 text-sm font-bold text-sky-800">
              Latihan Praktik <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4FAFF]">
      <section className="bg-linear-to-br from-sky-100 via-white to-cyan-100 px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Link to="/kuis" className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline">
            <ArrowLeft size={18} /> Daftar Kuis
          </Link>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700">
            <CircleHelp size={18} /> KUIS PENGETAHUAN
          </div>
          <h1 className="mt-5 text-3xl font-black text-gerakin-navy sm:text-5xl">{materi.title}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Jawab semua pertanyaan berdasarkan materi yang telah dipelajari. Kamu dapat kembali ke soal sebelumnya sebelum melihat hasil.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link to={`/materi/${materi.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-gerakin-blue hover:underline">
              <BookOpen size={17} /> Pelajari Materi
            </Link>
            <Link to={`/latihan/${materi.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-gerakin-blue hover:underline">
              Latihan Praktik <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-black text-gerakin-navy">Progres Kuis</h2>
            <span className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-extrabold text-sky-700">
              {terjawab}/{soal.length} dijawab
            </span>
          </div>
          <ProgressBar value={terjawab} total={soal.length} label="Jumlah soal dijawab" />
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Navigasi nomor soal">
            {soal.map((pertanyaan, i) => (
              <button
                key={pertanyaan.id}
                type="button"
                onClick={() => setIndeks(i)}
                aria-label={`Soal ${i + 1}${jawaban[i] !== null ? ", sudah dijawab" : ", belum dijawab"}`}
                aria-current={indeks === i ? "step" : undefined}
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-extrabold transition-colors ${
                  indeks === i
                    ? "bg-sky-600 text-white"
                    : jawaban[i] !== null
                      ? "bg-sky-100 text-sky-800"
                      : "border border-slate-200 bg-white text-slate-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-wide text-sky-700">Soal {indeks + 1} dari {soal.length}</p>
          <fieldset className="mt-4 min-w-0">
            <legend className="text-xl font-black leading-8 text-gerakin-navy sm:text-2xl">
              {soalSaatIni.pertanyaan}
            </legend>
            <div className="mt-7 space-y-3">
              {soalSaatIni.opsi.map((opsi, nomor) => {
                const dipilih = jawaban[indeks] === nomor;
                return (
                  <label
                    key={`${soalSaatIni.id}-${nomor}`}
                    className={`flex min-h-14 cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors ${
                      dipilih ? "border-sky-400 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`jawaban-${soalSaatIni.id}`}
                      checked={dipilih}
                      onChange={() => pilihJawaban(nomor)}
                      className="h-5 w-5 shrink-0 accent-sky-600"
                    />
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sm font-black text-sky-800">
                      {String.fromCharCode(65 + nomor)}
                    </span>
                    <span className="text-sm font-medium leading-6 text-slate-700 sm:text-base">{opsi}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-sky-100 pt-6">
            <button
              type="button"
              onClick={() => setIndeks((i) => Math.max(0, i - 1))}
              disabled={indeks === 0}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-bold text-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={19} /> Sebelumnya
            </button>
            {indeks < soal.length - 1 ? (
              <button
                type="button"
                onClick={() => setIndeks((i) => Math.min(soal.length - 1, i + 1))}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gerakin-yellow px-6 py-3 text-sm font-extrabold text-gerakin-navy hover:bg-yellow-300"
              >
                Selanjutnya <ChevronRight size={19} />
              </button>
            ) : (
              <button
                type="button"
                onClick={selesaikanKuis}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gerakin-yellow px-6 py-3 text-sm font-extrabold text-gerakin-navy hover:bg-yellow-300"
              >
                {terjawab === soal.length ? "Lihat Hasil" : "Periksa Soal Kosong"}
                <ArrowRight size={19} />
              </button>
            )}
          </div>
          {indeks === soal.length - 1 && terjawab !== soal.length && (
            <p className="mt-4 text-sm text-amber-800">
              Masih ada {soal.length - terjawab} soal yang belum dijawab. Tombol di atas akan membawamu ke soal kosong pertama.
            </p>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Kuis ini untuk evaluasi pemahaman materi, bukan penilaian keterampilan praktik di lapangan.
        </p>
      </section>
    </main>
  );
}

export function KuisDetailPage() {
  const { slug } = useParams();
  const materi = daftarMateri.find((item) => item.slug === slug);
  const soal = kuisPerMateri[slug] || [];

  if (!materi || soal.length === 0) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-black text-gerakin-navy">Kuis Tidak Ditemukan</h1>
        <Link to="/kuis" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-gerakin-yellow px-6 py-3 font-bold text-gerakin-navy">
          Kembali ke Daftar Kuis
        </Link>
      </main>
    );
  }

  // Key memastikan jawaban dari materi sebelumnya tidak ikut terbawa saat URL berubah.
  return <KuisRunner key={slug} materi={materi} soal={soal} />;
}
