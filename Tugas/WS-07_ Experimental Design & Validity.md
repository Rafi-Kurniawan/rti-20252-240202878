# WS-07 Experimental Design & Validity

 **Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---

## Template A.7 — Desain Eksperimen Lengkap

```
EXPERIMENT DESIGN

Research Question : Apakah halaman Tailwind CSS menghasilkan FCP dan LCP yang berbeda secara signifikan dari halaman Bootstrap pada ukuran viewport mobile 375px?
Hypothesis        : Terdapat perbedaan signifikan FCP dan LCP antara Tailwind dan Bootstrap pada viewport mobile (Tailwind diharapkan lebih cepat).
Tipe Eksperimen   : [x] Comparison  [ ] Ablation  [ ] Parameter

Kondisi Eksperimen:
| Kondisi | Deskripsi | IV Value | CV Settings |
|---------|-----------|----------|-------------|
| Control (A) | Prototipe Bootstrap teroptimasi | Bootstrap v5 + PurgeCSS | Viewport: 375px; Network: 3G (1.6Mbps); Browser cache disabled; 10 run |
| Treatment (B) | Prototipe Tailwind teroptimasi | Tailwind CSS v3 JIT | Viewport: 375px; Network: 3G (1.6Mbps); Browser cache disabled; 10 run |
*(Catatan: batch eksperimen yang sama diulang pada viewport 768px dan 1920px)*

Fairness Checklist:
  [x] Dataset (konten web) identik untuk semua kondisi
  [x] Preprocessing (build optimization) setara
  [x] Tuning effort setara
  [x] Environment (localhost & perangkat uji) identik
  [x] Metrik evaluasi sama

Threat Analysis:
| Threat Type | Ancaman Spesifik | Mitigasi |
|-------------|-----------------|----------|
| Internal    | Cache browser mempercepat run ke-2 dst | Hard clear cache & disable-cache flag tiap eksekusi. |
| External    | Hasil hanya berlaku di layout spesifik ini | Menambahkan pengakuan di bagian Limitasi pada laporan bahwa prototipe ini tidak merepresentasikan full kompleksitas website produksi e-commerce modern. |
| Construct   | Lighthouse CLI tidak mencerminkan 'real user feel' | Mendukung hasil kuantitatif ini (Lab Data) dengan konsep standar Web Vitals yang dirancang merepresentasikan manusia. |
| Conclusion  | Hasil skew karena background task OS berjalan | Menjalankan tes 10x dan menggunakan uji statistik non-parametrik (Mann-Whitney) karena data bisa *right-skewed*. |

Statistical Plan:
  Uji statistik   : Uji Mann-Whitney U.
  Justifikasi      : Sampel (n=10) kecil dan distribusi waktu rendering sering asimetris (*right-skewed* karena latensi eksternal), tidak memenuhi syarat t-test.
  Alpha            : 0,05
  Effect size min  : Cohen's d ≥ 0,5 (Medium Effect).
```

---

## Latihan 1 — Desain Eksperimen

Susun desain eksperimen berdasarkan RQ, variabel, dan sistem dari WS-04 sampai WS-06.

**RQ:** Apakah Tailwind lebih baik dari Bootstrap pada FCP dan LCP di viewport spesifik?
**Tipe eksperimen:** [x] Comparison / [ ] Ablation / [ ] Parameter

| Kondisi | Deskripsi | IV Value | CV Settings |
|---------|-----------|----------|-------------|
| Control | Halaman dibangun dengan framework komponen terpopuler dan di-purge (baseline best-practice). | Bootstrap v5 + PurgeCSS | Viewport ter-lock pada 375px, mode 3G, localhost tanpa *network hop* luar. |
| Treatment | Halaman sama dibangun dengan arsitektur utility-first terkini. | Tailwind CSS v3 + JIT Compiler | Kondisi viewport dan simulasi persis sama dengan kelompok Control. |

---

## Latihan 2 — Fairness Checklist

Evaluasi apakah desain eksperimen di Latihan 1 sudah fair.

| Kriteria | Status | Detail |
|----------|--------|--------|
| Dataset identik | ✅ | Elemen HTML seperti heading, 3 paragraf, struktur grid, teks, dan ukuran/sumber gambar (150KB) sama persis pada dua direktori HTML. |
| Preprocessing setara | ✅ | Keduanya dijalankan proses *build* untuk menghapus *unused CSS*. Bootstrap dengan PurgeCSS dan Tailwind dengan compiler JIT internalnya. |
| Tuning effort setara | ✅ | Kedua prototipe tidak diberikan *inline css hacking* tambahan yang bias ke salah satu pihak. |
| Environment identik | ✅ | Dijalankan pada mesin PC yang sama, disk yang sama, oleh script Node.js yang mengeksekusi secara serial. |
| Metrik evaluasi sama | ✅ | FCP dan LCP dalam ms dari *audits object* yang sama pada JSON Lighthouse v11. |

**Ada yang tidak fair?** [ ] Ya / [x] Tidak
> Jika ya, bagaimana cara memperbaikinya? -

---

## Latihan 3 — Threat Analysis

Identifikasi ancaman validitas untuk desain eksperimen ini.

| Threat Type | Ancaman Spesifik | Mitigasi |
|-------------|-----------------|----------|
| Internal | *Cache carryover* dan *CPU thermal throttling* setelah sekian eksekusi. | Parameter *no-cache*, jeda 30 detik antar sesi pengujian untuk memberi waktu OS membuang sampah memory (*garbage collection*). |
| External | Desain halaman percobaan terlalu statis, tidak mencakup file JavaScript eksternal (React/Vue). | Membatasi skop riset (dan klaimnya) murni pada evaluasi efisiensi "Framework CSS" pada fase Paint (FCP/LCP), dan menyatakan di limitasi paper. |
| Construct | Pengukuran di Localhost mungkin tidak menggambarkan fluktuasi jaringan TCP yang asli. | Tetap menggunakan modul *network throttling* Lighthouse 3G agar waktu *parsing* berimbas secara nyata layaknya perangkat *mobile*. |
| Conclusion | Jumlah pengulangan mungkin tidak cukup (n=10) | Karena *environment* sangat terkontrol (localhost), varians data diperkirakan sempit, jadi n=10 per viewport sudah cukup untuk analisis non-parametrik. |

**Ancaman mana yang paling sulit dimitigasi?** External Validity
**Mengapa?**
> Karena esensi dari eksperimen terkontrol adalah menyederhanakan fenomena (isolasi). Semakin kita menyederhanakan halaman web agar adil untuk diukur (tanpa logic JS rumit), semakin jauh halaman tersebut dari bentuk "website di dunia nyata" yang penuh popup, ads, dan *third-party scripts*. Ini adalah dilema *trade-off* mendasar dalam riset eksperimental.

---

## Refleksi

> Sebuah paper melaporkan "metode kami mengalahkan semua baseline." Apa 3 pertanyaan pertama yang harus diajukan untuk mengevaluasi klaim ini?

**Jawaban:**
1. Apakah baseline-baseline tersebut disetel/dioptimalkan sama kerasnya dengan metode usulan, ataukah menggunakan pengaturan standar (default) yang lemah (*straw man comparison*)?
2. Apakah kondisi eksperimen (dataset, spek hardware penguji, parameter metrik) identik untuk metode usulan dan baseline?
3. Apakah peningkatan performa secara statistik tersebut (*statistically significant*) juga relevan/bermanfaat di dunia nyata (memiliki *practical significance* atau *effect size* yang memadai)?
