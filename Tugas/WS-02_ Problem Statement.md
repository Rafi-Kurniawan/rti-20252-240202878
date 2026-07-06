# WS-02 Problem Statement

 **Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---

## Template A.2 — Problem Statement Builder

```
PROBLEM STATEMENT BUILDER

Domain & Konteks
  Domain   : Ilmu Komputer / Web Development
  Konteks  : Pengembangan front-end web di Indonesia untuk pengguna yang mayoritas menggunakan perangkat mobile dengan keterbatasan jaringan.

System Context
  Input       : Prototipe halaman web identik yang dibangun dengan dua framework CSS berbeda (Tailwind CSS dan Bootstrap).
  Process     : Proses rendering halaman web pada browser yang diuji di berbagai viewport (desktop, tablet, mobile) dengan simulasi jaringan 3G.
  Output      : Halaman web yang tampil sepenuhnya di layar (paint).
  Outcome     : Waktu rendering (First Contentful Paint dan Largest Contentful Paint) dalam milidetik.
  Constraints : Halaman harus identik secara konten; kondisi build harus setara (PurgeCSS untuk Bootstrap, JIT untuk Tailwind); kondisi cache browser harus diclear antar sesi.
  Stakeholders: Developer web, mahasiswa IT, freelancer, dan pengguna akhir (user).

Fenomena → Problem
  Fenomena yang diamati             : Pemilihan framework CSS oleh developer di Indonesia seringkali didasarkan pada popularitas atau preferensi komunitas.
  Gejala (symptom) yang terukur     : Tidak adanya data empiris performa spesifik (FCP/LCP) yang mempertimbangkan berbagai viewport layar dan jaringan mobile 3G.
  Masalah yang didiagnosis          : Keputusan pemilihan framework tanpa bukti performa empiris berisiko menghasilkan ukuran bundle stylesheet yang besar, menghambat critical rendering path, dan menurunkan kecepatan muat halaman bagi pengguna mobile.
  Masalah riset (researchable)      : Belum adanya pengujian empiris terkontrol yang membandingkan FCP dan LCP antara Tailwind CSS dan Bootstrap pada halaman identik di berbagai ukuran viewport menggunakan alat ukur standar (Lighthouse CLI).
  Variabel yang terukur             : Framework CSS (IV), FCP dan LCP (DV), Ukuran Viewport dan Kondisi Jaringan (CV).

Problem Quality Check
  [x] Clarity — Apakah satu orang membaca akan paham?
  [x] Measurability — Apakah ada metrik kuantitatif? (Ya, waktu FCP dan LCP dalam ms).
  [x] Relevance — Apakah penting untuk domain?
  [x] Testability — Apakah bisa gagal? (Ya, H0 dapat diterima jika tidak ada perbedaan performa yang signifikan).
  [x] Impact — Apakah ada kontribusi jika terjawab?

Problem Statement (1 paragraf):
  Pengembangan front-end web di Indonesia terus berkembang, namun keputusan pemilihan framework CSS sering didasarkan pada tren komunitas daripada data performa rendering terukur secara empiris. Hal ini berisiko menghasilkan aplikasi web dengan ukuran bundle stylesheet yang besar dan critical rendering path yang tidak optimal, yang secara khusus berdampak buruk pada kecepatan muat halaman bagi mayoritas pengguna yang mengakses via perangkat mobile dengan jaringan terbatas. Meskipun studi tentang performa CSS framework telah ada, belum ada riset komparatif di Indonesia yang mengontrol kondisi build (JIT vs PurgeCSS) dan menggunakan metrik standar industri Core Web Vitals (FCP dan LCP) pada halaman berdesain identik yang diuji di berbagai ukuran layar (desktop, tablet, mobile). Oleh karena itu, penelitian ini bertujuan untuk membandingkan secara empiris performa rendering halaman web antara Tailwind CSS dan Bootstrap menggunakan metrik FCP dan LCP via Lighthouse CLI guna memberikan panduan pemilihan framework berbasis data.
```

---

## Latihan 1 — Dari Topik ke Masalah Riset

