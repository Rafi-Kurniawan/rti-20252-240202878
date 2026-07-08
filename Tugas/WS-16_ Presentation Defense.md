# WS-16: Presentation & Defense (UAS)

> **Bab 16 — Presentasi & Pertahanan Ilmiah**

---

## Ringkasan Materi

### Scientific Defense Model

```
Research Work → Presentation → Questioning → Defense → Evaluation → Acceptance
```

### Presentasi ≠ Ringkasan Paper

| Paper | Presentasi |
|-------|-----------|
| Dibaca (self-paced) | Didengar (presenter-paced) |
| Detail lengkap | Ide kunci + highlight |
| Tabel numerik detail | Grafik visual + angka kunci |
| Pembaca bisa re-read | Audiens dengar sekali |

**Prinsip:** Presentasi membutuhkan **reformulasi**, bukan kompresi. Medium berbeda = pendekatan berbeda.

### Claim-Evidence-Reasoning (CER)

Setiap jawaban defense harus memiliki:
1. **Claim** — Pernyataan yang dijawab
2. **Evidence** — Data/fakta pendukung
3. **Reasoning** — Logika yang menghubungkan evidence ke claim

**Contoh:**
| Pertanyaan | Bad Answer | Good Answer (CER) |
|-----------|-----------|-------------------|
| "Kenapa hanya 3 dataset?" | "Tiga sudah cukup" | "3 dataset mewakili variasi: small-clean, medium-clean, medium-noisy [E]. Generalisasi perlu validasi lanjut — listed as limitation [R]" |
| "Hasil DS-3 menurun?" | "Itu outlier" | "Ya, karena distribusi heavy-tail melanggar asumsi Gaussian [E]. Ini menunjukkan boundary condition metode [R]" |
| "Effect size?" | "p=0.003, jadi signifikan" | "Cohen's d=1.2 (large effect) [E] — bukan hanya signifikan tapi substansial [R]" |

### Slide Design — One Slide, One Message

**Optimal 9-Slide Plan (15 menit):**

| # | Slide | Waktu | Pesan |
|---|-------|-------|-------|
| 1 | Title + context | 1 min | Apa ini tentang apa |
| 2 | Problem + motivation | 2 min | Mengapa penting |
| 3 | Gap + RQ | 1.5 min | Apa yang belum terjawab |
| 4 | Method overview | 2 min | Bagaimana dijawab (diagram) |
| 5 | Key result — tabel | 2 min | Temuan utama |
| 6 | Key result — grafik | 2 min | Pola visual |
| 7 | Interpretation + failure | 2 min | Apa artinya |
| 8 | Limitation + future | 1.5 min | Batasan & arah |
| 9 | Conclusion + contribution | 1 min | Closing message |

### Anticipatory Defense

Prediksi pertanyaan berdasarkan kategori:

| Kategori | Contoh Pertanyaan |
|---------|------------------|
| Problem | "Mengapa masalah ini penting?" |
| Gap | "Bagaimana dengan studi X yang sudah menjawab ini?" |
| Method | "Mengapa metode ini, bukan Y?" |
| Results | "Bagaimana menjelaskan anomali di DS-3?" |
| Generalization | "Apakah bisa diterapkan di domain lain?" |

### Tiga Prinsip Jawaban

1. **Direct** — Jawab dulu, elaborasi kemudian
2. **Data-based** — Tunjuk evidence spesifik
3. **Honest** — Akui limitasi jika memang ada

### Jebakan Kognitif

1. "Presentasi = semua yang ada di paper" → terlalu padat
2. "Slide cantik = presentasi bagus" → konten > estetika
3. "Tidak bisa jawab = gagal" → "I don't know, but..." menunjukkan kejujuran
4. "Tidak perlu latihan — saya paham riset saya" → latihan = menemukan celah

---

## Template A.16 — Defense Preparation Sheet

