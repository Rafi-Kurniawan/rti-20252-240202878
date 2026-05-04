# WS-02 — Problem Statement
 
## A.2 — Problem Statement Builder
 
---
```
PROBLEM STATEMENT BUILDER
 
Domain & Konteks
  Domain   : Pengembangan Aplikasi Mobile / Web — E-Commerce
  Konteks  : UMKM dan startup e-commerce Indonesia yang ingin menjangkau
             pengguna mobile dengan anggaran pengembangan terbatas dan
             kondisi jaringan yang bervariasi (banyak daerah masih 3G).
             Nurwanto (2019) mencatat bahwa PWA menjadi pilihan strategis
             bagi pengembang e-commerce dengan anggaran terbatas.
 
System Context
  Input       : Request HTTP dari browser/app pengguna; data produk dari server
  Process     : Rendering halaman (critical path), fetch data API, caching service
                worker (untuk PWA) — Dewi dkk. (2020) menunjukkan service worker
                adalah komponen kunci performa PWA
  Output      : Halaman produk, checkout, konfirmasi pesanan yang tampil di layar
  Outcome     : Konversi pembelian; kepuasan pengguna; bounce rate
  Constraints : Jaringan seluler 2G–4G; perangkat Android mid-range (RAM 3–4 GB);
                cache service worker yang memengaruhi konsumsi baterai (Kurniawan
                dkk., 2024); anggaran developer terbatas
  Stakeholders: Pengembang aplikasi UMKM; pemilik bisnis e-commerce; pengguna
                akhir smartphone Android
 
Fenomena → Problem
  Fenomena yang diamati       : Studi Adi dkk. (2021) pada aplikasi Shopee
                                menunjukkan PWA dapat diakses cepat bahkan di
                                koneksi tidak stabil, namun banyak UMKM masih
                                memilih native Android dengan biaya lebih tinggi
  Gejala (symptom) terukur    : Bounce rate tinggi (> 60%) pada pengguna mobile
                                yang mengakses e-commerce via browser di jaringan
                                lambat; Lighthouse Score PWA e-commerce lokal
                                masih bervariasi di rentang 45–72 (Hidayat
                                dkk., 2023)
  Masalah yang didiagnosis    : Pengembang tidak memiliki data empiris yang cukup
                                untuk memilih platform (PWA vs native) secara
                                terukur berdasarkan kondisi jaringan pengguna
                                Indonesia — gap yang diidentifikasi dari
                                keterbatasan studi-studi yang ada
  Masalah riset (researchable): Belum ada studi Indonesia yang membandingkan
                                secara sistematis FCP, TTI, dan Lighthouse Score
                                antara PWA dan native Android khususnya pada
                                kondisi jaringan rendah (3G/2G) dalam konteks
                                alur transaksi e-commerce penuh (listing →
                                detail → checkout)
  Variabel yang terukur       : First Contentful Paint (FCP), Time to Interactive
                                (TTI), Lighthouse Performance Score, transfer size
                                (KB) — metrik yang digunakan Kurniawan (2020)
                                dan Adi dkk. (2021) — diukur pada simulasi
                                jaringan 4G/3G/2G via Chrome DevTools
 
Problem Quality Check
  [x] Clarity      — Satu orang membaca akan paham: "Mana yang lebih performan
                     untuk e-commerce di jaringan lambat — PWA atau native Android?"
  [x] Measurability — Ada metrik kuantitatif: FCP (ms), TTI (ms), Lighthouse Score
                     (0–100) — standar yang telah dipakai di seluruh literatur
                     Indonesia yang dikaji
  [x] Relevance    — Penting: mayoritas pengguna internet Indonesia via mobile
                     dengan koneksi tidak stabil; Nurwanto (2019) menegaskan
                     relevansi PWA untuk pasar Indonesia
  [x] Testability  — Bisa gagal: hipotesis bisa ditolak jika native ternyata
                     lebih cepat pada semua kondisi jaringan — sesuai temuan
                     Dewi dkk. (2020) bahwa performa PWA "hampir sama" dengan
                     native, bukan selalu unggul
  [x] Impact       — Jika terjawab: pengembang UMKM punya dasar empiris memilih
                     platform yang tepat, melanjutkan agenda yang dirintis
                     Nurwanto (2019) dan Hidayat dkk. (2023)
 
Problem Statement:
  Aplikasi e-commerce di Indonesia semakin dominan diakses melalui perangkat
  mobile, namun kondisi jaringan yang bervariasi — khususnya di wilayah dengan
  koneksi 3G — menyebabkan pengalaman pengguna yang tidak konsisten. Studi-studi
  yang telah ada di Indonesia (Kurniawan, 2020; Adi dkk., 2021; Dewi dkk., 2020)
  baru menganalisis performa PWA secara parsial — baik hanya pada satu platform,
  satu kondisi jaringan, atau domain non-e-commerce — sehingga belum ada
  perbandingan sistematis antara PWA dan native Android yang mengontrol variabel
  jaringan secara eksplisit dalam konteks alur transaksi e-commerce. Ketiadaan
  data komparatif ini menyebabkan keputusan pemilihan platform didasarkan pada
  asumsi atau tren, bukan bukti terukur, yang berpotensi merugikan pengembang
  UMKM dari sisi biaya maupun pengguna dari sisi pengalaman.
```
 
