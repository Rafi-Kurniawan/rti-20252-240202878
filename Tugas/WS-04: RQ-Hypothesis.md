# WS-04 — Research Question & Hypothesis
 
## A.4 — RQ-Contribution-Hypothesis
 
```
RQ-CONTRIBUTION-HYPOTHESIS
 
Gap Statement:
  Belum ada studi Indonesia yang membandingkan secara empiris performa
  Progressive Web App (PWA) vs native Android untuk aplikasi e-commerce
  menggunakan metrik FCP, TTI, dan Lighthouse Score pada tiga kondisi
  jaringan berbeda (4G, 3G, 2G) dalam satu eksperimen terkontrol.
  Studi yang ada (Kurniawan, 2020; Dewi dkk., 2020; Adi dkk., 2021)
  belum menggabungkan dimensi perbandingan platform, kontrol kondisi
  jaringan, dan domain e-commerce transaksional secara bersamaan.
 
Research Question:
  Tipe         : [x] Comparison
  Formulasi    : Apakah Progressive Web App (PWA) menghasilkan First Contentful
                 Paint (FCP) dan Time to Interactive (TTI) yang lebih rendah
                 dibandingkan native Android pada prototipe aplikasi e-commerce
                 yang diuji pada simulasi jaringan 3G (1.5 Mbps) menggunakan
                 Chrome DevTools throttling?
  Variabel IV  : Jenis platform — PWA (diakses via Chrome mobile) vs
                 Native Android (APK React Native)
  Variabel DV  : First Contentful Paint / FCP (ms), Time to Interactive / TTI (ms),
                 Lighthouse Performance Score (0–100)
  Metrik       : FCP dalam milidetik (lebih rendah = lebih baik),
                 TTI dalam milidetik (lebih rendah = lebih baik),
                 Lighthouse Score (lebih tinggi = lebih baik)
  Dataset      : Prototipe aplikasi e-commerce yang dibangun sendiri dengan
                 fitur identik: listing 50 produk, halaman detail, form
                 checkout — mengacu rekomendasi Hidayat dkk. (2023)
  Baseline     : Kurniawan (2020) sebagai baseline metode pengukuran;
                 Dewi dkk. (2020) sebagai baseline perbandingan PWA vs native
 
Quality Check RQ:
  [x] Variabel spesifik   — PWA vs native Android (bukan "teknologi web vs mobile")
  [x] Metrik jelas        — FCP (ms), TTI (ms), Lighthouse Score — konsisten
                            dengan metrik yang digunakan Kurniawan (2020)
                            dan Adi dkk. (2021)
  [x] Baseline ada        — Kurniawan (2020) dan Dewi dkk. (2020)
  [x] Konteks disebutkan  — Aplikasi e-commerce, jaringan 3G, Chrome DevTools
  [x] Memerlukan eksperimen — Tidak bisa dijawab hanya dengan survei literatur
 
Contribution Statement:
  Apa yang baru diketahui : Data empiris perbandingan FCP, TTI, dan Lighthouse
                            Score antara PWA dan native Android pada kondisi
                            jaringan 3G untuk alur transaksi e-commerce penuh
                            (listing → detail → checkout) — yang belum tersedia
                            dalam literatur Indonesia yang ada
  Jenis kontribusi        : [x] Comparison (perbandingan sistematis yang belum ada)
  Gap yang diisi          : Method Gap (tidak ada kontrol kondisi jaringan di studi
                            sebelumnya seperti Kurniawan, 2020 dan Adi dkk., 2021)
                            + Data Gap (domain e-commerce transaksional, bukan
                            web akuntansi seperti Dewi dkk., 2020)
 
Hypothesis Pair:
  H₀ : Tidak ada perbedaan yang signifikan antara FCP PWA dan FCP native Android
       pada aplikasi e-commerce yang diuji pada simulasi jaringan 3G
       (α = 0.05, uji Mann-Whitney U karena distribusi tidak diasumsikan normal)
  H₁ : Terdapat perbedaan yang signifikan antara FCP PWA dan FCP native Android
       pada aplikasi e-commerce yang diuji pada simulasi jaringan 3G
  Threshold              : α = 0.05 (p-value < 0.05 untuk menolak H₀)
  Justifikasi threshold  : α = 0.05 adalah standar yang diterima secara luas
                           dalam riset komputasi; dipilih Mann-Whitney U karena
                           distribusi waktu respons cenderung tidak normal
                           (right-skewed) dan jumlah pengukuran terbatas (n < 30).
                           Dewi dkk. (2020) tidak melaporkan uji statistik formal
                           — studi ini memperbaiki gap tersebut.
```
 
---
 
## Latihan 1 — Dari Gap ke RQ
 
**Gap dari WS-03:** Belum ada studi Indonesia yang menguji FCP dan TTI PWA vs native Android secara sistematis pada kondisi jaringan 3G untuk konteks alur transaksi e-commerce
 
**RQ versi pertama:**
> "Apakah PWA lebih cepat dari native Android untuk e-commerce?"
 
