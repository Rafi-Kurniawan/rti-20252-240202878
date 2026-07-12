# Outline Naskah Jurnal

**Judul:** Analisis Perbandingan Performa Rendering Web: Tailwind CSS vs Bootstrap Berdasarkan Metrik First Contentful Paint dan Largest Contentful Paint pada Berbagai Ukuran Layar

**Target:** Jurnal Sinta 5 / Konferensi Nasional
**Struktur:** IMRAD (Introduction, Method, Results, Discussion, Conclusion)
**Estimasi total kata:** ±4.000 kata

---

## Ringkasan Scientific Argument Flow

```
Problem → Gap → RQ → Method → Result → Analysis → Conclusion → Contribution
```

Setiap section harus terhubung logis ke section sebelum dan sesudahnya. Paper ini adalah **satu argumen utuh** dari masalah ke kontribusi.

---

## Struktur Section & Target Kata

| # | Section | Target Kata | Status | Konten Inti |
|---|---------|-------------|--------|-------------|
| — | Abstract | 200–250 | ☐ Draft | Masalah → Metode → Hasil utama → Kontribusi |
| 1 | Introduction | 500–700 | ☐ Draft | Konteks → Gap → RQ → Kontribusi → Struktur paper |
| 2 | Related Work | 700–1.000 | ☐ Draft | Concept-centric review (6 paper), gap positioning |
| 3 | Method | 800–1.200 | ☐ Draft | Desain eksperimen, prototipe, variabel, Lighthouse config, prosedur, statistik |
| 4 | Results | 500–800 | ☐ Draft | Tabel statistik deskriptif + uji Mann-Whitney U + grafik (tanpa interpretasi) |
| 5 | Discussion | 600–900 | ☐ Draft | Interpretasi, perbandingan literatur, implikasi praktis, failure analysis, limitation |
| 6 | Conclusion | 200–400 | ☐ Draft | Jawaban RQ, kontribusi, future work |
| — | References | — | ☐ Draft | ≥10 referensi (format IEEE) |

---

## Outline Detil per Section

### Abstract (200–250 kata)

```
[Background] Pemilihan CSS framework krusial untuk performa web mobile.
[Problem] Belum ada studi komparatif terkontrol menggunakan Core Web Vitals 
          (FCP/LCP) pada prototipe identik di berbagai viewport.
[Method] Eksperimen komparatif: Lighthouse CLI v11, Tailwind CSS v3 JIT vs 
         Bootstrap v5 PurgeCSS, 3 viewport, 10 iterasi per skenario.
[Results] Tailwind FCP lebih cepat signifikan (p < 0,05, r > 0,5) di semua 
          viewport. Bootstrap LCP Desktop = 810ms (cap 3G) vs Tailwind 684.7ms.
[Contribution] Bukti empiris Core Web Vitals untuk panduan pemilihan framework.
Keywords: Tailwind CSS, Bootstrap, Lighthouse, FCP, LCP, Core Web Vitals
```

### 1. Introduction (500–700 kata)

**Alur argumen:**
1. **Konteks** — Dominasi mobile web Indonesia; CSS framework sebagai komponen kritis
2. **Fenomena** — Tailwind & Bootstrap populer, tapi dipilih berdasarkan tren
3. **Gejala** — Bundle CSS besar → render-blocking → FCP/LCP tinggi → bounce rate naik
4. **Masalah** — Belum ada data empiris memadai untuk memandu keputusan berbasis performa
5. **Gap** — Studi sebelumnya: Data Gap (konten tidak identik) + Method Gap (bukan Core Web Vitals)
6. **RQ** — Apakah Tailwind CSS JIT menghasilkan FCP/LCP berbeda secara signifikan vs Bootstrap PurgeCSS?
7. **Kontribusi** — Dataset 60-run terkontrol + panduan pemilihan framework berbasis bukti
8. **Struktur** — Paper ini terdiri dari...

**Sumber yang akan dirujuk:** Akbar (2023); Setiawan & Arifin (2024); Google Developers (2024)

### 2. Related Work (700–1.000 kata)

**Pendekatan: Concept-Centric** (bukan annotated bibliography)

| Konsep | Paper | Yang Sudah Ada | Yang Belum |
|--------|-------|----------------|------------|
| Perbandingan Tailwind vs Bootstrap | Akbar (2023) | GTMetrix score comparison | Core Web Vitals, viewport variation, controlled content |
| Efisiensi bundle CSS | Setiawan & Arifin (2024) | Bundle size analysis | Rendering impact, FCP/LCP measurement |
| Pengukuran performa Lighthouse | Siahaan & Vianto (2022) | Lighthouse methodology | Applied to CSS framework context |
| Framework CSS evaluation | Yusuf dkk. (2020) | Multi-criteria descriptive | Empirical render performance |

**Penutup:** Semua studi meninggalkan Method Gap dan/atau Data Gap → penelitian ini mengisi keduanya.

### 3. Method (800–1.200 kata)

Sub-section:
1. **Desain Penelitian** — eksperimen komparatif terkontrol, independent samples, paradigma positivis
2. **Variabel** — IV: Framework CSS; DV: FCP & LCP (ms); CV: Viewport & Jaringan
3. **Prototipe Web** — konten identik (heading, 3 paragraf, grid 3 kolom, gambar 150KB); perbedaan hanya nama class
4. **Build Process** — Tailwind JIT (command build); Bootstrap PurgeCSS (command & output)
5. **Konfigurasi Lighthouse** — versi v11, throttling 3G, incognito, jeda 30s
6. **Prosedur Eksekusi** — 6 skenario × 10 iterasi = 60 run; anomaly protocol
7. **Analisis Statistik** — Mann-Whitney U; threshold α=0,05; effect size r

