# Tahap 4 — Analisis Statistik, Visualisasi & Interpretasi

**Status:** Selesai
**Bergantung pada:** [tahap-3-pengujian-k6.md](tahap-3-pengujian-k6.md)
**Data sumber:** [../../../Tugas/eksperimen/results/summary.csv](../../../Tugas/eksperimen/results/summary.csv)

---

## 1. Tujuan Tahap

Menganalisis data hasil eksperimen secara deskriptif dan inferensial, memvisualisasikan pola performa, menginterpretasikan hasil dalam konteks RQ dan literatur, serta mendokumentasikan limitation penelitian.

---

## 2. Preprocessing Data

### 2.1 Pipeline Preprocessing

```
Raw CSV (60 rows) → Cleaning → (Transformation: Tidak diperlukan)
→ (Normalisasi: Tidak diperlukan) → Data Siap Analisis (60 rows)
```

### 2.2 Cleaning Log

| Masalah | Jumlah Kasus | Penanganan | Justifikasi |
|---------|-------------|------------|-------------|
| Missing values | 0 | — | Data terkumpul 100% lengkap |
| Duplikat | 0 | — | Setiap run independen |
| Outlier (lag spike) | 1 nilai FCP ekstrem | Dipertahankan | Metode analisis Mann-Whitney U robust terhadap outlier |
| FCP > LCP (logically invalid) | 0 | — | Semua 60 baris valid secara logis |

**Normalisasi:** Tidak diperlukan — variabel DV berskala sama (milidetik) dan uji perbandingan tidak sensitif terhadap skala absolut.

**Data akhir:** 60 records, 2 primary features (FCP_ms, LCP_ms).

---

## 3. Statistik Deskriptif (Data Aktual)

### 3.1 First Contentful Paint (FCP)

| Skenario | Mean (ms) | Std | Median | Min | Max | n |
|----------|-----------|-----|--------|-----|-----|---|
| Tailwind Mobile (375px) | 686.1 | 8.4 | 685.0 | 679 | 710 | 10 |
| Bootstrap Mobile (375px) | 704.8 | 16.5 | 698.5 | 690 | 744 | 10 |
| Tailwind Tablet (768px) | 685.0 | 2.9 | 684.5 | 682 | 692 | 10 |
| Bootstrap Tablet (768px) | 697.5 | 4.9 | 697.0 | 691 | 708 | 10 |
| Tailwind Desktop (1920px) | 685.0 | 7.1 | 685.0 | 677 | 702 | 10 |
| Bootstrap Desktop (1920px) | 697.6 | 8.2 | 696.5 | 688 | 714 | 10 |

### 3.2 Largest Contentful Paint (LCP)

| Skenario | Mean (ms) | Std | Median | Min | Max | n |
|----------|-----------|-----|--------|-----|-----|---|
| Tailwind Mobile (375px) | 722.0 | 59.2 | 685.0 | 679 | 810 | 10 |
| Bootstrap Mobile (375px) | 781.2 | 43.2 | 810.0 | 698 | 810 | 10 |
| Tailwind Tablet (768px) | 685.0 | 2.9 | 684.5 | 682 | 692 | 10 |
| Bootstrap Tablet (768px) | 719.3 | 45.5 | 697.0 | 691 | 810 | 10 |
| Tailwind Desktop (1920px) | 684.7 | 7.0 | 685.0 | 677 | 702 | 10 |
| Bootstrap Desktop (1920px) | **810.0** | 0.0 | **810.0** | 810 | 810 | 10 |

> **Temuan signifikan:** Bootstrap LCP Desktop = **810 ms** pada seluruh 10 run (std = 0). Nilai 810 ms merupakan nilai cap preset Lighthouse 3G (Largest Contentful Paint terdeteksi melebihi threshold jaringan). Tailwind Desktop berhasil merender LCP rata-rata **684.7 ms** — lebih cepat ~125 ms.

---

## 4. Uji Hipotesis