**Topik awal:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar

| Tahap | Hasil |
|-------|-------|
| Reality | Developer sering memilih Tailwind atau Bootstrap hanya berdasarkan popularitas atau kenyamanan (trends). |
| Observed Issue (Symptom) | Kurangnya data objektif mengenai seberapa besar pengaruh framework tersebut terhadap performa muat halaman web pengguna nyata, terutama di perangkat mobile dengan jaringan lambat. |
| Diagnosed Problem (Root Cause) | Belum adanya eksperimen empiris terkontrol yang membandingkan dua framework ini dengan kondisi konten halaman identik, variasi viewport, dan pengukuran berbasis Core Web Vitals (FCP/LCP). |
| Researchable Problem | Apakah halaman web yang dibangun dengan Tailwind CSS menghasilkan FCP dan LCP yang secara statistik berbeda (lebih rendah) dibandingkan halaman web yang dibangun dengan Bootstrap pada prototipe halaman identik yang diuji di tiga ukuran viewport menggunakan Lighthouse CLI? |
| Measurable Variable | Framework CSS (Tailwind vs Bootstrap), First Contentful Paint (ms), Largest Contentful Paint (ms). |

**Apakah terjebak solution-first thinking?** [ ] Ya / [x] Tidak
> Jika ya, kembali ke tahap mana? -

---

## Latihan 2 — System Context Decomposition

| Komponen | Deskripsi |
|----------|----------|
| Input | Dua prototipe halaman statis (satu Tailwind CSS v3 JIT, satu Bootstrap v5 PurgeCSS) dengan konten gambar dan teks yang sama persis. |
| Process | Proses rendering oleh *browser engine* melalui Lighthouse CLI dengan simulasi kondisi jaringan 3G. |
| Output | Konten pertama dan terbesar yang berhasil dirender (FCP dan LCP) yang tercatat dalam file JSON output Lighthouse. |
| Outcome | Evaluasi kecepatan komparatif antara dua arsitektur framework CSS (utility-first vs component-based). |
| Constraints | *Localhost*, simulasi jaringan konsisten (RTT 150ms, throughput 1.638 Kbps), tanpa *cache*. |
| Stakeholders | *Front-end web developer*, pengambil keputusan teknologi. |

**Komponen mana yang paling relevan dengan masalah riset?** Process dan Output (terkait waktu rendering halaman).

---

## Latihan 3 — Problem Quality Check

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Clarity | 5 | Jelas menyebutkan dua framework dan metrik performanya. |
| Measurability | 5 | FCP dan LCP terukur secara presisi dalam satuan milidetik via Lighthouse CLI. |
| Relevance | 5 | Sangat relevan karena performa rendering (Core Web Vitals) menjadi standar industri *front-end* saat ini. |
| Testability | 5 | Sangat dapat diuji dengan eksekusi otomatis Lighthouse berulang. |
| Impact | 4 | Menawarkan pedoman (dataset empiris) bagi developer di Indonesia saat memilih framework berbasis bukti performa, bukan sekadar preferensi komunitas. |

**Skor total:** 24 / 25

**Problem statement versi final (1 paragraf):**
> (Lihat pada bagian Template A.2 di atas).

---

## Refleksi

> Bandingkan "masalah" yang biasa ditemui saat coding (bug, error) dengan masalah riset. Apa perbedaan fundamental dalam cara mendefinisikan dan mendekati keduanya?

**Jawaban:**
> Masalah *coding* adalah rintangan praktis untuk membuat perangkat lunak bekerja sesuai fungsi yang diinginkan (solusi fungsional dan teknis). Sebaliknya, "masalah riset" bertujuan menemukan jawaban (gap) pengetahuan yang belum diketahui secara terstruktur dan dapat digeneralisasi. Dalam topik ini, masalah risetnya bukan "bagaimana memperbaiki error layout CSS Tailwind", tetapi "membuktikan secara objektif apakah pendekatan Tailwind secara empiris memberikan dampak waktu muat yang lebih cepat dibanding Bootstrap dalam kondisi pengujian yang adil".