```
DEFENSE PREPARATION

Slide Deck Plan:
  Total slides   : 9
  Time per slide : ~1.5 - 2 min
  Total time     : 15 menit

Slide Outline:
| # | Pesan Utama | Visual | Waktu |
|---|-------------|--------|-------|
| 1 | Title       | Logo Universitas & Judul Topik | 30s   |
| 2 | Problem     | Kecepatan Web & Dampak UX | 2min  |
| 3 | Gap + RQ    | Framework CSS vs Beban Payload | 2min  |
| 4 | Method      | Desain Eksperimen (6 Skenario) | 2min  |
| 5 | Key Result  | Tabel FCP/LCP | 2min  |
| 6 | Visuals     | Bar chart perbandingan framework | 2min  |
| 7 | Discussion  | Mengapa Tailwind lebih cepat (PurgeCSS/JIT) | 2min  |
| 8 | Limitasi    | OS Background Task & Simulated Network | 1.5min|
| 9 | Conclusion  | Jawaban RQ & Rekomendasi Tech Stack | 1min  |

Anticipatory Defense Matrix:
| Kategori | Pertanyaan Potensial | Jawaban (CER) |
|----------|---------------------|---------------|
| Problem  | Mengapa ukuran CSS saja yang diteliti? JS juga besar. | JS besar, tapi CSS bersifat render-blocking mutlak yang menghentikan rendering sampai file ter-load (FCP). |
| Gap      | Bukankah semua orang sudah tahu Tailwind lebih kecil dari Bootstrap? | Benar secara teori, namun studi kami membuktikan dampaknya secara kuantitatif (ms) per viewport. |
| Method   | Kenapa pilih Mann-Whitney U Test dibanding T-test? | Data waktu rendering memiliki lag-spike (outlier) dan bukan distribusi normal murni, sehingga uji non-parametrik lebih tepat (robust). |
| Results  | Kenapa di Desktop hasil FCP Tailwind dan Bootstrap nyaris sama? | Resource komputasi CPU desktop sangat kuat sehingga overhead parsing CSS tertutup, beda dengan mobile. |
| Generalization | Apakah ini berlaku untuk halaman web rumit (e-commerce)? | Tidak sepenuhnya, kami hanya menguji halaman sederhana, ini masuk di limitasi untuk future work. |

Latihan:
  Latihan 1: 08 Juli 2026 — Timing masih 18 menit, perlu pangkas bagian intro.
  Latihan 2: 09 Juli 2026 — Timing pas 14:30.
  Latihan 3: 10 Juli 2026 — Fokus perbaikan intonasi.
```

---

## Latihan 1 — Slide Outline

Rencanakan presentasi 15 menit untuk riset Anda.

| # | Pesan Utama | Visual yang Digunakan | Waktu |
|---|-------------|----------------------|-------|
| 1 | Judul & Konteks | Title Slide | 1 min |
| 2 | Problem: Kecepatan load krusial untuk SEO | Statistik bounce rate | 2 min |
| 3 | Gap & RQ: Utility-first vs Component-first CSS | Skema arsitektur Bootstrap vs Tailwind | 1.5 min |
| 4 | Metodologi Eksperimen | Diagram flow Lighthouse test & 6 Skenario | 2 min |
| 5 | Hasil Pengujian (FCP & LCP) | Tabel perbandingan median | 2 min |
| 6 | Analisis Tren Visual | Bar Chart (Grouped) Mobile vs Desktop | 2 min |
| 7 | Interpretasi (Utility-first menang karena kecil) | Screenshot file size comparison (KB) | 2 min |
| 8 | Limitasi (Kondisi jaringan simulasi 4G) | Bullet points | 1.5 min |
| 9 | Kesimpulan dan Saran Penggunaan | Takeaway message (Rekomendasi) | 1 min |

**Total waktu estimasi:** 15 menit

---

## Latihan 2 — Anticipatory Defense

Prediksi 5 pertanyaan yang mungkin diajukan penguji, lalu siapkan jawaban CER.

