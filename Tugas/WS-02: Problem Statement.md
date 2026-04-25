# WS-02 — Problem Statement
 
## A.2 — Problem Statement Builder
 
---
PROBLEM STATEMENT BUILDER
 
Domain & Konteks
  Domain   : Pengembangan Aplikasi Mobile / Web — E-Commerce
  Konteks  : UMKM dan startup e-commerce Indonesia yang ingin menjangkau
             pengguna mobile dengan anggaran pengembangan terbatas dan
             kondisi jaringan yang bervariasi (banyak daerah masih 3G)
 
System Context
  Input       : Request HTTP dari browser/app pengguna; data produk dari server
  Process     : Rendering halaman (critical path), fetch data API, caching,
                service worker (untuk PWA)
  Output      : Halaman produk, checkout, konfirmasi pesanan yang tampil di layar
  Outcome     : Konversi pembelian; kepuasan pengguna; bounce rate
  Constraints : Jaringan seluler 2G–4G; perangkat Android mid-range (RAM 3–4 GB);
                anggaran developer terbatas (tidak selalu bisa maintain dua
                codebase: web dan native)
  Stakeholders: Pengembang aplikasi UMKM; pemilik bisnis e-commerce; pengguna akhir
 
Fenomena → Problem
  Fenomena yang diamati       : Banyak UMKM e-commerce memilih native Android
                                meskipun biaya pengembangan dan maintenance
                                lebih tinggi dibanding PWA
  Gejala (symptom) terukur    : Bounce rate tinggi (> 60%) pada pengguna mobile
                                yang mengakses e-commerce via browser di jaringan
                                lambat; waktu loading > 5 detik di jaringan 3G
  Masalah yang didiagnosis    : Pengembang tidak memiliki data empiris yang cukup
                                untuk memilih platform (PWA vs native) secara
                                terukur berdasarkan kondisi jaringan pengguna
                                Indonesia
  Masalah riset (researchable): Belum ada studi yang membandingkan secara
                                sistematis performa PWA vs native Android
                                khususnya pada kondisi jaringan rendah (3G/2G)
                                dalam konteks aplikasi e-commerce berbahasa
                                Indonesia
  Variabel yang terukur       : First Contentful Paint (FCP), Time to Interactive
                                (TTI), bundle size, dan Lighthouse performance
                                score pada kondisi jaringan 3G dan 2G yang
                                disimulasikan
 
Problem Quality Check
  [x] Clarity      — Satu orang membaca akan paham: "Mana yang lebih performan
                     untuk e-commerce di jaringan lambat — PWA atau native?"
  [x] Measurability — Ada metrik kuantitatif: FCP (ms), TTI (ms), Lighthouse score
  [x] Relevance    — Penting: mayoritas pengguna internet Indonesia via mobile
                     dengan koneksi tidak stabil
  [x] Testability  — Bisa gagal: hipotesis bisa ditolak jika native ternyata lebih
                     cepat pada semua kondisi jaringan
  [x] Impact       — Jika terjawab: pengembang UMKM punya dasar empiris memilih
                     platform yang tepat dan hemat biaya
 
Problem Statement (1 paragraf):
  Aplikasi e-commerce di Indonesia semakin dominan diakses melalui perangkat
  mobile, namun kondisi jaringan yang bervariasi — khususnya di wilayah dengan
  koneksi 3G — menyebabkan pengalaman pengguna yang tidak konsisten. Pengembang
  dihadapkan pada pilihan antara Progressive Web App (PWA) yang lebih murah
  dikembangkan dan native Android yang dianggap lebih performan, namun belum ada
  studi komparatif yang mengukur secara empiris performa keduanya pada kondisi
  jaringan rendah dalam konteks e-commerce berbahasa Indonesia. Ketiadaan data
  ini menyebabkan keputusan pemilihan platform didasarkan pada asumsi atau tren,
  bukan bukti terukur, yang berpotensi merugikan pengembang dari sisi biaya
  maupun pengguna dari sisi pengalaman.
---
 
## Latihan 1 — Dari Topik ke Masalah Riset
 
**Topik awal:** Pengembangan aplikasi mobile untuk e-commerce
 
