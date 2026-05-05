# WS-06 — System-Experiment Mapping
 
## A.6 — Mapping RQ ke Arsitektur Sistem
 
```
SYSTEM-EXPERIMENT MAPPING
 
Research Question:
  Apakah Progressive Web App (PWA) menghasilkan FCP dan TTI yang lebih rendah
  dibandingkan native Android pada prototipe aplikasi e-commerce (50 produk)
  yang diuji pada simulasi jaringan 3G menggunakan Chrome DevTools throttling?
 
Variable → Component Mapping:
| Variabel             | Tipe | Komponen Sistem                          | Cara Manipulasi / Pengukuran                                               |
|----------------------|------|------------------------------------------|----------------------------------------------------------------------------|
| Jenis Platform       | IV   | Dua modul aplikasi terpisah:             | Diswap per sesi pengujian: satu sesi jalankan PWA, sesi berikutnya native. |
|                      |      | (1) PWA — React + Vite + Service Worker  | Dikontrol via config file: platform: "pwa" | "native"                   |
|                      |      | (2) Native Android — React Native APK    |                                                                            |
| FCP dan TTI          | DV   | Modul pengukuran: Lighthouse CLI +       | Diukur otomatis setiap sesi via script runner. Output: JSON per sesi,      |
|                      |      | script runner otomatis (Node.js)         | berisi FCP (ms), TTI (ms), Lighthouse Score. Disimpan ke /results/*.json   |
| Lighthouse Score     | DV   | Lighthouse CLI (secondary)               | Diekstrak dari output JSON yang sama dengan FCP/TTI                        |
| Kondisi Jaringan     | CV   | Chrome DevTools Throttling Profile       | Dikunci di config: network: "3G" | "4G" | "2G". Tidak diubah              |
|                      |      |                                          | di tengah sesi. Diverifikasi sebelum setiap batch pengukuran.              |
| Spesifikasi Perangkat| CV   | Perangkat fisik tunggal (tidak diganti)  | Perangkat dikunci. Battery ≥ 50% sebelum sesi. Tidak ada aplikasi lain     |
|                      |      |                                          | berjalan di background (verified via adb shell).                            |
| Dataset Produk       | CV   | Modul data: JSON produk + aset gambar    | Data di-host di server lokal yang sama untuk PWA dan native.               |
|                      |      | (identik untuk PWA dan native)           | Tidak ada perubahan data antar sesi.                                        |
 
4 Prinsip Desain:
  [x] Traceability     — Setiap komponen sistem berlabel variabel (IV/DV/CV)
  [x] Variable Isolation — Platform (IV) bisa diswap via config tanpa mengubah
                           data, jaringan, atau perangkat (CV)
  [x] Measurement Integration — Lighthouse CLI terintegrasi sebagai modul
                                 pengukuran otomatis, bukan proses manual
  [x] Reproducibility  — Semua config (platform, jaringan, dataset) disimpan
                          di YAML; setup dapat direkonstruksi dari file config
 
Experimental Setup:
  Input data     : 50 produk e-commerce (nama, deskripsi, harga, gambar 150 KB)
                   di-host via server Express.js lokal (localhost:3000)
  Parameter      : platform = {pwa | native}, network = {4G | 3G | 2G},
                   runs = 10, lighthouse_preset = mobile
  Output format  : JSON per sesi → CSV agregat (FCP_ms, TTI_ms, score, platform,
                   network, run_id, timestamp)
```
 
---
 
## Latihan 1 — Variable-to-Component Mapping
 
**RQ:** Apakah PWA menghasilkan FCP dan TTI lebih rendah dari native Android pada prototipe e-commerce (50 produk) di simulasi jaringan 3G?
 