| # | Kategori | Pertanyaan | Claim | Evidence | Reasoning |
|---|----------|-----------|-------|----------|-----------|
| 1 | Problem | Mengapa pilih metrik FCP dan LCP? | Keduanya adalah indikator performa visual paling awal | Definisi Core Web Vitals dari Google Lighthouse | FCP dan LCP paling terpengaruh oleh seberapa cepat CSS ter-download (Render-blocking) |
| 2 | Method | Mengapa hanya 10 sampel per skenario? | 10 sampel sudah cukup untuk melihat rentang outlier di jaringan lokal | Tabel distribusi normalitas (yang menunjukkan skewness) | Lebih dari 10 tidak merubah median secara signifikan pada lingkungan yang sudah semi-terkontrol |
| 3 | Results | Mengapa Tailwind Mobile bisa 1205ms sedangkan Desktop 815ms? | Hardware dan network profil berbeda | Skenario Lighthouse menggunakan throttling CPU 4x slowdown di Mobile | Perbedaan spesifikasi resource secara langsung mempengaruhi kecepatan parsing browser |
| 4 | Method | Uji statistik Mann-Whitney U, mengapa dipilih? | Data time-series/latency jarang berdistribusi normal | Ada 1 sampel outlier (lag spike 2800ms) di data mentah (WS-11) | Uji non-parametrik tidak sensitif outlier ekstrim, sehingga hasil komparasi lebih valid |
| 5 | Generalization | Apakah di produksi nyata Tailwind selalu lebih baik? | Secara umum iya, tapi JS ekosistem (React/Vue) juga akan mempengaruhi TTI | Data FCP kami lebih kecil, tapi belum mengukur Total Blocking Time | Untuk aplikasi full CSR (Client-Side Rendering), keunggulan CSS mungkin tertutupi oleh ukuran bundle JS. |

---

## Latihan 3 — Simulasi Q&A

Minta teman/kolega mengajukan 3 pertanyaan tentang riset Anda. Catat pertanyaan dan evaluasi jawaban Anda.

| # | Pertanyaan | Jawaban Saya | Evaluasi |
|---|-----------|-------------|---------|
| 1 | "Bisa saja karena Bootstrap meload semua komponen, makanya berat. Kalau pakai SCSS Bootstrap dan di-*purge*, bagaimana?" | "Benar, namun fokus riset ini adalah arsitektur *out-of-the-box* dari CDN/default instalasi yang banyak dipakai pemula." | [x] Direct [x] Data-based [x] Honest |
| 2 | "Apakah desain UI halaman testing sama persis?" | "Ya, menggunakan struktur DOM yang diusahakan semirip mungkin secara visual, hanya beda nama class." | [x] Direct [x] Data-based [x] Honest |
| 3 | "Apakah perbedaan 100ms berdampak signifikan ke user riil?" | "Pasti, literatur dari Amazon menyebut tiap 100ms menaikkan rasio bounce. Secara statisik *effect size* kami (r=0.82) juga tergolong *Large*." | [x] Direct [x] Data-based [x] Honest |

**Pertanyaan yang paling sulit dijawab:**
> Pertanyaan mengenai komparasi jika Bootstrap dioptimasi dengan SCSS (seperti Tailwind JIT), karena saya tidak menyertakan skenario itu di penelitian.

**Apa yang perlu disiapkan lebih baik:**
> Argumentasi lebih kuat bahwa membandingkan *default behavior* sangat penting karena merepresentasikan *majority use case* developer.

---

## Refleksi

> Dari seluruh proses WS-01 sampai WS-16 — dari paradigma riset hingga presentasi — bagian mana yang paling mengubah cara Anda berpikir tentang riset? Apa satu hal yang akan selalu Anda terapkan di riset berikutnya?

**Insight terbesar:**
> Riset ternyata bukanlah mencari "kebenaran absolut", melainkan membangun argumen rasional berdasarkan bukti data yang terkontrol. Kegagalan hipotesis (misal di Desktop tidak signifikan) justru memberikan *boundary condition* yang memperkaya kontribusi riset (jadi tahu batasan tools-nya).

**Yang akan selalu diterapkan:**
> Saya akan selalu mengutamakan *Data Cleaning & Validation* sebelum running *Analysis*, serta tidak memaksa data membulat jadi normal hanya demi menggunakan uji statistik parametrik. Kejujuran *Limitasi* di bagian presentasi membuat riset terasa utuh dan realistis.
