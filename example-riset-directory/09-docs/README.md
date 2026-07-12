# 09-docs

Dokumen perencanaan & panduan kerja penelitian.

**Peneliti:** Rafi Kurniawan — NIM 240202878
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
**Mata Kuliah:** Riset Teknologi Informasi — Helmi Bahar Alim, S.Kom., M.Kom

---

## Isi

- [rencana-penelitian.md](rencana-penelitian.md) — **indeks utama**, ringkasan topik & roadmap 5 tahap
- [tahap-1-arsitektur-dan-skema-database.md](tahap-1-arsitektur-dan-skema-database.md) — desain eksperimen & setup lingkungan pengujian *(selesai)*
- [tahap-2-implementasi-gateway.md](tahap-2-implementasi-gateway.md) — implementasi prototipe web & konfigurasi Lighthouse *(selesai)*
- [tahap-3-pengujian-k6.md](tahap-3-pengujian-k6.md) — eksekusi pengujian & pengumpulan data *(selesai)*
- [tahap-4-analisis-data.md](tahap-4-analisis-data.md) — analisis statistik, visualisasi & interpretasi *(selesai)*
- [tahap-5-draf-paper.md](tahap-5-draf-paper.md) — rencana penulisan draf paper jurnal *(berikutnya)*

Deliverable konkret tiap tahap (kode, data, hasil, naskah) disimpan di folder bernomor terkait (lihat [README utama](../README.md)).

## Ringkasan Penelitian

| Item | Keterangan |
|------|------------|
| Judul | Analisis Perbandingan Performa Rendering Web: Tailwind CSS vs Bootstrap Berdasarkan Metrik FCP dan LCP Lighthouse pada Berbagai Ukuran Layar |
| Paradigma | Positivis — eksperimen kuantitatif terkontrol |
| Masalah | Pemilihan framework CSS sering berbasis popularitas, bukan data performa rendering empiris |
| Solusi | Eksperimen komparatif terkontrol: Tailwind CSS v3 (JIT) vs Bootstrap v5 (PurgeCSS) |
| Instrumen | Lighthouse CLI v11 (FCP & LCP dalam ms) |
| Skenario | 3 viewport × 2 framework × 10 iterasi = 60 run total |
| Analisis | Mann-Whitney U + effect size (rank-biserial correlation r) |
| Target Publikasi | Jurnal Sinta 2 / Konferensi Nasional |
