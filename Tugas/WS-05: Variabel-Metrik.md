# WS-05 — Variabel & Metrik
 
## A.5 — Variable & Metric Definition
 
```
VARIABLE & METRIC DEFINITION
 
Research Question:
  Apakah Progressive Web App (PWA) menghasilkan First Contentful Paint (FCP)
  dan Time to Interactive (TTI) yang lebih rendah dibandingkan native Android
  pada prototipe aplikasi e-commerce dengan 50 produk yang diuji pada simulasi
  jaringan 3G (1.5 Mbps) menggunakan Chrome DevTools throttling?
 
| Variabel          | Tipe | Konsep                        | Metrik                        | Skala  | Satuan | Cara Mengukur                                        | Justifikasi                                                                              |
|-------------------|------|-------------------------------|-------------------------------|--------|--------|------------------------------------------------------|------------------------------------------------------------------------------------------|
| Jenis Platform    | IV   | Pendekatan rendering aplikasi | Kategorikal: PWA vs Native    | Nominal| —      | Menjalankan dua versi: PWA via Chrome Mobile, Native | Ini adalah perlakuan yang dimanipulasi; satu-satunya perbedaan yang disengaja antar grup  |
|                   |      |                               | Android (React Native APK)    |        |        | Android via APK                                      |                                                                                          |
| First Contentful  | DV   | Kecepatan rendering awal      | FCP dalam milidetik (ms)      | Ratio  | ms     | Lighthouse CLI, dijalankan 10x per kondisi jaringan  | FCP adalah metrik standar industri (Web Vitals Google) untuk mengukur persepsi           |
| Paint (FCP)       |      | halaman                       |                               |        |        | dengan throttling 3G (1.5 Mbps down)                 | kecepatan loading awal pengguna; langsung menjawab RQ                                    |
| Time to           | DV   | Kecepatan halaman siap        | TTI dalam milidetik (ms)      | Ratio  | ms     | Lighthouse CLI, kondisi pengujian sama dengan FCP    | TTI mengukur kapan pengguna benar-benar bisa berinteraksi, bukan hanya melihat           |
| Interactive (TTI) |      | digunakan pengguna            |                               |        |        |                                                      | konten — lebih relevan untuk konteks e-commerce (checkout, klik produk)                  |
| Lighthouse Score  | DV   | Performa keseluruhan          | Skor 0–100 (komposit Lighthouse)| Ratio| skor   | Lighthouse CLI — dihitung otomatis dari FCP, TTI,    | Memberikan gambaran holistik performa; digunakan sebagai secondary metric untuk           |
| (secondary)       |      | aplikasi                      |                               |        |        | Speed Index, dan metrik lainnya                      | konfirmasi tren FCP dan TTI                                                              |
| Kondisi Jaringan  | CV   | Bandwidth koneksi internet    | Preset throttling Chrome:     | Ordinal| —      | Chrome DevTools Network Throttling — dikunci di      | Kondisi jaringan adalah confounding variable utama; harus dikontrol ketat agar           |
|                   |      |                               | 4G / 3G / 2G                  |        |        | setting yang sama untuk semua sesi pengujian         | perbedaan FCP/TTI benar-benar berasal dari perbedaan platform, bukan jaringan            |
| Spesifikasi       | CV   | Kemampuan hardware perangkat  | RAM 4 GB, CPU mid-range       | Nominal| —      | Satu perangkat fisik digunakan untuk semua sesi;     | Perbedaan hardware memengaruhi rendering — dikontrol dengan satu perangkat agar          |
| Perangkat         |      |                               | (Snapdragon 680 atau setara)  |        |        | tidak diganti selama eksperimen                      | tidak menjadi variabel perancu                                                            |
| Ukuran Dataset    | CV   | Jumlah konten yang dimuat     | 50 produk, masing-masing      | Ratio  | item / | Prototipe dibangun dengan data produk yang sama      | Dataset yang berbeda antar platform akan membuat perbandingan tidak valid                 |
| Produk            |      | aplikasi                      | dengan gambar 150 KB          | KB     | KB     | persis untuk PWA dan native                          | (apple-to-apple comparison)                                                              |
 
Alignment Check:
  RQ → Concept → Variable → Metric → Data → Result
  [x] Setiap langkah terdokumentasi
  [x] Tidak ada "lompatan logis"
  [x] Metrik mengukur apa yang dimaksud (construct validity)
```
 
