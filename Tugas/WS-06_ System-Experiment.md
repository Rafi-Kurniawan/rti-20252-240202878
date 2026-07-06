# WS-06 System-Experiment

 **Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---

## Template A.6 — Mapping RQ ke Arsitektur Sistem

```
SYSTEM-EXPERIMENT MAPPING

Research Question: Apakah halaman web Tailwind CSS (JIT) menghasilkan FCP dan LCP berbeda secara signifikan dibanding Bootstrap (PurgeCSS) pada berbagai viewport menggunakan Lighthouse CLI?

Variable → Component Mapping:
| Variabel | Tipe | Komponen Sistem | Cara Manipulasi/Pengukuran |
|----------|------|-----------------|---------------------------|
| Framework CSS | IV | Folder prototipe halaman statis (`/tailwind` dan `/bootstrap`) | Swap URL target pada `http-server` (localhost:8080/tailwind vs localhost:8080/bootstrap). |
| FCP & LCP | DV | Automation script Node.js (`run_lighthouse.js`) | Parsing JSON output Lighthouse (`audits.first-contentful-paint` dan `audits.largest-contentful-paint`). |
| Viewport & Jaringan | CV | Parameter command line Lighthouse & config file YAML | Mengubah flag `--chrome-flags` dan parameter throttling jaringan via configuration `experiment.yaml`. |

4 Prinsip Desain:
  [x] Traceability — Setiap komponen bisa ditelusuri ke variabel
  [x] Variable Isolation — IV bisa diubah tanpa mengubah CV
  [x] Measurement Integration — Pengukuran DV built-in
  [x] Reproducibility — Setup bisa direkonstruksi

Experimental Setup:
  Input data     : File konfigurasi `experiment.yaml` berisi URL, jumlah run, flag throttling.
  Parameter      : `runs: 10`, `throttlingMethod: simulated`, ukuran viewport (mobile/tablet/desktop).
  Output format  : CSV agregat dengan kolom: `framework`, `viewport`, `run_id`, `fcp`, `lcp`, `score`.
```

---

## Latihan 1 — Variable-to-Component Mapping

Gunakan RQ dan variabel dari WS-05. Petakan ke komponen sistem.

**RQ:** Apakah terdapat perbedaan FCP dan LCP yang signifikan antara framework Tailwind dan Bootstrap di berbagai viewport?

| Variabel | Tipe | Komponen Sistem | Cara Manipulasi / Pengukuran |
|----------|------|-----------------|---------------------------|
| Framework (IV) | IV | Prototipe Web (File HTML + File CSS) | Menjalankan build command dan menempatkannya pada sub-direktori URL yang berbeda. |
| FCP & LCP (DV) | DV | Modul Data Extractor (Lighthouse Runner) | Ekstraksi otomatis metrics.numericValue dari payload respon JSON. |
| Variasi Viewport (CV) | CV | Lighthouse Emulation Settings | Pengaturan form factor (mobile/desktop) dan screen width/height pada script eksekutor. |

**Apakah semua variabel bisa di-map?** [x] Ya / [ ] Tidak
> Jika tidak, komponen apa yang perlu ditambahkan? -

---

## Latihan 2 — 4 Prinsip Desain

Evaluasi desain sistem terhadap 4 prinsip.

| Prinsip | Status | Bukti / Penjelasan |
|---------|--------|-------------------|
| Traceability | ✅ | File HTML/CSS murni untuk IV, Node.js script untuk DV, dan YAML config untuk CV. Masing-masing terpisah rapi. |
| Modularity | ✅ | Jika ingin mengganti framework (misal menambah Bulma), cukup menambah folder HTML tanpa menyentuh script Lighthouse. |
| Controllability | ✅ | Kondisi simulasi 3G, pembersihan cache, dan ukuran viewport diatur melalui file `experiment.yaml` bukan di-hardcode. |
| Measurability | ✅ | Script akan langsung membuang data yang tidak relevan dari Lighthouse dan memformat metrik esensial menjadi `.csv`. |

**Prinsip mana yang paling sulit dipenuhi?** Controllability (khususnya untuk memastikan lingkungan OS stabil).
**Strategi untuk mengatasinya:**
> Mematikan *background tasks* di OS selama script berjalan, dan menambahkan *sleep* antar eksekusi untuk membersihkan memory/garbage collection agar pengukuran pertama tidak memengaruhi kecepatan pengukuran kedua (menghindari memory leak dari Headless Chrome).

---

## Latihan 3 — Ablation Study Planning

*Catatan: Topik ini adalah **Comparison Study** (A vs B), bukan murni Ablation Study. Namun jika diterapkan pada konteks optimasi build, kondisinya seperti ini:*

| Kondisi | Komponen A (Framework Dasar) | Komponen B (Build Optimizer) | Komponen C (Minifikasi) | Hasil yang Diharapkan |
|---------|-----------|-----------|-----------|----------------------|
| Full | Bootstrap (Dasar) | PurgeCSS (Hilangkan unused) | Minifier (CSS nano) | Performa terbaik dari Bootstrap (Baseline) |
| – B | Bootstrap | Tanpa PurgeCSS | Minifier (CSS nano) | Mengukur dampak memuat file utuh (raw bootstrap). |
| – C | Bootstrap | PurgeCSS | Tanpa Minifier | Mengukur dampak kompresi spasi/karakter. |

**Komponen mana yang diprediksi paling berkontribusi?** Komponen B (Build Optimizer / PurgeCSS).
**Mengapa?**
> Menghapus class CSS yang tidak digunakan (PurgeCSS pada Bootstrap atau JIT pada Tailwind) akan membuang ratusan kilobytes kode mati (dead code) yang paling berdampak langsung pada penghematan Parse Time saat critical rendering path, dibanding hanya menghapus spasi kosong (minifikasi).

---

## Refleksi

> Apa risiko jika sistem dibangun seperti produk (monolitik, fitur lengkap) lalu baru dilakukan eksperimen? Mengapa arsitektur modular penting untuk riset?

**Jawaban:**
> Jika sistem dibangun seperti produk monolitik, kita tidak bisa mengisolasi *bottleneck* secara presisi. Jika halaman lambat, kita tidak tahu apakah itu karena framework CSS-nya, query database-nya, eksekusi JS-nya, atau server routing-nya. 
> Arsitektur modular (seperti pada eksperimen ini yang murni halaman statis HTML/CSS tanpa JS kompleks atau server dinamis) sangat penting untuk riset karena menjamin variabel independen kita (framework CSS) adalah satu-satunya penyebab (faktor dominan) perbedaan performa, mengeliminasi variabel pengganggu (confounding variables) yang mungkin muncul di aplikasi monolith.
