# WS-11 Data Validation & Integrity

 **Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---

## Template A.11 — Data Validation Checklist

```
DATA VALIDATION CHECKLIST

Completeness:
  [x] Semua skenario tercakup
  [x] Jumlah run sesuai rencana
  [x] Tidak ada file output hilang
  Missing: 0 dari 60 data points

Format Consistency:
  [x] Semua file format sama (CSV/JSON/...)
  [x] Header konsisten
  [x] Tipe data konsisten (numerik tetap numerik)

Range & Logic:
  [x] Nilai dalam range masuk akal
  [x] Tidak ada waktu negatif
  [x] Metrik 0–100%, tidak di luar range
  Anomali ditemukan: Tidak ada (sesuai ekspektasi desain metrik FCP & LCP)

Cross-Validation:
  [x] Run identik → hasil mendekati
  [x] Trend konsisten dengan ekspektasi teori (Tailwind sedikit lebih cepat pada viewport kecil karena ukuran bundle CSS).

Keputusan:
  [x] Data siap analisis
  [ ] Perlu cleaning
  [ ] Perlu re-run (skenario: -)
```

---

## Latihan 1 — Completeness Check

Verifikasi apakah semua data yang direncanakan sudah terkumpul.

| Skenario | Run Direncanakan | Run Tercatat | Missing | Alasan |
|----------|-----------------|-------------|---------|--------|
| Bootstrap Mobile (375px) | 10 | 10 | 0 | - |
| Tailwind Mobile (375px) | 10 | 10 | 0 | - |
| Bootstrap Tablet (768px) | 10 | 10 | 0 | - |
| Tailwind Tablet (768px) | 10 | 10 | 0 | - |
| Bootstrap Desktop (1920px) | 10 | 10 | 0 | - |
| Tailwind Desktop (1920px) | 10 | 10 | 0 | - |

**Total expected:** 60 | **Total actual:** 60 | **Missing:** 0

**Keputusan untuk data missing:**
> -

---

## Latihan 2 — Anomaly Investigation

Periksa data Anda untuk anomali. Gunakan metode IQR atau z-score.

**Dataset sampel (atau data Anda sendiri):**

*(Angka FCP simulasi untuk Lighthouse run)*
| Run | FCP (ms) |
|-----|-------------|
| 1 | 1240 |
| 2 | 1255 |
| 3 | 1250 |
| 4 | 2800 |
| 5 | 1245 |

**Deteksi outlier:**
- Q1 = 1242.5 | Q3 = 1252.5 | IQR = 10
- Batas bawah (Q1 - 1.5×IQR) = 1227.5
- Batas atas (Q3 + 1.5×IQR) = 1267.5
- Outlier terdeteksi: 2800 ms (Run 4)

**Investigasi (untuk setiap outlier):**

| Outlier | Nilai | Kemungkinan Penyebab | Keputusan |
|---------|-------|---------------------|-----------|
| Run 4 | 2800 | *Lag spike* pada Lighthouse atau interupsi *background task* OS. | Catat di log laporan. Tetap dilibatkan dalam perhitungan karena metode analisis Mann-Whitney U menggunakan median yang tidak sensitif terhadap *outlier*, sehingga tidak akan mendistorsi tren kelompok. |

---

## Latihan 3 — Validation Report

Buat laporan validasi ringkas untuk dataset eksperimen Anda.

**1. Completeness:** 100% data terkumpul (60 dari 60 runs)
**2. Format:** [x] Konsisten / [ ] Ada inkonsistensi: -
**3. Range check (anomali):** Tidak ada data FCP bernilai negatif atau LCP yang mendahului FCP.
**4. Logic check:** [x] Parameter sesuai plan / [ ] Ada ketidaksesuaian: -

**Kesimpulan:** [x] Data siap analisis / [ ] Perlu tindakan: -

---

## Refleksi

> Apa perbedaan antara "data yang benar" dan "data yang dipercaya"? Mengapa proses validasi formal diperlukan meskipun data dikumpulkan secara otomatis?

**Jawaban:**
> "Data yang benar" (accurate data) berarti angka yang tercatat sesuai dengan output software pada detik tersebut. Tetapi, "data yang dipercaya" (trusted data) berarti data tersebut terbukti bebas dari noise atau kerusakan logis (misalnya FCP terbalik posisinya dengan LCP), lengkap jumlah sesinya (tidak *missing*), dan formatnya siap dianalisis secara saintifik. Validasi formal tetap mutlak diperlukan walaupun otomatis, karena bisa saja ada kejadian di luar prediksi (*logic error* atau skrip *timeout*) yang mencetak data *invalid* atau JSON *corrupt* ke dalam *file log*.
