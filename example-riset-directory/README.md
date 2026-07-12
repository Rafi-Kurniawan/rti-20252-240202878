# Perbandingan Performa Tailwind CSS vs Bootstrap — Penelitian Lighthouse FCP/LCP

**Judul:** Analisis Perbandingan Performa Rendering Web: Tailwind CSS vs Bootstrap Berdasarkan Metrik First Contentful Paint dan Largest Contentful Paint pada Berbagai Ukuran Layar

**Peneliti:** Rafi Kurniawan
**NIM:** 240202878
**Mata Kuliah:** Riset Teknologi Informasi — Helmi Bahar Alim, S.Kom., M.Kom
**Target Publikasi:** Sinta 5 (Jurnal Nasional Informatika) atau Konferensi Nasional

## Ringkasan

Penelitian ini membandingkan performa rendering halaman web antara dua framework CSS populer — **Tailwind CSS v3 (JIT)** dan **Bootstrap v5 (PurgeCSS)** — menggunakan metrik standar Core Web Vitals (**First Contentful Paint** dan **Largest Contentful Paint**) via Lighthouse CLI v11. Eksperimen dilakukan pada dua prototipe halaman web yang **identik secara konten**, diuji di **tiga ukuran viewport** (mobile 375px, tablet 768px, desktop 1920px) dengan simulasi jaringan 3G, masing-masing **10 iterasi** — total 60 run pengukuran.

**Temuan utama:**
- Tailwind CSS menghasilkan FCP lebih cepat ~11–13 ms di semua viewport (signifikan statistik, p < 0,05, effect size r > 0,5)
- Bootstrap LCP Desktop terkunci di **810 ms** pada seluruh 10 run (nilai cap Lighthouse 3G), vs Tailwind rata-rata **684,7 ms**
- Tailwind lebih konsisten (standar deviasi lebih kecil) di semua skenario

Detail topik & roadmap: [09-docs/rencana-penelitian.md](09-docs/rencana-penelitian.md)

## Struktur Direktori

| Folder | Isi |
|--------|-----|
| [00-admin/](00-admin/) | Administrasi penelitian (jadwal, log pelaksanaan, korespondensi) |
| [01-proposal/](01-proposal/) | Proposal penelitian (draf & final) |
| [02-literatur/](02-literatur/) | Referensi & matriks literatur (Tinjauan Pustaka) |
| [03-teori/](03-teori/) | Landasan teori: CSS framework, Core Web Vitals, Lighthouse |
| [04-data/](04-data/) | Data mentah hasil pengujian Lighthouse (summary.csv, 60 run) |
| [05-kode/](05-kode/) | Source code: prototipe web (Tailwind & Bootstrap), skrip Lighthouse |
| [06-output/](06-output/) | Statistik deskriptif, hasil uji Mann-Whitney U & visualisasi |
| [07-manuskrip/](07-manuskrip/) | Draf naskah jurnal (Tahap 5) |
| [08-laporan/](08-laporan/) | Laporan progres & laporan akhir penelitian |
| [09-docs/](09-docs/) | Dokumen perencanaan & roadmap tahap-tahap penelitian |

## Status Tahapan

- [x] **Tahap 1** — Desain Eksperimen & Setup Lingkungan — *Selesai* ([detail](09-docs/tahap-1-arsitektur-dan-skema-database.md))
- [x] **Tahap 2** — Implementasi Prototipe Web & Konfigurasi Lighthouse — *Selesai* ([detail](09-docs/tahap-2-implementasi-gateway.md))
- [x] **Tahap 3** — Eksekusi Pengujian & Pengumpulan Data (60 run) — *Selesai* ([detail](09-docs/tahap-3-pengujian-k6.md))
- [x] **Tahap 4** — Analisis Statistik, Visualisasi & Interpretasi — *Selesai* ([detail](09-docs/tahap-4-analisis-data.md))
- [ ] **Tahap 5** — Penulisan Draf Paper Jurnal — *Sedang berjalan* ([detail](09-docs/tahap-5-draf-paper.md))

## Laporan Penelitian

Laporan penelitian komprehensif (ringkasan eksekutif, metodologi per tahap, hasil aktual, kendala, kesimpulan): [08-laporan/laporan-penelitian.md](08-laporan/laporan-penelitian.md)

## Author

Rafi Kurniawan — NIM 240202878
