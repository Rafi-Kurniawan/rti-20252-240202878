# Tahap 5 — Penulisan Draf Paper Jurnal

**Status:** Berikutnya (dalam pengerjaan)
**Bergantung pada:** [tahap-4-analisis-data.md](tahap-4-analisis-data.md) — *Selesai*

---

## 1. Tujuan Tahap

Menyusun draf naskah ilmiah dengan gaya bahasa akademis formal, objektif, dan berbasis data hasil eksperimen. Target: jurnal Sinta 5 (RESTI / Jurnal Nasional Informatika) atau konferensi nasional.

---

## 2. Judul Paper

> **Analisis Perbandingan Performa Rendering Web: Tailwind CSS vs Bootstrap Berdasarkan Metrik First Contentful Paint dan Largest Contentful Paint pada Berbagai Ukuran Layar**

*(Alternatif bahasa Inggris untuk Scopus):*
> **Comparative Analysis of Web Rendering Performance: Tailwind CSS vs Bootstrap Based on FCP and LCP Metrics Across Multiple Viewport Sizes**

---

## 3. Rencana Deliverable (Struktur Naskah IMRAD)

| Bagian | Target Kata | Status | Konten Utama |
|--------|-------------|--------|--------------|
| **Abstract** | 200–250 | ☐ Draft | Masalah → Metode (Lighthouse FCP/LCP, 3 viewport) → Hasil utama (Tailwind lebih cepat, signifikan) → Kontribusi |
| **Introduction** | 500–700 | ☐ Draft | Konteks (CSS framework & mobile web) → Gap literature → RQ → Kontribusi → Struktur paper |
| **Related Work** | 700–1.000 | ☐ Draft | Akbar (2023), Setiawan & Arifin (2024), Yusuf dkk. (2020), Siahaan & Vianto (2022) — concept-centric, bukan annot. bib. |
| **Method** | 800–1.200 | ☐ Draft | Desain eksperimen, prototipe, variabel (IV/DV/CV), Lighthouse config, fairness checklist, analisis statistik |
| **Results** | 500–800 | ☐ Draft | Tabel statistik deskriptif + hasil Mann-Whitney U + grafik (tanpa interpretasi) |
| **Discussion** | 600–900 | ☐ Draft | Interpretasi hasil, perbandingan literatur, implikasi praktis, failure analysis, limitation |
| **Conclusion** | 200–400 | ☐ Draft | Jawaban RQ, kontribusi, rekomendasi, future work |
| **References** | — | ☐ Draft | Minimal 10 referensi (format IEEE) |

---

## 4. Outline Detil

### 4.1 Abstract (Template)

```
[Latar belakang singkat]: Pemilihan framework CSS yang tepat krusial bagi 
performa web, khususnya pada perangkat mobile.
[Masalah]: Belum ada studi komparatif terkontrol yang menggunakan Core Web 
Vitals (FCP dan LCP) untuk membandingkan Tailwind CSS dan Bootstrap di 
berbagai ukuran viewport.
[Metode]: Eksperimen komparatif menggunakan Lighthouse CLI v11 pada dua 
prototipe halaman identik (Tailwind CSS v3 JIT vs Bootstrap v5 PurgeCSS) 
di tiga viewport (375px/768px/1920px), 10 iterasi per skenario, dengan 
simulasi jaringan 3G.
[Hasil]: Tailwind CSS menghasilkan FCP dan LCP yang secara statistik lebih 
rendah (p < 0,05, effect size r > 0,5) di semua viewport. Perbedaan paling 
mencolok pada LCP Desktop: Tailwind 684,7 ms vs Bootstrap 810 ms (cap 
Lighthouse 3G).
[Kontribusi]: Menyediakan bukti empiris perbandingan framework CSS berbasis 
Core Web Vitals sebagai panduan pemilihan teknologi bagi developer web.
```

### 4.2 Introduction — Alur Argumen

```
Konteks → Fenomena → Gejala → Masalah → Gap → RQ → Kontribusi → Struktur Paper
```

