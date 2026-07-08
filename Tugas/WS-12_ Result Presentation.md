# WS-12: Result Presentation & Visualization

> **Bab 12 — Penyajian Hasil & Visualisasi**

---

## Ringkasan Materi

### Data → Insight Model

```
Validated Data → Structured Presentation → Visualization → Pattern Recognition → Insight
```

Penyajian **mendahului** analisis. Tabel dan grafik membantu peneliti "melihat" data sebelum menghitung. Langsung ke uji statistik tanpa visualisasi berisiko kesimpulan yang secara teknis benar tapi kontekstual salah (Anscombe's Quartet, 1973).

### Tabel = Presisi, Grafik = Pola

Keduanya **saling melengkapi**:
- Tabel: angka presisi, self-contained (dipahami tanpa teks), sortable
- Grafik: pola visual, tren, perbandingan cepat

### Jenis Grafik Berdasarkan Tujuan

| Tujuan | Jenis Grafik |
|--------|-------------|
| Perbandingan antar-skenario | Bar chart (grouped/stacked) |
| Distribusi per-skenario | Box plot / violin plot |
| Tren temporal | Line chart |
| Korelasi dua variabel | Scatter plot |
| Proporsi (total = 100%) | Pie chart (hati-hati!) |

### Contoh Tabel Hasil yang Baik

| Model | Accuracy (%) | F1-Score (%) | Training Time (min) |
|-------|-------------|-------------|---------------------|
| BERT | 88.4 ± 1.2 | 87.1 ± 1.4 | 45.2 ± 3.1 |
| LSTM | 86.1 ± 1.8 | 84.5 ± 2.0 | 12.8 ± 1.2 |
| SVM | 82.3 ± 0.9 | 80.7 ± 1.1 | 0.3 ± 0.1 |

*N=10 per model. Mean ± std. Diurutkan berdasarkan Accuracy.*

### Visualization Bias — Yang Harus Dihindari

| Bias | Deskripsi | Dampak |
|------|----------|--------|
| Truncated axis | Y tidak dari 0 | Memperbesar perbedaan kecil |
| Inconsistent scale | Dua grafik skala beda | Perbandingan menyesatkan |
| Cherry-picked data | Hanya tampilkan yang "menang" | Selektif, tidak jujur |
| 3D effects | Efek 3D tanpa dimensi data ke-3 | Distorsi tanpa informasi |
| Missing error bar | Tidak ada variabilitas | Menyembunyikan ketidakpastian |

### Engineering vs Research Presentation

| Aspek | Engineering | Research |
|-------|-----------|---------|
| Tujuan grafik | Dashboard monitoring | Mendukung argumen ilmiah |
| Informasi wajib | KPI, threshold | Mean, std, CI, N, p-value |
| Bias handling | Less critical | Wajib dihindari (peer-review) |

---

## Template A.12 — Result Presentation Plan


```
RESULT PRESENTATION PLAN

Research Question : Apakah penggunaan arsitektur utility-first (Tailwind CSS) meningkatkan performa rendering awal (FCP & LCP) dibandingkan framework komponen (Bootstrap) pada berbagai ukuran viewport?
Metrik Utama      : First Contentful Paint (FCP) dan Largest Contentful Paint (LCP) dalam satuan milidetik (ms).

Tabel Hasil:
| Skenario | FCP (mean ± std) | LCP (mean ± std) | n |
|----------|----------------------|----------------------|---|
| TW Mobile (375px) | 1205 ± 25 ms | 1315 ± 35 ms | 10 |
| BS Mobile (375px) | 1310 ± 30 ms | 1480 ± 45 ms | 10 |
| TW Tablet (768px) | 1010 ± 20 ms | 1090 ± 22 ms | 10 |
| BS Tablet (768px) | 1120 ± 28 ms | 1200 ± 32 ms | 10 |
| TW Desktop (1920px)| 815 ± 15 ms  | 890 ± 18 ms  | 10 |
| BS Desktop (1920px)| 885 ± 22 ms  | 950 ± 25 ms  | 10 |

Visualisasi yang Direncanakan:
| # | Jenis Grafik | Pesan Utama | Metrik |
|---|-------------|-------------|--------|
| 1 | Grouped Bar Chart | Tailwind konsisten lebih cepat pada viewport kecil (Mobile/Tablet), namun perbedaan menipis di Desktop | FCP (Y-axis), Viewport (X-axis), Framework (Warna/Group) |
| 2 | Box Plot | Menunjukkan distribusi data dan memvisualisasikan lag-spike/outlier di data mentah | FCP |

Bias Check:
  [x] Y-axis mulai dari 0 (atau dijustifikasi)
  [x] Error bar/CI ditampilkan
  [x] Semua data disertakan (tidak cherry-picked)
  [x] Tidak menggunakan 3D tanpa alasan
```

---

## Latihan 1 — Tabel Hasil

Buat tabel hasil eksperimen Anda (boleh dengan data simulasi jika belum punya data riil).

| Skenario | FCP (mean ± std) | LCP (mean ± std) | n |
|----------|----------------------|----------------------|---|
| TW Mobile (375px) | 1205 ± 25 ms | 1315 ± 35 ms | 10 |
| BS Mobile (375px) | 1310 ± 30 ms | 1480 ± 45 ms | 10 |
| TW Tablet (768px) | 1010 ± 20 ms | 1090 ± 22 ms | 10 |
| BS Tablet (768px) | 1120 ± 28 ms | 1200 ± 32 ms | 10 |
| TW Desktop (1920px)| 815 ± 15 ms  | 890 ± 18 ms  | 10 |
| BS Desktop (1920px)| 885 ± 22 ms  | 950 ± 25 ms  | 10 |

**Checklist tabel:**
- [x] Self-contained (judul jelas, satuan ada, N tercantum)
- [x] Mean ± std (bukan single number)
- [x] Diurutkan berdasarkan metrik utama (dikelompokkan berdasarkan viewport)
- [x] Format konsisten di semua baris

---

## Latihan 2 — Rencana Visualisasi

Rencanakan 2-3 grafik untuk menyajikan data dari Latihan 1. Setiap grafik = satu pesan.

| # | Jenis Grafik | Pesan | Data yang Digunakan |
|---|-------------|-------|---------------------|
| 1 | Bar chart (Grouped) + error bar | Perbandingan FCP antar Framework di tiap Viewport | Mean FCP ± std |
| 2 | Box plot | Distribusi variabilitas render time FCP dan deteksi outlier | Data seluruh 60 run FCP |
| 3 | Scatter plot | Korelasi positif antara FCP dan LCP pada halaman uji | 60 pasang data FCP vs LCP |

---

## Latihan 3 — Bias Detection

Evaluasi visualisasi berikut untuk bias (skenario dari contoh):

**Skenario:** Metode A = 91.2%, Metode B = 90.8%. Bar chart dengan Y-axis mulai dari 90%.

| Pertanyaan | Jawaban |
|-----------|---------|
| Apakah Y-axis menyesatkan? | Ya — Y-axis mulai dari 90% membuat A terlihat menang telak (seolah 5x lipat lebih tinggi dari B), padahal bedanya cuma 0.4%. |
| Apakah error bar ditampilkan? | Tidak, variabilitas data disembunyikan. Bisa saja margin 0.4% itu secara statistik tidak signifikan (overlap). |
| Apakah semua kondisi ditampilkan? | Kemungkinan terburuk ini adalah data *cherry-picked* dari satu metrik akurasi terbaik saja. |
| Apa solusinya? | Mulai Y-axis dari 0, tambahkan *error bar* (standar deviasi), atau ganti visualisasi dengan boxplot. |

**Evaluasi grafik Anda sendiri dari Latihan 2:**
- [x] Semua bias check lulus
- [ ] Ada yang perlu diperbaiki: -

---

## Refleksi

> Mengapa tabel dan grafik keduanya diperlukan — tidak cukup salah satu saja? Pernahkah Anda membuat grafik yang (tanpa sengaja) menyesatkan?

> Tabel diperlukan untuk mencatat nilai absolut dan referensi kuantitatif yang presisi, sedangkan grafik sangat esensial untuk memvisualisasikan tren dan mengkomunikasikan poin argumen dengan sekilas pandang. Jika hanya tabel, pembaca susah melihat pola. Jika hanya grafik, peneliti kesulitan melakukan *re-check* angka aslinya. Saya pernah mendesain chart dengan skala dinamis yang otomatis terpotong di angka bawahnya (karena default dari software), yang ternyata memberikan ilusi efeknya jauh lebih ekstrem dari kenyataan.
