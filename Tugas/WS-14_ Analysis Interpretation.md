# WS-14: Analysis, Interpretation & Failure Analysis

> **Bab 14 — Analisis Data, Interpretasi & Failure Analysis**

---

## Ringkasan Materi

### Data → Knowledge Model

```
Data → Analysis → Interpretation → Explanation → Knowledge
```

Tiga level yang berbeda:
- **Analysis** — "Apa yang terjadi?" (deskriptif + inferensial)
- **Interpretation** — "Apa artinya?" (konteks RQ + literatur)
- **Failure Analysis** — "Mengapa tidak berhasil?" (boundary conditions)

### Beyond p-value

**Statistical significance ≠ practical significance.** Selalu laporkan:
1. p-value (signifikansi statistik)
2. Effect size (besarnya efek)
3. Confidence interval (rentang ketidakpastian)

| Effect Size (Cohen's d) | Interpretasi |
|-------------------------|-------------|
| < 0.2 | Small |
| 0.2 – 0.8 | Medium |
| > 0.8 | Large |

### Pemilihan Uji Statistik

| Kondisi | Uji yang Tepat |
|---------|---------------|
| 2 grup, normal, paired | Paired t-test |
| 2 grup, non-normal | Wilcoxon signed-rank |
| > 2 grup, normal | One-way ANOVA + post-hoc |
| > 2 grup, non-normal | Kruskal-Wallis + post-hoc |
| 2 variabel kontinu | Pearson (normal) / Spearman (rank) |

### Failure Analysis as Contribution

Hipotesis yang ditolak adalah **temuan yang berharga**:

| Dataset | New (F1) | Baseline (F1) | p-value | Cohen's d |
|---------|---------|--------------|---------|-----------|
| DS-1 (small, clean) | 94.2±1.1 | 89.3±1.5 | <0.001 | **3.7** |
| DS-4 (medium, noisy) | 78.3±3.2 | 82.1±2.8 | 0.008 | **-1.3** |
| DS-5 (large, noisy) | 71.6±4.1 | 80.5±3.0 | <0.001 | **-2.5** |

**Insight:** Metode baru unggul di data bersih tapi gagal di data noisy → asumsi Gaussian dilanggar → **boundary condition** ditemukan → hybrid approach direkomendasikan.

**Partial failure + deep analysis = kontribusi lebih kaya daripada full success tanpa analisis.**

### Limitation Types

| Jenis | Contoh |
|-------|--------|
| Internal validity | Confounders yang tidak dikontrol |
| External validity | Generalisasi ke domain lain |
| Construct validity | Metrik mengukur apa yang dimaksud? |
| Statistical limitation | Sample size, asumsi distribusi |

### Jebakan Kognitif

1. "Signifikan statistik = penting secara praktis" → cek effect size
2. "Hipotesis tidak didukung → cari sudut baru" → p-hacking
3. "Kegagalan tidak perlu dilaporkan detail" → missed insight
4. "Limitasi cukup disebutkan, tidak perlu dianalisis" → kedalaman hilang

---

## Template A.14 — Analysis & Interpretation Report

```
ANALYSIS & INTERPRETATION

1. Statistik Deskriptif (Waktu FCP dalam ms):
   | Skenario | Mean | Std | Median | Min | Max | n |
   |----------|------|-----|--------|-----|-----|---|
   | TW Mobile| 1205 | 25  | 1200   | 1180| 1250| 10|
   | BS Mobile| 1310 | 30  | 1305   | 1270| 1360| 10|
   | TW Tablet| 1010 | 20  | 1005   | 990 | 1045| 10|
   | BS Tablet| 1120 | 28  | 1115   | 1085| 1170| 10|
   | TW Dsk   | 815  | 15  | 812    | 800 | 845 | 10|
   | BS Dsk   | 885  | 22  | 880    | 860 | 925 | 10|

2. Uji Hipotesis:
   Uji yang digunakan  : Mann-Whitney U test (non-parametrik)
   Justifikasi         : Jumlah sampel per skenario kecil (n=10) dan distribusi bisa right-skewed/terdapat outlier.
   Hasil: p = 0.001, effect size (r) = 0.82 (Large)
   CI 95%              : [-125ms, -85ms] perbedaan median (Tailwind lebih cepat)

3. Keputusan:
   [x] H₀ ditolak → H₁ diterima
   [ ] H₀ tidak ditolak

4. Interpretasi:
   Hubungan ke RQ       : Tailwind CSS terbukti merender (FCP) lebih cepat dibandingkan Bootstrap pada berbagai ukuran layar.
   Practical significance: Perbedaan sekitar ~100ms terasa secara praktis pada performa mobile, memengaruhi metrik UX Lighthouse secara signifikan.
   Perbandingan literatur: Sejalan dengan klaim utility-first framework yang meminimalisir payload CSS (PurgeCSS) dibanding monolithic UI component.

5. Limitation:
   | Jenis | Ancaman | Dampak | Mitigasi |
   |-------|---------|--------|----------|
   | External Validity | Hanya diuji pada 1 struktur halaman sederhana | Perbedaan performa pada web yang kompleks belum tentu sama | Uji coba di future work menggunakan halaman e-commerce full |
   | Internal Validity | Eksekusi Lighthouse dipengaruhi background process OS | Noise pada data waktu | Menjalankan pengujian dalam kondisi Incognito dan mematikan background task |

6. Failure Analysis (jika H₀ tidak ditolak):
   Penyebab potensial  : N/A (H0 ditolak)
   Boundary condition  : N/A
   Insight             : N/A
```

---

## Latihan 1 — Pemilihan Uji Statistik

Tentukan uji statistik yang tepat untuk eksperimen Anda.

| Pertanyaan | Jawaban |
|-----------|---------|
| Berapa grup yang dibandingkan? | 2 (Tailwind CSS dan Bootstrap) |
| Apakah data berpasangan (paired)? | Tidak (Independent samples) |
| Apakah distribusi normal? (uji normalitas) | Tidak (Ada outlier lag spike, sample kecil) |
| **Uji yang dipilih:** | Mann-Whitney U test |
| **Justifikasi:** | Syarat t-test tidak terpenuhi karena data waktu rentan terhadap anomali jaringan/OS dan distribusi non-normal. |

**Effect size yang akan dilaporkan:** [ ] Cohen's d / [ ] Eta-squared / [x] Lainnya: Rank-biserial correlation (r)

---

## Latihan 2 — Interpretasi Hasil

Gunakan data berikut (atau data riil Anda) untuk berlatih interpretasi.

**Data:**
| Model | FCP Mobile (mean ± std) | n |
|-------|-------------------------|---|
| Tailwind | 1205 ± 25 ms | 10 |
| Bootstrap | 1310 ± 30 ms | 10 |

p = 0.001, effect size r = 0.82, CI 95% Diff = [-125, -85]

| Aspek | Interpretasi |
|-------|-------------|
| Signifikansi statistik | p < 0.05 → Perbedaan waktu render (FCP) signifikan secara statistik pada α=0.05 |
| Effect size | r = 0.82 → Efek sangat besar (Large effect size) |
| Practical significance | Selisih ~100ms berdampak nyata untuk web mobile, di mana loading tiap 100ms mengurangi rasio bounce/drop-off. |
| Hubungan ke RQ | Menjawab RQ: Tailwind lebih efisien dalam metrik FCP di layar Mobile dibanding Bootstrap. |
| Perbandingan literatur | Mendukung teori bahwa utility-first dengan build step JIT/PurgeCSS menghasilkan footprint lebih kecil dan mempercepat TTI/FCP. |

---

## Latihan 3 — Failure Analysis

Latih kemampuan failure analysis: hipotesis TIDAK didukung. Apa yang bisa dipelajari?

**Skenario:** Misalkan di Desktop (1920px), FCP Tailwind 815ms dan Bootstrap 820ms, p = 0.35 (tidak signifikan).

| Pertanyaan | Jawaban |
|-----------|---------|
| Apakah ini "gagal"? | Tidak, ini penemuan bahwa pada resource komputasi besar/bandwidth tinggi, beda CSS framework tidak signifikan. |
| Kemungkinan penyebab? | Resource desktop yang kuat bisa melakukan render dan komputasi layout engine dengan sangat cepat, menutupi perbedaan payload CSS. |
| Boundary condition? | Perbedaan performa Tailwind vs Bootstrap (dalam hal CSS render-blocking) hanya signifikan di perangkat mobile dengan CPU/jaringan terbatas. |
| Insight yang bisa diambil? | Tidak perlu migrasi dari Bootstrap ke Tailwind jika mayoritas user adalah pengguna Desktop enterprise dengan koneksi stabil (ROI migrasi rendah). |
| Apakah layak dilaporkan? Mengapa? | Ya, membantu developer web membuat keputusan teknologi (stack choice) berdasarkan demografi pengguna secara tepat. |

**Limitation terkait:**
| Jenis | Ancaman | Dampak |
|-------|---------|--------|
| Eksternal/Generalisasi | Hanya menguji dengan Lighthouse simulated throttling 4G | Hasil mungkin berbeda pada koneksi 3G nyata |
| Konstruk | Hanya mengukur FCP dan LCP | Tidak mengukur TBT (Total Blocking Time) dari JS bawaan Bootstrap |

---

## Refleksi

> Apakah "failure" dalam riset benar-benar gagal, atau justru kontribusi? Bagaimana failure analysis mengubah cara Anda melihat hasil negatif?

> Failure bukanlah sebuah kegagalan riset, melainkan batas (boundary condition) dari suatu inovasi. Dengan menganalisis mengapa perbedaan antara Tailwind dan Bootstrap bisa jadi tidak signifikan di Desktop (simulasi dari latihan 3), saya menyadari bahwa tools tidak selamanya superior di semua kondisi. Hasil "negatif" justru memberikan insight bagi industri kapan suatu teknologi layak diimplementasikan (ROI tinggi) dan kapan tidak.
