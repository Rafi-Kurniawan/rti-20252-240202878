# 05-kode

Source code implementasi — **Tahap 2** (prototipe web) dan **Tahap 3** (skrip otomasi Lighthouse).

## Struktur Direktori

```
05-kode/
├── pages/
│   ├── tailwind/
│   │   └── index.html          # Prototipe Tailwind CSS v3 (utility classes)
│   └── bootstrap/
│       └── index.html          # Prototipe Bootstrap v5 (component classes)
├── experiment.yaml             # Konfigurasi terpusat: URL, viewport, iterasi, throttling
├── run_lighthouse.js           # Skrip otomasi Node.js: loop skenario → Lighthouse CLI → CSV
├── package.json                # Dependencies: lighthouse, http-server, tailwindcss, bootstrap, purgecss
└── package-lock.json           # Versi dikunci untuk reproducibility
```

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Build prototipe Tailwind (JIT)
npx tailwindcss -i ./src/input.css -o ./pages/tailwind/output.css --minify

# 3. Build prototipe Bootstrap (PurgeCSS)
npx purgecss --css node_modules/bootstrap/dist/css/bootstrap.min.css \
  --content pages/bootstrap/index.html --output pages/bootstrap/

# 4. Jalankan pengujian (±30 menit, 60 run total)
node run_lighthouse.js
```

## Dependencies Utama

| Package | Versi | Fungsi |
|---------|-------|--------|
| `lighthouse` | 11.3.0 | Engine pengukuran FCP & LCP |
| `http-server` | 14.1.1 | Menyajikan halaman statis di localhost |
| `tailwindcss` | 3.3.0 | Framework CSS treatment |
| `bootstrap` | 5.3.0 | Framework CSS control |
| `purgecss` | 5.0.0 | Menghapus unused CSS pada Bootstrap |

## Acuan

- Desain prototipe & konfigurasi: [../09-docs/tahap-2-implementasi-gateway.md](../09-docs/tahap-2-implementasi-gateway.md)
- Protokol eksekusi pengujian: [../09-docs/tahap-3-pengujian-k6.md](../09-docs/tahap-3-pengujian-k6.md)

Kode aktual tersedia di: `../../../Tugas/eksperimen/`