---
 
## Latihan 1 — Dari Topik ke Masalah Riset
 
**Topik awal:** Pengembangan aplikasi mobile untuk e-commerce
 
| Tahap | Hasil |
|-------|-------|
| Reality | Banyak pengguna e-commerce Indonesia mengakses via smartphone dengan jaringan tidak stabil; PWA telah diterapkan pada berbagai domain aplikasi di Indonesia (Nurwanto, 2019; Dewi dkk., 2020) |
| Observed Issue (Symptom) | Lighthouse Score PWA e-commerce lokal masih di rentang 45–72 (Hidayat dkk., 2023); loading > 5 detik di jaringan 3G sering menyebabkan pengguna menutup aplikasi |
| Diagnosed Problem (Root Cause) | Tidak ada panduan berbasis data empiris untuk memilih antara PWA dan native Android yang mempertimbangkan kondisi jaringan nyata — studi yang ada (Kurniawan, 2020; Adi dkk., 2021) tidak melakukan perbandingan langsung PWA vs native di beberapa kondisi jaringan sekaligus |
| Researchable Problem | Belum ada studi yang membandingkan FCP, TTI, dan Lighthouse Score antara PWA dan native Android untuk alur transaksi e-commerce lengkap pada simulasi jaringan 4G, 3G, dan 2G secara bersamaan dalam satu eksperimen terkontrol |
| Measurable Variable | FCP (ms), TTI (ms), Lighthouse Performance Score (0–100), transfer size (KB) — diukur menggunakan Lighthouse CLI dan Chrome DevTools throttling (metodologi mengacu pada Kurniawan, 2020) |
 
**Apakah terjebak solution-first thinking?** Tidak
> Titik awal adalah gejala (Lighthouse Score rendah, bounce rate tinggi), bukan solusi (mari buat PWA). Platform dibandingkan sebagai objek penelitian — sesuai dengan pendekatan Adi dkk. (2021) yang menganalisis performa tanpa memprasangkakan hasilnya.
 
---
 
## Latihan 2 — System Context Decomposition
 
