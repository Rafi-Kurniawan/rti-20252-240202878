# WS-03 Literature-Gap

**Mata Kuliah:** Riset Teknologi Informasi

**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar

**Nama:** Rafi Kurniawan

**NIM:** 240202878

**Tanggal:** 6 Juli 2026

---

## Template A.3 — Literature Mapping & Gap Identification

```
LITERATURE MAPPING

Topik      : Performa rendering framework CSS (Tailwind CSS vs Bootstrap)
Database   : Google Scholar, Garuda Kemdikbud, Semantic Scholar
Query      : "Tailwind CSS" AND "Bootstrap" AND "performance" AND ("Lighthouse" OR "FCP" OR "LCP")
Tahun      : 2020-2024
Hasil awal : 31 paper → Screening → 6 paper final
```

Literature Matrix (concept-centric):

| Study | Tahun | Method | Data | Result | Limitation |
|-------|-------|--------|------|--------|------------|
| Akbar (2023) | 2023 | Benchmarking GTMetrix | Website portofolio (Tailwind vs Bootstrap) | Tailwind unggul performa GTMetrix | Hanya GTMetrix, tidak Lighthouse; konten tidak identik |
| Setiawan & Arifin (2024) | 2024 | Analisis performa & efisiensi kode | Kode framework | Tailwind lebih efisien ukuran CSS | Tidak memisahkan per ukuran layar; FCP/LCP tidak disebut eksplisit |
| Yusuf dkk. (2020) | 2020 | SAW multi-kriteria | Fitur framework | Bootstrap terbaik | Hanya analisis deskriptif, tidak ada pengukuran performa empiris |
| JOINTECOMS (2023) | 2023 | Observasi kode & class usage | Penggunaan framework | Tailwind fleksibel, Bootstrap cepat di-prototipe | Tidak ada pengukuran empiris (FCP/LCP); fokus pada efisiensi penulisan kode |
| Rifandi dkk. (2022) | 2022 | Implementasi & observasi | Website responsif | Tailwind memudahkan UI responsif | Bukan studi komparatif (hanya Tailwind) |
| Siahaan & Vianto (2022) | 2022 | Lighthouse benchmark | JS Framework | Lighthouse efektif untuk performa web | Fokus JS framework, bukan CSS framework |

```
Pola yang ditemukan:
  Metode dominan     : Pengukuran non-standar (seperti skor umum GTMetrix) atau evaluasi deskriptif.
  Dataset umum       : Website portofolio atau prototipe sederhana yang tidak dikontrol secara ketat agar identik antar versi.
  Limitasi berulang  : Kurangnya kontrol variabel perancangan konten identik (isolasi variabel) dan kurangnya spesifisitas pada Core Web Vitals (FCP/LCP) di berbagai ukuran viewport.
```

### GAP IDENTIFICATION

**Gap 1: [Jenis: Method Gap]**

- **Deskripsi**: Belum ada studi yang mengukur performa Tailwind CSS vs Bootstrap menggunakan metrik Core Web Vitals (FCP, LCP) secara sistematis via Lighthouse CLI pada berbagai ukuran viewport dalam satu eksperimen terkontrol.

- **Bukti**: Empat studi pembanding menunjukkan pola metodologi yang konsisten lemah pada titik ini. Akbar (2023) mengukur performa memakai GTMetrix, bukan Lighthouse, sehingga metrik Core Web Vitals resmi (FCP/LCP) tidak terukur. Setiawan & Arifin (2024) menganalisis efisiensi ukuran kode CSS, namun tidak menyebutkan FCP/LCP secara eksplisit dan tidak memisahkan hasil berdasarkan ukuran layar. Yusuf dkk. (2020) hanya melakukan analisis deskriptif multi-kriteria (metode SAW) berbasis fitur framework, tanpa pengukuran performa render yang empiris sama sekali. Siahaan & Vianto (2022) memang sudah menggunakan Lighthouse benchmark, tapi objeknya adalah framework JavaScript front-end, bukan framework CSS — sehingga metodologinya belum pernah diterapkan pada konteks perbandingan Tailwind vs Bootstrap.

