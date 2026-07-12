# 04-data

Data mentah hasil pengujian Lighthouse — output dari **Tahap 3**, input untuk **Tahap 4**.

## Isi yang Diharapkan

- Hasil pengukuran Lighthouse dalam format CSV (`summary.csv`), berisi 60 baris data dari 6 skenario pengujian (2 framework × 3 viewport × 10 iterasi)
- File JSON output Lighthouse mentah per run (opsional, ukuran besar)
- Metadata eksekusi tiap batch (timestamp, versi Lighthouse, versi framework)

## Format Data (`summary.csv`)

```
Framework,Viewport,Run_ID,FCP_ms,LCP_ms,Performance_Score
tailwind,mobile,1,684.00,684.00,100
bootstrap,mobile,1,690.00,810.00,100
...
```

**Total:** 60 baris × 6 kolom

## Skenario Pengujian

| ID | Framework | Viewport | Runs |
|----|-----------|----------|------|
| A1 | Bootstrap | Mobile (375px) | 10 |
| A2 | Bootstrap | Tablet (768px) | 10 |
| A3 | Bootstrap | Desktop (1920px) | 10 |
| B1 | Tailwind | Mobile (375px) | 10 |
| B2 | Tailwind | Tablet (768px) | 10 |
| B3 | Tailwind | Desktop (1920px) | 10 |

## Catatan

Data di folder ini bersifat mentah (raw) dan belum diolah. Hasil olahan (statistik deskriptif, uji Mann-Whitney U, grafik) disimpan di [../06-output/](../06-output/).

Data aktual eksperimen tersedia di: `../../../Tugas/eksperimen/results/summary.csv`
