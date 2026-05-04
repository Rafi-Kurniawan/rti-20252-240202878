# WS-03 — Literature Mapping & Gap
 
## A.3 — Literature Mapping & Gap Identification
 
```
LITERATURE MAPPING
 
Topik      : Perbandingan performa PWA vs Native Android — E-Commerce Indonesia
Database   : Google Scholar, Portal Garuda, SINTA, ResearchGate
Query      : ("Progressive Web App" OR "PWA") AND ("native app" OR "Android")
             AND ("performa" OR "performance" OR "Lighthouse") AND ("e-commerce"
             OR "mobile")
Tahun      : 2019–2024
Hasil awal : 38 paper → Screening judul & abstrak → 10 paper relevan →
             Baca penuh → 6 paper final digunakan
```
 
## Latihan 1 — Concept-Centric Literature Table
 
**Topik riset:** Perbandingan performa PWA vs Native Android pada e-commerce Indonesia
**Query pencarian:** `"Progressive Web App" "native app" performance e-commerce Indonesia`
**Database:** Google Scholar, Portal Garuda, SINTA
 
| # | Study | Tahun | Method | Dataset | Result | Limitasi |
|---|-------|-------|--------|---------|--------|----------|
| 1 | Kurniawan, W. | 2020 | Benchmark Lighthouse + GTmetrix pada perangkat mobile | PWA generik (bukan e-commerce spesifik) | PWA menunjukkan performa baik pada mobile; service worker meningkatkan kecepatan akses | Tidak ada pembanding native Android secara langsung; kondisi jaringan tidak dikontrol eksplisit |
| 2 | Hidayat, R. dkk. | 2023 | Analisis UI/UX + pengukuran Lighthouse Score | Prototipe e-commerce PWA lokal | Optimasi UI PWA meningkatkan Lighthouse Score di rentang 45–72; desain responsif berpengaruh pada performa | Tidak membandingkan dengan native Android; hanya satu kondisi jaringan |
| 3 | Nurwanto | 2019 | Studi penerapan PWA + analisis fitur (service worker, manifest) | Aplikasi e-commerce demo | PWA layak diterapkan pada e-commerce; offline caching membantu pengguna di jaringan tidak stabil | Tidak ada pengukuran kuantitatif FCP/TTI; bersifat deskriptif-implementatif |
| 4 | Adi, L. dkk. | 2021 | Analisis Lighthouse Score + review fitur service worker | Aplikasi Shopee (PWA versi web) | PWA Shopee menggunakan service worker secara efektif; dapat berjalan di koneksi lambat | Tidak membandingkan dengan APK native Shopee secara langsung; jaringan tidak dikontrol |
| 5 | Dewi, G.L. dkk. | 2020 | Performance Testing + Functionality Testing | Web akuntansi berbasis PWA (bukan e-commerce) | Kecepatan PWA hampir sama dengan native; UX PWA lebih baik dari native menurut pengguna | Domain bukan e-commerce; pengujian performa tidak memisahkan kondisi jaringan |
| 6 | Kurniawan, W. & Romadloni, N. dkk. | 2024 | Eksperimen pengukuran konsumsi baterai dengan/tanpa cache PWA aktif | Aplikasi Android mid-range dengan cache PWA aktif | Cache PWA secara signifikan memengaruhi konsumsi baterai; ada trade-off antara kecepatan dan daya | Tidak mengukur FCP/TTI secara eksplisit; fokus pada baterai bukan performa halaman |
 
**Pola yang terlihat — Metode dominan:** Lighthouse Score + GTmetrix sebagai alat pengukuran utama; service worker sebagai variabel kunci
**Limitasi yang berulang:** Tidak ada perbandingan langsung PWA vs native Android; kondisi jaringan tidak dikontrol; domain pengujian bukan alur e-commerce penuh (listing → detail → checkout)
 
---
 
## Latihan 2 — Gap Identification
 
