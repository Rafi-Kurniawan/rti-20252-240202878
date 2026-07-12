# Proposal Penelitian

**Judul:** Analisis Perbandingan Performa Rendering Web: Tailwind CSS vs Bootstrap Berdasarkan Metrik First Contentful Paint dan Largest Contentful Paint pada Berbagai Ukuran Layar

**Peneliti:** Rafi Kurniawan
**NIM:** 240202878
**Mata Kuliah:** Riset Teknologi Informasi
**Dosen:** Helmi Bahar Alim, S.Kom., M.Kom
**Tanggal:** 6 Juli 2026
**Target Publikasi:** Sinta 5 (Jurnal Nasional Informatika) atau Konferensi Nasional

---

## 1. Latar Belakang

Pengembangan front-end web di Indonesia terus berkembang pesat, dengan CSS framework menjadi komponen esensial dalam proses pembangunan antarmuka web modern. Dua framework yang paling banyak diadopsi adalah **Tailwind CSS** (pendekatan utility-first) dan **Bootstrap** (pendekatan component-based). Namun, keputusan pemilihan framework oleh developer di Indonesia sering didasarkan pada **tren komunitas atau preferensi personal**, bukan pada data performa rendering yang terukur secara empiris.

Keputusan pemilihan framework yang tidak berbasis data berpotensi menghasilkan:
1. **Bundle CSS yang tidak optimal** — file stylesheet besar yang memperlambat proses unduh
2. **Critical rendering path terhambat** — CSS bersifat render-blocking, sehingga browser menunda paint sampai seluruh CSS ter-download dan ter-parse
3. **Penurunan kecepatan muat bagi pengguna mobile** — mayoritas pengguna internet Indonesia mengakses via perangkat mobile dengan keterbatasan jaringan

Meskipun beberapa studi tentang perbandingan framework CSS telah ada di Indonesia (Akbar, 2023; Setiawan & Arifin, 2024; Yusuf dkk., 2020), terdapat dua gap metodologis yang konsisten: (1) **Method Gap** — tidak menggunakan metrik standar Core Web Vitals (FCP/LCP) via Lighthouse, dan (2) **Data Gap** — konten halaman yang diuji tidak identik antar versi framework, merusak isolasi variabel independen.

---

## 2. Rumusan Masalah

**Masalah inti (satu kalimat):**
> Belum tersedia data empiris yang membandingkan performa rendering Tailwind CSS dan Bootstrap menggunakan metrik Core Web Vitals (FCP dan LCP) pada prototipe halaman yang identik secara konten, diuji di berbagai ukuran viewport dengan kondisi jaringan terkontrol.

**Rumusan masalah (RQ):** Apakah halaman web yang dibangun dengan Tailwind CSS (JIT) menghasilkan First Contentful Paint (FCP) dan Largest Contentful Paint (LCP) yang secara statistik berbeda dibandingkan halaman web yang dibangun dengan Bootstrap (PurgeCSS), pada prototipe halaman identik yang diuji di tiga ukuran viewport (desktop 1920px, tablet 768px, mobile 375px) menggunakan Lighthouse CLI?

---

## 3. Tujuan Penelitian

1. Membandingkan secara empiris metrik FCP dan LCP antara Tailwind CSS (JIT) dan Bootstrap (PurgeCSS) pada prototipe halaman web yang identik secara konten
2. Menganalisis apakah perbedaan performa signifikan secara statistik (p < 0,05) pada tiga ukuran viewport berbeda
3. Memberikan panduan pemilihan CSS framework berbasis bukti data performa bagi developer web Indonesia

---

## 4. Kontribusi Penelitian

| Jenis Kontribusi | Deskripsi |
|-----------------|-----------|
| **Method** | Pertama kali menggunakan Lighthouse CLI (FCP & LCP) secara sistematis pada perbandingan Tailwind vs Bootstrap di berbagai viewport |
| **Data** | Dataset 60 run terkontrol dengan prototipe halaman **identik secara konten** — mengisolasi variabel framework secara valid |
| **Praktis** | Panduan pemilihan CSS framework berbasis data empiris untuk developer web yang berorientasi performa mobile |

---

## 5. Hipotesis

| Hipotesis | Pernyataan |
|-----------|-----------|
| **H₀** | Tidak terdapat perbedaan yang signifikan antara nilai FCP dan LCP yang dihasilkan halaman Tailwind CSS (JIT) dan halaman Bootstrap (PurgeCSS) pada viewport mobile 375px, tablet 768px, dan desktop 1920px (p ≥ 0,05) |
| **H₁** | Terdapat perbedaan yang signifikan antara nilai FCP dan LCP yang dihasilkan halaman Tailwind CSS (JIT) dan halaman Bootstrap (PurgeCSS) pada setidaknya satu dari tiga ukuran viewport yang diuji (p < 0,05) |

