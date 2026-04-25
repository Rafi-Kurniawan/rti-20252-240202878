# Worksheet WS-01
**Mata Kuliah:** Reset Teknologi Informasi 
**Topik:** Perbandingan Performa Progressive Web App (PWA) vs Native Android dalam Konteks Aplikasi E-Commerce pada Jaringan Rendah  
**Nama:** Rafi Kurniawan 
**NIM:** 240202878
**Tanggal:** 6 April 2026
 
--- 
 
# WS-01 — Distorsi & Paradigma
 
## A.1 — Research Mindset Self-Assessment
 
---
Nama Peneliti    : Rafi Kurniawan
Tanggal          : 6 April 2026
 
1. Ketika membaca klaim "PWA 40% lebih cepat dari Native App":
   - Pertanyaan pertama saya:
     Diukur menggunakan metrik apa? First Contentful Paint, Time to Interactive,
     atau hanya persepsi subjektif pengguna? Di kondisi jaringan seperti apa?
   - Data yang dibutuhkan untuk verifikasi:
     Benchmark Lighthouse, hasil Webpagetest, kondisi jaringan (4G/3G/2G),
     spesifikasi perangkat yang digunakan, dan ukuran dataset/payload aplikasi.
 
2. Posisi paradigma:
   - Pendekatan: [x] Positivis  [ ] Interpretivis  [ ] Design Science  [ ] Mixed
   - Alasan: Pertanyaan riset bersifat kuantitatif dan dapat diukur secara
     objektif menggunakan metrik standar performa (load time, FCP, TTI).
     Eksperimen dapat dikontrol dan direplikasi oleh peneliti lain.
 
3. Identifikasi distorsi:
   - Asumsi tersembunyi:
     (a) PWA dan Native App dianggap setara dalam fitur yang diuji.
     (b) Pengguna memiliki perangkat Android dengan spesifikasi menengah.
   - Sumber bias potensial:
     (a) Pemilihan kondisi jaringan yang terlalu ideal (hanya Wi-Fi).
     (b) Dataset produk e-commerce yang tidak representatif (terlalu sedikit item).
   - Langkah mitigasi:
     Simulasikan beberapa kondisi jaringan (4G, 3G, 2G) menggunakan Chrome
     DevTools throttling. Gunakan dataset produk minimal 100 item.
 
4. Komitmen etika:
   - Data yang tidak akan dimanipulasi:
     Hasil benchmark performa — tidak akan memilih kondisi pengujian yang hanya
     menguntungkan salah satu platform.
   - Batasan yang diakui sejak awal:
     Pengujian hanya pada perangkat Android mid-range, tidak mencakup iOS.
     Aplikasi yang dibangun adalah prototipe, bukan produk produksi penuh.
---
 
## Latihan 1 — Identifikasi Distorsi
 
**Paper yang dipilih:**
> Judul: "Performance Analysis of Progressive Web Apps vs Native Mobile Apps"  
> Penulis (Tahun): Biørn-Hansen et al. (2021)
 
| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | Ukur load time PWA dan native app menggunakan Lighthouse di jaringan Wi-Fi | Hanya menggunakan Wi-Fi — tidak representatif pengguna mobile nyata yang sering di jaringan 3G/2G |
| Data → Processing | Rata-rata 5 kali pengukuran Lighthouse score | Pengukuran terlalu sedikit; outlier dari cache browser dapat memengaruhi rata-rata |
| Processing → Analysis | Bandingkan skor Lighthouse (0–100) antar platform | Skor Lighthouse adalah proxy — tidak langsung mencerminkan pengalaman pengguna nyata |
| Analysis → Inference | Simpulkan PWA "lebih ringan" dari native | Confounding: aplikasi native yang diuji mungkin lebih feature-rich, sehingga perbandingan tidak apple-to-apple |
| Inference → Knowledge | Dipublikasikan sebagai panduan pemilihan platform | Generalisasi berlebihan — kesimpulan berlaku untuk satu jenis aplikasi saja |
 
