# Rencana Penelitian: Perbandingan Performa Tailwind CSS vs Bootstrap Menggunakan Metrik Lighthouse

**Peneliti:** Rafi Kurniawan
**NIM:** 240202878
**Mata Kuliah:** Riset Teknologi Informasi
**Tanggal Mulai:** 6 Juli 2026

---

## 1. Ringkasan

| Item | Keterangan |
|------|------------|
| Judul | Analisis Perbandingan Performa Rendering Web: Tailwind CSS vs Bootstrap Berdasarkan Metrik FCP dan LCP Lighthouse pada Berbagai Ukuran Layar |
| Target Publikasi | Jurnal Sinta 5 (RESTI / Jurnal Nasional Informatika) atau Konferensi Nasional |
| Stack | Node.js, Tailwind CSS v3 (JIT), Bootstrap v5 (PurgeCSS), Lighthouse CLI v11, http-server |
| Masalah | Pemilihan framework CSS (Tailwind vs Bootstrap) di Indonesia sering didasarkan pada tren komunitas, bukan data performa rendering empiris → potensi bundle CSS besar & critical rendering path tidak optimal, berdampak pada pengguna mobile |
| Solusi | Eksperimen komparatif terkontrol: dua prototipe halaman **identik secara konten**, diukur FCP & LCP via Lighthouse CLI di tiga ukuran viewport pada simulasi jaringan 3G |

---

## 2. Problem Statement

**Masalah inti (satu kalimat):**
> Belum tersedia data empiris yang membandingkan performa rendering Tailwind CSS dan Bootstrap menggunakan metrik Core Web Vitals (FCP dan LCP) pada prototipe halaman yang identik secara konten, diuji di berbagai ukuran viewport dengan kondisi jaringan terkontrol.

**Elaborasi:** Pengembangan front-end web di Indonesia terus berkembang, namun keputusan pemilihan framework CSS sering didasarkan pada tren komunitas daripada data performa rendering terukur secara empiris. Hal ini berisiko menghasilkan aplikasi web dengan ukuran bundle stylesheet yang besar dan critical rendering path yang tidak optimal, yang berdampak buruk pada kecepatan muat halaman bagi pengguna mobile. Studi komparatif sebelumnya (Akbar, 2023; Setiawan & Arifin, 2024) memiliki dua gap: (1) tidak menggunakan Core Web Vitals sebagai metrik, dan (2) konten halaman yang dibandingkan tidak identik, sehingga isolasi variabel tidak valid.

---

## 3. Research Question & Hipotesis

**RQ:** Apakah halaman web yang dibangun dengan Tailwind CSS (JIT) menghasilkan First Contentful Paint (FCP) dan Largest Contentful Paint (LCP) yang secara statistik berbeda dibandingkan halaman web yang dibangun dengan Bootstrap (PurgeCSS), pada prototipe halaman identik yang diuji di tiga ukuran viewport (desktop 1920px, tablet 768px, mobile 375px) menggunakan Lighthouse CLI?

| Hipotesis | Pernyataan |
|-----------|-----------|
| **H₀** | Tidak terdapat perbedaan yang signifikan antara nilai FCP dan LCP yang dihasilkan halaman Tailwind CSS (JIT) dan halaman Bootstrap (PurgeCSS) pada viewport mobile 375px, tablet 768px, dan desktop 1920px (p ≥ 0,05) |
| **H₁** | Terdapat perbedaan yang signifikan antara nilai FCP dan LCP yang dihasilkan halaman Tailwind CSS (JIT) dan halaman Bootstrap (PurgeCSS) pada setidaknya satu dari tiga ukuran viewport yang diuji (p < 0,05) |

**Koneksi ke RQ:** H₁ secara langsung menjawab RQ dengan menegaskan bahwa perbedaan FCP/LCP Tailwind vs Bootstrap dapat dideteksi secara statistik pada kondisi pengujian yang dikontrol.

**Threshold:** α = 0,05; effect size rank-biserial correlation r ≥ 0,5 (large effect)

**Testability:** Hipotesis dapat diuji menggunakan Mann-Whitney U test terhadap pasangan data (FCP Tailwind vs FCP Bootstrap; LCP Tailwind vs LCP Bootstrap) per viewport dari `results/summary.csv`.

---

## 4. Variabel Penelitian

