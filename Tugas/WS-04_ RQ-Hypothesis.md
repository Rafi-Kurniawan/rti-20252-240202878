# WS-04 RQ-Hypothesis

 **Mata Kuliah:** Riset Teknologi Informasi
 
**Topik:** Perbandingan Performa Tailwind CSS dan Bootstrap dalam Rendering Halaman Web Menggunakan Metrik Lighthouse (FCP, LCP) pada Berbagai Ukuran Layar
 
**Nama:** Rafi Kurniawan
 
**NIM:** 240202878
 
**Tanggal:** 6 Juli 2026
 
---

## Template A.4 — RQ-Contribution-Hypothesis

```
RQ-CONTRIBUTION-HYPOTHESIS

Gap Statement  : Literatur Indonesia belum ada yang membandingkan framework CSS (Tailwind vs Bootstrap) secara terkontrol menggunakan metrik First Contentful Paint (FCP) dan Largest Contentful Paint (LCP) via Lighthouse CLI per ukuran viewport pada halaman statis dengan konten yang sepenuhnya identik.

Research Question:
  Tipe         : [x] Comparison  [ ] Improvement  [ ] Exploratory
  Formulasi    : Apakah halaman web yang dibangun dengan Tailwind CSS (JIT) menghasilkan First Contentful Paint (FCP) dan Largest Contentful Paint (LCP) yang secara statistik berbeda dibandingkan halaman web yang dibangun dengan Bootstrap (PurgeCSS), pada prototipe halaman identik yang diuji di tiga ukuran viewport (desktop 1920px, tablet 768px, mobile 375px) menggunakan Lighthouse CLI?
  Variabel IV  : Framework CSS (Tailwind CSS v3 vs Bootstrap v5).
  Variabel DV  : First Contentful Paint (FCP) dan Largest Contentful Paint (LCP) dalam milidetik.
  Metrik       : FCP (ms) dan LCP (ms).
  Dataset      : 60 sesi hasil pengukuran Lighthouse CLI.
  Baseline     : Halaman web kontrol yang menggunakan Bootstrap v5 dengan PurgeCSS.

Quality Check RQ:
  [x] Variabel spesifik
  [x] Metrik jelas
  [x] Baseline ada
  [x] Konteks disebutkan
  [x] Memerlukan eksperimen (bukan hanya survei literatur)

Contribution Statement:
  Apa yang baru diketahui : Bukti empiris mengenai perbedaan performa rendering riil antara arsitektur utility-first (Tailwind) dan component-based (Bootstrap) yang dioptimasi pada kondisi jaringan yang sama, per ukuran layar.
  Jenis kontribusi        : [ ] Improvement  [x] Comparison  [ ] Novel approach
  Gap yang diisi          : Mengisi Method Gap (penggunaan metrik FCP/LCP dan Lighthouse) dan Data Gap (penggunaan konten halaman yang dikontrol 100% identik untuk mengisolasi variabel).

Hypothesis Pair:
  H₀ : Tidak terdapat perbedaan yang signifikan antara FCP dan LCP halaman Tailwind CSS dan halaman Bootstrap pada berbagai ukuran viewport (p ≥ 0,05).
  H₁ : Terdapat perbedaan yang signifikan antara FCP dan LCP halaman Tailwind CSS dan halaman Bootstrap, khususnya pada viewport mobile 375px (p < 0,05).
  Threshold              : Tingkat signifikansi (alpha) α = 0,05 dan Effect size Cohen's d ≥ 0,5.
  Justifikasi threshold  : α = 0,05 adalah standar lazim dalam penelitian komputasi; Cohen's d ≥ 0,5 digunakan sebagai batas relevansi signifikansi praktis (medium effect size) di atas sekadar signifikansi statistik.
```

---

## Latihan 1 — Dari Gap ke RQ

**Gap dari WS-03:** Belum ada studi komparatif dengan kontrol variabel independen yang ketat (konten halaman tidak identik) dan pengukuran standar Core Web Vitals (FCP/LCP) pada viewport layar yang bervariasi.

**RQ versi pertama (tulis bebas):**
> Apakah performa web Tailwind lebih baik daripada Bootstrap di HP dan laptop?

**Evaluasi RQ:**

