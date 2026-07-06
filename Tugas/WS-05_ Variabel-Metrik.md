# WS-05 Variabel-Metrik

 **Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---

## Template A.5 — Definisi Variabel, Metrik & Justifikasi

```
VARIABLE & METRIC DEFINITION

Research Question: Apakah halaman web yang dibangun dengan Tailwind CSS menghasilkan FCP dan LCP yang secara statistik berbeda dibandingkan halaman web yang dibangun dengan Bootstrap, pada prototipe halaman identik yang diuji di tiga ukuran viewport menggunakan Lighthouse CLI?

| Variabel | Tipe | Konsep | Metrik | Skala | Satuan | Cara Mengukur | Justifikasi |
|----------|------|--------|--------|-------|--------|---------------|-------------|
| Framework CSS | IV | Pendekatan arsitektur CSS (Tailwind vs Bootstrap) | Kategorikal: Tailwind CSS v3 JIT vs Bootstrap v5 PurgeCSS | Nominal | — | Menyiapkan dua versi halaman yang dibangun terpisah tetapi identik dari sisi konten. | Mewakili perlakuan komparatif dari riset. |
| First Contentful Paint (FCP) | DV | Waktu hingga elemen pertama bermakna tampil | FCP | Ratio | ms | Ekstraksi otomatis dari JSON output Lighthouse CLI. | Mewakili performa rendering awal standar industri Core Web Vitals. |
| Largest Contentful Paint (LCP) | DV | Waktu hingga elemen terbesar tampil sepenuhnya | LCP | Ratio | ms | Ekstraksi otomatis dari JSON output Lighthouse CLI. | Mewakili kapan konten utama siap untuk user. |
| Ukuran Viewport | CV | Dimensi layar perangkat pengguna | Lebar layar: 1920px (Desktop), 768px (Tablet), 375px (Mobile) | Ordinal | px | Dikunci dengan flag `--chrome-flags` per batch pengujian. | Perangkat sangat mempengaruhi rendering; dikontrol untuk fairness. |
| Kondisi Jaringan | CV | Kondisi bandwidth user | Preset Lighthouse simulated mobile 3G (RTT 150ms, 1.638 Kbps) | Ordinal | — | Dikunci via config Lighthouse untuk semua sesi. | Jaringan memengaruhi parsing CSS; harus stabil untuk mengisolasi variabel framework. |

Alignment Check:
  RQ → Concept → Variable → Metric → Data → Result
  [x] Setiap langkah terdokumentasi
  [x] Tidak ada "lompatan logis"
  [x] Metrik mengukur apa yang dimaksud (construct validity)
```

---

## Latihan 1 — Operationalization Chain

Gunakan RQ dari WS-04. Definisikan variabel dan metriknya.

**RQ:** Apakah halaman web yang dibangun dengan Tailwind CSS menghasilkan FCP dan LCP yang secara statistik berbeda dibandingkan halaman web yang dibangun dengan Bootstrap pada 3 ukuran viewport?

| Variabel | Tipe | Konsep Abstrak | Metrik Konkret | Skala (NOIR) | Satuan |
|----------|------|---------------|----------------|-------------|--------|
| Framework CSS | IV | Arsitektur CSS Framework | Categorical: Tailwind (JIT) vs Bootstrap (PurgeCSS) | Nominal | — |
| Performa Awal | DV | Kecepatan tampil elemen pertama | First Contentful Paint (FCP) | Ratio | ms |
| Performa Utama | DV | Kecepatan tampil elemen terbesar | Largest Contentful Paint (LCP) | Ratio | ms |
| Ukuran Layar | CV | Resolusi perangkat yang diuji | Viewport Width (1920, 768, 375) | Ordinal | px |

**Apakah ada lompatan logis dalam rantai?** [ ] Ya / [x] Tidak
> Jika ya, di mana? -

---

## Latihan 2 — Evaluasi Metrik