| Variabel | Tipe | Komponen Sistem | Cara Manipulasi / Pengukuran |
|----------|------|-----------------|------------------------------|
| Jenis Platform | IV | Modul aplikasi ganda: (1) PWA dibangun dengan React + Vite + Service Worker, di-deploy sebagai static site; (2) Native Android dibangun dengan React Native, dikompilasi menjadi APK | Diswap via config file `experiment.yaml` (field `platform: pwa | native`). Tidak perlu mengubah kode sumber antara sesi — hanya mengganti target URL (PWA) atau membuka APK (native) |
| First Contentful Paint (FCP) | DV | Modul Lighthouse CLI + automation script (Node.js `run_benchmark.js`) | Diukur otomatis: script menjalankan Lighthouse 10x per sesi, menyimpan output JSON, mengekstrak nilai FCP dari field `firstContentfulPaint.numericValue` |
| Time to Interactive (TTI) | DV | Modul Lighthouse CLI (sama dengan FCP) | Diekstrak dari field `interactive.numericValue` di output JSON yang sama |
| Lighthouse Performance Score | DV (secondary) | Lighthouse CLI | Diekstrak dari field `categories.performance.score` (dikalikan 100) |
| Kondisi Jaringan | CV | Chrome DevTools Throttling Profile (diakses via Lighthouse CLI flag `--throttling-method devtools`) | Dikunci via config `network: "3G"`. Preset 3G: 1.5 Mbps down, 750 Kbps up, 40ms RTT. Diverifikasi tiap batch via `chrome://inspect` |
| Spesifikasi Perangkat | CV | Perangkat Android fisik tunggal (Redmi Note 11 — Snapdragon 680, RAM 4 GB) | Tidak diganti selama eksperimen. SOP sebelum sesi: baterai ≥ 50%, mode pesawat dimatikan, semua aplikasi background ditutup via `adb shell am kill-all` |
| Dataset Produk | CV | Express.js API server (localhost:3000) yang melayani data JSON identik untuk PWA dan native | Data tidak berubah antar sesi. Gambar produk dikompres ke 150 KB sebelum eksperimen dan tidak dimodifikasi. Server dijalankan di laptop yang sama (localhost) untuk mengeliminasi latensi jaringan eksternal |
 
**Apakah semua variabel bisa di-map?** Ya
 
> Setiap variabel memiliki komponen sistem yang konkret dan cara manipulasi atau pengukuran yang spesifik. Tidak ada variabel yang "mengambang" tanpa representasi arsitektur.
 
---
 
## Latihan 2 — 4 Prinsip Desain
 
| Prinsip | Status | Bukti / Penjelasan |
|---------|--------|-------------------|
| Traceability | ✅ | Setiap komponen sistem diberi label variabel. Contoh: `run_benchmark.js` berlabel "DV collector"; `experiment.yaml` berlabel "IV + CV config". Dokumentasi arsitektur menyertakan diagram yang memetakan komponen ke variabel riset. |
| Modularity | ✅ | IV (platform) diswap via satu baris config tanpa mengubah modul pengukuran, data server, atau setting jaringan. PWA dan native menggunakan endpoint API yang sama (`/api/products`) sehingga data layer tidak perlu diubah saat berganti platform. |
| Controllability | ✅ | Semua CV dieksternalisasi ke `experiment.yaml`: kondisi jaringan, jumlah run, spesifikasi dataset, dan versi Lighthouse yang digunakan. Tidak ada parameter yang di-hardcode di skrip. Siapapun yang mengkloning repositori dan menjalankan `npm run experiment` akan mendapatkan setup yang identik. |
| Measurability | ⚠️ Parsial | Pengukuran FCP dan TTI sudah otomatis. Namun pengukuran kondisi perangkat (suhu CPU, battery level) masih manual — harus dicatat oleh peneliti sebelum setiap sesi. Ini adalah kelemahan yang diakui: solusinya adalah menambahkan skrip `adb shell dumpsys battery` yang berjalan otomatis sebelum setiap sesi Lighthouse. |
 
**Prinsip yang paling sulit dipenuhi:** Measurability (pengukuran kondisi perangkat)
 
**Strategi untuk mengatasinya:**
 
