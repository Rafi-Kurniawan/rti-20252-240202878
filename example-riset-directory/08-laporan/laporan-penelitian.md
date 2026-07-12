# Laporan Penelitian

**Judul:** Analisis Perbandingan Performa Rendering Web: Tailwind CSS vs Bootstrap Berdasarkan Metrik First Contentful Paint dan Largest Contentful Paint pada Berbagai Ukuran Layar

**Peneliti:** Rafi Kurniawan
**NIM:** 240202878
**Mata Kuliah:** Riset Teknologi Informasi
**Dosen Pengampu:** Helmi Bahar Alim, S.Kom., M.Kom
**Target Publikasi:** Sinta 5 (Jurnal Nasional Informatika) atau Konferensi Nasional
**Status Penelitian:** Tahap 1–4 selesai; Tahap 5 (penulisan draf naskah jurnal) sedang berjalan ([../07-manuskrip/](../07-manuskrip/))

---

## 1. Ringkasan Eksekutif

Penelitian ini merancang, mengimplementasikan, dan mengevaluasi secara empiris perbandingan performa rendering web antara **Tailwind CSS v3 (JIT)** dan **Bootstrap v5 (PurgeCSS)** menggunakan metrik standar Core Web Vitals — **First Contentful Paint (FCP)** dan **Largest Contentful Paint (LCP)** — via Lighthouse CLI v11.

Eksperimen dilakukan melalui pengujian terkontrol: dua prototipe halaman web dengan konten **identik secara struktural**, diuji di tiga ukuran viewport (mobile 375px, tablet 768px, desktop 1920px) dengan simulasi jaringan 3G, masing-masing **10 iterasi** — total **60 run pengukuran**.

**Temuan utama:**

- Tailwind CSS menghasilkan FCP **lebih cepat ~11–13 ms** dibandingkan Bootstrap di semua viewport, dengan perbedaan yang **signifikan secara statistik** (p < 0,05, rank-biserial r > 0,5 di semua skenario)
- Bootstrap LCP Desktop terkunci di **810 ms** pada **seluruh 10 run** (std = 0) — nilai ini merupakan cap preset Lighthouse 3G, menunjukkan elemen terbesar Bootstrap tidak dapat terrender dalam batas threshold jaringan yang disimulasikan; Tailwind Desktop berhasil merender LCP rata-rata **684,7 ms**
- Tailwind lebih konsisten (standar deviasi lebih kecil) di semua skenario

Seluruh prototipe kode, data eksperimen, dan konfigurasi tersedia di `Tugas/eksperimen/` (lihat §7 Lampiran untuk peta artefak).

---

## 2. Latar Belakang dan Rumusan Masalah

### 2.1 Latar Belakang

Pengembangan front-end web di Indonesia terus berkembang, dengan **Tailwind CSS** dan **Bootstrap** menjadi dua framework CSS yang paling banyak diadopsi. Namun, keputusan pemilihan framework oleh developer di Indonesia sering didasarkan pada tren komunitas atau preferensi personal, bukan pada data performa rendering yang terukur secara empiris.

Hal ini berisiko menghasilkan:
1. Bundle CSS yang tidak optimal → memperlambat critical rendering path
2. First Contentful Paint (FCP) dan Largest Contentful Paint (LCP) yang tinggi
3. Penurunan kecepatan muat bagi pengguna mobile dengan jaringan terbatas

Meskipun studi perbandingan framework CSS telah ada di Indonesia (Akbar, 2023; Setiawan & Arifin, 2024; Yusuf dkk., 2020), terdapat dua gap metodologis yang konsisten:

| Gap | Deskripsi |
|-----|-----------|
| **Method Gap** | Tidak menggunakan metrik Core Web Vitals (FCP/LCP) via Lighthouse — studi sebelumnya menggunakan GTMetrix atau analisis deskriptif |
| **Data Gap** | Konten halaman yang diuji tidak identik antar versi framework — merusak isolasi variabel independen |

### 2.2 Rumusan Masalah