- **Signifikansi**: FCP dan LCP adalah metrik resmi Core Web Vitals yang digunakan Google untuk menilai pengalaman pengguna nyata (Google Developers, 2024) dan diukur melalui Lighthouse (Google Developers, 2024). Mengabaikan kedua metrik ini berarti klaim keunggulan performa framework pada studi-studi sebelumnya tidak dapat dibandingkan secara apple-to-apple dengan standar industri, dan tidak merepresentasikan pengalaman pengguna mobile dengan keterbatasan jaringan pada berbagai ukuran layar.

**Gap 2: [Jenis: Data Gap]**

- **Deskripsi**: Semua studi pembanding tidak mengontrol konten/aset website agar identik antar versi Tailwind dan Bootstrap, sehingga tidak ada isolasi variabel independen yang valid.

- **Bukti**: Akbar (2023) membangun dua website portofolio yang berbeda antara versi Tailwind dan Bootstrap, terlihat dari perbedaan ukuran aset dan struktur elemen. Setiawan & Arifin (2024) berfokus pada efisiensi kode framework itu sendiri (ukuran file CSS), bukan pada halaman web yang dibangun dengan konten yang benar-benar sama, sehingga hasil efisiensi kode tidak otomatis mencerminkan performa rendering pada halaman identik. Yusuf dkk. (2020) bahkan tidak menggunakan data eksperimen berupa website sama sekali, melainkan hanya membandingkan fitur framework secara deskriptif.

- **Signifikansi**: Tanpa isolasi variabel (HTML/konten/gambar yang identik di kedua versi), perbedaan hasil FCP/LCP yang diukur bisa disebabkan oleh perbedaan ukuran gambar atau struktur elemen, bukan oleh arsitektur framework CSS itu sendiri (utility-first pada Tailwind Labs, 2024, vs component-based pada Twitter Bootstrap, 2024). Validitas internal eksperimen jadi dipertanyakan jika variabel konten tidak dikontrol.

**Baseline Selection:**

| Baseline | Relevansi | Representatif | Source |
|----------|-----------|----------------|--------|
| Perbandingan Tailwind vs Bootstrap | Topik & tujuan komparasi framework CSS identik | Studi paling mutakhir dan paling sering dirujuk di konteks Indonesia | Akbar, T. A. (2023). Analisis perbandingan framework CSS Bootstrap dan Tailwind dalam pengembangan website portofolio. Universitas AMIKOM Yogyakarta. |
| Analisis efisiensi kode framework | Membandingkan aspek teknis (ukuran/efisiensi) kedua framework | Melengkapi sisi kode di luar hasil render halaman | Setiawan, A., & Arifin, M. (2024). Analisis performa dan efisiensi kode pada Tailwind CSS dan Bootstrap. J-PTIIK, Universitas Brawijaya. |
| Metodologi Lighthouse benchmark | Instrumen pengukuran (Lighthouse) sama persis dengan yang akan digunakan | Mewakili common practice pengukuran performa web standar industri | Siahaan, R., & Vianto, D. (2022). Perbandingan performa front-end JavaScript framework menggunakan Lighthouse benchmark. Jurnal Mantik, 6(2). |

---

## Latihan 1 — Concept-Centric Literature Table

(Tabel ini sudah dimasukkan ke dalam bagian Template A.3 di atas dengan merujuk pada tinjauan pustaka di dokumen proposal PDF).

---

## Latihan 2 — Gap Identification

| Jenis Gap | Ditemukan? | Gap Statement |
|-----------|-----------|---------------|
| Performance Gap | [ ] Ya / [x] Tidak | |
| Method Gap | [x] Ya / [ ] Tidak | Belum ada riset komparatif menggunakan Core Web Vitals (FCP, LCP) yang terukur terkontrol per ukuran viewport via Lighthouse — didukung oleh 4 studi (Akbar 2023, Setiawan & Arifin 2024, Yusuf dkk. 2020, Siahaan & Vianto 2022) yang masing-masing gagal menerapkan pengukuran ini secara lengkap. |
| Data Gap | [x] Ya / [ ] Tidak | Halaman web pembanding dalam literatur (Akbar 2023, Setiawan & Arifin 2024, Yusuf dkk. 2020) tidak identik/tidak menggunakan objek eksperimen yang terkontrol, merusak validitas isolasi variabel. |
| Context Gap | [ ] Ya / [x] Tidak | |

