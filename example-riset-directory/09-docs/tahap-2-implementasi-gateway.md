# Tahap 2 — Implementasi Prototipe Web & Konfigurasi Lighthouse

**Status:** Selesai
**Acuan desain:** [tahap-1-arsitektur-dan-skema-database.md](tahap-1-arsitektur-dan-skema-database.md)
**Lokasi kode:** [../../../Tugas/eksperimen/](../../../Tugas/eksperimen/)

---

## 1. Tujuan Tahap

Membangun dua prototipe halaman web dengan konten yang **identik secara struktural**, mengkonfigurasi skrip otomasi Lighthouse, dan memverifikasi bahwa kondisi pengujian siap dijalankan secara reproducible.

---

## 2. Prototipe Halaman Web

### 2.1 Prinsip Identitas Konten

Kedua halaman (`/pages/tailwind/index.html` dan `/pages/bootstrap/index.html`) dirancang identik pada:

| Elemen | Detail |
|--------|--------|
| Heading utama (H1) | Teks identik |
| Paragraf konten | 3 paragraf dengan panjang teks sama |
| Layout | Grid 3 kolom (card) dengan konten teks & ikon/gambar |
| Gambar hero | File statis `hero.jpg`, ukuran ~150 KB |
| Struktur HTML | Semantik identik (nav, main, section, footer) |
| **Perbedaan yang diizinkan** | Nama class CSS saja (utility-class Tailwind vs component-class Bootstrap) |

### 2.2 Prototipe Tailwind CSS (`/pages/tailwind/`)

```
pages/tailwind/
├── index.html          ← Halaman utama dengan utility classes Tailwind
└── output.css          ← File CSS hasil build JIT (hanya class yang digunakan)
```

**Build command:**
```bash
npx tailwindcss -i ./src/input.css -o ./pages/tailwind/output.css --minify
```

Proses JIT menghasilkan file CSS hanya berisi class yang digunakan di `index.html`, membuang semua definisi yang tidak terpakai.

### 2.3 Prototipe Bootstrap (`/pages/bootstrap/`)

```
pages/bootstrap/
├── index.html          ← Halaman utama dengan component classes Bootstrap
└── bootstrap.min.css   ← CSS Bootstrap setelah PurgeCSS
```

**Build command (PurgeCSS):**
```bash
npx purgecss --css node_modules/bootstrap/dist/css/bootstrap.min.css \
  --content pages/bootstrap/index.html \
  --output pages/bootstrap/
```

Proses PurgeCSS menghapus definisi class Bootstrap yang tidak digunakan di `index.html`, menyetarakan kondisi optimasi dengan Tailwind JIT.

---

## 3. Konfigurasi Eksperimen (`experiment.yaml`)

```yaml
# experiment.yaml — konfigurasi terpusat pengujian Lighthouse
runs: 10

targets:
  - label: tailwind
    viewport: mobile
    url: http://localhost:8080/tailwind/
    width: 375
    height: 667
  - label: tailwind
    viewport: tablet
    url: http://localhost:8080/tailwind/
    width: 768
    height: 1024
  - label: tailwind
    viewport: desktop
    url: http://localhost:8080/tailwind/
    width: 1920
    height: 1080
  - label: bootstrap
    viewport: mobile
    url: http://localhost:8080/bootstrap/
    width: 375
    height: 667
  - label: bootstrap
    viewport: tablet
    url: http://localhost:8080/bootstrap/
    width: 768
    height: 1024
  - label: bootstrap
    viewport: desktop
    url: http://localhost:8080/bootstrap/
    width: 1920
    height: 1080

lighthouse:
  throttlingMethod: simulate
  network:
    rttMs: 150
    throughputKbps: 1638.4
    cpuSlowdownMultiplier: 4
  chromeFlags:
    - "--headless"
    - "--no-sandbox"
    - "--incognito"
    - "--disk-cache-size=1"

output:
  dir: ./results
  filename: summary.csv
  delayBetweenRunsMs: 30000
```

---

## 4. Skrip Otomasi (`run_lighthouse.js`)

Skrip Node.js yang:

1. Membaca `experiment.yaml`
2. Menjalankan `http-server` pada `./pages` di port 8080
3. Looping setiap `target` × `runs` kali:
   - Memanggil Lighthouse CLI dengan parameter dari config
   - Mengekstrak `audits['first-contentful-paint'].numericValue` → `FCP_ms`
   - Mengekstrak `audits['largest-contentful-paint'].numericValue` → `LCP_ms`
   - Mengekstrak `categories.performance.score` × 100 → `Performance_Score`
   - Menunggu `delayBetweenRunsMs` sebelum run berikutnya
4. Menulis semua hasil ke `results/summary.csv`

**Instalasi & eksekusi:**
```bash
# 1. Install dependensi
npm install

# 2. Build prototipe Tailwind
npm run build:tailwind

# 3. Build prototipe Bootstrap (PurgeCSS)
npm run build:bootstrap

# 4. Jalankan pengujian (akan memakan waktu ~30 menit)
node run_lighthouse.js
```

---

## 5. Struktur Direktori Eksperimen

```
Tugas/eksperimen/
├── .gitignore
├── experiment.yaml          ← Konfigurasi pengujian (CV terkunci di sini)
├── package.json
├── package-lock.json
├── run_lighthouse.js        ← Skrip otomasi utama
├── pages/
│   ├── tailwind/
│   │   └── index.html       ← Prototipe Tailwind (IV: treatment)
│   └── bootstrap/
│       └── index.html       ← Prototipe Bootstrap (IV: control)
└── results/
    └── summary.csv          ← Output 60 run data eksperimen
```

---

## 6. Dependencies (`package.json`)

| Package | Versi | Fungsi |
|---------|-------|--------|
| `lighthouse` | 11.3.0 | Engine pengukuran FCP & LCP |
| `http-server` | 14.1.1 | Menyajikan halaman statis di localhost |
| `tailwindcss` | 3.3.0 | Framework CSS treatment |
| `bootstrap` | 5.3.0 | Framework CSS control |
| `purgecss` | 5.0.0 | Menghapus unused CSS pada Bootstrap |
| `js-yaml` | 4.1.0 | Parsing `experiment.yaml` |

---

## 7. Verifikasi End-to-End

Setelah implementasi, dilakukan verifikasi manual:

- ✅ `http-server` berhasil menyajikan kedua halaman di port 8080
- ✅ Kedua URL dapat diakses dari browser dan menampilkan konten identik secara visual
- ✅ Satu run Lighthouse menghasilkan JSON output yang valid dengan field FCP & LCP terpopulasi
- ✅ `run_lighthouse.js` berhasil mengekstrak nilai dan menulis 1 baris ke CSV
- ✅ Script berjalan penuh hingga 60 run tanpa crash (total durasi ±30 menit)

---

## 8. Deliverable Tahap 2

- [x] `pages/tailwind/index.html` — prototipe Tailwind selesai dibangun
- [x] `pages/bootstrap/index.html` — prototipe Bootstrap selesai dibangun
- [x] CSS build artifacts tersedia (output.css Tailwind, bootstrap.min.css setelah PurgeCSS)
- [x] `experiment.yaml` — konfigurasi pengujian tersimpan di version control
- [x] `run_lighthouse.js` — skrip otomasi siap dieksekusi
- [x] Verifikasi end-to-end berhasil
