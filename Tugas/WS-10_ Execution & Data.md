# WS-10_ Execution & Data

 **Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---

## Template A.10 — Execution Plan & Data Log

```
EXECUTION PLAN

| Run Batch | Skenario (Viewport) | Framework | Parameter (Network) | Waktu Jeda | Output File |
|-------|----------|------|-----------|--------|-------------|
| Batch 1 | Mobile (375px) | Tailwind & Bootstrap | simulated 3G | 30 detik antar run | `results_mobile.csv` |
| Batch 2 | Tablet (768px) | Tailwind & Bootstrap | simulated 3G | 30 detik antar run | `results_tablet.csv` |
| Batch 3 | Desktop (1920px) | Tailwind & Bootstrap | simulated 3G | 30 detik antar run | `results_desktop.csv` |

Jumlah runs per skenario : 10 run (per framework per viewport)
Total runs               : 60 run (3 viewport * 2 framework * 10 iterasi)

DATA LOG (Format contoh untuk satu row CSV output script):
  Run ID    : run_tailwind_mobile_01
  Timestamp : 2026-07-06T10:05:00
  Skenario  : Viewport Mobile 375px
  Input     : localhost:8080/tailwind/index.html
  Output    : FCP: 1250ms, LCP: 1300ms, Score: 85
  Anomali   : (Jika gagal: timeout Lighthouse)
```

---

## Latihan 1 — Execution Plan

Susun execution plan untuk eksperimen Anda. Tentukan skenario, jumlah run, dan seed sebelum eksekusi.

| Skenario | Framework | Viewport | Runs | Status |
|----------|-----------|----------|------|--------|
| A1 | Bootstrap | Mobile (375px) | 10 | Planned |
| A2 | Bootstrap | Tablet (768px) | 10 | Planned |
| A3 | Bootstrap | Desktop (1920px) | 10 | Planned |
| B1 | Tailwind | Mobile (375px) | 10 | Planned |
| B2 | Tailwind | Tablet (768px) | 10 | Planned |
| B3 | Tailwind | Desktop (1920px) | 10 | Planned |

*(Semua kondisi dilakukan dengan randomisasi urutan pengujian untuk mengeliminasi order-effect)*

**Total skenario:** 6 skenario dasar (2 Framework x 3 Viewport)
**Run per skenario:** 10 iterasi
**Total run keseluruhan:** 60 runs

---

## Latihan 2 — Data Log Terstruktur

Desain format data log untuk eksperimen Anda. Tentukan field apa saja yang akan dicatat.

**Identitas:**
| Field | Contoh |
|-------|--------|
| Run ID | `run_tailwind_mobile_05` |
| Timestamp | `2026-07-06T10:08:22Z` |
| Skenario | `Mobile (375px)` |

**Konfigurasi:**
| Field | Contoh |
|-------|--------|
| Framework | `Tailwind CSS v3 JIT` |
| Network Profile | `Lighthouse Simulated 3G` |
| Cache Policy | `Cleared (Incognito)` |

**Hasil:**
| Metrik | Tipe Data | Range Valid |
|--------|----------|-------------|
| `FCP` | Float | 0.0 - 15000.0 (ms) |
| `LCP` | Float | 0.0 - 15000.0 (ms) |
| `Lighthouse Score` | Int | 0 - 100 |

**Format output:** [x] CSV / [ ] JSON / [ ] Database / [ ] Lainnya: -

---

## Latihan 3 — Anomaly Protocol

Rencanakan bagaimana menangani anomali. Untuk setiap jenis, tentukan langkah yang diambil.

| Jenis Anomali | Contoh | Tindakan |
|---------------|--------|----------|
| Run gagal (crash) | Timeout Lighthouse gagal akses Localhost | Hapus run (invalid run), tunggu 60 detik, restart http-server, lakukan re-run untuk menggantikan ID yang hilang. Catat kejadian di file README log. |
| Hasil ekstrem | FCP tiba-tiba 8000ms pada 1 run | Biarkan hasil (catat apa adanya). Metode statistik Mann-Whitney (Median) akan kebal terhadap outlier ini. |
| FCP lebih besar dari LCP | Metrik error (secara logis FCP <= LCP) | Run ditandai invalid, data dibuang dan dilakukan re-run sesi pengujian. |
| Waktu eksekusi script macet | Node.js hang | Force stop, bersihkan RAM, mulai ulang *batch* terakhir. |

---

## Refleksi

> Pernahkah Anda melaporkan hasil riset/tugas dari single run? Apa risikonya? Bagaimana multiple run mengubah kepercayaan terhadap hasil?

**Pengalaman sebelumnya:**
> Dulu sering mencoba tool CLI atau skrip algoritma hanya sekali dan langsung mencatat "Oh, framework A kecepatannya 1.5 detik".
**Yang akan dilakukan berbeda:**
> Risikonya adalah mengabaikan efek fluktuasi OS, RAM, atau lonjakan CPU background. Melakukan *multiple runs* dan mengambil nilai Median (atau IQR) menyajikan data performa yang jauh lebih solid dan membedakan variasi sistem dengan perbedaan aktual dari arsitektur framework CSS itu sendiri.