**Koneksi ke RQ:** H₁ secara langsung menjawab RQ — jika H₁ diterima, maka terbukti secara statistik bahwa pilihan framework CSS memengaruhi waktu rendering (FCP/LCP) halaman web.

**Threshold:** α = 0,05; effect size rank-biserial correlation r ≥ 0,5 (large effect)

**Testability:** Diuji dengan Mann-Whitney U test menggunakan 10 pasang observasi per viewport dari `results/summary.csv`.

---

## 6. Tinjauan Pustaka Singkat

| Studi | Gap |
|-------|-----|
| Akbar (2023) | GTMetrix bukan Core Web Vitals; konten tidak identik |
| Setiawan & Arifin (2024) | Analisis ukuran kode, tidak mengukur FCP/LCP atau variasi viewport |
| Yusuf dkk. (2020) | Analisis deskriptif SAW, tanpa pengukuran performa empiris |
| Siahaan & Vianto (2022) | Menggunakan Lighthouse tapi pada JS framework, bukan CSS |

Detail matriks literatur: [../02-literatur/matriks-literatur.md](../02-literatur/matriks-literatur.md)

---

## 7. Metodologi

### 7.1 Desain Penelitian

- **Tipe:** Eksperimen komparatif terkontrol (between-group, independent samples)
- **Paradigma:** Positivis — pengukuran kuantitatif empiris

### 7.2 Populasi, Sampel & Unit Analisis

**Objek penelitian:** Prototipe halaman web statis yang dibangun dengan dua framework CSS berbeda namun berkonten identik.

**Unit analisis:** Satu *run* pengukuran Lighthouse CLI — menghasilkan satu pasang nilai (FCP_ms, LCP_ms) per eksekusi.

**Populasi penelitian ini adalah** seluruh kemungkinan hasil pengukuran Lighthouse (FCP dan LCP dalam ms) pada prototipe halaman web statis yang dibangun dengan Tailwind CSS v3 JIT atau Bootstrap v5 PurgeCSS, dijalankan di lingkungan localhost (http-server) dengan Lighthouse CLI v11 pada kondisi Simulated 3G throttling (RTT 150ms, 1.638 Kbps, CPU 4× slowdown).

**Sampel diambil sebanyak 60 run** menggunakan teknik **purposive sampling** dengan kriteria:

| Kriteria | Detail |
|----------|--------|
| **Inklusi** | Run berhasil tanpa error Lighthouse; nilai FCP ≤ LCP (logically valid); viewport sesuai konfigurasi `experiment.yaml`; Lighthouse CLI versi 11.3.0 |
| **Eksklusi** | Run dengan timeout atau crash http-server; nilai FCP > LCP (logically invalid — tidak ditemukan dalam dataset aktual); run dengan versi Lighthouse berbeda |

**Distribusi sampel (n = 60):**

| Skenario | Framework | Viewport | n |
|----------|-----------|----------|---|
| 1 | Tailwind CSS v3 JIT | Mobile (375px) | 10 |
| 2 | Tailwind CSS v3 JIT | Tablet (768px) | 10 |
| 3 | Tailwind CSS v3 JIT | Desktop (1920px) | 10 |
| 4 | Bootstrap v5 PurgeCSS | Mobile (375px) | 10 |
| 5 | Bootstrap v5 PurgeCSS | Tablet (768px) | 10 |
| 6 | Bootstrap v5 PurgeCSS | Desktop (1920px) | 10 |
| **Total** | | | **60** |

**Justifikasi n = 10 per skenario:** (a) konsisten dengan studi pengujian performa web sejenis; (b) cukup untuk Mann-Whitney U test yang tidak mensyaratkan distribusi normal; (c) total 60 run dapat diselesaikan dalam ±30 menit dengan jeda 30 detik antar run.

### 7.3 Variabel Penelitian

| Variabel | Tipe | Definisi | Satuan |
|----------|------|----------|--------|
| Framework CSS | IV | Tailwind CSS v3 JIT vs Bootstrap v5 PurgeCSS | Nominal |
| First Contentful Paint | DV | Waktu elemen bermakna pertama tampil | ms |
| Largest Contentful Paint | DV | Waktu elemen terbesar tampil sepenuhnya | ms |
| Ukuran Viewport | CV | Lebar layar yang diemulasikan | px (375/768/1920) |
| Kondisi Jaringan | CV | Simulated 3G throttling | RTT 150ms, 1.6Mbps |

