# Landasan Teori

**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar

---

## 1. Framework CSS

### 1.1 Definisi dan Peran

Framework CSS adalah kumpulan aturan dan komponen stylesheet yang telah dirancang sebelumnya untuk mempercepat proses pembangunan antarmuka web. Framework CSS memengaruhi **ukuran bundle stylesheet** yang harus diunduh browser, yang secara langsung memengaruhi kecepatan rendering halaman.

### 1.2 Pendekatan Utility-First: Tailwind CSS

**Tailwind CSS** (Tailwind Labs, 2023) menggunakan pendekatan **utility-first** — setiap kelas CSS merepresentasikan satu properti CSS spesifik (misalnya: `flex`, `text-center`, `bg-blue-500`). Developer membangun tampilan dengan mengkombinasikan kelas-kelas kecil ini langsung pada elemen HTML.

**Mekanisme Optimasi — JIT (Just-In-Time) Compiler:**
- Pada proses build, Tailwind JIT memindai seluruh file HTML/JS dan hanya menghasilkan CSS untuk kelas yang benar-benar digunakan
- File CSS output biasanya berukuran **5–30 KB** untuk halaman sederhana
- Zero unused CSS pada output production

```
Kode Sumber HTML (dengan class utility) 
    ↓ Tailwind JIT Compiler (saat build)
CSS Output: hanya class yang digunakan (minimal, teroptimasi)
```

### 1.3 Pendekatan Component-Based: Bootstrap

**Bootstrap** (Twitter, 2023) menggunakan pendekatan **component-based** — menyediakan komponen UI siap pakai (button, navbar, card, modal) dengan kelas-kelas yang sudah dirancang. File CSS Bootstrap utuh berukuran ±150 KB.

**Mekanisme Optimasi — PurgeCSS:**
- PurgeCSS adalah alat terpisah yang memindai konten HTML dan menghapus definisi CSS Bootstrap yang tidak digunakan
- Mirip dengan Tailwind JIT secara konsep, namun bekerja sebagai post-processor setelah file Bootstrap penuh dimuat
- Ukuran CSS setelah PurgeCSS bergantung pada jumlah komponen Bootstrap yang digunakan

```
Bootstrap CSS Penuh (±150 KB)
    ↓ PurgeCSS (post-processing, memindai HTML)
CSS Output: hanya komponen yang digunakan (lebih kecil)
```

### 1.4 Perbandingan Arsitektur

| Dimensi | Tailwind CSS (Utility-First) | Bootstrap (Component-Based) |
|---------|------------------------------|------------------------------|
| Paradigma | Atomic, utility per properti | Komposit, komponen siap pakai |
| Mekanisme tree-shaking | Built-in (JIT) | Eksternal (PurgeCSS) |
| File CSS default (tanpa optimasi) | ~3.7 MB (semua utility) | ~150 KB (semua komponen) |
| File CSS setelah optimasi | 5–30 KB (hanya yang dipakai) | Bervariasi (tergantung komponen) |
| Kurva belajar | Lebih tinggi (hafal nama utility) | Lebih rendah (nama komponen intuitif) |

---

## 2. Critical Rendering Path & Pengaruh CSS

### 2.1 Critical Rendering Path

Critical Rendering Path (CRP) adalah urutan langkah yang dilakukan browser untuk mengubah HTML, CSS, dan JavaScript menjadi piksel di layar:

```
HTML Parsing → DOM Construction
CSS Parsing  → CSSOM Construction  ← CSS adalah RENDER-BLOCKING
                    ↓
              Render Tree
                    ↓
              Layout → Paint → Composite
```

**CSS bersifat render-blocking** — browser tidak akan melakukan paint (FCP/LCP) sebelum seluruh file CSS selesai diunduh dan diparsing. Semakin besar ukuran file CSS, semakin lama FCP dan LCP.

### 2.2 Dampak Ukuran Bundle CSS

| Ukuran CSS | Kondisi Jaringan 3G | Estimasi Dampak Parse Time |
|------------|--------------------|-----------------------------|
| ~10 KB | RTT 150ms, 1.6 Mbps | ≈50ms |
| ~50 KB | RTT 150ms, 1.6 Mbps | ≈250ms |
| ~150 KB | RTT 150ms, 1.6 Mbps | ≈750ms |

Perbedaan ukuran CSS antara Tailwind dan Bootstrap setelah optimasi langsung memengaruhi **waktu parse CSS** di dalam critical rendering path, yang pada akhirnya memengaruhi FCP dan LCP.

---

## 3. Core Web Vitals

### 3.1 Definisi

**Core Web Vitals** adalah metrik yang ditetapkan Google sebagai standar pengukuran pengalaman pengguna nyata pada halaman web (Google Developers, 2024). Tiga metrik utama:

| Metrik | Singkatan | Definisi | Threshold "Baik" |
|--------|-----------|----------|-----------------|
| First Contentful Paint | **FCP** | Waktu dari navigasi pertama hingga elemen pertama bermakna tampil di layar | ≤ 1.8 detik |
| Largest Contentful Paint | **LCP** | Waktu dari navigasi hingga elemen konten terbesar sepenuhnya tampil | ≤ 2.5 detik |
| Cumulative Layout Shift | CLS | Stabilitas visual saat konten bergeser tak terduga | ≤ 0.1 |