**Gap utama yang dipilih:** Kombinasi Method Gap dan Data Gap.

**Mengapa gap ini penting (bukan sekadar "belum ada yang meneliti")?**
> Karena keputusan pemilihan teknologi web di industri sangat memengaruhi *user experience*. Jika data yang dijadikan dasar (studi sebelumnya) tidak mengontrol variabel desain (Data Gap) dan tidak menggunakan alat ukur pengalaman render pengguna nyata sesuai standar Core Web Vitals (Method Gap), maka klaim bahwa framework A lebih unggul dari B tidak valid secara metodologis. Pola ini konsisten muncul di empat dari enam studi yang direview, bukan sekadar satu kasus terisolasi — sehingga gap ini bukan klaim tanpa bukti, melainkan kesimpulan dari pemetaan literatur yang sistematis.

---

## Latihan 3 — Baseline Selection

| # | Baseline | Mengapa Relevan | Mengapa Representatif | Apakah SOTA? | Sumber |
|---|----------|----------------|----------------------|-------------|--------|
| 1 | Pengukuran performa Tailwind vs Bootstrap | Topik dan tujuan perbandingan framework identik | Menunjukkan status literatur lokal saat ini | Bukan, karena metodologinya kurang ketat (GTMetrix, konten tidak identik) | Akbar (2023) |
| 2 | Analisis efisiensi kode CSS Tailwind vs Bootstrap | Membandingkan aspek teknis kedua framework yang sama | Melengkapi sisi efisiensi kode di luar hasil render halaman nyata | Bukan, karena tidak mengukur FCP/LCP maupun variasi viewport | Setiawan & Arifin (2024) |
| 3 | Penggunaan Lighthouse untuk web front-end | Alat ukur (instrumen) yang digunakan sama persis | Mewakili praktik pengukuran performa standar industri | Ya, mewakili alat pengujian SOTA di web (meski diterapkan pada objek berbeda, JS framework) | Siahaan & Vianto (2022) |

**Apakah pemilihan baseline ini bisa dianggap straw man?** [ ] Ya / [x] Tidak
> Justifikasi: Tidak, karena ketiga baseline ini mewakili literatur paling komprehensif saat ini tentang komparasi Tailwind dan Bootstrap (Akbar 2023; Setiawan & Arifin 2024) dan praktik pengukuran performa web standar industri (Siahaan & Vianto 2022). Kritik terhadap metodenya bertujuan membangun perbaikan metodologis, bukan sekadar menjatuhkan penelitian lama.

---

## Refleksi

> Apa perbedaan antara "belum ada yang meneliti ini" (klaim tanpa bukti) dengan research gap yang valid? Bagaimana cara membuktikan bahwa sebuah gap benar-benar ada?

**Jawaban:**
> "Belum ada yang meneliti" adalah pernyataan lemah tanpa dasar yang biasanya muncul dari kemalasan membaca literatur. Sebaliknya, *research gap* yang valid dilahirkan dari pemetaan (mapping) kritis terhadap literatur-literatur terbaru di bidang tersebut. Cara membuktikan gap benar-benar ada adalah dengan menyajikan *literature matrix* secara sistematis, menunjukkan dengan jelas apa saja kelemahan metodologi atau keterbatasan parameter (misal tidak ada isolasi variabel, atau tidak menguji variasi viewport) di dalam paper-paper referensi — dan menunjukkan bahwa kelemahan itu berulang di banyak studi (Akbar 2023; Setiawan & Arifin 2024; Yusuf dkk. 2020; Siahaan & Vianto 2022), bukan hanya satu paper saja.