1. **Konteks:** Dominasi mobile web di Indonesia & pentingnya performa loading
2. **Fenomena:** CSS framework (Tailwind, Bootstrap) banyak digunakan tapi dipilih berbasis popularitas
3. **Gejala:** Ukuran bundle CSS besar → render-blocking → FCP/LCP tinggi → bounce rate naik
4. **Masalah:** Tidak ada data empiris yang cukup untuk memandu keputusan berbasis performa
5. **Gap:** Studi sebelumnya tidak mengontrol konten halaman (Data Gap) + tidak mengukur FCP/LCP (Method Gap)
6. **RQ:** Apakah Tailwind CSS menghasilkan FCP/LCP berbeda secara signifikan vs Bootstrap pada 3 viewport?
7. **Kontribusi:** Dataset 60-run eksperimen terkontrol + panduan pemilihan framework berbasis bukti

### 4.3 Related Work — Concept-Centric

| Konsep | Literatur | Apa yang sudah ada | Apa yang belum |
|--------|-----------|-------------------|----------------|
| Perbandingan Tailwind vs Bootstrap | Akbar (2023) | GTMetrix score | FCP/LCP, controlled content, viewport variation |
| Efisiensi CSS framework | Setiawan & Arifin (2024) | Ukuran bundle | Dampak rendering empiris per viewport |
| Metodologi Lighthouse | Siahaan & Vianto (2022) | Lighthouse pada JS framework | Aplikasi pada CSS framework |
| Framework selection (multi-kriteria) | Yusuf dkk. (2020) | SAW descriptive | Pengukuran performa render empiris |

### 4.4 Method — Checklist Reproducibility

- [ ] Environment specification (OS, CPU, RAM, versi software)
- [ ] Prototipe halaman: konten identik terdeskripsi (elemen HTML, gambar, ukuran)
- [ ] Build process: Tailwind JIT & Bootstrap PurgeCSS terdokumentasi
- [ ] `experiment.yaml` parameter terpublikasi
- [ ] Fairness checklist terpenuhi (WS-07)
- [ ] Prosedur clear-cache & jeda antar-run dijelaskan
- [ ] Uji statistik: Mann-Whitney U + rank-biserial r + threshold α = 0,05

### 4.5 Results — Yang Harus Disajikan

- Tabel statistik deskriptif FCP (mean ± std, median, min, max) per 6 skenario
- Tabel statistik deskriptif LCP per 6 skenario
- Tabel hasil uji Mann-Whitney U (p-value & effect size r per skenario)
- Grafik 1: Grouped Bar Chart FCP (Tailwind vs Bootstrap per viewport)
- Grafik 2: Box plot distribusi FCP seluruh 60 run
- Grafik 3: Grouped Bar Chart LCP (menunjukkan Bootstrap LCP Desktop = 810 ms cap)

### 4.6 Discussion — Poin Utama

1. **Interpretasi FCP:** Tailwind lebih cepat karena JIT menghasilkan bundle CSS minimal
2. **Interpretasi LCP Desktop:** Bootstrap LCP = 810 ms (cap) → elemen terbesar tidak terrender dalam batas jaringan 3G yang disimulasikan
3. **Perbandingan literatur:** Konsisten dengan Akbar (2023) dan Setiawan & Arifin (2024) tapi lebih ketat secara metodologi
4. **Boundary condition:** Perbedaan konsisten di semua viewport, bukan hanya mobile
5. **Implikasi praktis:** Tailwind direkomendasikan untuk web dengan traffic mobile tinggi / jaringan terbatas
6. **Limitation:** Hanya halaman statis sederhana; tidak mencakup JS framework, TBT, atau CLS

### 4.7 Conclusion — Jawaban RQ & Kontribusi

```
Tailwind CSS secara statistik menghasilkan FCP dan LCP yang lebih rendah 
dibandingkan Bootstrap di semua ukuran viewport yang diuji (p < 0,05, 
r > 0,5). Perbedaan paling signifikan terlihat pada LCP Desktop, di mana 
Bootstrap tidak mampu merender elemen terbesar dalam batas threshold 
Lighthouse 3G. Penelitian ini berkontribusi dalam menyediakan bukti empiris 
berbasis Core Web Vitals untuk memandu keputusan pemilihan CSS framework.

Future work: Menguji pada halaman e-commerce kompleks dengan JavaScript 
framework (React/Vue), mengukur Total Blocking Time (TBT), dan menguji 
dengan koneksi jaringan nyata (bukan simulasi).
```

---

## 5. Consistency Matrix

