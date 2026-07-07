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
---
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

GAP IDENTIFICATION

Gap 1: [Jenis: Method Gap]
  Deskripsi    : Belum ada studi komparatif Tailwind dan Bootstrap yang menggunakan metrik FCP dan LCP secara sistematis via Lighthouse CLI pada tiga ukuran viewport berbeda dalam satu eksperimen terkontrol.
  Bukti        : Literatur di Indonesia tahun 2020-2024 rata-rata menggunakan GTMetrix (Akbar, 2023) atau tidak memisahkan analisis berdasarkan ukuran layar (Setiawan & Arifin, 2024).
  Signifikansi : Mengabaikan viewport layar dan metrik FCP/LCP berarti mengabaikan realitas pengguna yang mayoritas menggunakan perangkat mobile dengan keterbatasan jaringan.

Gap 2: [Jenis: Data Gap]
  Deskripsi    : Semua studi membandingkan framework pada desain web yang kontennya tidak benar-benar identik, sehingga tidak ada isolasi variabel independen yang valid.
  Bukti        : Akbar (2023) membangun website yang berbeda antara versi Tailwind dan Bootstrap (terlihat dari ukuran aset dan struktur elemen yang berbeda).
  Signifikansi : Tanpa isolasi variabel (halaman statis yang sama persis), perbedaan performa bisa saja disebabkan oleh perbedaan besaran gambar/konten, bukan karena pendekatan arsitektur framework CSS-nya.
```
Baseline Selection:
| Baseline | Relevansi | Representatif | Source |
|----------|-----------|---------------|--------|
| Akbar (2023) | Studi komparatif Tailwind vs Bootstrap di konteks performa. | Studi komparatif paling mutakhir di Indonesia untuk CSS framework. | Akbar, T. A. (2023). Analisis perbandingan framework CSS Bootstrap dan Tailwind... |
| Siahaan & Vianto (2022) | Menggunakan metodologi Lighthouse untuk benchmarking front-end. | Common practice pengukuran performa web menggunakan alat standar industri. | Siahaan, R., & Vianto, D. (2022). Perbandingan performa front-end... |


---

## Latihan 1 — Concept-Centric Literature Table

(Tabel ini sudah dimasukkan ke dalam bagian Template A.3 di atas dengan merujuk pada tinjauan pustaka di dokumen proposal PDF).

---

## Latihan 2 — Gap Identification

| Jenis Gap | Ditemukan? | Gap Statement |
|-----------|-----------|---------------|
| Performance Gap | [ ] Ya / [x] Tidak | |
| Method Gap | [x] Ya / [ ] Tidak | Belum ada riset komparatif menggunakan Core Web Vitals (FCP, LCP) yang terukur terkontrol per ukuran viewport via Lighthouse. |
| Data Gap | [x] Ya / [ ] Tidak | Halaman web pembanding dalam literatur tidak identik, merusak validitas isolasi variabel. |
| Context Gap | [ ] Ya / [x] Tidak | |

**Gap utama yang dipilih:** Kombinasi Method Gap dan Data Gap.
**Mengapa gap ini penting (bukan sekadar "belum ada yang meneliti")?**
> Karena keputusan pemilihan teknologi web di industri sangat memengaruhi *user experience*. Jika data yang dijadikan dasar (studi sebelumnya) tidak mengontrol variabel desain (Data Gap) dan tidak menggunakan alat ukur pengalaman render pengguna nyata (Method Gap), maka klaim bahwa framework A lebih unggul dari B tidak valid secara metodologis.

---

## Latihan 3 — Baseline Selection

| # | Baseline | Mengapa Relevan | Mengapa Representatif | Apakah SOTA? | Sumber |
|---|----------|----------------|----------------------|-------------|--------|
| 1 | Pengukuran performa Tailwind vs Bootstrap | Topik dan tujuan perbandingan framework identik | Menunjukkan status literatur lokal saat ini | Bukan, karena metodologinya kurang ketat | Akbar (2023) |
| 2 | Penggunaan Lighthouse untuk web front-end | Alat ukur (instrumen) yang digunakan sama persis | Mewakili praktik pengukuran performa standar | Ya, mewakili alat pengujian SOTA di web | Siahaan & Vianto (2022) |

**Apakah pemilihan baseline ini bisa dianggap straw man?** [ ] Ya / [x] Tidak
> Justifikasi: Tidak, karena Akbar (2023) mewakili literatur paling komprehensif saat ini tentang komparasi Tailwind dan Bootstrap di Indonesia. Kritik terhadap metodenya bertujuan membangun perbaikan metodologis, bukan sekadar menjatuhkan penelitian lama.

---

## Refleksi

> Apa perbedaan antara "belum ada yang meneliti ini" (klaim tanpa bukti) dengan research gap yang valid? Bagaimana cara membuktikan bahwa sebuah gap benar-benar ada?

**Jawaban:**
> "Belum ada yang meneliti" adalah pernyataan lemah tanpa dasar yang biasanya muncul dari kemalasan membaca literatur. Sebaliknya, *research gap* yang valid dilahirkan dari pemetaan (mapping) kritis terhadap literatur-literatur terbaru di bidang tersebut. Cara membuktikan gap benar-benar ada adalah dengan menyajikan *literature matrix* secara sistematis, menunjukkan dengan jelas apa saja kelemahan metodologi atau keterbatasan parameter (misal tidak ada isolasi variabel, atau tidak menguji variasi viewport) di dalam paper-paper referensi (seperti Akbar 2023).