| Jenis Gap | Ditemukan? | Gap Statement |
|-----------|-----------|---------------|
| Performance Gap | Ya | Studi yang ada memberikan hasil parsial: Dewi dkk. (2020) menemukan performa PWA "hampir sama" dengan native untuk web akuntansi, namun belum ada data untuk domain e-commerce transaksional |
| Method Gap | Ya | Tidak ada studi Indonesia yang menguji secara sistematis di tiga kondisi jaringan berbeda (4G, 3G, 2G) secara bersamaan dalam satu eksperimen terkontrol menggunakan FCP dan TTI |
| Data Gap | Ya | Semua studi menggunakan aplikasi yang sudah ada (Shopee, web akuntansi) atau prototipe non-transaksional; belum ada yang menggunakan prototipe e-commerce dengan alur lengkap (listing → detail → checkout) yang setara antara PWA dan native |
| Context Gap | Ya | Studi Nurwanto (2019) dan Hidayat dkk. (2023) membahas konteks Indonesia, namun tidak dalam kerangka perbandingan komparatif yang terkontrol; kondisi jaringan khas Indonesia (dominasi 3G di luar kota besar) belum disimulasikan secara eksplisit |
 
**Gap utama yang dipilih:** Method Gap + Data Gap (kombinasi dua gap = gap paling kuat)
 
**Mengapa gap ini penting:**
> Bukan sekadar "belum ada yang meneliti". Kurniawan (2020) dan Adi dkk. (2021) telah meneliti performa PWA, tetapi tanpa pembanding native Android dan tanpa kontrol kondisi jaringan. Dewi dkk. (2020) membandingkan PWA dengan native namun pada domain non-e-commerce dan tanpa throttling jaringan. Kombinasi gap ini berarti pengembang UMKM Indonesia tidak bisa mengambil keputusan berbasis data dari literatur yang ada — mereka butuh studi yang secara eksplisit mengontrol kondisi jaringan dan menggunakan domain e-commerce dengan alur transaksi nyata.
 
---
 
## Latihan 3 — Baseline Selection
 
| # | Baseline | Mengapa Relevan | Mengapa Representatif | Apakah SOTA? | Sumber |
|---|----------|----------------|----------------------|-------------|--------|
| 1 | Kurniawan, W. (2020) — Lighthouse + GTmetrix pada perangkat mobile | Task sama: mengukur performa PWA pada perangkat mobile Android menggunakan alat yang sama | Dikutip atau dijadikan acuan metodologi oleh beberapa studi PWA Indonesia berikutnya; metodologi paling lengkap untuk konteks Indonesia | State-of-the-art untuk pengukuran performa PWA mobile di Indonesia | Jurnal Ilmiah Informatika Komputer, Universitas Gunadarma, 2020 |
| 2 | Dewi, G.L. dkk. (2020) — Performance Testing PWA vs native | Satu-satunya studi Indonesia yang membandingkan performa PWA dengan native secara langsung, meski domain berbeda | Representatif sebagai titik awal perbandingan; temuan "hampir sama" menjadi hipotesis awal yang perlu diuji di domain e-commerce | Terbaru yang melakukan perbandingan PWA vs native di Indonesia | Teknika, Vol. 9 No. 1, 2020 (SINTA-3) |
 
**Apakah pemilihan baseline ini bisa dianggap straw man?** Tidak
> Justifikasi: Kedua baseline dipilih karena metodologi dan relevansinya, bukan karena hasilnya lemah. Kurniawan (2020) adalah studi performa PWA mobile Indonesia yang paling lengkap secara metodologi; Dewi dkk. (2020) adalah satu-satunya yang melakukan perbandingan PWA vs native. Keduanya state-of-the-art di kelasnya masing-masing dalam konteks literatur Indonesia.
 
---
 
## Refleksi
 
> "Belum ada yang meneliti ini" adalah klaim yang lemah jika tanpa bukti pencarian. Gap yang valid harus didukung oleh hasil pencarian yang terdokumentasi dan penjelasan mengapa gap itu penting secara praktis. Di riset ini, gap dibuktikan dengan tabel literatur yang menunjukkan pola limitasi berulang: Kurniawan (2020) tanpa pembanding native; Adi dkk. (2021) tanpa kontrol jaringan; Dewi dkk. (2020) domain bukan e-commerce. Pola ini — bukan sekadar pernyataan — yang membuktikan gap riset ada dan perlu diisi.
 
---
