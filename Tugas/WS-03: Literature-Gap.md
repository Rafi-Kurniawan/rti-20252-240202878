# WS-03 — Literature Mapping & Gap
 
## Template A.3 — Literature Mapping & Gap Identification
 
```
LITERATURE MAPPING
 
Topik      : Perbandingan performa PWA vs Native Android — E-Commerce
Database   : Google Scholar, IEEE Xplore, ACM Digital Library
Query      : ("Progressive Web App" OR "PWA") AND ("native app" OR "native Android")
             AND ("performance" OR "load time" OR "Lighthouse") AND ("e-commerce"
             OR "mobile commerce")
Tahun      : 2019–2024
Hasil awal : 47 paper → Screening judul & abstrak → 12 paper relevan → 
             Baca penuh → 6 paper final digunakan
```
 
## Latihan 1 — Concept-Centric Literature Table
 
**Topik riset:** Perbandingan performa PWA vs Native Android pada e-commerce  
**Query pencarian:** `"Progressive Web App" "native app" performance comparison e-commerce`  
**Database:** Google Scholar, IEEE Xplore
 
| # | Study | Tahun | Method | Dataset | Result | Limitasi |
|---|-------|-------|--------|---------|--------|----------|
| 1 | Biørn-Hansen et al. | 2021 | Benchmark (Lighthouse, WebPageTest) | 3 aplikasi demo (tidak spesifik e-commerce) | PWA unggul di FCP; native unggul di animasi kompleks | Hanya Wi-Fi; bukan konteks e-commerce |
| 2 | Malavolta et al. | 2020 | Eksperimen terkontrol, energy & performance | 6 pasang PWA–native dari GitHub | Native lebih hemat energi; PWA lebih ringan data | Bukan domain e-commerce; perangkat lama |
| 3 | Tandel & Jamadar | 2018 | Survei & analisis fitur | Literatur sekunder | PWA cocok untuk mid-range device | Tidak ada pengukuran empiris, hanya deskriptif |
| 4 | Pantelić & Šendelj | 2022 | Benchmark FCP/TTI via Chrome DevTools | Aplikasi news (bukan e-commerce) | PWA 18% lebih cepat FCP di 3G | Dataset kecil; satu domain saja |
| 5 | Wahyudianto et al. | 2023 | Komparasi Lighthouse score | Aplikasi e-commerce lokal Indonesia (Tokopedia-like) | Native unggul di score keseluruhan | Tidak memisahkan kondisi jaringan; satu perangkat |
| 6 | Raj & Tolety | 2019 | UX + performance test | 2 aplikasi retail | PWA diterima baik pengguna; performa hampir setara | Fokus UX, bukan performa teknis; jaringan tidak dikontrol |
 
**Pola yang terlihat — Metode dominan:** Lighthouse benchmark + Chrome DevTools throttling  
**Limitasi yang berulang:** Tidak mengontrol kondisi jaringan secara sistematis (hanya Wi-Fi atau satu kondisi jaringan); tidak spesifik ke domain e-commerce; dataset aplikasi yang diuji terlalu sederhana
 
## Latihan 2 — Gap Identification
 
| Jenis Gap | Ditemukan? | Gap Statement |
|-----------|-----------|---------------|
| Performance Gap | Ya | Hasil performa PWA vs native masih inkonsisten di berbagai studi — beberapa menunjukkan PWA unggul, beberapa native unggul — bergantung kondisi yang tidak dikontrol |
| Method Gap | Ya | Belum ada studi yang menguji secara sistematis di tiga kondisi jaringan berbeda (4G, 3G, 2G) secara bersamaan dalam satu eksperimen terkontrol |
| Data Gap | Ya | Semua studi menggunakan aplikasi demo generik atau non-e-commerce; belum ada yang menggunakan prototipe aplikasi e-commerce dengan alur nyata (listing produk → detail → checkout) |
| Context Gap | Ya | Tidak ada studi yang berfokus pada konteks Indonesia — padahal kondisi jaringan dan spesifikasi perangkat dominan di Indonesia berbeda dari negara maju |
 
**Gap utama yang dipilih:** Method Gap + Context Gap (kombinasi dua gap = gap paling kuat)
 
**Mengapa gap ini penting:**
> Bukan sekadar "belum ada yang meneliti". Keputusan pemilihan platform (PWA vs native) di Indonesia berdampak langsung pada biaya pengembangan UMKM — perbedaan yang bisa mencapai 3–5x lipat. Tanpa data empiris yang dikontrol per kondisi jaringan dan relevan untuk konteks Indonesia, pengembang tidak memiliki dasar keputusan yang valid. Studi yang ada tidak bisa diaplikasikan langsung karena kondisi jaringan dan perangkat yang berbeda signifikan.
 
## Latihan 3 — Baseline Selection
 
| # | Baseline | Mengapa Relevan | Mengapa Representatif | Apakah SOTA? | Sumber |
|---|----------|----------------|----------------------|-------------|--------|
| 1 | Biørn-Hansen et al. (2021) — Lighthouse benchmark PWA vs native | Task sama: membandingkan performa PWA dan native secara teknis dengan alat yang sama | Digunakan atau dikutip oleh 4 dari 6 paper dalam tabel literatur; metodologi paling lengkap | State-of-the-art untuk benchmark PWA vs native secara umum | IEEE Xplore, 2021 |
| 2 | Pantelić & Šendelj (2022) — FCP/TTI di kondisi 3G | Satu-satunya studi yang menguji di kondisi 3G — paling relevan dengan variabel jaringan | Representatif sebagai titik awal; walau domain berbeda, metode pengukuran sama | Terbaru yang menguji throttling jaringan untuk PWA | ICIST Proceedings, 2022 |
 
**Apakah pemilihan baseline ini bisa dianggap straw man?** Tidak  
> Justifikasi: Kedua baseline dipilih karena metodologi dan relevansinya, bukan karena hasilnya lemah. Biørn-Hansen adalah benchmark paling rigorous yang tersedia; Pantelić adalah satu-satunya yang menguji kondisi jaringan. Keduanya state-of-the-art di kelasnya masing-masing.
 
## Refleksi
 
> "Belum ada yang meneliti ini" adalah klaim yang lemah jika tanpa bukti pencarian. Gap yang valid harus didukung oleh hasil pencarian yang terdokumentasi (query, database, jumlah hasil) dan penjelasan *mengapa* gap itu penting secara praktis. Di riset ini, gap dibuktikan dengan tabel literatur yang menunjukkan pola limitasi berulang (kondisi jaringan tidak dikontrol, konteks bukan e-commerce Indonesia) — bukan sekadar pernyataan bahwa topik ini belum pernah disentuh.
 
---
