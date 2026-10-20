import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock3,
  MessageSquareText,
  PencilLine,
  Save,
  ShieldAlert,
  Trash2,
} from "lucide-react";

import { daftarMateri } from "../Data/Material";
import { pertanyaanRefleksi } from "../Data/refleksi";

const STORAGE_KEY = "gerakin-refleksi-v1";
const MAX_JAWABAN = 600;

function bacaRefleksi() {
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

function simpanRefleksi(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

function tanggalIndonesia(nilai) {
  if (!nilai) return "";
  const date = new Date(nilai);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("id-ID", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function punyaJawabanSah(entri, pertanyaan) {
  return Boolean(
    entri &&
    pertanyaan?.length &&
    pertanyaan.every((item) => typeof entri.jawaban?.[item.id] === "string" && entri.jawaban[item.id].trim()),
  );
}

export function RefleksiPage() {
  const [riwayat] = useState(bacaRefleksi);
  const selesai = daftarMateri.filter((materi) =>
    punyaJawabanSah(riwayat[materi.slug], pertanyaanRefleksi[materi.slug]),
  ).length;

  return (
    <main className="min-h-screen bg-[#F4FAFF]">
      <section className="bg-linear-to-br from-sky-100 via-white to-cyan-100 px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
            <MessageSquareText size={18} /> GERAKIN • EVALUASI DIRI
          </span>
          <h1 className="mt-5 text-3xl font-black text-gerakin-navy sm:text-5xl">
            Refleksi <span className="text-gerakin-blue">Pembelajaran</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Setelah belajar dan mencoba latihan bola voli, tuliskan apa yang sudah
            kamu kuasai, apa yang masih sulit, dan rencana perbaikannya.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-800 shadow-sm">
            <CheckCircle2 size={18} /> {selesai} dari {daftarMateri.length} refleksi tersimpan
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <h2 className="mb-7 text-2xl font-black text-gerakin-navy">Pilih Materi untuk Direfleksikan</h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {daftarMateri.map((materi) => {
            const entri = riwayat[materi.slug];
            const tersimpan = punyaJawabanSah(entri, pertanyaanRefleksi[materi.slug]);
            return (
              <Link
                key={materi.slug}
                to={`/refleksi/${materi.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-3 focus-visible:outline-blue-600 motion-reduce:transform-none"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-linear-to-br from-sky-300 to-blue-600">
                  {materi.image ? (
                    <img
                      src={materi.image}
                      alt={`Demonstrasi ${materi.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white"><BookOpen size={48} /></div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-blue-900">
                    REFLEKSI {String(materi.id).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-black text-gerakin-navy">{materi.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{materi.description}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
                    {tersimpan ? (
                      <span className="inline-flex items-center gap-2 text-green-700"><CheckCircle2 size={18} /> Sudah disimpan</span>
                    ) : (
                      <span className="text-slate-500">Belum ada refleksi</span>
                    )}
                  </div>
                  {tersimpan && tanggalIndonesia(entri.updatedAt) && (
                    <p className="mt-1 text-xs text-slate-500">Diperbarui: {tanggalIndonesia(entri.updatedAt)}</p>
                  )}
                  <div className="mt-5 flex items-center justify-between border-t border-sky-100 pt-4 text-sm font-extrabold text-gerakin-blue">
                    {tersimpan ? "Lihat / Ubah Refleksi" : "Mulai Refleksi"}
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-500">
          Jawaban tersimpan hanya di browser perangkat ini, bukan dikirim kepada guru.
          Pada perangkat bersama, orang lain yang membuka browser yang sama mungkin dapat membacanya.
        </p>
      </section>
    </main>
  );
}

function FormRefleksi({ materi, pertanyaan }) {
  const [jawaban, setJawaban] = useState(() => {
    const lama = bacaRefleksi()[materi.slug]?.jawaban;
    return pertanyaan.reduce((acc, item) => {
      acc[item.id] = typeof lama?.[item.id] === "string" ? lama[item.id] : "";
      return acc;
    }, {});
  });
  const [keyakinan, setKeyakinan] = useState(() => {
    const skor = bacaRefleksi()[materi.slug]?.keyakinan;
    return Number.isInteger(skor) && skor >= 1 && skor <= 5 ? skor : null;
  });
  const [updatedAt, setUpdatedAt] = useState(() => bacaRefleksi()[materi.slug]?.updatedAt || "");
  const [sudahSimpan, setSudahSimpan] = useState(false);
  const [adaPerubahan, setAdaPerubahan] = useState(false);
  const [pesan, setPesan] = useState("");
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);

  const terisi = pertanyaan.filter((item) => jawaban[item.id]?.trim()).length;
  const siapSimpan = terisi === pertanyaan.length;

  function ubahJawaban(id, nilai) {
    setJawaban((lama) => ({ ...lama, [id]: nilai }));
    setAdaPerubahan(true);
    setSudahSimpan(false);
    setPesan("");
  }

  function simpan(event) {
    event.preventDefault();
    if (!siapSimpan) {
      setPesan("Lengkapi ketiga jawaban refleksi sebelum menyimpan.");
      return;
    }

    const sekarang = new Date().toISOString();
    const semua = bacaRefleksi();
    const entri = {
      jawaban: Object.fromEntries(pertanyaan.map((item) => [item.id, jawaban[item.id].trim()])),
      keyakinan,
      updatedAt: sekarang,
    };

    if (simpanRefleksi({ ...semua, [materi.slug]: entri })) {
      setJawaban(entri.jawaban);
      setUpdatedAt(sekarang);
      setAdaPerubahan(false);
      setSudahSimpan(true);
      setKonfirmasiHapus(false);
      setPesan("");
    } else {
      setSudahSimpan(false);
      setPesan("Browser tidak mengizinkan penyimpanan. Jawaban belum tersimpan; periksa pengaturan atau ruang penyimpanan browser.");
    }
  }

  function hapus() {
    const semua = bacaRefleksi();
    delete semua[materi.slug];
    if (simpanRefleksi(semua)) {
      setJawaban(Object.fromEntries(pertanyaan.map((item) => [item.id, ""])));
      setKeyakinan(null);
      setUpdatedAt("");
      setAdaPerubahan(false);
      setSudahSimpan(false);
      setKonfirmasiHapus(false);
      setPesan("Refleksi untuk materi ini berhasil dihapus dari browser.");
    } else {
      setKonfirmasiHapus(false);
      setPesan("Tidak dapat menghapus data yang tersimpan di browser ini.");
    }
  }

  return (
    <main className="min-h-screen bg-[#F4FAFF]">
      <section className="bg-linear-to-br from-sky-100 via-white to-cyan-100 px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Link to="/refleksi" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-sky-700 hover:underline">
            <ArrowLeft size={18} /> Daftar Refleksi
          </Link>
          <span className="mt-7 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
            <PencilLine size={18} /> REFLEKSI PEMBELAJARAN
          </span>
          <h1 className="mt-5 text-3xl font-black text-gerakin-navy sm:text-5xl">{materi.title}</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Jawablah dengan jujur berdasarkan pengalamanmu saat mempelajari dan mempraktikkan teknik ini.
            Tidak ada jawaban benar atau salah.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link to={`/materi/${materi.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline"><BookOpen size={17} /> Materi</Link>
            <Link to={`/latihan/${materi.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline"><ClipboardList size={17} /> Latihan</Link>
            <Link to={`/kuis/${materi.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:underline">Kuis <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <form onSubmit={simpan} className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:p-8" noValidate>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black text-gerakin-navy">Ceritakan Pengalaman Belajarmu</h2>
            <span className="rounded-full bg-sky-100 px-3 py-2 text-sm font-extrabold text-sky-800">{terisi}/{pertanyaan.length} terisi</span>
          </div>

          <div className="mt-8 space-y-8">
            {pertanyaan.map((item, i) => (
              <div key={item.id}>
                <label htmlFor={`${materi.slug}-${item.id}`} className="flex items-start gap-3 text-base font-extrabold leading-7 text-gerakin-navy">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm text-white">{i + 1}</span>
                  <span>{item.pertanyaan} <span className="text-red-500" aria-hidden="true">*</span></span>
                </label>
                <p className="ml-11 mt-2 text-sm leading-6 text-slate-500" id={`${materi.slug}-${item.id}-hint`}>{item.petunjuk}</p>
                <textarea
                  id={`${materi.slug}-${item.id}`}
                  value={jawaban[item.id]}
                  onChange={(e) => ubahJawaban(item.id, e.target.value)}
                  rows={4}
                  maxLength={MAX_JAWABAN}
                  required
                  aria-describedby={`${materi.slug}-${item.id}-hint`}
                  placeholder="Tulis pengalamanmu di sini..."
                  className="mt-3 min-h-28 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base leading-7 text-gerakin-navy outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                />
                <p className="mt-1 text-right text-xs text-slate-400">{jawaban[item.id].length}/{MAX_JAWABAN} karakter</p>
              </div>
            ))}
          </div>

          <fieldset className="mt-9 rounded-2xl bg-sky-50 p-5">
            <legend className="px-1 text-sm font-extrabold text-gerakin-navy">Seberapa yakin kamu bisa melakukan teknik ini? (opsional)</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((nilai) => (
                <label key={nilai} className={`flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-extrabold ${keyakinan === nilai ? "border-sky-600 bg-sky-600 text-white" : "border-sky-200 bg-white text-sky-800"}`}>
                  <input
                    type="radio"
                    name={`keyakinan-${materi.slug}`}
                    value={nilai}
                    checked={keyakinan === nilai}
                    onChange={() => { setKeyakinan(nilai); setAdaPerubahan(true); setSudahSimpan(false); setPesan(""); }}
                    className="sr-only"
                  />
                  {nilai}
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-600">1 = belum yakin · 5 = sangat yakin. Ini penilaian diri, bukan nilai praktik.</p>
          </fieldset>

          {updatedAt && (
            <p className="mt-6 flex items-center gap-2 text-sm text-slate-500"><Clock3 size={16} /> Terakhir disimpan: {tanggalIndonesia(updatedAt)}</p>
          )}
          {adaPerubahan && <p className="mt-3 text-sm font-semibold text-amber-700">Ada perubahan yang belum disimpan.</p>}
          {sudahSimpan && (
            <p role="status" className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-800"><CheckCircle2 size={20} /> Refleksi berhasil disimpan di browser ini.</p>
          )}
          {pesan && (
            <p role={pesan.startsWith("Refleksi untuk") ? "status" : "alert"} className="mt-5 rounded-xl bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">{pesan}</p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-sky-100 pt-6">
            <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gerakin-yellow px-6 py-3 text-sm font-black text-gerakin-navy transition hover:bg-yellow-300">
              <Save size={19} /> Simpan Refleksi
            </button>
            <Link to="/refleksi" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-6 py-3 text-sm font-bold text-sky-800">
              Kembali ke Daftar
            </Link>
            {updatedAt && !konfirmasiHapus && (
              <button type="button" onClick={() => setKonfirmasiHapus(true)} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-50">
                <Trash2 size={18} /> Hapus Refleksi
              </button>
            )}
          </div>

          {konfirmasiHapus && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5">
              <p className="flex items-start gap-2 text-sm font-bold text-red-800"><ShieldAlert size={19} className="shrink-0" /> Yakin ingin menghapus refleksi {materi.title}? Data yang disimpan akan hilang dari browser ini.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={hapus} className="min-h-11 rounded-full bg-red-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-800">Ya, Hapus</button>
                <button type="button" onClick={() => setKonfirmasiHapus(false)} className="min-h-11 rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-bold text-red-800">Batal</button>
              </div>
            </div>
          )}
        </form>

        <p className="mt-6 text-sm leading-6 text-slate-500">
          Refleksi disimpan secara lokal pada perangkat ini. Jangan memasukkan informasi pribadi yang sensitif,
          terutama jika menggunakan komputer bersama. Menghapus data browser juga dapat menghapus jawabanmu.
        </p>
      </section>
    </main>
  );
}

export function RefleksiDetailPage() {
  const { slug } = useParams();
  const materi = daftarMateri.find((item) => item.slug === slug);
  const pertanyaan = pertanyaanRefleksi[slug];

  if (!materi || !pertanyaan?.length) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-black text-gerakin-navy">Refleksi Tidak Ditemukan</h1>
        <Link to="/refleksi" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-gerakin-yellow px-6 py-3 font-bold text-gerakin-navy">Kembali ke Daftar Refleksi</Link>
      </main>
    );
  }
  // Jika pengguna pindah slug, form baru membaca data milik materi tersebut.
  return <FormRefleksi key={slug} materi={materi} pertanyaan={pertanyaan} />;
}