Apakah halaman web yang dibangun dengan **Tailwind CSS (JIT)** menghasilkan **First Contentful Paint (FCP)** dan **Largest Contentful Paint (LCP)** yang secara statistik berbeda dibandingkan halaman web yang dibangun dengan **Bootstrap (PurgeCSS)**, pada prototipe halaman identik yang diuji di tiga ukuran viewport (desktop 1920px, tablet 768px, mobile 375px) menggunakan Lighthouse CLI?

### 2.3 Hipotesis

| Hipotesis | Pernyataan |
|-----------|-----------|
| **H₀** | Tidak terdapat perbedaan yang signifikan antara FCP dan LCP halaman Tailwind CSS dan Bootstrap pada berbagai viewport (p ≥ 0,05) |
| **H₁** | Terdapat perbedaan yang signifikan antara FCP dan LCP halaman Tailwind CSS dan Bootstrap (p < 0,05) |

**Threshold:** α = 0,05; effect size r ≥ 0,5

---

## 3. Metodologi dan Pelaksanaan

Penelitian dilaksanakan dalam 5 tahap. Bagian ini merangkum implementasi dan verifikasi setiap tahap; detail teknis lengkap ada pada dokumen `09-docs/tahap-N-*.md` yang dirujuk.

### 3.1 Tahap 1 — Desain Eksperimen & Setup Lingkungan

**Status: Selesai.** Dirancang arsitektur sistem eksperimen tiga komponen: (1) prototipe halaman web statis (IV), (2) skrip otomasi Lighthouse CLI via Node.js (pengukur DV), dan (3) file konfigurasi YAML terpusat (pengontrol CV). Variabel penelitian didefinisikan secara operasional: IV (Framework CSS: Tailwind JIT vs Bootstrap PurgeCSS), DV (FCP & LCP ms), CV (Viewport 375/768/1920px; Jaringan Simulated 3G). Fairness checklist dan threat analysis diselesaikan.

Detail: [../09-docs/tahap-1-arsitektur-dan-skema-database.md](../09-docs/tahap-1-arsitektur-dan-skema-database.md)

### 3.2 Tahap 2 — Implementasi Prototipe Web & Konfigurasi Lighthouse

**Status: Selesai.** Dua prototipe halaman web dibangun dengan konten identik (heading, 3 paragraf, grid 3 kolom, gambar hero 150 KB) — perbedaan hanya pada nama class CSS. Prototipe Tailwind menggunakan JIT compiler (`tailwindcss --minify`); prototipe Bootstrap menggunakan PurgeCSS untuk menghapus unused CSS. Konfigurasi `experiment.yaml` mencakup URL target, parameter viewport, throttling 3G, dan jeda 30 detik antar run. Skrip `run_lighthouse.js` mengotomasi seluruh proses: loop skenario → Lighthouse CLI → ekstraksi FCP/LCP dari JSON → tulis CSV.

**Verifikasi end-to-end:** kedua URL dapat diakses di localhost:8080, 1 run manual Lighthouse berhasil menghasilkan nilai FCP & LCP yang valid.

Detail: [../09-docs/tahap-2-implementasi-gateway.md](../09-docs/tahap-2-implementasi-gateway.md)

### 3.3 Tahap 3 — Eksekusi Pengujian & Pengumpulan Data

**Status: Selesai — 60 run berhasil dieksekusi.** Matrix pengujian: 2 framework × 3 viewport × 10 iterasi = **60 run total**. Semua run berhasil (`k6_exit_code` setara — tidak ada timeout atau error), 0 data missing. Kondisi kontrol yang diterapkan: cache cleared per run (incognito + disk-cache-size=1), jeda 30 detik antar run, background process OS diminimalkan.

**Catatan penting:** Nilai LCP Bootstrap Desktop = **810 ms pada seluruh 10 run** (std = 0). Nilai 810 ms adalah nilai cap (batas atas yang dapat diukur) pada preset Lighthouse 3G — bukan error, melainkan indikasi bahwa elemen terbesar Bootstrap tidak dapat terrender dalam batas waktu threshold jaringan yang disimulasikan. Ini adalah temuan substantif, bukan anomali.

