# WS-13: Data Preprocessing

> **Bab 13 — Preprocessing & Persiapan Data untuk Analisis**

---

## Ringkasan Materi

### Data Refinement Pipeline

```
Raw Data → Cleaning → Transformation → Normalization → Processed Data → Analysis Ready
```

Setiap tahap memiliki tujuan berbeda. **Preprocessing bukan langkah teknis biasa** — setiap keputusan preprocessing adalah keputusan riset yang bisa mengubah kesimpulan.

### Empat Prinsip Preprocessing

| Prinsip | Deskripsi |
|---------|----------|
| **Consistency** | Metode sama untuk data yang sama |
| **Transparency** | Setiap langkah terdokumentasi |
| **Reproducibility** | Orang lain bisa mengulang dengan hasil sama |
| **Minimal Distortion** | Ubah sesedikit mungkin; jika normalisasi tidak perlu, jangan lakukan |

### Cleaning Triad

| Masalah | Strategi | Risiko |
|---------|---------|--------|
| **Missing values** | | |
| — Listwise deletion | Missing < 5%, random | Data loss |
| — Mean/median imputation | Sedikit missing, dist. normal | Mengurangi variabilitas |
| — Model-based imputation | Banyak missing, pola sistematis | Introduces dependency |
| — Flag & separate | Missing karena alasan substantif | Kompleksitas analisis |
| **Duplikat** | Identifikasi → verifikasi → hapus | False positive (data mirip ≠ duplikat) |
| **Error format** | Standardisasi tipe, encoding | Kehilangan informasi saat konversi |

### Normalisasi — Kapan & Metode Mana

| Metode | Formula | Output | Sensitif Outlier? |
|--------|---------|--------|-------------------|
| Min-max | (x-min)/(max-min) | [0, 1] | Ya |
| Z-score | (x-mean)/std | Unbounded | Lebih robust |
| Robust scaling | (x-median)/IQR | Unbounded | Paling robust |

**Kunci:** Parameter normalisasi harus dihitung dari **training set saja** — bukan seluruh data. Pelanggaran = **data leakage**.

### Data Leakage Prevention

Data leakage terjadi ketika informasi dari test set "bocor" ke preprocessing:
- Normalisasi parameter dari seluruh dataset ← **SALAH**
- Cross-validation dilakukan sebelum split ← **SALAH**
- Feature selection menggunakan label test set ← **SALAH**

### Jebakan Kognitif

1. "Preprocessing cuma teknis — tidak perlu detail" → bisa ubah kesimpulan
2. "Lebih banyak preprocessing = lebih bersih = lebih baik" → over-processing distorsi data
3. "Normalisasi selalu diperlukan" → belum tentu, tergantung metode analisis
4. "Imputation sama untuk semua situasi" → strategi harus sesuai konteks

---

## Template A.13 — Preprocessing Documentation Log


PREPROCESSING LOG

Dataset           : Performa Lighthouse (FCP & LCP) Tailwind CSS vs Bootstrap
Jumlah data awal  : 60 data points (6 skenario x 10 run)

Cleaning:
| Masalah | Jumlah Kasus | Penanganan | Justifikasi |
|---------|-------------|------------|-------------|
| Missing | 0           | Tidak ada tindakan | Data terkumpul 100% lengkap |
| Duplikat| 0           | Tidak ada tindakan | Setiap run independen |
| Error   | 1 outlier   | Tetap dipertahankan | Outlier (lag spike) valid, diatasi dengan metode analisis non-parametrik (median) |

Transformation:
| Transformasi | Variabel | Detail | Alasan |
|-------------|----------|--------|--------|
| Tidak ada   | FCP, LCP | -      | Data waktu (ms) langsung siap dianalisis tanpa transformasi matematis |

Normalization:
  Metode    : Tidak perlu normalisasi
  Alasan    : Variabel metrik berskala sama (milidetik) dan uji perbandingan tidak sensitif terhadap skala absolut.
  Parameter : N/A

Leakage Check:
  [x] Parameter normalisasi dari training set saja (Tidak berlaku)
  [x] Tidak ada informasi test set dalam preprocessing
  [x] Cross-validation dilakukan setelah split (Tidak berlaku)

Jumlah data akhir : 60 data points
Script tersedia   : [ ] Ya → path: ____ | [x] Belum

---

## Latihan 1 — Cleaning Plan

Periksa dataset Anda (atau dataset contoh) dan dokumentasikan masalah yang ditemukan.

| Masalah | Jumlah Kasus | Penanganan | Justifikasi |
|---------|-------------|------------|-------------|
| Outlier tinggi (lag) | 1 dari 60 (1.6%) | Dipertahankan dalam dataset | Representatif kondisi nyata (anomali jaringan/OS), ditangani saat uji statistik dengan Mann-Whitney U |
| Missing file log | 0 | - | - |
| Salah format JSON | 0 | - | - |

**Jumlah data sebelum cleaning:** 60
**Jumlah data setelah cleaning:** 60
**Persentase data yang hilang/berubah:** 0%

---

## Latihan 2 — Normalisasi Decision

Tentukan apakah data Anda perlu normalisasi, dan jika ya, metode apa yang tepat.

| Variabel | Range Asli | Distribusi | Outlier? | Metode Normalisasi | Alasan |
|----------|-----------|-----------|----------|-------------------|--------|
| FCP (ms) | 800 - 2800 | Right-skewed | Ya | Tidak perlu | Analisis menggunakan uji non-parametrik perbandingan median, bukan model machine learning berbasis distance. |
| LCP (ms) | 950 - 3100 | Right-skewed | Ya | Tidak perlu | Sama dengan di atas. |

**Apakah normalisasi diperlukan?** [ ] Ya / [x] Tidak
**Justifikasi:**
> Data dianalisis secara deskriptif dan inferensial menggunakan komparasi median (Mann-Whitney U), sehingga skala absolut tidak perlu dinormalisasi. Tidak ada pemodelan klasifikasi/regresi yang melibatkan multiple feature dengan range berbeda.

**Leakage check:**
- [x] Parameter dihitung dari training set saja (N/A)
- [x] Normalisasi diterapkan setelah train-test split (N/A)

---

## Latihan 3 — Preprocessing Report

Buat ringkasan preprocessing lengkap — dokumentasi yang cukup bagi orang lain untuk mereplikasi.

```
PREPROCESSING SUMMARY

1. Dataset: FCP & LCP Tailwind vs Bootstrap (Lighthouse)
2. Data awal: 60 records, 2 features (FCP, LCP)
3. Cleaning:
   - Missing values: 0 kasus, metode: -
   - Duplikat: 0 kasus, tindakan: -
   - Error (Outlier): 1 kasus, tindakan: Dipertahankan, analisis beralih ke non-parametrik.
4. Transformation: Tidak ada.
5. Normalisasi: Tidak ada (metode), parameter dari N/A.
6. Data akhir: 60 records, 2 features
7. Leakage check: [x] Lulus / [ ] Ada masalah
```

---

## Refleksi

> Apakah Anda pernah melakukan normalisasi "karena biasa dilakukan" tanpa mempertimbangkan apakah benar-benar diperlukan? Apa risiko over-preprocessing?

> Kadang kita terbiasa membersihkan semua data ekstrem (outlier) agar grafik terlihat bagus. Padahal dalam riset web performance, lag spike atau outlier adalah fenomena nyata yang dirasakan pengguna. Jika kita over-processing dengan membuang semua outlier, kesimpulan performa aplikasi web yang kita buat akan terlalu optimis (terlihat lebih cepat dari aslinya).
