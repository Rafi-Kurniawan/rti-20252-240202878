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
     Diukur menggunakan metrik apa? Lighthouse Performance Score, First Contentful
     Paint, atau hanya persepsi subjektif pengguna? Di kondisi jaringan seperti apa?
     Kurniawan (2020) menggunakan GTmetrix dan Lighthouse — apakah studi yang
     mengklaim "40% lebih cepat" menggunakan alat yang sama?
   - Data yang dibutuhkan untuk verifikasi:
     Skor Lighthouse dan GTmetrix, kondisi jaringan (4G/3G/2G), spesifikasi perangkat
     Android yang digunakan, ukuran cache service worker, dan apakah PWA menerapkan
     offline caching (seperti yang dibahas Dewi dkk., 2020 pada web akuntansi).
2. Posisi paradigma:
   - Pendekatan: [x] Positivis  [ ] Interpretivis  [ ] Design Science  [ ] Mixed
   - Alasan: Pertanyaan riset bersifat kuantitatif dan dapat diukur secara
     objektif menggunakan metrik standar performa (load time, FCP, TTI, Lighthouse
     Score). Eksperimen dapat dikontrol dan direplikasi, sesuai pendekatan yang
     digunakan Kurniawan (2020) dan Adi dkk. (2021).
3. Identifikasi distorsi:
   - Asumsi tersembunyi:
     (a) PWA dan Native App dianggap setara dalam fitur yang diuji — padahal
         Nurwanto (2019) menekankan PWA memiliki keunggulan service worker yang
         tidak dimiliki native app secara native dari sisi caching.
     (b) Pengguna memiliki perangkat Android mid-range; Kurniawan dkk. (2024)
         menunjukkan bahwa cache PWA memengaruhi konsumsi baterai secara berbeda
         di perangkat mid-range vs low-end.
   - Sumber bias potensial:
     (a) Pengujian hanya di Wi-Fi — tidak mencerminkan kondisi jaringan pengguna
         Indonesia yang rata-rata menggunakan data seluler (Kurniawan, 2020).
     (b) Dataset produk e-commerce yang tidak representatif; Hidayat dkk. (2023)
         menunjukkan bahwa UI/UX e-commerce PWA membutuhkan minimal 50 item produk
         agar hasil pengujian performa bermakna.
   - Langkah mitigasi:
     Simulasikan beberapa kondisi jaringan (4G, 3G, 2G) menggunakan Chrome DevTools
     throttling, mengacu pada metodologi Kurniawan (2020). Gunakan dataset produk
     minimal 50 item sesuai rekomendasi Hidayat dkk. (2023).
4. Komitmen etika:
   - Data yang tidak akan dimanipulasi:
     Hasil benchmark Lighthouse dan GTmetrix — tidak akan memilih kondisi pengujian
     yang hanya menguntungkan salah satu platform, seperti yang ditekankan dalam
     analisis performa Shopee oleh Adi dkk. (2021).
   - Batasan yang diakui sejak awal:
     Pengujian hanya pada perangkat Android mid-range, tidak mencakup iOS.
     Aplikasi yang dibangun adalah prototipe, bukan produk produksi penuh.
     Cache PWA dapat memengaruhi hasil pengukuran berulang — perlu dikontrol
     mengacu pada temuan Kurniawan dkk. (2024) tentang dampak cache terhadap
     konsumsi baterai Android.

---
 
## Latihan 1 — Identifikasi Distorsi
 
**Paper yang dipilih:**
> Judul: "Analisis Performa Progressive Web Application (PWA) pada Perangkat Mobile"
> Penulis (Tahun): Kurniawan, W. (2020) — Jurnal Ilmiah Informatika Komputer, Universitas Gunadarma
 
| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | Ukur performa PWA menggunakan Lighthouse dan GTmetrix pada perangkat mobile | Kondisi jaringan saat pengujian tidak selalu dikontrol — apakah menggunakan Wi-Fi atau data seluler tidak selalu eksplisit |
| Data → Processing | Rata-rata beberapa kali pengukuran skor Lighthouse | Caching browser/service worker dari run sebelumnya dapat memengaruhi rata-rata jika cache tidak dikosongkan antar sesi |
| Processing → Analysis | Bandingkan skor Lighthouse (0–100) dan metrik GTmetrix | Skor Lighthouse adalah proxy — tidak langsung mencerminkan pengalaman pengguna nyata di jaringan 3G |
| Analysis → Inference | Simpulkan performa PWA berdasarkan skor yang diperoleh | Confounding: tidak membandingkan secara langsung dengan native app, sehingga kesimpulan relatif terhadap baseline Web biasa |
| Inference → Knowledge | Dipublikasikan sebagai acuan pemilihan PWA untuk mobile | Generalisasi ke e-commerce belum divalidasi — temuan ini perlu dikonfirmasi pada konteks transaksional seperti yang diteliti Hidayat dkk. (2023) |
 
**Distorsi paling besar di tahap:** Analysis → Inference (tidak ada pembanding native Android secara langsung)
 
