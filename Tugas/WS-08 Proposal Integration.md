# WS-08 Proposal Integration (UTS)

 **Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---

## Template A.8 — Integration Checklist

```
PROPOSAL INTEGRATION CHECKLIST

Koneksi Vertikal (Flow Atas-Bawah):
  [x] Problem → Gap: masalah terdokumentasi di literatur
  [x] Gap → RQ: pertanyaan menjawab gap spesifik
  [x] RQ → Hypothesis: hipotesis memprediksi jawaban
  [x] Hypothesis → Metric: metrik mengukur variabel dalam hipotesis
  [x] Metric → System: komponen sistem menghasilkan/mengukur metrik
  [x] System → Experiment: desain eksperimen menggunakan sistem

Koneksi Horizontal (Konsistensi):
  [x] Istilah sama di semua bagian
  [x] Variabel di RQ = variabel di hipotesis = metrik di desain
  [x] Scope tidak berubah dari masalah ke eksperimen

Cognitive Trap Checklist:
  [x] Tidak ada paragraf "promosi" di pendahuluan (hanya data & gap)
  [x] Metodologi disesuaikan ke RQ, bukan copy-paste textbook
  [x] Timeline sudah ditambah buffer 30-50% dari estimasi awal
  [x] Proposal mengakui kemungkinan H0 tidak ditolak (honest uncertainty)
  [x] Tidak ada klaim "pasti berhasil" atau "meningkatkan signifikan"

Rubrik Self-Assessment:
| Kriteria     | 1 (Lemah)                                        | 2 (Cukup)                                     | 3 (Baik)                                           | Skor |
|------------- |--------------------------------------------------|-----------------------------------------------|----------------------------------------------------|------|
| Koherensi    | >2 koneksi vertikal terputus                     | 1-2 koneksi lemah, argumen masih bisa diikuti | Semua 6 koneksi terhubung, red thread jelas        | 3    |
| Specificity  | Variabel/metrik masih abstrak, tidak ada angka   | Sebagian metrik terdefinisi numerik           | Semua metrik + threshold + unit pengukuran jelas   | 3    |
| Feasibility  | Timeline >6 bulan tanpa memperhitungkan sumber   | Timeline 3-6 bulan dengan asumsi tertentu     | Timeline 1-3 bulan realistis dengan rencana detail | 3    |
| Rigor        | Baseline tidak jelas atau straw man              | 1-2 baseline dengan justifikasi partial       | 2+ baseline SOTA + justifikasi pemilihan lengkap   | 3    |
```

---

## Latihan 1 — Kompilasi Proposal Mini

Kumpulkan hasil dari WS-02 sampai WS-07 menjadi satu ringkasan proposal.

| Komponen | Sumber | Isi (1-2 kalimat) |
|----------|--------|-------------------|
| Problem Statement | WS-02 | Keputusan pemilihan framework CSS (Tailwind vs Bootstrap) di Indonesia sering didasarkan pada tren komunitas, padahal hal ini berdampak pada critical rendering path dan performa muat di perangkat mobile pengguna. |
| Gap | WS-03 | Belum ada studi komparatif Tailwind vs Bootstrap yang mengukur metrik standar Core Web Vitals (FCP/LCP) pada berbagai viewport layar secara terkontrol dengan prototipe web yang identik. |
| RQ | WS-04 | Apakah halaman web Tailwind CSS JIT menghasilkan FCP dan LCP yang berbeda signifikan dibanding Bootstrap PurgeCSS pada 3 variasi viewport menggunakan Lighthouse CLI? |
| Hipotesis | WS-04 | H₁: Terdapat perbedaan yang signifikan antara FCP dan LCP halaman Tailwind CSS dan halaman Bootstrap pada viewport mobile 375px (p < 0,05). |
| Variabel & Metrik | WS-05 | IV: Framework CSS (Tailwind/Bootstrap). DV: FCP (ms) & LCP (ms). CV: Viewport (px) & Jaringan (3G). |
| Sistem | WS-06 | Prototipe statis HTML/CSS untuk masing-masing framework yang dijalankan di localhost, diukur oleh script otomasi Node.js Lighthouse CLI. |
| Desain Eksperimen | WS-07 | Eksperimen komparatif terkontrol; dua perlakuan diuji 10x per kondisi pada mode 3G, lalu dianalisis dengan uji Mann-Whitney U. |

