# Tahap 1 — Desain Eksperimen & Setup Lingkungan Pengujian

**Status:** Selesai
**Acuan:** [rencana-penelitian.md](rencana-penelitian.md)
**Lokasi kode & prototipe:** [../../../Tugas/eksperimen/](../../../Tugas/eksperimen/)

---

## 1. Tujuan Tahap

Merancang arsitektur sistem eksperimen, mendefinisikan variabel secara operasional, menyiapkan lingkungan pengujian (prototipe halaman, Lighthouse CLI, skrip otomasi), serta memastikan seluruh kondisi eksperimen dapat dikontrol dan direproduksi.

---

## 2. Arsitektur Sistem Eksperimen

```
┌─────────────────────────────────────────────────────┐
│                  Mesin Pengujian (localhost)          │
│                                                      │
│   ┌──────────────────┐     ┌─────────────────────┐   │
│   │  http-server      │     │  run_lighthouse.js  │   │
│   │  (port 8080)      │◄────│  (Node.js script)   │   │
│   │                   │     │                     │   │
│   │  /pages/tailwind/ │     │  Baca experiment.   │   │
│   │  /pages/bootstrap/│     │  yaml → loop URL    │   │
│   └──────────────────┘     │  → Lighthouse CLI   │   │
│                              │  → parse JSON →     │   │
│                              │  tulis CSV          │   │
│                              └─────────────────────┘   │
│                                        │               │
│                              ┌─────────▼─────────┐     │
│                              │  /results/        │     │
│                              │  summary.csv      │     │
│                              └───────────────────┘     │
└─────────────────────────────────────────────────────┘
```

**Komponen utama:**

| Komponen | Peran | Detail |
|----------|-------|--------|
| Prototipe halaman (IV) | Dua versi halaman dengan konten **identik** | `/pages/tailwind/index.html` & `/pages/bootstrap/index.html` |
| http-server | Menyajikan file statis di localhost | `npx http-server ./pages -p 8080` |
| Lighthouse CLI v11 | Mengukur FCP & LCP (DV) | Mode headless, simulated throttling 3G |
| `run_lighthouse.js` | Otomasi eksekusi & ekstraksi metrik | Node.js — baca `experiment.yaml`, loop skenario, tulis CSV |
| `experiment.yaml` | Konfigurasi terpusat (CV) | URL, viewport, iterasi, throttling parameter |
| `results/summary.csv` | Output data eksperimen | 60 baris data (Framework, Viewport, Run_ID, FCP_ms, LCP_ms, Score) |

---

## 3. Definisi Variabel & Operasionalisasi

### 3.1 Variabel Independen (IV)

| Kondisi | Framework | Versi | Build Optimizer | URL Pengujian |
|---------|-----------|-------|-----------------|---------------|
| Control | Bootstrap | v5.3.0 | PurgeCSS v5.0 | `localhost:8080/bootstrap/` |
| Treatment | Tailwind CSS | v3.3.0 | JIT Compiler (built-in) | `localhost:8080/tailwind/` |

### 3.2 Variabel Dependen (DV)

| Metrik | Definisi | Sumber Data | Satuan |
|--------|----------|-------------|--------|
| First Contentful Paint (FCP) | Waktu hingga elemen pertama bermakna tampil | `audits['first-contentful-paint'].numericValue` di JSON Lighthouse | ms |
| Largest Contentful Paint (LCP) | Waktu hingga elemen terbesar tampil sepenuhnya | `audits['largest-contentful-paint'].numericValue` di JSON Lighthouse | ms |

### 3.3 Variabel Kontrol (CV)

| Variabel | Nilai Terkunci | Cara Mengontrol |
|----------|---------------|-----------------|
| Ukuran Viewport | 375px (mobile), 768px (tablet), 1920px (desktop) | Flag `--screenEmulation` pada Lighthouse |
| Kondisi Jaringan | Simulated 3G (RTT 150ms, throughput 1.638 Kbps) | `throttlingMethod: simulate` di `experiment.yaml` |
| Cache Browser | Disabled | Flag `--chrome-flags="--incognito --disk-cache-size=1"` |
| Jeda Antar-run | 30 detik | `sleep(30000)` di `run_lighthouse.js` |
| Versi Lighthouse | v11.3.0 | Dikunci via `package-lock.json` |

---

## 4. Spesifikasi Lingkungan Pengujian

```yaml
# Hardware
CPU     : Intel Core i7 (14 core)
RAM     : 16 GB DDR4
Storage : NVMe SSD
GPU     : Tidak digunakan (Lighthouse CLI CPU-only)

# Software
OS        : Windows 11 64-bit
Runtime   : Node.js v18.16.0 LTS
Lighthouse: v11.3.0 (npm)
Framework : Tailwind CSS v3.3.0, Bootstrap v5.3.0, PurgeCSS v5.0.0
Server    : http-server v14.1.1
```

---

## 5. Prinsip Fairness Eksperimen

Fairness checklist (dari WS-07):

| Kriteria | Status | Detail |
|----------|--------|--------|
| Konten halaman identik | ✅ | Sama struktur HTML: heading, 3 paragraf, grid 3 kolom, 1 gambar hero (150 KB) |
| Preprocessing setara | ✅ | Tailwind: JIT build; Bootstrap: PurgeCSS — keduanya menghapus unused CSS |
| Tuning effort setara | ✅ | Tidak ada inline CSS tambahan yang bias ke salah satu pihak |
| Environment identik | ✅ | Satu mesin, eksekusi serial via script otomasi |
| Metrik evaluasi sama | ✅ | FCP & LCP dari `audits` object yang sama pada JSON Lighthouse v11 |

---

## 6. Threat Analysis & Mitigasi

| Jenis Ancaman | Ancaman Spesifik | Mitigasi |
|---------------|-----------------|----------|
| Internal | Cache browser mempercepat run ke-2 dst. | Hard-clear cache + incognito flag setiap eksekusi |
| Internal | CPU thermal throttling pada run panjang | Jeda 30 detik antar run; mematikan background task OS |
| External | Hanya menguji 1 layout halaman statis | Dicatat di limitasi: tidak merepresentasikan web produksi kompleks |
| Construct | Lighthouse tidak mencerminkan *real user* sepenuhnya | Throttling software 3G mensimulasikan perangkat mobile riil |
| Conclusion | n=10 kecil → statistik lemah | Uji non-parametrik (Mann-Whitney U) tidak bergantung asumsi normalitas |

---

## 7. Format Output Data

```csv
Framework,Viewport,Run_ID,FCP_ms,LCP_ms,Performance_Score
tailwind,mobile,1,684.00,684.00,100
bootstrap,mobile,1,690.00,810.00,100
...
```

Kolom lengkap: `Framework` (tailwind/bootstrap), `Viewport` (mobile/tablet/desktop), `Run_ID` (1–10), `FCP_ms`, `LCP_ms`, `Performance_Score` (0–100).

---

## 8. Deliverable Tahap 1

- [x] Skema variabel terdefinisi (IV, DV, CV) dengan satuan & cara pengukuran
- [x] Arsitektur sistem pengujian terdokumentasi
- [x] Fairness checklist & threat analysis selesai
- [x] Spesifikasi lingkungan hardware/software terdokumentasi
- [x] Format output CSV dirancang
- [x] File `experiment.yaml` dirancang (detail di Tahap 2)