**Distorsi paling besar di tahap:** Analysis → Inference (confounding variable: perbedaan fitur antar aplikasi yang dibandingkan)
 
**Dua distorsi spesifik yang teridentifikasi:**
1. Pengujian hanya di Wi-Fi — tidak mencerminkan kondisi jaringan pengguna Indonesia yang rata-rata menggunakan data seluler dengan kecepatan bervariasi.
2. Aplikasi native yang dijadikan pembanding memiliki lebih banyak fitur dibanding PWA yang diuji, sehingga perbandingan performa tidak adil.
## Latihan 2 — Analisis Kasus Etika
 
Skenario: Peneliti menemukan bahwa jika 3 pengukuran outlier (sesi di mana perangkat sedang throttle CPU) dihapus, hasil benchmark PWA menjadi 28% lebih cepat. Dengan outlier, keunggulan hanya 11%.
 
| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | Laporkan kedua versi hasil — dengan dan tanpa outlier. Sertakan penjelasan teknis mengapa outlier terjadi (CPU throttle) dan biarkan pembaca menilai. |
| Transparansi | Dokumentasikan kondisi pengujian secara lengkap: suhu perangkat, battery level, aplikasi lain yang berjalan. Jadikan bagian dari metodologi yang dapat direplikasi. |
| Peer review | Reviewer berhak meminta analisis sensitivitas. Jika hasil berubah drastis saat 3 data point dihapus, ini justru menunjukkan temuan tidak robust dan perlu pengujian lebih lanjut. |
 
**Keputusan akhir dan justifikasi:**
> Laporkan kedua versi (dengan dan tanpa outlier) dalam laporan utama. Tambahkan justifikasi teknis bahwa outlier disebabkan CPU throttling yang terdeteksi — bukan measurement error biasa. Ini lebih jujur dan memberikan informasi yang lebih kaya kepada pembaca.
 
## Latihan 3 — Posisi Paradigma
 
**Topik riset:** Perbandingan performa PWA vs Native Android pada aplikasi e-commerce di kondisi jaringan rendah
 
| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | **5** | 1 | 3 |
| Jenis data yang dikumpulkan | Load time (ms), FCP (ms), TTI (ms), bundle size (KB) — semua terukur objektif | Persepsi, pengalaman pengguna — tidak relevan untuk pertanyaan performa teknis ini | Bangun PWA dan native app sebagai artefak, lalu ukur — layak tapi kontribusi lebih ke engineering |
| Limitasi paradigma | Hasil terikat pada spesifikasi perangkat dan kondisi jaringan yang digunakan dalam eksperimen | Tidak applicable — topik bukan studi pengalaman manusia | Risiko: fokus bergeser ke "membuat yang terbaik" bukan "menjawab pertanyaan riset" |
 
**Paradigma yang dipilih:** Positivis  
**Alasan:** Pertanyaan riset bersifat komparatif dan kuantitatif penuh. Semua variabel (load time, FCP, TTI, ukuran paket jaringan) dapat diukur secara objektif dengan alat standar (Lighthouse, Chrome DevTools, WebPageTest). Eksperimen dapat dirancang terkontrol dan direplikasi.
 
## Refleksi
 
> Sebelum membaca materi ini, saya mungkin langsung percaya klaim "PWA 40% lebih cepat" tanpa bertanya: diukur di jaringan apa? Dengan perangkat apa? Dibanding aplikasi native yang sekompleksitas apa? Setelah memahami rantai distorsi, pertanyaan yang sekarang akan diajukan saat membaca paper adalah: (1) Apa metrik spesifik yang digunakan? (2) Apakah kondisi pengujian dikontrol secara adil untuk kedua platform? (3) Apakah hasilnya bisa direplikasi dengan alat yang tersedia?
 
---