| Komponen | Ada? | Isi |
|----------|------|-----|
| Metode spesifik | Tidak | Hanya menyebut Tailwind vs Bootstrap tanpa merujuk versi atau pengaturan build (JIT/PurgeCSS). |
| Metrik terukur | Tidak | "Performa" sangat rancu dan tidak bisa diukur langsung. |
| Baseline | Tidak | Tidak jelas kontrolnya apa. |
| Dataset/konteks | Tidak | Hanya menyebut HP dan laptop secara abstrak. |

**Tipe RQ:** [x] Comparison / [ ] Improvement / [ ] Exploratory

**RQ versi revisi (setelah evaluasi):**
> Apakah halaman web yang dibangun dengan Tailwind CSS menghasilkan FCP dan LCP yang lebih rendah (lebih cepat) secara signifikan dibandingkan dengan halaman web Bootstrap v5, pada prototipe halaman identik yang diuji di tiga ukuran viewport (desktop, tablet, mobile) menggunakan pengukuran Lighthouse CLI?

---

## Latihan 2 — Hypothesis Pair

Rumuskan pasangan hipotesis dari RQ di Latihan 1.

| Komponen | Isi |
|----------|-----|
| H₀ | Terdapat tidak ada perbedaan yang signifikan antara metrik FCP dan LCP pada halaman Tailwind CSS dan halaman Bootstrap pada ketiga viewport pengujian. |
| H₁ | Terdapat perbedaan yang signifikan (p < 0,05) FCP dan LCP antara Tailwind CSS dan Bootstrap, dimana Tailwind diharapkan memiliki waktu FCP/LCP yang lebih rendah pada viewport mobile. |
| Metrik | Waktu rendering FCP (ms) dan LCP (ms). |
| Threshold | p-value < 0,05 (Mann-Whitney U) dan effect size Cohen's d ≥ 0,5. |
| Justifikasi threshold | Diperlukan karena ukuran n=10 kecil dan agar perbedaannya relevan dan berdampak di dunia nyata (practical significance). |

**Apakah hipotesis ini falsifiable?** [x] Ya / [ ] Tidak
> Bagaimana cara membuktikannya salah? H1 akan terbukti salah jika dari hasil pengukuran statistik non-parametrik didapatkan p-value ≥ 0.05, yang berarti tidak ada cukup bukti untuk menolak hipotesis nol (H0).

---

## Latihan 3 — Rantai Operasionalisasi

Lengkapi rantai dari RQ hingga metode analisis.

| Tahap | Isi |
|-------|-----|
| RQ | Apakah terdapat perbedaan signifikan metrik FCP dan LCP antara Tailwind dan Bootstrap pada berbagai viewport menggunakan konten halaman identik? |
| Variable (IV) | Framework CSS (Bootstrap v5 PurgeCSS sebagai kontrol, Tailwind v3 JIT sebagai perlakuan). |
| Variable (DV) | Waktu First Contentful Paint dan Largest Contentful Paint. |
| Metric | Milidetik (ms). |
| Data source | Output log (JSON/CSV) hasil eksekusi Lighthouse CLI. |
| Analysis method | Uji komparatif non-parametrik (Mann-Whitney U) karena asumsi sebaran non-normal, didukung analisis Effect Size (Cohen's d). |

**Apakah rantai lengkap?** [x] Ya / [ ] Tidak
> Jika tidak, tahap mana yang perlu direvisi? -

---

## Refleksi

> Ambil satu judul skripsi/paper yang pernah dibaca. Coba ekstrak RQ-nya. Apakah RQ tersebut memenuhi semua komponen (metode, metrik, baseline, konteks)? Jika tidak, apa yang hilang?

**Judul:** Analisis perbandingan framework CSS Bootstrap dan Tailwind dalam pengembangan website portofolio (Akbar, 2023)
**RQ yang diekstrak:** (Eksplisit di paper tidak dituliskan sebagai RQ spesifik, namun implisit) "Bagaimana perbandingan performa GTMetrix antara portofolio Bootstrap dan Tailwind?"
**Komponen yang hilang:** RQ di paper tersebut lemah karena tidak mencantumkan kontrol eksperimen (baseline tidak identik) dan metrik yang digunakan bersifat skor tertutup (GTMetrix Score) bukan metrik baku Core Web Vitals (FCP/LCP) yang direpresentasikan dalam satuan yang universal dan representatif.