**Evaluasi RQ:**
 
| Komponen | Ada? | Isi |
|----------|------|-----|
| Metode spesifik | Belum — "lebih cepat" tidak jelas | Perlu: PWA vs native Android; mengacu metode Kurniawan (2020) — Lighthouse + Chrome DevTools |
| Metrik terukur | Belum — "cepat" terlalu abstrak | Perlu: FCP (ms) dan TTI (ms) — konsisten dengan Kurniawan (2020) dan Adi dkk. (2021) |
| Baseline | Belum disebutkan | Perlu: Kurniawan (2020) sebagai metode acuan; Dewi dkk. (2020) sebagai baseline perbandingan |
| Dataset/konteks | Belum — "e-commerce" terlalu luas | Perlu: prototipe dengan 50 produk (mengacu Hidayat dkk., 2023), simulasi 3G |
 
**Tipe RQ:** Comparison
 
**RQ versi revisi:**
> "Apakah Progressive Web App (PWA) menghasilkan First Contentful Paint (FCP) dan Time to Interactive (TTI) yang lebih rendah dibandingkan native Android pada prototipe aplikasi e-commerce dengan 50 produk yang diuji pada simulasi jaringan 3G (1.5 Mbps) menggunakan Chrome DevTools throttling?"
 
---
 
## Latihan 2 — Hypothesis Pair
 
| Komponen | Isi |
|----------|-----|
| H₀ | Tidak ada perbedaan yang signifikan antara FCP PWA dan FCP native Android pada prototipe e-commerce yang diuji di jaringan 3G (p ≥ 0.05) |
| H₁ | Terdapat perbedaan yang signifikan antara FCP PWA dan FCP native Android pada prototipe e-commerce yang diuji di jaringan 3G (p < 0.05) |
| Metrik | First Contentful Paint (FCP) dalam milidetik; Time to Interactive (TTI) dalam milidetik; Lighthouse Performance Score (0–100) |
| Threshold | α = 0.05 |
| Justifikasi threshold | Standar riset komputasi; distribusi waktu respons cenderung right-skewed sehingga digunakan uji non-parametrik Mann-Whitney U. Berbeda dari Dewi dkk. (2020) yang tidak melaporkan uji statistik formal — studi ini menambahkan rigor statistik yang hilang. |
 
**Apakah hipotesis ini falsifiable?** Ya
> Cara membuktikan H₁ salah: jika hasil pengukuran menunjukkan p ≥ 0.05 (perbedaan FCP antara PWA dan native tidak signifikan secara statistik), maka H₀ tidak bisa ditolak. Ini selaras dengan kemungkinan yang ditunjukkan Dewi dkk. (2020) bahwa performa PWA "hampir sama" dengan native.
 
---
 
## Latihan 3 — Rantai Operasionalisasi
 
| Tahap | Isi |
|-------|-----|
| RQ | Apakah PWA menghasilkan FCP dan TTI lebih rendah dari native Android pada prototipe e-commerce di jaringan 3G? |
| Variable (IV) | Jenis platform: (1) PWA diakses via Chrome Mobile, (2) Native Android dibangun dengan React Native |
| Variable (DV) | First Contentful Paint / FCP (ms); Time to Interactive / TTI (ms); Lighthouse Performance Score |
| Metric | FCP dan TTI diukur dalam milidetik menggunakan Lighthouse CLI (alat yang digunakan Kurniawan, 2020); diukur 10 kali per kondisi untuk stabilitas; cache dikosongkan antar sesi (kontrol yang belum diterapkan Adi dkk., 2021) |
| Data source | Pengukuran langsung pada prototipe yang dibangun sendiri menggunakan Lighthouse CLI dan Chrome DevTools dengan network throttling 3G preset (1.5 Mbps down, 750 Kbps up, 40ms RTT) |
| Analysis method | Uji Mann-Whitney U untuk membandingkan distribusi FCP dan TTI antar platform; effect size menggunakan Cohen's d; visualisasi box plot — menambahkan rigor statistik yang tidak ada di Dewi dkk. (2020) |
 
**Apakah rantai lengkap?** Ya
> Semua tahap terhubung: RQ → variabel → metrik → sumber data → metode analisis dapat dieksekusi langsung tanpa ambiguitas, dengan referensi metodologi yang jelas ke literatur Indonesia yang ada.
 
---
 
## Refleksi
 
**Judul yang diekstrak (dari literatur yang dikaji):** "Analisis Performance Progressive Web Apps Pada Aplikasi Shopee" (Adi dkk., 2021)
 
**RQ yang dapat diekstrak:** "Bagaimana performa PWA Shopee?"
 
**Komponen yang hilang:** Pembanding native Android, kondisi jaringan yang dikontrol, dan uji statistik formal. Inilah gap yang studi ini isi — maju dari sekadar analisis deskriptif ke perbandingan komparatif yang terkontrol, melanjutkan agenda riset yang dirintis Kurniawan (2020) dan Nurwanto (2019).
 
---
