# Matriks Literatur — Perbandingan Performa CSS Framework

**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
**Database:** Google Scholar, Garuda Kemdikbud, Semantic Scholar
**Query:** "Tailwind CSS" AND "Bootstrap" AND "performance" AND ("Lighthouse" OR "FCP" OR "LCP")
**Tahun:** 2020–2024
**Hasil:** 31 paper → Screening → **6 paper final**

---

## 1. Literature Matrix (Concept-Centric)

| Study | Tahun | Method | Objek | Result | Limitation |
|-------|-------|--------|-------|--------|------------|
| Akbar (2023) | 2023 | Benchmarking GTMetrix | Website portofolio (Tailwind vs Bootstrap) | Tailwind unggul skor GTMetrix | Hanya GTMetrix, bukan Lighthouse; konten tidak identik antar versi |
| Setiawan & Arifin (2024) | 2024 | Analisis performa & efisiensi kode | Kode framework CSS | Tailwind lebih efisien ukuran bundle CSS | Tidak memisahkan per viewport; FCP/LCP tidak disebut eksplisit |
| Yusuf dkk. (2020) | 2020 | SAW multi-kriteria | Fitur framework CSS | Bootstrap terbaik secara multi-kriteria | Hanya analisis deskriptif, tidak ada pengukuran performa empiris |
| JOINTECOMS (2023) | 2023 | Observasi kode & class usage | Penggunaan framework | Tailwind fleksibel, Bootstrap cepat di-prototipe | Tidak ada pengukuran empiris (FCP/LCP); fokus efisiensi penulisan kode |
| Rifandi dkk. (2022) | 2022 | Implementasi & observasi | Website responsif | Tailwind memudahkan UI responsif | Bukan studi komparatif (hanya Tailwind); tidak ada pengukuran performa |
| Siahaan & Vianto (2022) | 2022 | Lighthouse benchmark | JavaScript framework | Lighthouse efektif untuk performa web | Fokus JS framework, bukan CSS framework |

---

## 2. Pola yang Ditemukan

| Dimensi | Temuan |
|---------|--------|
| **Metode dominan** | Pengukuran non-standar (skor GTMetrix umum) atau evaluasi deskriptif kualitatif |
| **Dataset umum** | Website portofolio atau prototipe sederhana yang tidak dikontrol agar identik antar versi |
| **Limitasi berulang** | (1) Kurangnya kontrol variabel — konten tidak identik antar versi framework; (2) Tidak menggunakan Core Web Vitals (FCP/LCP) via Lighthouse sebagai metrik standar industri; (3) Tidak memisahkan hasil per viewport |

---

## 3. Gap Identification

### Gap 1 — Method Gap

**Deskripsi:** Belum ada studi yang mengukur performa Tailwind CSS vs Bootstrap menggunakan metrik Core Web Vitals (FCP, LCP) secara sistematis via Lighthouse CLI pada berbagai ukuran viewport dalam satu eksperimen terkontrol.

**Bukti:**
- Akbar (2023): mengukur via GTMetrix → bukan Core Web Vitals resmi (FCP/LCP tidak terukur secara eksplisit)
- Setiawan & Arifin (2024): menganalisis efisiensi ukuran kode CSS, tidak menyebutkan FCP/LCP eksplisit, tidak memisahkan per viewport
- Yusuf dkk. (2020): hanya analisis deskriptif SAW berbasis fitur, tanpa pengukuran performa render empiris
- Siahaan & Vianto (2022): sudah menggunakan Lighthouse, tapi pada objek JS framework — metodologinya belum diterapkan pada konteks CSS framework

**Signifikansi:** FCP dan LCP adalah metrik resmi Core Web Vitals (Google Developers, 2024) yang diukur melalui Lighthouse. Tanpa kedua metrik ini, klaim keunggulan performa framework tidak dapat dibandingkan secara apple-to-apple dengan standar industri.

### Gap 2 — Data Gap

**Deskripsi:** Semua studi pembanding tidak mengontrol konten/aset website agar identik antar versi Tailwind dan Bootstrap, sehingga tidak ada isolasi variabel independen yang valid.

**Bukti:**
- Akbar (2023): dua website portofolio berbeda antar versi Tailwind dan Bootstrap (ukuran aset & struktur elemen berbeda)
- Setiawan & Arifin (2024): berfokus pada efisiensi kode framework itu sendiri, bukan halaman web dengan konten identik
- Yusuf dkk. (2020): tidak menggunakan data eksperimen berupa website sama sekali, hanya membandingkan fitur

**Signifikansi:** Tanpa isolasi variabel (HTML/konten/gambar identik), perbedaan FCP/LCP bisa disebabkan oleh perbedaan konten, bukan arsitektur framework. Validitas internal eksperimen dipertanyakan.

---

## 4. Baseline Selection

| # | Baseline | Relevansi | Representatif | SOTA? | Sumber |
|---|----------|-----------|----------------|-------|--------|
| 1 | Perbandingan Tailwind vs Bootstrap | Topik & tujuan komparasi framework CSS identik | Studi paling mutakhir & paling dirujuk di konteks Indonesia | Tidak (metodologi kurang ketat: GTMetrix, konten tidak identik) | Akbar, T. A. (2023). Analisis perbandingan framework CSS Bootstrap dan Tailwind dalam pengembangan website portofolio. Universitas AMIKOM Yogyakarta |
| 2 | Analisis efisiensi kode CSS | Membandingkan aspek teknis kedua framework | Melengkapi sisi efisiensi kode di luar hasil render | Tidak (tidak mengukur FCP/LCP atau variasi viewport) | Setiawan, A., & Arifin, M. (2024). Analisis performa dan efisiensi kode pada Tailwind CSS dan Bootstrap. J-PTIIK, Universitas Brawijaya |
| 3 | Metodologi Lighthouse benchmark | Instrumen pengukuran (Lighthouse) sama persis | Mewakili *common practice* pengukuran performa web standar industri | Ya (alat pengujian SOTA — meski diterapkan pada JS framework) | Siahaan, R., & Vianto, D. (2022). Perbandingan performa front-end JavaScript framework menggunakan Lighthouse benchmark. Jurnal Mantik, 6(2) |

---

## 5. Gap Utama yang Dipilih

**Kombinasi Method Gap & Data Gap** — keduanya saling berkaitan:

> Karena keputusan pemilihan teknologi web di industri sangat memengaruhi *user experience*, jika data yang dijadikan dasar tidak mengontrol variabel desain (Data Gap) dan tidak menggunakan alat ukur pengalaman render pengguna nyata sesuai standar Core Web Vitals (Method Gap), maka klaim bahwa framework A lebih unggul dari B tidak valid secara metodologis. Pola ini konsisten muncul di empat dari enam studi yang direview.

**Kontribusi penelitian ini:** Mengisi kedua gap secara simultan dengan:
1. Menggunakan halaman prototipe yang **identik secara konten** untuk mengisolasi variabel independen (mengatasi Data Gap)
2. Menggunakan **Lighthouse CLI v11 dengan FCP & LCP** sebagai metrik standar Core Web Vitals, diuji di **3 variasi viewport** (mengatasi Method Gap)