---
 
## Latihan 1 — Operationalization Chain
 
**RQ:** Apakah PWA menghasilkan FCP dan TTI lebih rendah dari native Android pada prototipe e-commerce (50 produk) di simulasi jaringan 3G menggunakan Chrome DevTools?
 
| Variabel | Tipe | Konsep Abstrak | Metrik Konkret | Skala (NOIR) | Satuan |
|----------|------|----------------|----------------|-------------|--------|
| Jenis Platform | IV | Pendekatan teknologi rendering aplikasi mobile | Kategorikal: PWA (Chrome Mobile) vs Native Android (React Native APK) | Nominal | — |
| First Contentful Paint (FCP) | DV | Kecepatan tampilnya elemen pertama yang bermakna di layar | FCP diukur dalam milidetik via Lighthouse CLI | Ratio | ms |
| Time to Interactive (TTI) | DV | Waktu hingga halaman sepenuhnya siap untuk interaksi pengguna | TTI diukur dalam milidetik via Lighthouse CLI | Ratio | ms |
| Lighthouse Performance Score | DV (secondary) | Performa keseluruhan aplikasi secara komposit | Skor 0–100 dari Lighthouse | Ratio | skor |
| Kondisi Jaringan | CV | Kecepatan bandwidth koneksi internet | Preset throttling Chrome DevTools: 3G (1.5 Mbps down, 750 Kbps up, 40ms RTT) | Ordinal | — |
| Spesifikasi Perangkat | CV | Kemampuan hardware yang menjalankan aplikasi | Satu perangkat Android mid-range (RAM 4 GB, Snapdragon 680) | Nominal | — |
| Dataset Produk | CV | Jumlah dan ukuran konten yang dimuat | 50 produk dengan gambar masing-masing 150 KB, payload JSON produk identik | Ratio | item / KB |
 
**Apakah ada lompatan logis dalam rantai?** Tidak
 
> Setiap variabel terhubung langsung ke RQ: IV (platform) adalah perlakuan yang dibandingkan, DV (FCP dan TTI) adalah metrik yang diukur sebagai jawaban RQ, dan CV (jaringan, perangkat, dataset) dikontrol agar perbandingan valid. Tidak ada konsep abstrak yang belum dioperasionalisasikan.
 
---
 
## Latihan 2 — Evaluasi Metrik
 
**Metrik DV yang dievaluasi: First Contentful Paint (FCP) dan Time to Interactive (TTI)**
 
| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Representative | 5 | FCP dan TTI adalah bagian dari Google Core Web Vitals — standar industri yang diakui secara global untuk mengukur pengalaman loading pengguna. FCP merepresentasikan persepsi kecepatan awal; TTI merepresentasikan kapan halaman benar-benar siap digunakan — keduanya sangat relevan untuk konteks e-commerce. |
| Sensitive | 4 | FCP dan TTI cukup sensitif mendeteksi perbedaan antar kondisi jaringan (perubahan 200–500 ms terlihat jelas di Lighthouse). Satu catatan: pada kondisi 4G dengan perangkat kencang, keduanya bisa mencapai ceiling effect (FCP < 500 ms) sehingga perbedaan antar platform menjadi tidak signifikan — inilah mengapa pengujian di 3G lebih relevan untuk gap detection. |
| Feasible | 5 | Lighthouse CLI tersedia gratis, open source, dapat dijalankan secara otomatis via command line, dan menghasilkan output JSON yang mudah diproses. Chrome DevTools throttling tidak memerlukan hardware tambahan. |
 
