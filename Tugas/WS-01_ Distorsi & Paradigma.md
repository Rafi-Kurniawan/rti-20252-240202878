# WS-01 Distorsi & Paradigma
 
**Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---
 
## A.1 — Research Mindset Self-Assessment

```
Nama Peneliti    : Rafi Kurniawan
Tanggal          : 6 Juli 2026

1. Ketika membaca klaim "framework X lebih cepat 95%":
   - Pertanyaan pertama saya: Bagaimana kondisi jaringan dan spesifikasi viewport saat diuji? Apakah kedua framework dibangun dengan kondisi build yang setara (mis. PurgeCSS untuk Bootstrap, JIT untuk Tailwind)?
   - Data yang dibutuhkan untuk verifikasi: Log pengukuran metrik standar (FCP, LCP), konfigurasi viewport, dan ukuran bundle file statis CSS yang digunakan.

2. Posisi paradigma:
   - Pendekatan: [x] Positivis  [ ] Interpretivis  [ ] Design Science  [ ] Mixed
   - Alasan: Riset ini menguji komparasi performa rendering secara empiris dan objektif melalui eksperimen kuantitatif terkontrol (controlled comparison experiment).

3. Identifikasi distorsi:
   - Asumsi tersembunyi: Developer sering berasumsi Tailwind selalu lebih ringan tanpa melihat kondisi implementasi dan konfigurasi optimasi framework lain.
   - Sumber bias potensial: Pengujian yang hanya mengukur satu ukuran layar (mis. Desktop) dan tidak memperhitungkan viewport mobile dengan jaringan terbatas (3G).
   - Langkah mitigasi: Menggunakan halaman prototipe dengan konten yang identik, dan menggunakan simulasi kondisi jaringan (3G) dan beberapa viewport (desktop, tablet, mobile) menggunakan Lighthouse CLI.

4. Komitmen etika:
   - Data yang tidak akan dimanipulasi: Hasil metrik performa (FCP, LCP) dan Lighthouse Score yang didapatkan dari pengukuran akan dicatat apa adanya.
   - Batasan yang diakui sejak awal: Hasil hanya mencerminkan prototipe statis, dan belum mencakup kompleksitas interaksi JS dari website produksi sesungguhnya.
```

---

## Latihan 1 — Identifikasi Distorsi

**Paper yang dipilih:**
> Judul: Analisis perbandingan framework CSS Bootstrap dan Tailwind dalam pengembangan website portofolio
> Penulis (Tahun): Akbar, T. A. (2023)
> Sumber/Link DOI: Universitas AMIKOM Yogyakarta

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | Menggunakan GTMetrix untuk menilai performa. | Metrik yang digunakan mungkin non-standar atau tidak merepresentasikan Core Web Vitals secara spesifik seperti FCP/LCP. |
| Data → Processing | Membangun website portofolio menggunakan kedua framework. | Konten dan jumlah elemen pada kedua versi mungkin tidak identik secara ketat, mempengaruhi keadilan komparasi. |
| Processing → Analysis | Membandingkan skor performa. | Tidak memisahkan pengujian berdasarkan ukuran viewport, mengabaikan perbedaan performa per perangkat. |
| Analysis → Inference | Menyimpulkan Tailwind lebih unggul dari Bootstrap. | Tidak memperhitungkan apakah Bootstrap dioptimalkan (misal dengan PurgeCSS) yang membuat komparasi kurang adil. |
| Inference → Knowledge | Menjadikan patokan bahwa Tailwind mutlak lebih cepat dari Bootstrap. | Hanya berlaku untuk kondisi build dan konten yang diuji tanpa standardisasi kondisi jaringan/viewport. |

**Distorsi paling besar di tahap:** Data → Processing

**Dua distorsi spesifik yang teridentifikasi:**
1. Halaman web yang diuji tidak identik antar versi, sehingga isolasi variabel independen tidak terjamin.
2. Tidak mengontrol kondisi jaringan dan menggunakan metrik skor umum tanpa spesifisitas pada Core Web Vitals (FCP, LCP) yang disimulasikan di perangkat mobile.

---

## Latihan 2 — Analisis Kasus Etika

Skenario: Seorang peneliti menemukan bahwa jika 3 data point outlier dihapus, hasil eksperimennya menjadi signifikan. Dengan outlier, hasilnya tidak signifikan.

| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | Harus melaporkan kedua kondisi (dengan dan tanpa outlier) dan memaparkan mengapa outlier tersebut muncul, misal cache hit atau lag sistem saat Lighthouse CLI berjalan. |
| Transparansi | Menjelaskan metodologi pengukuran, iterasi (10x run per kondisi), dan pembersihan data di laporan riset. |
| Peer review | Reviewer dapat menilai signifikansi perbedaan FCP dan LCP secara objektif dan reproduksibel karena prosedur dicatat secara jelas. |

**Keputusan akhir dan justifikasi:**
> Saya akan mencatat outlier tersebut, mengecek apakah itu *invalid run* (misal: gagal koneksi), dan bila valid, saya akan menggunakan metode analisis non-parametrik (seperti Mann-Whitney U) serta melaporkan Median dan IQR yang lebih robust terhadap outlier, daripada sekadar membuang datanya untuk mengejar signifikansi (p < 0.05).

---

## Latihan 3 — Posisi Paradigma

**Topik riset:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | 5 — Topik kuantitatif yang berfokus pada pengujian performa secara empiris dengan mengukur FCP dan LCP di lingkungan terkontrol. | 1 — Tidak mengeksplorasi pengalaman subjektif pengembang dalam menggunakan framework. | 2 — Walaupun membuat prototipe, tujuannya bukan untuk membangun artefak baru melainkan membandingkan artefak yang ada secara kausal. |
| Jenis data yang dikumpulkan | Waktu FCP (ms), LCP (ms), skor komposit Lighthouse, ukuran bundle CSS (KB). | Opini pengembang web, kesulitan mempelajari sintaks framework. | Evaluasi skalabilitas plugin atau arsitektur framework hybrid baru. |
| Limitasi paradigma | Tidak dapat menjawab "mengapa" developer lebih memilih Tailwind secara sosiologis atau kenyamanan penulisan kode. | Tidak memberikan data metrik kecepatan muat halaman yang terukur. | Terlalu fokus pada desain sistem daripada menguji performa secara komparatif. |

**Paradigma yang dipilih:** Positivis
**Alasan:** Karena pertanyaan utama (Research Question) berkaitan dengan perbedaan terukur pada First Contentful Paint dan Largest Contentful Paint yang bersifat numerik, kausal, dan butuh pengujian eksperimental terkontrol (Lighthouse CLI pada localhost) tanpa interpretasi subjektif.

---

## Refleksi

> Sebelum membaca materi ini, apakah pernah mempertanyakan klaim "95% akurat"? Setelah memahami rantai distorsi, pertanyaan apa yang sekarang akan diajukan saat membaca paper?

**Jawaban:**
> Sebelumnya saya sering menganggap bahwa framework yang populer di komunitas otomatis memberikan performa terbaik. Namun, setelah memahami adanya distorsi, pertanyaan yang akan saya ajukan saat melihat paper perbandingan performa adalah: "Apakah eksperimen tersebut menggunakan halaman prototipe yang benar-benar identik secara konten?", "Apakah metrik yang digunakan standar industri seperti Core Web Vitals?", dan "Apakah pengujiannya dikontrol untuk variabel jaringan (seperti 3G) dan variasi ukuran viewport?".

---