| Tahap | Hasil |
|-------|-------|
| Reality | Banyak pengguna e-commerce Indonesia mengakses via smartphone dengan jaringan yang tidak stabil |
| Observed Issue (Symptom) | Bounce rate halaman produk > 60% pada jaringan 3G; loading > 5 detik sering menyebabkan pengguna menutup aplikasi |
| Diagnosed Problem (Root Cause) | Tidak ada panduan berbasis data untuk memilih antara PWA dan native Android yang mempertimbangkan kondisi jaringan nyata pengguna |
| Researchable Problem | Belum ada studi yang membandingkan FCP, TTI, dan Lighthouse score antara PWA dan native Android untuk aplikasi e-commerce pada simulasi jaringan 3G dan 2G |
| Measurable Variable | FCP (ms), TTI (ms), Lighthouse Performance Score (0–100), transfer size (KB) — diukur pada jaringan 4G/3G/2G yang disimulasikan via Chrome DevTools |
 
**Apakah terjebak solution-first thinking?** Tidak  
> Titik awal adalah gejala (bounce rate tinggi), bukan solusi (mari buat PWA). Platform dibandingkan sebagai objek penelitian, bukan sebagai solusi yang sudah dipilih.

---
 
## Latihan 2 — System Context Decomposition
 
| Komponen | Deskripsi |
|----------|----------|
| Input | HTTP request dari browser (PWA) atau API call dari native app; payload: data produk JSON, gambar, aset statis |
| Process | Rendering engine browser (untuk PWA) atau native rendering (untuk Android); service worker caching; API fetch; image optimization |
| Output | Halaman produk yang tampil: daftar produk, detail produk, form checkout, halaman konfirmasi |
| Outcome | Konversi pembelian; waktu pengguna di halaman (session duration); bounce rate |
| Constraints | Bandwidth jaringan seluler (2G: ~50 Kbps, 3G: ~1.5 Mbps, 4G: ~10 Mbps); RAM perangkat 3–4 GB; baterai dan CPU mid-range |
| Stakeholders | Pengembang aplikasi (UMKM/startup); pemilik bisnis e-commerce; pengguna akhir smartphone |
 
**Komponen paling relevan:** Process dan Constraints — karena perbedaan performa antara PWA dan native muncul terutama pada tahap rendering dan fetch data, yang sangat dipengaruhi oleh batasan bandwidth jaringan.

---

## Latihan 3 — Problem Quality Check
 
| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Clarity | 5 | Pertanyaan riset dapat dirumuskan dalam satu kalimat yang langsung dipahami siapapun di bidang IT |
| Measurability | 5 | Semua metrik (FCP, TTI, Lighthouse score) adalah standar industri dengan alat pengukuran yang sudah tersedia gratis |
| Relevance | 5 | Indonesia masuk 5 besar pengguna e-commerce mobile dunia; gap infrastruktur jaringan adalah isu nyata |
| Testability | 4 | Dapat dirancang eksperimen terkontrol; satu catatan: simulasi jaringan via DevTools belum tentu identik dengan kondisi jaringan nyata di lapangan |
| Impact | 4 | Hasil langsung berguna untuk pengembang UMKM; sedikit terbatas karena hanya Android (tidak iOS) |
 
**Skor total:** 23 / 25
 
**Problem statement versi final:**
> Pengembang aplikasi e-commerce mobile di Indonesia belum memiliki data empiris yang cukup untuk memilih antara Progressive Web App (PWA) dan native Android secara terukur, khususnya dalam konteks kondisi jaringan rendah (3G/2G) yang masih umum di banyak wilayah. Studi ini bertujuan mengisi gap tersebut dengan membandingkan secara sistematis performa keduanya — menggunakan metrik First Contentful Paint (FCP), Time to Interactive (TTI), dan Lighthouse Performance Score — pada prototipe aplikasi e-commerce yang diuji di simulasi jaringan 4G, 3G, dan 2G.

---

## Refleksi
 
> Perbedaan fundamental antara bug coding dan masalah riset adalah pada sifat "ketidaktahuannya". Bug coding punya jawaban yang benar dan bisa diverifikasi segera (sistem berjalan atau tidak). Masalah riset adalah ketidaktahuan yang lebih dalam: kita tidak tahu mana yang lebih baik, dan jawabannya bergantung pada konteks. Di riset ini, bukan "apakah PWA bisa dibuat" (itu sudah diketahui), melainkan "apakah PWA lebih performan dari native dalam kondisi spesifik ini" — pertanyaan yang butuh eksperimen terukur untuk dijawab.
 
---