### 7.3 Sistem Eksperimen

```
Prototipe Web (IV)          Lighthouse CLI           Output (DV)
┌──────────────┐    →    ┌─────────────────┐    →   ┌──────────────┐
│ Tailwind JIT │         │ run_lighthouse.  │         │ FCP_ms       │
│ Bootstrap    │         │ js (Node.js)     │         │ LCP_ms       │
│ PurgeCSS     │         │ experiment.yaml  │         │ summary.csv  │
└──────────────┘         └─────────────────┘         └──────────────┘
     http-server                                      60 runs total
     (localhost:8080)
```

### 7.4 Prototipe Halaman Web

Kedua prototipe dirancang identik pada:
- Heading H1, 3 paragraf teks, grid 3 kolom (card)
- 1 gambar hero (JPG, ±150 KB)
- Struktur HTML semantik (nav, main, section, footer)

Perbedaan yang diizinkan: **nama class CSS saja** (utility-class Tailwind vs component-class Bootstrap)

### 7.5 Desain Eksperimen

| Parameter | Nilai |
|-----------|-------|
| Skenario | 6 (2 framework × 3 viewport) |
| Iterasi per skenario | 10 run |
| Total run | 60 |
| Jeda antar run | 30 detik |
| Cache browser | Cleared (incognito mode) |
| Network throttling | Simulated 3G (RTT 150ms, 1.638 Kbps, CPU 4x slowdown) |

**Fairness checklist:**
- [x] Konten halaman identik (HTML/teks/gambar)
- [x] Preprocessing setara (JIT vs PurgeCSS — keduanya menghapus unused CSS)
- [x] Environment identik (satu mesin, eksekusi serial)
- [x] Metrik evaluasi sama (FCP & LCP dari JSON Lighthouse v11)

### 7.6 Analisis Statistik

- **Uji:** Mann-Whitney U (non-parametrik, karena n kecil & distribusi right-skewed)
- **Effect size:** Rank-biserial correlation (r)
- **Alpha:** 0,05

---

## 8. Rencana Pelaksanaan (Timeline)

| Tahap | Aktivitas | Estimasi Waktu | Status |
|-------|-----------|----------------|--------|
| Tahap 1 | Desain eksperimen & setup lingkungan | 1 hari | ✅ Selesai |
| Tahap 2 | Implementasi prototipe web & konfigurasi Lighthouse | 1 hari | ✅ Selesai |
| Tahap 3 | Eksekusi 60 run pengujian | ½ hari | ✅ Selesai |
| Tahap 4 | Analisis statistik & visualisasi | 1 hari | ✅ Selesai |
| Tahap 5 | Penulisan draf paper | 2–3 minggu | 🔄 Berjalan |

---

## 9. Keterbatasan Penelitian

1. **External Validity:** Hanya menguji pada 1 prototipe halaman statis sederhana — tidak merepresentasikan kompleksitas website e-commerce atau SPA dengan JavaScript framework
2. **Lab Data:** Pengukuran Lighthouse menggunakan simulated throttling, bukan pengukuran dari perangkat mobile nyata (Field Data)
3. **Cakupan metrik:** Hanya mengukur FCP dan LCP — tidak mencakup Total Blocking Time (TBT) yang lebih dipengaruhi oleh JavaScript

---

## 10. Referensi (Preview)

1. Akbar, T. A. (2023). *Analisis perbandingan framework CSS Bootstrap dan Tailwind dalam pengembangan website portofolio*. Universitas AMIKOM Yogyakarta.
2. Setiawan, A., & Arifin, M. (2024). *Analisis performa dan efisiensi kode pada Tailwind CSS dan Bootstrap*. J-PTIIK, Universitas Brawijaya.
3. Siahaan, R., & Vianto, D. (2022). *Perbandingan performa front-end JavaScript framework menggunakan Lighthouse benchmark*. Jurnal Mantik, 6(2).
4. Google Developers. (2024). *Core Web Vitals*. https://web.dev/vitals/
5. Tailwind Labs. (2024). *Tailwind CSS Documentation*. https://tailwindcss.com/docs
6. Bootstrap Team. (2024). *Bootstrap Documentation*. https://getbootstrap.com/docs/5.3/

Daftar pustaka lengkap: [../07-manuskrip/07-daftar-pustaka.md](../07-manuskrip/07-daftar-pustaka.md)
