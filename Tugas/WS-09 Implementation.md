# WS-09 Implementation

 **Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---

## Template A.9 — Dokumentasi Setup Eksperimen

```
EXPERIMENT SETUP DOCUMENTATION

Hardware:
  CPU     : Intel Core i7-12700H, 14 Core (Contoh)
  RAM     : 16 GB DDR4 (Contoh)
  GPU     : Integrated / Tidak digunakan (CPU-only untuk Lighthouse CLI)
  Storage : 512GB NVMe SSD (Contoh)

Software:
  OS        : Windows 11 64-bit (Contoh)
  Runtime   : Node.js v18.16.0 LTS
  Framework : Tailwind CSS v3.3, Bootstrap v5.3 + PurgeCSS v5.0, Lighthouse CLI v11.3.0
```
Dependencies:
| Library | Version | Sumber | Hash/Checksum |
|---------|---------|--------|---------------|
| lighthouse | 11.3.0 | npm | (sesuai package-lock.json) |
| http-server | 14.1.1 | npm | (sesuai package-lock.json) |
| tailwindcss | 3.3.0 | npm | (sesuai package-lock.json) |
| bootstrap | 5.3.0 | npm | (sesuai package-lock.json) |
| purgecss | 5.0.0 | npm | (sesuai package-lock.json) |
```
Konfigurasi:
  Config file     : `experiment.yaml` (berisi target URL, viewport setting, network throttling params).
  Random seed     : Tidak diperlukan untuk Lighthouse deterministik pada konten statis (walau lag OS tetap random).
  Hyperparameters : Throttling preset Lighthouse: `mobile3G` (RTT: 150ms, Throughput: 1.6Mbps).

Reproducibility Check:
  [x] Dependency terdokumentasi (requirements.txt / lock file) -> package-lock.json
  [x] Seed ditetapkan di semua level (Python, NumPy, framework) -> N/A (tidak pakai ML)
  [x] Config di version control
  [x] README instruksi reproduksi lengkap
```
---

## Latihan 1 — Environment Specification

(Tabel ini sudah disatukan ke dalam bagian Template A.9 di atas sesuai instruksi).

---

## Latihan 2 — Repeatability Test Plan

Rancang tes repeatability sederhana: jalankan kode yang sama 3× di environment yang sama.

| Run | Kondisi | Metrik Utama (FCP) | Hasil Sama (Mendekati)? |
|-----|------|-------------|-------------|
| 1 | Tailwind (Mobile) | (Misal: 1200ms) | — |
| 2 | Tailwind (Mobile) | (Misal: 1215ms) | [x] Ya / [ ] Tidak |
| 3 | Tailwind (Mobile) | (Misal: 1210ms) | [x] Ya / [ ] Tidak |

**Jika hasil berbeda ekstrim, kemungkinan penyebab:**
> - **Background process** — antivirus scan, sinkronisasi cloud aktif saat eksekusi yang merampas CPU/Disk IO.
> - **Thermal throttling** — Jika script dijalankan 60 kali berturut tanpa henti, CPU laptop bisa overheat, membuat run terakhir lebih lambat.
> - **Browser Cache** — Run ke-2 mungkin membaca cache CSS dari memori sehingga lebih cepat (FCP turun drastis).

**Checklist kontrol yang sudah diterapkan:**
- [x] Random seed di-set di semua level (N/A)
- [x] Tidak ada background process yang mengganggu
- [x] Cache dibersihkan antar-run (menggunakan flag CLI `--chrome-flags="--incognito --disk-cache-size=1"`)
- [x] Config file yang sama untuk semua run

---

## Latihan 3 — README Eksperimen

Tulis README minimum untuk eksperimen Anda (6 komponen wajib).

```markdown
# Judul Eksperimen: Perbandingan FCP/LCP Tailwind vs Bootstrap

## 1. Environment
OS: Windows 11, Node.js v18.16.0
Hardware: Intel Core i7 16GB RAM

## 2. Installation
Jalankan di root folder:
`npm install` (akan menginstall lighthouse CLI dan framework dependensi sesuai package-lock.json).

## 3. Data
Prototipe halaman web identik ada di direktori `/pages/tailwind/index.html` dan `/pages/bootstrap/index.html`. Kedua folder memiliki gambar statis (`hero.jpg` 150KB).

## 4. Execution
Buka dua terminal:
Terminal 1: Jalankan local server `npx http-server ./pages -p 8080`
Terminal 2: Jalankan skrip test `node run_lighthouse.js`

## 5. Configuration
File config utama ada di `experiment.yaml`. Mengandung list URL, daftar ukuran viewport yang akan di-emulasikan (375, 768, 1920), dan jumlah iterasi (10x run per URL).

## 6. Expected Output
Direktori `/results` akan menyimpan `results_summary.csv` berisi kolom: framework, viewport, run_id, FCP_ms, LCP_ms.
```

---

## Refleksi

> Apakah eksperimen Anda saat ini bisa direproduksi oleh orang lain tanpa bantuan Anda? Komponen apa yang masih hilang?

**Level saat ini:** [ ] Repeatability / [x] Reproducibility / [ ] Belum keduanya
**Komponen yang belum terdokumentasi:**
> Secara keseluruhan, eksperimen ini bisa direproduksi dengan baik karena menggunakan standar Node.js dan NPM script yang umum. Yang terpenting adalah dokumentasi arsitektur direktori harus dijaga kejelasannya agar penguji lain tidak mengubah konten HTML saat melakukan setup.