> Tambahkan pre-run script yang otomatis membaca status perangkat via ADB sebelum setiap sesi Lighthouse: battery level (`adb shell dumpsys battery | grep level`), CPU frequency (`adb shell cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq`), dan suhu baterai. Data ini disimpan ke file log yang sama dengan output Lighthouse sehingga bisa digunakan untuk mendeteksi sesi yang dilakukan dalam kondisi perangkat tidak ideal (misalnya baterai < 20% atau CPU throttling akibat panas berlebih).
 
---
 
## Latihan 3 — Ablation Study Planning
 
Sistem eksperimen ini memiliki tiga komponen utama yang bisa diisolasi: **(A) Service Worker / Offline Cache** (khusus PWA), **(B) Network Throttling** (kondisi jaringan yang disimulasikan), dan **(C) Image Optimization** (gambar produk dikompresi ke 150 KB).
 
| Kondisi | Komponen A: Service Worker (PWA) | Komponen B: Network Throttling | Komponen C: Image Optimization | Hasil yang Diharapkan |
|---------|----------------------------------|-------------------------------|-------------------------------|----------------------|
| Full |  Aktif |  3G preset |  Gambar 150 KB | Baseline penuh — kondisi eksperimen utama |
| – A |  Service Worker dinonaktifkan |  3G preset |  Gambar 150 KB | FCP PWA meningkat signifikan — membuktikan kontribusi caching service worker terhadap performa |
| – B |  Aktif |  Tanpa throttling (koneksi penuh) |  Gambar 150 KB | FCP dan TTI keduanya turun drastis, perbedaan antar platform mengecil — membuktikan bahwa kondisi jaringan adalah variabel kritis |
| – C |  Aktif |  3G preset |  Gambar original (~500 KB) | FCP meningkat signifikan di kedua platform — membuktikan bahwa ukuran gambar adalah bottleneck utama di jaringan lambat |
 
**Komponen yang diprediksi paling berkontribusi terhadap perbedaan performa:** Komponen B (Network Throttling)
 
**Mengapa:**
 
> Kondisi jaringan adalah faktor yang paling langsung memengaruhi FCP dan TTI — karena setiap byte yang ditransfer (HTML, CSS, JS, gambar) harus melalui koneksi yang di-throttle. Ketika throttling dimatikan (kondisi – B), perbedaan antar platform diprediksi mengecil drastis karena bandwidth bukan lagi bottleneck. Ini konsisten dengan temuan Pantelić & Šendelj (2022) yang menunjukkan bahwa gap performa PWA vs native paling terlihat di kondisi 3G dibanding Wi-Fi. Service Worker (Komponen A) juga penting, tetapi hanya relevan untuk kunjungan kedua dan seterusnya (setelah cache terisi) — pada pengujian fresh load (cache cleared), kontribusinya minimal.
 
---
 
## Refleksi
 
> Risiko membangun sistem seperti produk monolitik baru kemudian melakukan eksperimen adalah **hilangnya isolasi variabel**. Sistem monolitik menggabungkan banyak komponen tanpa batas yang jelas — ketika hasilnya berbeda antar platform, tidak bisa ditentukan apakah perbedaan itu berasal dari platform itu sendiri, dari perbedaan implementasi fitur, dari perbedaan data yang di-load, atau dari optimasi yang hanya diterapkan di satu platform.
 
> Arsitektur modular penting untuk riset karena memungkinkan **ablation study** yang valid: satu komponen bisa dilepas atau diganti tanpa memengaruhi komponen lain. Ini adalah satu-satunya cara untuk mengklaim kausalitas — bukan sekadar korelasi — antara perlakuan (platform) dan hasil (FCP/TTI). Dalam penelitian ini, jika sistem dibangun monolitik, kita tidak bisa memisahkan apakah perbedaan FCP disebabkan oleh arsitektur PWA itu sendiri atau oleh fakta bahwa Service Worker di-cache secara berbeda dari native cache. Modularitas membuat klaim kausal menjadi defensible.
 
---