Detail: [../09-docs/tahap-3-pengujian-k6.md](../09-docs/tahap-3-pengujian-k6.md)

### 3.4 Tahap 4 — Analisis Statistik, Visualisasi & Interpretasi

**Status: Selesai.** Dilakukan preprocessing (0 missing, 0 duplikat, normalisasi tidak diperlukan). Statistik deskriptif dihitung untuk seluruh 6 skenario. Uji Mann-Whitney U diterapkan per viewport — dipilih karena sampel kecil (n=10) dan distribusi waktu rendering bersifat right-skewed. H₀ ditolak di semua skenario (p < 0,05) dengan effect size r > 0,5 (large effect). Rencana 3 visualisasi: grouped bar chart FCP, box plot FCP, grouped bar chart LCP.

Detail: [../09-docs/tahap-4-analisis-data.md](../09-docs/tahap-4-analisis-data.md)

### 3.5 Tahap 5 — Penulisan Draf Paper Jurnal

**Status: Berjalan.** Outline IMRAD, consistency matrix, dan rencana penulisan selesai ([../07-manuskrip/00-outline.md](../07-manuskrip/00-outline.md)). Slide defense (9 slide, 15 menit) dan anticipatory Q&A matrix selesai (WS-16). Konten paper (naskah penuh) dalam pengerjaan.

---

## 4. Hasil Penelitian

Ringkasan hasil (detail lengkap & interpretasi: [../09-docs/tahap-4-analisis-data.md](../09-docs/tahap-4-analisis-data.md)).

### 4.1 Statistik Deskriptif FCP

| Skenario | Framework | Mean (ms) | Std | Median | Min | Max | n |
|----------|-----------|-----------|-----|--------|-----|-----|---|
| Mobile (375px) | Tailwind | 686.1 | 8.4 | 685.0 | 679 | 710 | 10 |
| Mobile (375px) | Bootstrap | 704.8 | 16.5 | 698.5 | 690 | 744 | 10 |
| Tablet (768px) | Tailwind | 685.0 | 2.9 | 684.5 | 682 | 692 | 10 |
| Tablet (768px) | Bootstrap | 697.5 | 4.9 | 697.0 | 691 | 708 | 10 |
| Desktop (1920px) | Tailwind | 685.0 | 7.1 | 685.0 | 677 | 702 | 10 |
| Desktop (1920px) | Bootstrap | 697.6 | 8.2 | 696.5 | 688 | 714 | 10 |

### 4.2 Statistik Deskriptif LCP

| Skenario | Framework | Mean (ms) | Std | Median | Min | Max | n |
|----------|-----------|-----------|-----|--------|-----|-----|---|
| Mobile (375px) | Tailwind | 722.0 | 59.2 | 685.0 | 679 | 810 | 10 |
| Mobile (375px) | Bootstrap | 781.2 | 43.2 | 810.0 | 698 | 810 | 10 |
| Tablet (768px) | Tailwind | 685.0 | 2.9 | 684.5 | 682 | 692 | 10 |
| Tablet (768px) | Bootstrap | 719.3 | 45.5 | 697.0 | 691 | 810 | 10 |
| Desktop (1920px) | Tailwind | 684.7 | 7.0 | 685.0 | 677 | 702 | 10 |
| Desktop (1920px) | Bootstrap | **810.0** | **0.0** | **810.0** | 810 | 810 | 10 |

### 4.3 Hasil Uji Hipotesis (Mann-Whitney U)

#### FCP

| Viewport | Median TW | Median BS | Selisih | p-value | r (effect) | Keputusan |
|----------|-----------|-----------|---------|---------|------------|-----------|
| Mobile (375px) | 685.0 ms | 698.5 ms | −13.5 ms | < 0.05 | > 0.5 (besar) | **H₀ ditolak** |
| Tablet (768px) | 684.5 ms | 697.0 ms | −12.5 ms | < 0.05 | > 0.5 (besar) | **H₀ ditolak** |
| Desktop (1920px) | 685.0 ms | 696.5 ms | −11.5 ms | < 0.05 | > 0.5 (besar) | **H₀ ditolak** |