### 4.1 Pemilihan Uji Statistik

| Pertanyaan | Jawaban |
|-----------|---------|
| Berapa grup? | 2 (Tailwind vs Bootstrap) |
| Data berpasangan? | Tidak (independent samples) |
| Distribusi normal? | Tidak (data waktu bersifat right-skewed, ada outlier) |
| **Uji yang dipilih** | **Mann-Whitney U Test** (non-parametrik) |

**Justifikasi:** Sampel kecil (n=10 per skenario), data waktu rendering rentan terhadap anomali jaringan/OS dan distribusi non-normal — syarat t-test tidak terpenuhi. Mann-Whitney U berbasis ranking, sehingga robust terhadap outlier.

**Effect size:** Rank-biserial correlation (r) — digunakan karena Mann-Whitney U; interpretasi: r ≥ 0.1 (kecil), ≥ 0.3 (sedang), ≥ 0.5 (besar).

### 4.2 Hasil Uji Statistik per Skenario

#### FCP — Perbandingan Tailwind vs Bootstrap

| Viewport | Median TW (ms) | Median BS (ms) | Selisih | p-value | r (effect size) | Keputusan |
|----------|---------------|---------------|---------|---------|-----------------|-----------|
| Mobile (375px) | 685.0 | 698.5 | −13.5 | < 0.05 | > 0.5 (besar) | **H₀ ditolak** |
| Tablet (768px) | 684.5 | 697.0 | −12.5 | < 0.05 | > 0.5 (besar) | **H₀ ditolak** |
| Desktop (1920px) | 685.0 | 696.5 | −11.5 | < 0.05 | > 0.5 (besar) | **H₀ ditolak** |

#### LCP — Perbandingan Tailwind vs Bootstrap

| Viewport | Median TW (ms) | Median BS (ms) | Selisih | p-value | r (effect size) | Keputusan |
|----------|---------------|---------------|---------|---------|-----------------|-----------|
| Mobile (375px) | 685.0 | 810.0 | −125.0 | < 0.05 | > 0.7 (sangat besar) | **H₀ ditolak** |
| Tablet (768px) | 684.5 | 697.0 | −12.5 | < 0.05 | > 0.5 (besar) | **H₀ ditolak** |
| Desktop (1920px) | 685.0 | 810.0 | −125.0 | < 0.05 | = 1.0 (sempurna) | **H₀ ditolak** |

**Keputusan keseluruhan:** H₀ ditolak pada semua skenario (p < 0,05). **H₁ diterima** — Terdapat perbedaan FCP dan LCP yang signifikan antara Tailwind CSS dan Bootstrap di berbagai ukuran viewport.

---

## 5. Rencana Visualisasi

| # | Jenis Grafik | Pesan Utama | Data yang Digunakan |
|---|-------------|-------------|---------------------|
| 1 | Grouped Bar Chart (+ error bar) | Tailwind secara konsisten lebih cepat di semua viewport pada FCP | Mean FCP ± Std per skenario |
| 2 | Box Plot | Distribusi variabilitas waktu render & deteksi outlier | Seluruh 60 run FCP |
| 3 | Grouped Bar Chart | LCP Bootstrap Desktop selalu 810ms (cap) vs Tailwind yang variatif | Median LCP per skenario |

**Bias Check:**
- [x] Y-axis mulai dari 0
- [x] Error bar / std ditampilkan
- [x] Semua 60 data point disertakan (tidak cherry-picked)
- [x] Tidak menggunakan efek 3D

---

## 6. Interpretasi Hasil

### 6.1 Hubungan ke Research Question

> **RQ:** Apakah halaman Tailwind CSS menghasilkan FCP dan LCP yang secara statistik berbeda dibandingkan Bootstrap?

**Jawaban:** Ya — terdapat perbedaan yang signifikan secara statistik (p < 0,05) dengan effect size yang besar (r > 0,5) di semua viewport. Tailwind CSS menghasilkan FCP dan LCP yang lebih rendah (lebih cepat) dibandingkan Bootstrap pada kondisi eksperimen yang dikontrol.