| Variabel | Tipe | Definisi | Satuan |
|----------|------|----------|--------|
| Framework CSS | IV (Independent Variable) | Tailwind CSS v3 JIT vs Bootstrap v5 PurgeCSS | Nominal (kategorikal) |
| First Contentful Paint (FCP) | DV (Dependent Variable) | Waktu hingga elemen bermakna pertama tampil di browser | ms |
| Largest Contentful Paint (LCP) | DV (Dependent Variable) | Waktu hingga elemen terbesar tampil sepenuhnya | ms |
| Ukuran Viewport | CV (Control Variable) | Lebar layar target emulasi Lighthouse | px (375 / 768 / 1920) |
| Kondisi Jaringan | CV (Control Variable) | Preset throttling Lighthouse simulated 3G (RTT 150ms, 1.6 Mbps) | — |

---

## 5. Populasi, Sampel & Unit Analisis

**Objek penelitian:** Prototipe halaman web statis yang dibangun dengan dua framework CSS berbeda namun berkonten identik.

**Unit analisis:** Satu *run* pengukuran Lighthouse CLI — menghasilkan satu pasang nilai (FCP_ms, LCP_ms) per eksekusi.

**Populasi:** Seluruh kemungkinan hasil pengukuran Lighthouse (FCP dan LCP dalam ms) pada prototipe halaman web yang dibangun dengan Tailwind CSS v3 JIT atau Bootstrap v5 PurgeCSS, dijalankan di lingkungan localhost dengan Lighthouse CLI v11 pada kondisi Simulated 3G throttling (RTT 150ms, 1.638 Kbps, CPU 4× slowdown).

**Sampel:** Diambil sebanyak **60 run** (10 run per skenario × 6 skenario) menggunakan teknik **purposive sampling** dengan kriteria berikut:

| Kriteria | Detail |
|----------|--------|
| **Inklusi** | Run yang berhasil dieksekusi tanpa error Lighthouse; nilai FCP ≤ LCP (valid secara logis); viewport sesuai konfigurasi `experiment.yaml` |
| **Eksklusi** | Run dengan timeout atau crash http-server; nilai FCP > LCP (logically invalid — tidak ditemukan dalam dataset aktual) |

**Distribusi sampel:**

| Skenario | Framework | Viewport | n |
|----------|-----------|----------|---|
| 1 | Tailwind | Mobile (375px) | 10 |
| 2 | Tailwind | Tablet (768px) | 10 |
| 3 | Tailwind | Desktop (1920px) | 10 |
| 4 | Bootstrap | Mobile (375px) | 10 |
| 5 | Bootstrap | Tablet (768px) | 10 |
| 6 | Bootstrap | Desktop (1920px) | 10 |
| **Total** | | | **60** |

**Justifikasi jumlah sampel:** n = 10 per skenario dipilih berdasarkan (a) ketersediaan waktu eksekusi (±30 menit total), (b) konsistensi dengan studi sejenis dalam pengujian performa web terkontrol, dan (c) kecukupan untuk Mann-Whitney U test non-parametrik yang tidak mensyaratkan distribusi normal.

---

## 6. Desain Eksperimen

- **Tipe:** Eksperimen komparatif independen (between-group)
- **Kondisi Control:** Bootstrap v5 + PurgeCSS (baseline best-practice)
- **Kondisi Treatment:** Tailwind CSS v3 + JIT Compiler
- **Iterasi:** 10 run per skenario (viewport × framework)
- **Total run:** 3 viewport × 2 framework × 10 iterasi = **60 run**
- **Analisis statistik:** Mann-Whitney U test (uji non-parametrik) + rank-biserial correlation r

---

## 7. Alur Kerja (Roadmap)

Setiap tahap memiliki file rencana detail tersendiri:

- [x] **Tahap 1** — [Desain Eksperimen & Setup Lingkungan](tahap-1-arsitektur-dan-skema-database.md) — *Selesai*
- [x] **Tahap 2** — [Implementasi Prototipe Web & Konfigurasi Lighthouse](tahap-2-implementasi-gateway.md) — *Selesai*
- [x] **Tahap 3** — [Eksekusi Pengujian & Pengumpulan Data](tahap-3-pengujian-k6.md) — *Selesai*
- [x] **Tahap 4** — [Analisis Statistik, Visualisasi & Interpretasi](tahap-4-analisis-data.md) — *Selesai*
- [ ] **Tahap 5** — [Penulisan Draf Paper Jurnal](tahap-5-draf-paper.md) — *Berikutnya*

---

## 8. Catatan

Dokumen ini adalah indeks utama. Detail teknis, skema eksperimen, dan keputusan masing-masing tahap dicatat pada file `tahap-N-*.md` terkait dan diperbarui seiring progres pengerjaan. Semua worksheet pendukung (WS-01 hingga WS-16) tersimpan di `../../../Tugas/`.