| Komponen | Deskripsi |
|----------|----------|
| Input | HTTP request dari browser (PWA) atau API call dari native app; payload: data produk JSON, gambar produk, aset statis |
| Process | Rendering engine browser (untuk PWA) + service worker caching (Nurwanto, 2019; Dewi dkk., 2020) atau native rendering Android; fetch data API; image optimization |
| Output | Halaman produk yang tampil: listing produk, detail produk, form checkout, halaman konfirmasi |
| Outcome | Konversi pembelian; session duration; bounce rate — indikator yang relevan dengan konteks UMKM (Hidayat dkk., 2023) |
| Constraints | Bandwidth jaringan seluler (2G: ~50 Kbps, 3G: ~1.5 Mbps, 4G: ~10 Mbps); RAM perangkat 3–4 GB; cache service worker yang memengaruhi baterai dan performa (Kurniawan dkk., 2024) |
| Stakeholders | Pengembang aplikasi (UMKM/startup); pemilik bisnis e-commerce; pengguna akhir smartphone Android |
 
**Komponen paling relevan:** Process dan Constraints — karena perbedaan performa antara PWA dan native muncul terutama pada tahap rendering dan service worker caching (Dewi dkk., 2020; Nurwanto, 2019), yang sangat dipengaruhi oleh batasan bandwidth jaringan.
 
---
 
## Latihan 3 — Problem Quality Check
 
| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Clarity | 5 | Pertanyaan riset dapat dirumuskan dalam satu kalimat yang langsung dipahami siapapun di bidang IT; dilanjutkan dari agenda yang dirintis Nurwanto (2019) |
| Measurability | 5 | Semua metrik (FCP, TTI, Lighthouse Score) adalah standar industri yang telah digunakan di seluruh literatur Indonesia yang dikaji (Kurniawan, 2020; Adi dkk., 2021; Dewi dkk., 2020) |
| Relevance | 5 | Indonesia masuk 5 besar pengguna e-commerce mobile dunia; Hidayat dkk. (2023) mengonfirmasi relevansi optimasi performa PWA e-commerce untuk pasar Indonesia |
| Testability | 4 | Dapat dirancang eksperimen terkontrol mengacu metodologi Kurniawan (2020); catatan: simulasi throttling Chrome DevTools belum identik dengan kondisi jaringan nyata di lapangan |
| Impact | 4 | Hasil langsung berguna untuk pengembang UMKM (Nurwanto, 2019); sedikit terbatas karena hanya Android — tidak mencakup iOS atau kondisi jaringan di luar simulasi |
 
**Skor total:** 23 / 25
 
**Problem statement versi final:**
> Pengembang aplikasi e-commerce mobile di Indonesia belum memiliki data empiris komparatif yang cukup untuk memilih antara Progressive Web App (PWA) dan native Android secara terukur, khususnya dalam konteks kondisi jaringan rendah (3G/2G). Studi-studi yang telah ada di Indonesia (Kurniawan, 2020; Adi dkk., 2021; Dewi dkk., 2020; Hidayat dkk., 2023) menganalisis PWA secara individual atau hanya pada satu kondisi jaringan, tanpa perbandingan langsung dengan native Android pada beberapa kondisi jaringan secara bersamaan. Studi ini bertujuan mengisi gap tersebut dengan membandingkan secara sistematis FCP, TTI, dan Lighthouse Performance Score antara PWA dan native Android pada prototipe aplikasi e-commerce yang diuji di simulasi jaringan 4G, 3G, dan 2G.
 
---
 
## Refleksi
 
> Perbedaan fundamental antara bug coding dan masalah riset adalah pada sifat "ketidaktahuannya". Bug coding punya jawaban yang benar dan bisa diverifikasi segera. Masalah riset adalah ketidaktahuan yang lebih dalam: kita tidak tahu mana yang lebih baik dalam kondisi spesifik. Dewi dkk. (2020) menemukan performa PWA "hampir sama" dengan native untuk web akuntansi — tapi apakah kesimpulan ini berlaku untuk e-commerce di jaringan 3G? Itulah masalah riset: bukan "apakah PWA bisa dibuat" (sudah diketahui sejak Nurwanto, 2019), melainkan "apakah PWA lebih performan dari native Android dalam kondisi jaringan rendah untuk alur transaksi e-commerce?"
 
---