---

## Latihan 2 — Integration Checklist

Verifikasi 6 koneksi kritis. Isi dengan merujuk tabel di Latihan 1.

| Koneksi | Status | Bukti |
|---------|--------|-------|
| Problem → Gap | ✅ | Masalah "pilih framework tanpa data empiris" dikonfirmasi di Bab 3 bahwa data empiris (FCP/LCP dengan variabel terkontrol) memang belum ada di literatur. |
| Gap → RQ | ✅ | RQ secara langsung menanyakan pengukuran FCP/LCP yang dikontrol dengan konten identik pada multi-viewport. |
| RQ → Hypothesis | ✅ | H₁ memprediksi adanya perbedaan waktu FCP/LCP sesuai metrik RQ. |
| Hypothesis → Metric | ✅ | FCP dan LCP diukur dalam ms. |
| Metric → System | ✅ | Sistem otomasi dirancang spesifik untuk membaca file JSON dan mengekstrak node numericValue FCP & LCP. |
| System → Experiment | ✅ | Eksperimen dilakukan dengan me-loop sistem pengukur (Lighthouse runner) ke sistem web target (prototipe). |

**Koneksi mana yang paling lemah?** Koneksi Problem → Gap.
**Bagaimana cara memperkuatnya?**
> Memastikan ulasan pada Bab Pendahuluan menjelaskan mengapa metrik FCP dan LCP sangat esensial bagi kenyamanan pengguna web mobile di Indonesia, sehingga gap literatur menjadi semakin mendesak.

**Konsistensi horizontal — apakah istilah dan scope konsisten?** [x] Ya / [ ] Tidak
> Jika tidak, di bagian mana terjadi inkonsistensi? -

---

## Latihan 3 — Rubrik Self-Assessment

Evaluasi proposal mini menggunakan rubrik.

| Kriteria | Skor (1-3) | Justifikasi |
|----------|-----------|-------------|
| Koherensi | 3 | Semua koneksi saling menyambung dengan konsisten. |
| Specificity | 3 | Satuan (ms), ukuran viewport (px), versi Lighthouse (v11), versi framework (Tailwind v3, Bootstrap v5) terdefinisikan dengan jelas. |
| Feasibility | 3 | Eksperimen ini sangat logis diselesaikan dalam 8 minggu (seperti jadwal pada proposal). |
| Rigor | 3 | Baseline menggunakan *common practice* (Akbar 2023) yang diperbaiki metode pengukurannya (Lighthouse SOTA instrument). |

**Skor total:** 12 / 12

**Apakah proposal siap untuk fase eksekusi?** [x] Ya / [ ] Belum
> Jika belum, apa yang perlu diperbaiki? -

---

## Refleksi

> Dari seluruh proses WS-01 sampai WS-08, bagian mana yang paling mudah dan paling sulit? Mengapa? Apa yang akan dilakukan berbeda jika mengulang dari awal?

**Bagian termudah:** Mengisi variabel dan metrik, karena sifat pengukuran performa web secara kuantitatif sangat lugas (ratio) dan mudah didefinisikan satuannya (ms, KB, scores).
**Bagian tersulit:** Mendefinisikan *Research Gap* yang orisinal dan bukan sekadar argumen kosong ("belum pernah diteliti"). Membutuhkan observasi kritis pada detail paper rujukan.
**Yang akan dilakukan berbeda:**
> Saya akan mencari literatur pendukung yang lebih spesifik membandingkan cara internal kerja compiler CSS (seperti PurgeCSS vs JIT) di luar konteks framework, agar pendahuluan mengenai arsitektur bisa lebih mendalam.