### 3.2 First Contentful Paint (FCP)

FCP mengukur **kapan pengguna pertama kali melihat sesuatu** di halaman. Ini merupakan sinyal pertama bahwa halaman sedang dimuat. FCP sangat dipengaruhi oleh:
- Waktu unduh CSS (render-blocking)
- Waktu parse CSS
- Waktu server response (TTFB)

Pada eksperimen ini (localhost, throttling 3G), TTFB mendekati 0 — sehingga perbedaan FCP antar framework murni mencerminkan **perbedaan waktu parse CSS**.

### 3.3 Largest Contentful Paint (LCP)

LCP mengukur **kapan konten utama selesai dirender** — momen ketika pengguna dapat mulai mengonsumsi konten. LCP dipengaruhi oleh:
- FCP (LCP selalu ≥ FCP secara logis)
- Waktu unduh & decode gambar/elemen besar
- Render-blocking resources (CSS, font)

Dalam konteks penelitian ini, elemen terbesar pada prototipe adalah gambar hero (150 KB). Perbedaan LCP antar framework mencerminkan kombinasi efisiensi CSS **dan** kecepatan render elemen gambar setelah CSS selesai diparsing.

---

## 4. Google Lighthouse

### 4.1 Gambaran Umum

**Google Lighthouse** adalah alat audit performa web otomatis open-source yang dikembangkan oleh Google. Lighthouse dapat dijalankan via:
- Chrome DevTools (GUI)
- CLI: `lighthouse <url> --output json`
- Node.js module (programmatic)

Penelitian ini menggunakan **Lighthouse CLI v11** via Node.js module untuk otomasi.

### 4.2 Mode Pengukuran

Lighthouse menawarkan dua mode pengukuran:

| Mode | Deskripsi | Digunakan dalam penelitian? |
|------|-----------|---------------------------|
| **Lab Data (Simulated)** | Mengukur di lingkungan terkontrol dengan simulasi throttling software | ✅ Ya — `throttlingMethod: simulate` |
| Field Data (CrUX) | Data dari pengguna nyata via Chrome UX Report | ❌ Tidak (memerlukan data produksi nyata) |

### 4.3 Network Throttling

Preset **Simulated Mobile 3G** yang digunakan:
- Round-Trip Time (RTT): **150 ms**
- Download Throughput: **1.638 Kbps** (~1.6 Mbps)
- CPU Slowdown Multiplier: **4x** (mensimulasikan CPU mobile yang lebih lambat)

Throttling ini memastikan bahwa perbedaan waktu parse CSS antar framework dapat **diukur secara terdeteksi** (tidak tertutup oleh kecepatan bandwidth tinggi localhost).

### 4.4 Metrik yang Diukur

```javascript
// Ekstraksi dari JSON output Lighthouse
const FCP = result.audits['first-contentful-paint'].numericValue; // ms
const LCP = result.audits['largest-contentful-paint'].numericValue; // ms
const Score = result.categories.performance.score * 100; // 0-100
```

### 4.5 Headless Chrome

Lighthouse berjalan menggunakan **headless Chromium** — browser tanpa antarmuka grafis. Ini memastikan pengukuran tidak terpengaruh oleh rendering window atau GPU acceleration yang berbeda antar mesin.

---

## 5. Metodologi Komparatif Terkontrol

### 5.1 Independent Samples Comparison

Eksperimen ini menggunakan desain **independent samples** (antara kelompok), bukan paired/crossover:
- **Control group:** Bootstrap v5 + PurgeCSS
- **Treatment group:** Tailwind CSS v3 + JIT

Kedua kelompok diukur secara terpisah (bukan pada subjek yang sama), sehingga statistik yang tepat adalah **Mann-Whitney U test** (bukan Wilcoxon signed-rank).

### 5.2 Fairness dalam Eksperimen Komparatif

Prinsip fairness (dari WS-07):
1. **Dataset identik:** konten HTML (teks, gambar, struktur) persis sama di kedua prototipe
2. **Preprocessing setara:** keduanya melalui proses eliminasi unused CSS (JIT vs PurgeCSS)
3. **Environment identik:** satu mesin, satu port, satu versi Lighthouse
4. **Metrik sama:** FCP & LCP dari field `audits` JSON yang sama

### 5.3 Uji Mann-Whitney U

Mann-Whitney U dipilih karena:
- Sampel kecil (n=10 per skenario)
- Data waktu rendering sering **right-skewed** (ada lag spike ekstrem dari OS)
- Tidak memenuhi asumsi normalitas untuk t-test parametrik
- Robust terhadap outlier (berbasis ranking, bukan mean)

**Effect size:** Rank-biserial correlation (r) digunakan untuk mengukur besarnya efek:
- r ≥ 0.1: efek kecil
- r ≥ 0.3: efek sedang
- r ≥ 0.5: efek besar