**Apakah perlu secondary metric?** Ya
 
> Lighthouse Performance Score digunakan sebagai secondary metric karena merupakan skor komposit yang mencakup FCP, TTI, Speed Index, dan Cumulative Layout Shift. Fungsinya: konfirmasi bahwa tren FCP/TTI konsisten dengan gambaran performa keseluruhan, dan sebagai referensi perbandingan dengan studi sebelumnya (Biørn-Hansen, Wahyudianto) yang juga menggunakan Lighthouse Score.
 
**Contoh kasus ceiling effect untuk metrik ini:**
 
> Jika pengujian dilakukan di jaringan 4G dengan perangkat high-end, FCP bisa mencapai 300–400 ms untuk keduanya (PWA dan native). Pada titik ini, perbedaan antar platform menjadi tidak terdeteksi secara statistik meskipun ada perbedaan arsitektur yang signifikan. Itulah mengapa fokus pengujian ditetapkan di jaringan 3G — kondisi di mana perbedaan masih cukup besar untuk ditangkap oleh alat pengukuran.
 
---
 
## Latihan 3 — Data Quality Check
 
| Dimensi | Pertanyaan | Jawaban | Strategi Mitigasi |
|---------|-----------|---------|------------------|
| Completeness | Apakah semua data point terkumpul? | Potensi data hilang jika Lighthouse gagal menyelesaikan pengukuran karena timeout jaringan, terutama di simulasi 2G | Jalankan 10 pengukuran per kondisi; jika ada kegagalan (timeout atau error), catat alasannya dan ganti dengan sesi ulang yang valid. Threshold minimum: 8 pengukuran sukses per kondisi |
| Consistency | Apakah ada kontradiksi internal? | FCP tidak mungkin lebih besar dari TTI — jika terjadi, data tersebut corrupt | Validasi otomatis: setelah setiap sesi Lighthouse, cek apakah FCP ≤ TTI. Jika tidak, tandai sesi tersebut sebagai invalid dan ulangi |
| Validity | Apakah benar-benar mengukur yang dimaksud? | Lighthouse mengukur performa di lingkungan Chrome headless, yang mungkin berbeda dari penggunaan pengguna nyata | Tambahkan sesi pengujian manual (real-user simulation) sebagai cross-check untuk minimal 5 sesi — bandingkan apakah tren manual konsisten dengan Lighthouse |
| Representativeness | Apakah sampel mewakili populasi target? | Pengujian pada satu perangkat tidak merepresentasikan keragaman perangkat Android mid-range di Indonesia | Akui keterbatasan ini secara eksplisit di bagian limitasi penelitian. Untuk mitigasi parsial, pilih perangkat dengan spesifikasi yang paling umum di segmen mid-range Indonesia (berdasarkan data StatCounter atau laporan GSMA) |
 
---
 
## Refleksi
 
> Memilih metrik setelah melihat data dianggap **p-hacking** karena peneliti secara tidak sadar (atau sengaja) memilih metrik yang menghasilkan hasil yang diinginkan, bukan metrik yang paling representatif untuk menjawab RQ. Ini adalah bentuk bias konfirmasi yang terstruktur secara statistik — angkanya valid, tapi kerangka pengujiannya tidak.
 
> Perbedaan dengan eksplorasi data yang sah: eksplorasi boleh menemukan pola baru *setelah* melihat data, tetapi harus dilabeli eksplisit sebagai **exploratory findings**, bukan konfirmasi hipotesis. Temuan eksploratoris tidak boleh diuji dengan α = 0.05 yang sama dengan hipotesis utama — mereka memerlukan studi konfirmasi terpisah. Dalam riset ini, jika selama analisis ditemukan bahwa bundle size juga berkorelasi dengan FCP, itu boleh dilaporkan sebagai temuan eksploratoris, bukan primary result.
 
---