Evaluasi metrik DV yang dipilih di Latihan 1 menggunakan 3 kriteria.

| Kriteria | Skor (1-5) | Justifikasi |
|----------|-----------|-------------|
| Representative | 5 | FCP dan LCP secara resmi ditetapkan oleh Google Web Vitals sebagai representasi user-centric untuk *perceived load speed*. |
| Sensitive | 5 | Diukur dalam hitungan milidetik sehingga perbedaan sepersekian detik akibat bundle CSS tetap tertangkap oleh sistem. |
| Feasible | 5 | Mudah dan murah dikumpulkan berulang kali secara otomatis menggunakan modul Lighthouse CLI Node.js. |

**Apakah perlu secondary metric?** [x] Ya / [ ] Tidak
> Jika ya, apa dan mengapa? Lighthouse Performance Score (0-100) dan CSS Bundle Size (KB). Lighthouse score untuk melihat gambaran performa secara holistik. Bundle size untuk konteks penjelasan *mengapa* FCP/LCP bisa berbeda (sebagai pembanding teoretis).

**Contoh kasus ceiling effect untuk metrik ini:**
> Jika kedua halaman sangat ringan dan diuji pada localhost tanpa simulasi keterbatasan jaringan, FCP dan LCP mungkin mendekati kecepatan ping minimal (mis. 50ms untuk keduanya), sehingga perbedaan performa framework tidak akan terlihat (karena terlalu cepat/optimal). Itulah mengapa network throttling 3G digunakan.

---

## Latihan 3 — Data Quality Check

Bayangkan data yang akan dikumpulkan dari eksperimen. Evaluasi 4 dimensi kualitas data.

| Dimensi | Pertanyaan | Jawaban | Strategi Mitigasi |
|---------|-----------|---------|------------------|
| Completeness | *Apakah semua data point terkumpul?* | Setiap eksperimen memiliki output JSON, bisa saja ada sesi yang error/timeout. | Script otomasi akan mengecek apabila ada value FCP/LCP yang kosong dan mengulangi sesinya otomatis. |
| Consistency | *Apakah ada kontradiksi internal?* | Ya, terkadang nilai FCP bisa tercatat lebih besar dari LCP secara logis hal ini salah (invalid). | Fase validasi menyeleksi dan menghapus/membuang run jika FCP > LCP. |
| Validity | *Apakah benar-benar mengukur yang dimaksud?* | FCP dan LCP diukur dalam mode headless dengan throttling software, bukan hardware nyata. | Validasi instrumen dengan menyamakan versi Lighthouse (v11) untuk seluruh sesi. |
| Representativeness | *Apakah sampel mewakili populasi target?* | Ini hanya 1 halaman prototipe statis, kurang merepresentasikan website e-commerce kompleks. | Diakui di batasan masalah, fokus pada uji arsitektur framework dasar, bukan *full-stack app*. |

---

## Refleksi

> Mengapa memilih metrik setelah melihat data dianggap p-hacking? Apa bedanya dengan eksplorasi data yang sah?

**Jawaban:**
> Memilih metrik setelah melihat data (p-hacking) berarti peneliti mencoba-coba mencari-cari metrik (mis. mencoba FCP, lalu Speed Index, lalu Time to Interactive) sampai ia menemukan satu metrik di mana metode yang dibelanya "menang" atau "signifikan", lalu hanya melaporkan metrik itu. Ini manipulatif karena hipotesis disesuaikan dengan hasil (*HARKing*).
> Eksplorasi data yang sah (pre-registration) adalah mendefinisikan secara kaku sejak awal bahwa "FCP dan LCP adalah primary metric saya," apapun hasilnya nanti, metrik itulah yang menguji hipotesis. Jika ada metrik lain yang ditemukan menarik, dilaporkan secara terpisah sebagai temuan eksploratif, bukan bagian dari uji hipotesis utama.
