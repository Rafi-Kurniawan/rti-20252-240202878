# 06-output

Hasil olahan data & visualisasi — **Tahap 4** (lihat [../09-docs/tahap-4-analisis-data.md](../09-docs/tahap-4-analisis-data.md)).

Dihasilkan dari analisis data mentah `04-data/summary.csv` (60 run, 6 skenario).

## tables/

| File | Isi |
|------|-----|
| `descriptive_stats_fcp.csv` | Statistik deskriptif FCP (mean, std, median, min, max) per skenario (6 skenario × Tailwind/Bootstrap) |
| `descriptive_stats_lcp.csv` | Statistik deskriptif LCP per skenario — termasuk Bootstrap Desktop yang seluruhnya 810 ms (cap) |
| `mann_whitney_results.csv` | Hasil uji Mann-Whitney U per viewport: U-statistic, p-value, rank-biserial r, keputusan H₀ |

## figures/

| File | Isi |
|------|-----|
| `fig_fcp_grouped_bar.png` | Grouped bar chart: mean FCP ± std per viewport (Tailwind vs Bootstrap) — menunjukkan Tailwind konsisten lebih cepat |
| `fig_fcp_boxplot.png` | Box plot distribusi FCP seluruh 60 run — memvisualisasikan variabilitas & outlier |
| `fig_lcp_grouped_bar.png` | Grouped bar chart: median LCP per viewport — menunjukkan Bootstrap Desktop = 810 ms (cap Lighthouse 3G) |

## Ringkasan Hasil Kunci

| Metrik | Tailwind Mobile | Bootstrap Mobile | Tailwind Desktop | Bootstrap Desktop |
|--------|----------------|-----------------|-----------------|------------------|
| FCP Median (ms) | 685.0 | 698.5 | 685.0 | 696.5 |
| LCP Median (ms) | 685.0 | 810.0 | 685.0 | **810.0** |
| Performance Score | 100 | 100 | 99 | 99 |

**Uji statistik:** Mann-Whitney U, p < 0,05 di semua skenario → H₀ ditolak, H₁ diterima.

## Acuan

[../09-docs/tahap-4-analisis-data.md](../09-docs/tahap-4-analisis-data.md)