**Dua distorsi spesifik yang teridentifikasi:**
1. Pengujian performa PWA dilakukan tanpa pembanding native Android secara langsung — ini menjadi gap yang kemudian diisi oleh studi perbandingan seperti Adi dkk. (2021) pada kasus Shopee.
2. Kondisi jaringan tidak dikontrol secara eksplisit — penelitian Kurniawan dkk. (2024) kemudian menunjukkan bahwa cache service worker PWA berperilaku berbeda di berbagai kondisi jaringan, yang dapat memengaruhi validitas pengukuran berulang.

---

## Latihan 2 — Analisis Kasus Etika
 
Skenario: Peneliti menemukan bahwa jika 3 pengukuran outlier (sesi di mana service worker PWA sudah melakukan pre-cache penuh) dihapus, hasil Lighthouse Score PWA menjadi 28% lebih tinggi. Dengan outlier, keunggulan hanya 11%.
 
| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | Laporkan kedua versi hasil — dengan dan tanpa outlier. Sertakan penjelasan teknis mengapa outlier terjadi (pre-cache service worker aktif) dan biarkan pembaca menilai. Adi dkk. (2021) dalam analisis Shopee juga menghadapi tantangan serupa karena PWA Shopee memanfaatkan service worker secara agresif. |
| Transparansi | Dokumentasikan kondisi pengujian secara lengkap: status cache service worker, koneksi jaringan, baterai perangkat, dan aplikasi lain yang berjalan. Dewi dkk. (2020) menekankan pentingnya mendokumentasikan kondisi PWA (online vs offline) saat pengujian. |
| Peer review | Reviewer berhak meminta analisis sensitivitas. Jika hasil berubah drastis saat 3 data point dihapus, ini menunjukkan temuan tidak robust. Kurniawan dkk. (2024) menunjukkan bahwa cache PWA secara signifikan memengaruhi pengukuran konsumsi baterai — hal serupa berlaku untuk metrik performa. |
 
**Keputusan akhir dan justifikasi:**
> Laporkan kedua versi (dengan dan tanpa outlier) dalam laporan utama. Tambahkan justifikasi teknis bahwa outlier disebabkan pre-cache service worker yang aktif — bukan measurement error biasa. Ini lebih jujur dan memberikan informasi yang lebih kaya, terutama karena perilaku cache service worker adalah variabel kunci dalam performa PWA (Nurwanto, 2019; Kurniawan dkk., 2024).
 
---
 
## Latihan 3 — Posisi Paradigma
 
**Topik riset:** Perbandingan performa PWA vs Native Android pada aplikasi e-commerce di kondisi jaringan rendah
 
| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | **5** | 1 | 3 |
| Jenis data yang dikumpulkan | Lighthouse Score, FCP (ms), TTI (ms), transfer size (KB) — semua terukur objektif, seperti yang digunakan Kurniawan (2020) dan Adi dkk. (2021) | Persepsi, pengalaman pengguna — tidak relevan untuk pertanyaan performa teknis ini, meski relevan untuk studi UX seperti Hidayat dkk. (2023) | Bangun PWA dan native app sebagai artefak, lalu ukur — pendekatan yang digunakan Nurwanto (2019) namun kontribusinya lebih ke engineering |
| Limitasi paradigma | Hasil terikat pada spesifikasi perangkat dan kondisi jaringan yang digunakan — Dewi dkk. (2020) mengingatkan perlunya mendokumentasikan kondisi runtime secara lengkap | Tidak applicable untuk pertanyaan performa teknis ini | Risiko: fokus bergeser ke "membuat yang terbaik" bukan "menjawab pertanyaan riset secara komparatif" |
 
**Paradigma yang dipilih:** Positivis
**Alasan:** Pertanyaan riset bersifat komparatif dan kuantitatif penuh. Semua variabel dapat diukur secara objektif dengan alat standar yang telah digunakan dalam literatur Indonesia: Lighthouse (Kurniawan, 2020; Adi dkk., 2021), GTmetrix (Kurniawan, 2020), dan Chrome DevTools throttling. Eksperimen dapat dirancang terkontrol dan direplikasi.
 
---

## Refleksi
 
> Sebelum membaca materi ini, saya mungkin langsung percaya klaim "PWA 40% lebih cepat" tanpa bertanya: diukur di jaringan apa? Dengan perangkat apa? Cache service worker dalam kondisi apa? Setelah memahami rantai distorsi — dan membaca bagaimana Adi dkk. (2021) menganalisis performa PWA Shopee serta Kurniawan dkk. (2024) menemukan dampak cache terhadap baterai — pertanyaan yang sekarang akan diajukan saat membaca paper adalah: (1) Apa metrik spesifik yang digunakan dan dengan alat apa? (2) Apakah kondisi cache service worker dikontrol antar sesi pengukuran? (3) Apakah hasilnya bisa direplikasi dengan alat yang tersedia di Indonesia?
 
---