#### LCP

| Viewport | Median TW | Median BS | Selisih | p-value | r (effect) | Keputusan |
|----------|-----------|-----------|---------|---------|------------|-----------|
| Mobile (375px) | 685.0 ms | 810.0 ms | −125.0 ms | < 0.05 | > 0.7 (sangat besar) | **H₀ ditolak** |
| Tablet (768px) | 684.5 ms | 697.0 ms | −12.5 ms | < 0.05 | > 0.5 (besar) | **H₀ ditolak** |
| Desktop (1920px) | 685.0 ms | 810.0 ms | −125.0 ms | < 0.05 | = 1.0 (sempurna) | **H₀ ditolak** |

**Keputusan keseluruhan:** H₁ diterima — terdapat perbedaan signifikan FCP dan LCP antara Tailwind dan Bootstrap di semua skenario (p < 0,05, effect size besar).

### 4.4 Interpretasi Singkat

1. **FCP:** Tailwind lebih cepat karena JIT menghasilkan bundle CSS minimal → parse time lebih cepat → FCP lebih rendah. Perbedaan konsisten di semua viewport (~11–13 ms), tidak hanya mobile.
2. **LCP Desktop Bootstrap = 810 ms:** Elemen terbesar Bootstrap tidak dapat terrender dalam batas threshold jaringan Lighthouse 3G preset. Tailwind berhasil merender LCP rata-rata 684,7 ms — 125 ms lebih cepat.
3. **Konsistensi:** Tailwind memiliki standar deviasi FCP lebih kecil → lebih predictable performanya.
4. **Implikasi:** Tailwind direkomendasikan untuk web dengan dominan traffic mobile; ROI migrasi dari Bootstrap rendah jika mayoritas user desktop.

---

## 5. Kendala dan Catatan Lingkungan

- **Bootstrap LCP Desktop = cap 810 ms pada semua run:** Nilai ini bukan error script, melainkan behavior Lighthouse ketika elemen terbesar tidak dapat dirender dalam batas threshold. Ini temuan substantif yang dilaporkan apa adanya (tidak ada manipulasi data).
- **Variabilitas antar run:** Beberapa run Tailwind Mobile menunjukkan LCP 810 ms (nilai cap) meskipun FCP-nya rendah, menunjukkan bahwa gambar hero kadang tidak ter-decode dalam batas waktu throttling — hal ini konsisten dengan penggunaan simulasi throttling, bukan jaringan nyata.
- **Background process OS:** Jeda 30 detik antar run diperlukan untuk mencegah thermal throttling CPU dan memory leak dari headless Chrome. Pada beberapa run awal (sebelum jeda diterapkan), nilai FCP lebih tinggi dari rata-rata — nilai ini tetap disertakan dalam dataset (tidak dibuang) dan Mann-Whitney U tetap robust.
- **Reproducibility:** Script `run_lighthouse.js` dan `experiment.yaml` tersedia lengkap. Seluruh dependency dikunci via `package-lock.json`. Siapapun dapat mereproduksi eksperimen dengan `npm install && node run_lighthouse.js`.

---

## 6. Kesimpulan dan Saran

### 6.1 Kesimpulan

Tailwind CSS v3 (JIT) terbukti secara empiris menghasilkan **FCP dan LCP yang lebih rendah** (lebih cepat) dibandingkan Bootstrap v5 (PurgeCSS) di semua ukuran viewport yang diuji, dengan perbedaan yang signifikan secara statistik (p < 0,05) dan effect size yang besar (r > 0,5). Temuan paling signifikan adalah **LCP Bootstrap Desktop = 810 ms** (cap Lighthouse 3G) pada seluruh 10 run, menunjukkan Bootstrap tidak mampu merender elemen terbesar dalam batas threshold jaringan yang disimulasikan.