**Fairness checklist wajib disebutkan:** konten identik, preprocessing setara, environment identik, metrik sama.

### 4. Results (500–800 kata)

**Aturan:** Sajikan data tanpa interpretasi — hanya observasi faktual.

| Elemen | Detail |
|--------|--------|
| Tabel 1 | Statistik deskriptif FCP: mean ± std, median, min, max per 6 skenario |
| Tabel 2 | Statistik deskriptif LCP per 6 skenario |
| Tabel 3 | Hasil Mann-Whitney U: U-statistic, p-value, r per viewport |
| Gambar 1 | Grouped bar chart FCP (Tailwind vs Bootstrap per viewport, ± error bar) |
| Gambar 2 | Box plot FCP seluruh 60 run (distribusi & outlier) |
| Gambar 3 | Grouped bar chart LCP (Bootstrap Desktop = 810ms cap tampak jelas) |

**Observasi kunci yang wajib dilaporkan:**
- Tailwind FCP lebih rendah di semua viewport (sebutkan nilai)
- Bootstrap LCP Desktop = 810ms pada 10/10 run (std = 0) → jelaskan ini nilai cap, bukan error
- H₀ ditolak di semua 6 skenario (p < 0,05)

### 5. Discussion (600–900 kata)

1. **Interpretasi FCP** — Tailwind lebih cepat karena JIT menghasilkan bundle CSS minimal → parse time lebih cepat → FCP lebih rendah
2. **Interpretasi LCP Desktop** — Bootstrap LCP Desktop = 810ms (cap Lighthouse 3G) menunjukkan elemen terbesar tidak dapat terrender dalam batas threshold jaringan yang disimulasikan
3. **Perbandingan literatur** — Konsisten dengan Akbar (2023) & Setiawan & Arifin (2024) namun lebih ketat secara metodologi; mendukung teori utility-first vs component-based
4. **Implikasi praktis** — Tailwind direkomendasikan untuk web dengan dominan traffic mobile / jaringan terbatas; ROI migrasi rendah jika mayoritas user desktop
5. **Failure analysis** — Perbedaan konsisten di semua viewport (bukan hanya mobile seperti H₁ prediksi) — *boundary condition* lebih luas dari yang diantisipasi
6. **Limitation** — External validity (halaman statis), simulated throttling, tidak mencakup TBT/JS framework

### 6. Conclusion (200–400 kata)

```
[Jawaban RQ] Tailwind CSS secara statistik menghasilkan FCP dan LCP yang 
             lebih rendah (p < 0,05, r > 0,5) di semua viewport.
[Temuan kunci] Bootstrap LCP Desktop terkunci di 810ms pada 10/10 run.
[Kontribusi] Dataset 60-run terkontrol sebagai referensi empiris pemilihan 
             framework CSS berbasis Core Web Vitals.
[Rekomendasi] Tailwind untuk web mobile-heavy; Bootstrap masih layak untuk 
              proyek desktop-first dengan optimasi PurgeCSS.
[Future work] Uji pada halaman e-commerce kompleks; ukur TBT; gunakan koneksi 
              jaringan nyata (bukan simulated); tambah framework lain (Bulma, Foundation).
```

---

## Consistency Matrix

|  | Intro | Method | Results | Discussion | Conclusion |
|--|-------|--------|---------|-----------|------------|
| RQ (FCP/LCP Tailwind vs Bootstrap) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Metrik FCP & LCP (ms) | ✓ | ✓ | ✓ | ✓ | ✓ |
| IV: Framework (v3 JIT vs v5 PurgeCSS) | ✓ | ✓ | ✓ | ✓ | ✓ |
| CV: Viewport (375/768/1920px) + 3G | ✓ | ✓ | ✓ | ✓ | ✓ |
| Uji Mann-Whitney U | — | ✓ | ✓ | ✓ | ✓ |
| Bootstrap LCP = 810ms (cap) | — | — | ✓ | ✓ | ✓ |
| Limitation (halaman statis, simulated) | ✓ | ✓ | — | ✓ | ✓ |
| Kontribusi (panduan pemilihan framework) | ✓ | — | — | ✓ | ✓ |

---

## Peta Sumber Data

| Section | Sumber Data |
|---------|-------------|
| Introduction | WS-01, WS-02, WS-03 |
| Related Work | WS-03 (matriks literatur), [../02-literatur/matriks-literatur.md](../02-literatur/matriks-literatur.md) |
| Method | WS-05, WS-06, WS-07, [../09-docs/tahap-1](../09-docs/tahap-1-arsitektur-dan-skema-database.md), [../09-docs/tahap-2](../09-docs/tahap-2-implementasi-gateway.md) |
| Results | [../04-data/summary.csv](../04-data/summary.csv), [../06-output/](../06-output/), [../09-docs/tahap-4](../09-docs/tahap-4-analisis-data.md) |
| Discussion | WS-14, [../09-docs/tahap-4](../09-docs/tahap-4-analisis-data.md) |
| Conclusion | WS-15, [../09-docs/tahap-5](../09-docs/tahap-5-draf-paper.md) |

---

## Urutan Penulisan yang Disarankan

Berdasarkan WS-15 (Method → Discussion → Introduction terakhir):

1. **Method** — paling stabil, tulis pertama
2. **Results** — laporan objektif dari data CSV & output analisis
3. **Discussion** — interpretasi berdasarkan hasil
4. **Introduction** — frame sesuai temuan aktual
5. **Abstract & Conclusion** — terakhir, setelah semua section lengkap