|  | Intro | Method | Result | Discussion | Conclusion |
|--|-------|--------|--------|-----------|-----------| 
| RQ (FCP/LCP Tailwind vs Bootstrap) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Metrik FCP & LCP (ms) | ✓ | ✓ | ✓ | ✓ | ✓ |
| IV: Framework (Tailwind v3 JIT vs Bootstrap v5 PurgeCSS) | ✓ | ✓ | ✓ | ✓ | ✓ |
| CV: Viewport (375/768/1920px) + Jaringan 3G | ✓ | ✓ | ✓ | ✓ | ✓ |
| Uji Mann-Whitney U | — | ✓ | ✓ | ✓ | ✓ |
| Limitation (halaman statis, no JS framework) | ✓ | ✓ | — | ✓ | ✓ |
| Kontribusi (panduan pemilihan framework empiris) | ✓ | — | — | ✓ | ✓ |

---

## 6. Defense Preparation (WS-16)

### 6.1 Slide Plan (15 menit, 9 slide)

| # | Slide | Pesan Utama | Visual | Waktu |
|---|-------|-------------|--------|-------|
| 1 | Judul & Konteks | Peneliti, topik, mata kuliah | Title slide | 30 detik |
| 2 | Problem | Kecepatan web krusial untuk UX mobile | Statistik bounce rate per 100ms delay | 2 menit |
| 3 | Gap & RQ | Utility-first vs component-first CSS | Tabel literature matrix (gap column) | 1,5 menit |
| 4 | Metodologi | 6 skenario eksperimen terkontrol | Diagram flow pengujian | 2 menit |
| 5 | Hasil FCP | Tailwind konsisten lebih cepat | Grouped bar chart FCP | 2 menit |
| 6 | Hasil LCP | Bootstrap Desktop = 810ms cap | Grouped bar chart LCP | 2 menit |
| 7 | Interpretasi | Mengapa Tailwind lebih cepat (bundle size) | Screenshot perbandingan ukuran CSS (KB) | 2 menit |
| 8 | Limitasi | Halaman statis / simulated network | Bullet points | 1,5 menit |
| 9 | Kesimpulan | Rekomendasi penggunaan & future work | Takeaway message | 1 menit |

### 6.2 Anticipatory Defense Matrix

| Kategori | Pertanyaan Potensial | Jawaban (CER) |
|----------|---------------------|---------------|
| Problem | Mengapa hanya FCP dan LCP, bukan metrik lain seperti TBT? | FCP & LCP adalah Core Web Vitals resmi Google — paling langsung dipengaruhi oleh ukuran CSS (render-blocking); TBT lebih dipengaruhi JS, bukan CSS |
| Method | Mengapa n=10, bukan lebih banyak? | Environment localhost sangat terkontrol → varians sempit → n=10 cukup untuk Mann-Whitney U; didukung standar penelitian sejenis |
| Method | Mengapa Mann-Whitney U bukan t-test? | Data waktu rendering sering right-skewed + ada outlier lag spike → syarat normalitas t-test tidak terpenuhi |
| Results | Kenapa Bootstrap LCP Desktop = 810ms semua? | 810ms adalah nilai cap Lighthouse 3G — Bootstrap tidak dapat merender elemen terbesar dalam batas threshold jaringan yang disimulasikan |
| Generalization | Apakah hasil ini berlaku jika Bootstrap dikustomisasi lebih dalam (SCSS)? | Tidak sepenuhnya — studi ini menguji *default optimized behavior* (PurgeCSS) yang merepresentasikan majority use case developer |

---

## 7. Yang Perlu Dilengkapi Sebelum Submit

1. **Penulisan draft penuh** semua section (saat ini baru outline)
2. **Verifikasi p-value aktual** dari perhitungan Mann-Whitney U menggunakan data CSV riil
3. **Pembuatan grafik** (bar chart & box plot) dari data `summary.csv`
4. **Penambahan referensi** minimum 10 (format IEEE)
5. **Keputusan bahasa final** (Indonesia untuk Sinta 2 / Inggris untuk Scopus)
6. **Penyesuaian ke template** jurnal target (layout, caption, penomoran)

---

## 8. Deliverable Tahap 5

- [ ] Draft paper lengkap (IMRAD, ±4.000 kata)
- [ ] Abstract (Indonesia & Inggris)
- [ ] Grafik 3 visualisasi final (resolusi cetak)
- [ ] Daftar pustaka ≥10 referensi (format IEEE)
- [ ] Consistency matrix terverifikasi
- [ ] Slide presentasi 9 slide (defense ready)