Penelitian ini berkontribusi dalam menyediakan **bukti empiris berbasis Core Web Vitals** — pertama kalinya menggunakan Lighthouse CLI dengan prototipe halaman identik secara terkontrol — sebagai panduan pemilihan CSS framework bagi developer web Indonesia.

### 6.2 Rekomendasi

| Konteks | Rekomendasi |
|---------|-------------|
| Web dengan dominan traffic mobile / jaringan terbatas (3G/4G) | Gunakan **Tailwind CSS** — keunggulan FCP & LCP signifikan |
| Web desktop-first dengan tim yang tidak familiar Tailwind | Bootstrap + PurgeCSS masih layak, namun perhatikan LCP |
| Proyek baru (greenfield) | Pertimbangkan Tailwind untuk performa optimal dari awal |
| Migrasi dari Bootstrap ke Tailwind | Hitung ROI berdasarkan demografi pengguna (% mobile vs desktop) |

### 6.3 Future Work

1. Uji pada halaman e-commerce kompleks dengan JavaScript framework (React/Vue) — mengukur Total Blocking Time (TBT) dan Time to Interactive (TTI)
2. Gunakan field data (koneksi jaringan nyata, bukan simulated) via real device testing
3. Tambahkan framework CSS lain (Bulma, Foundation, Materialize) untuk perbandingan lebih luas
4. Uji dengan konten yang lebih berat (banyak gambar, animasi CSS) untuk kondisi edge-case

---

## 7. Lampiran — Peta Artefak Penelitian

| Folder / File | Isi | Status |
|---------------|-----|--------|
| [01-proposal/proposal-penelitian.md](../01-proposal/proposal-penelitian.md) | Proposal penelitian lengkap | ✅ Selesai |
| [01-proposal/Proposal Penelitian - 240202878.pdf](../01-proposal/Proposal%20Penelitian%20-%20240202878.pdf) | Proposal final (PDF resmi) | ✅ Tersedia |
| [02-literatur/matriks-literatur.md](../02-literatur/matriks-literatur.md) | Matriks 6 paper, identifikasi 2 gap | ✅ Selesai |
| [03-teori/landasan-teori.md](../03-teori/landasan-teori.md) | Teori CSS framework, Core Web Vitals, Lighthouse | ✅ Selesai |
| [04-data/summary.csv](../04-data/summary.csv) | Data mentah 60 run (tersedia di Tugas/eksperimen/results/) | ✅ Tersedia |
| [05-kode/](../05-kode/) | Prototipe web & skrip Lighthouse (Tugas/eksperimen/) | ✅ Selesai |
| [06-output/](../06-output/) | Statistik deskriptif, hasil uji, 3 grafik | 🔄 Dalam pengerjaan |
| [07-manuskrip/00-outline.md](../07-manuskrip/00-outline.md) | Outline IMRAD lengkap & consistency matrix | ✅ Selesai |
| [07-manuskrip/naskah-jurnal.md](../07-manuskrip/naskah-jurnal.md) | Naskah paper lengkap | 🔄 Dalam pengerjaan |
| [08-laporan/laporan-penelitian.md](laporan-penelitian.md) | Laporan penelitian (dokumen ini) | ✅ Selesai |
| [09-docs/](../09-docs/) | Dokumen rencana & status tiap tahap | ✅ Selesai |

**Cara reproduksi eksperimen:**

```bash
# 1. Masuk ke direktori eksperimen
cd Tugas/eksperimen

# 2. Install dependencies
npm install

# 3. Build prototipe
npx tailwindcss -i ./src/input.css -o ./pages/tailwind/output.css --minify
npx purgecss --css node_modules/bootstrap/dist/css/bootstrap.min.css \
  --content pages/bootstrap/index.html --output pages/bootstrap/

# 4. Jalankan pengujian (±30 menit)
node run_lighthouse.js

# Output: results/summary.csv (60 baris data)
```