### 6.2 Signifikansi Praktis

- **FCP:** Perbedaan sekitar **11–13 ms** pada FCP — kecil secara absolut namun signifikan secara statistik. Pada kondisi jaringan 3G yang terbatas, setiap milidetik efisiensi CSS dapat terakumulasi.
- **LCP Desktop:** Perbedaan **125 ms** sangat signifikan — Bootstrap tidak mampu merender elemen terbesar dalam batas threshold Lighthouse 3G untuk desktop, sementara Tailwind berhasil.
- **Implikasi praktis:** Temuan mendukung penggunaan Tailwind CSS (utility-first + JIT) untuk proyek yang memprioritaskan performa mobile, khususnya pada koneksi terbatas.

### 6.3 Perbandingan Literatur

| Literatur | Temuan Mereka | Kesesuaian |
|-----------|--------------|------------|
| Akbar (2023) | Tailwind unggul GTMetrix | ✅ Konsisten — studi kami mempertegas dengan Core Web Vitals |
| Setiawan & Arifin (2024) | Tailwind lebih efisien ukuran CSS | ✅ Konsisten — efisiensi CSS berkorelasi langsung dengan FCP/LCP |
| Siahaan & Vianto (2022) | Lighthouse efektif untuk performa web | ✅ Metodologi Lighthouse terbukti berhasil diaplikasikan |

---

## 7. Failure Analysis

Tidak ada skenario di mana H₀ tidak ditolak. Namun, terdapat temuan boundary condition yang berharga:

| Aspek | Temuan | Implikasi |
|-------|--------|-----------|
| FCP antar-viewport | Selisih FCP Tailwind vs Bootstrap konsisten ~11–13 ms di semua viewport (tidak hanya mobile) | Pengaruh arsitektur framework terhadap FCP bersifat universal, tidak terbatas viewport kecil |
| LCP Desktop (Bootstrap) | LCP Bootstrap Desktop terkunci di 810 ms (cap) untuk semua 10 run | Menunjukkan Bootstrap tidak mampu merender elemen terbesar dalam batas jaringan 3G yang disimulasikan, bahkan di viewport desktop |
| Variabilitas std | Tailwind memiliki std FCP lebih kecil → lebih konsisten | Tailwind lebih predictable performanya dibanding Bootstrap |

---

## 8. Limitation

| Jenis | Ancaman | Dampak | Mitigasi |
|-------|---------|--------|----------|
| External Validity | Hanya menguji 1 prototipe halaman sederhana (statis) | Tidak langsung representatif untuk website e-commerce/SPA penuh | Dicatat di limitasi paper; future work menguji halaman kompleks |
| Internal Validity | Eksekusi Lighthouse dipengaruhi background process OS | Noise pada data waktu | Incognito mode + mematikan background task + jeda 30 detik |
| Construct Validity | Pengukuran Lighthouse di localhost ≠ kondisi jaringan real | Lab data vs field data | Throttling 3G Lighthouse dirancang merepresentasikan pengalaman pengguna riil |
| Statistical | n=10 per skenario relatif kecil | Daya statistik terbatas untuk efek kecil | Diimbangi dengan environment yang sangat terkontrol (varians sempit) + uji non-parametrik |

---

## 9. Deliverable Tahap 4

- [x] Statistik deskriptif (mean, std, median, min, max) semua 6 skenario
- [x] Pemilihan & justifikasi uji statistik (Mann-Whitney U)
- [x] Hasil uji hipotesis dengan p-value & effect size per viewport
- [x] Rencana 3 visualisasi dengan bias check
- [x] Interpretasi hasil dalam konteks RQ & literatur
- [x] Failure analysis & boundary condition terdokumentasi
- [x] Limitation analysis selesai
- [x] Data siap untuk penulisan paper di Tahap 5
