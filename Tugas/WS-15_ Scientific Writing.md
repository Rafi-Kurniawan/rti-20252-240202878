# WS-15: Scientific Writing

> **Bab 15 — Penulisan Ilmiah**

---

## Ringkasan Materi

### Scientific Argument Flow

```
Problem → Gap → RQ → Method → Result → Analysis → Conclusion → Contribution
```

Paper ilmiah adalah **satu argumen utuh** dari masalah ke kontribusi. Setiap node harus terhubung logis ke node sebelum dan sesudahnya.

### Struktur IMRAD

| Section | Peran | Pertanyaan Kunci |
|---------|-------|-----------------|
| **Introduction** | Motivasi + frame | Why is this needed? |
| **Method** | Deskripsi (reproducible) | How was it done? |
| **Results** | Laporan objektif | What was found? |
| **Discussion** | Interpretasi + refleksi | What does it mean? |
| **Conclusion** | Ringkasan + kontribusi | So what? |

### Logical Flow — "Red Thread"

Setiap paragraf menjawab satu pertanyaan dan memicu pertanyaan berikutnya. Alur logis ini harus terasa di tiga level:
1. **Antar-kalimat** dalam paragraf
2. **Antar-paragraf** dalam section
3. **Antar-section** dalam paper

### Internal Consistency

Setiap elemen yang dijanjikan di Introduction harus hadir di Discussion/Conclusion.

**Consistency Matrix:**
```
           Intro  Method  Result  Discuss  Conclude
RQ1          ✓      ✓       ✓       ✓        ✓
RQ2          ✓      ✓       ✓       ✗ ←      ✓
Metrik-X     ✗      ✗       ✓ ←     ✗        ✗
```
**Masalah:** RQ2 dibahas di semua bagian kecuali Discussion. Metrik-X muncul di Result tapi tidak diperkenalkan di Method.

### Writing Quality Triad

| Kualitas | Deskripsi | Contoh Buruk → Baik |
|----------|----------|---------------------|
| **Clarity** | Dipahami sekali baca | "Performa meningkat" → "Accuracy meningkat dari 85.3% ke 89.7%" |
| **Precision** | Istilah eksak, tanpa ambiguitas | "signifikan" → "signifikan secara statistik (p=0.003, d=1.2)" |
| **Conciseness** | Setiap kata menambah informasi | Hapus kalimat redundan, filler words |

### Urutan Penulisan yang Disarankan

1. **Method & Results** — paling stabil, tulis pertama
2. **Discussion** — interpretasi berdasarkan hasil
3. **Introduction** — frame sesuai temuan aktual
4. **Abstract & Conclusion** — terakhir

### Target Jumlah Kata

| Section | Target |
|---------|--------|
| Introduction | 500–700 |
| Related Work | 700–1000 |
| Method | 800–1200 |
| Results | 500–800 |
| Discussion | 600–900 |
| Conclusion | 200–400 |

### Jebakan Kognitif

1. "Lebih panjang = lebih lengkap" → conciseness lebih berharga
2. "Introduction harus ditulis pertama" → justru ditulis terakhir
3. "Jargon teknis = lebih ilmiah" → clarity lebih penting
4. "Discussion = ringkasan Results" → Discussion = interpretasi + konteks

---

```
PAPER STRUCTURE CHECKLIST

Title   : Analisis Perbandingan Performa Rendering Web: Tailwind CSS vs Bootstrap Berdasarkan Metrik FCP dan LCP Lighthouse
Target  : [x] Jurnal  [ ] Konferensi  [ ] Laporan

Section Check:
  [x] Abstract — masalah, metode, hasil utama, kontribusi (max 250 kata)
  [x] Introduction — konteks → gap → RQ → kontribusi → struktur paper
  [x] Related Work — concept-centric, gap positioning
  [x] Method — reproducible: desain, variabel, metrik, setup, prosedur
  [x] Results — tabel + grafik + observasi (tanpa interpretasi)
  [x] Discussion — interpretasi, perbandingan, implikasi, limitation
  [x] Conclusion — jawaban RQ, kontribusi, future work

Consistency Matrix:
  [x] RQ di Introduction = RQ di Method = RQ di Conclusion
  [x] Variabel di Method = variabel di Results
  [x] Klaim di Discussion didukung data di Results
  [x] Limitasi di Discussion di-address di Conclusion/Future Work

Writing Quality:
  [x] Clarity — mudah dipahami tanpa re-read
  [x] Precision — tidak ada istilah ambigu
  [x] Conciseness — tidak ada kalimat redundan
```

---

## Latihan 1 — Paper Outline

Buat outline paper untuk riset Anda menggunakan struktur IMRAD.

| Section | Konten Utama (2-3 kalimat) | Target Kata |
|---------|---------------------------|------------|
| Abstract | Masalah ukuran bundle CSS pada performa mobile. Metode eksperimental menggunakan Lighthouse (FCP & LCP) pada Tailwind vs Bootstrap di 3 resolusi. Hasil: Tailwind lebih cepat signifikan di mobile, tidak signifikan di desktop. | 200-250 |
| Introduction | Konteks: CSS framework krusial namun berpotensi membebani loading awal (render-blocking). Gap: Jarang ada studi head-to-head Tailwind (utility-first) vs Bootstrap di berbagai viewport. RQ: Apakah arsitektur utility-first meningkatkan FCP/LCP dibandingkan monolithic UI di layar kecil? | 500-700 |
| Related Work | Mengulas riset sebelumnya tentang optimasi critical rendering path, efektivitas PurgeCSS/JIT, dan metrik Core Web Vitals (FCP, LCP). | 700-1000 |
| Method | Desain: independent sample, 6 skenario. Variabel independen: framework CSS dan viewport. Dependen: FCP, LCP. Prosedur otomasi dengan CLI Lighthouse dalam Incognito mode. | 800-1200 |
| Results | Menyajikan tabel komparasi median FCP & LCP, serta bar chart perbandingan waktu rendering di masing-masing dari 3 jenis viewport. | 500-800 |
| Discussion | Interpretasi mengapa Tailwind unggul (ukuran CSS minimalis setelah build). Menjelaskan mengapa perbedaan di desktop kurang terasa (resource lebih kuat). | 600-900 |
| Conclusion | Menyimpulkan Tailwind direkomendasikan untuk web mobile-heavy. Kontribusi riset membantu pemilihan tech stack. Future work: menguji metrik interaktivitas (TBT) dengan JS framework. | 200-400 |

---

## Latihan 2 — Consistency Matrix

Buat consistency matrix untuk memverifikasi internal consistency paper Anda.

|  | Intro | Method | Result | Discussion | Conclusion |
|--|-------|--------|--------|-----------|-----------|
| RQ1 (Perbandingan FCP/LCP) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Metrik utama (FCP, LCP) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Variabel IV (Framework, Viewport) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Klaim/kontribusi | ✓ | ✓ | ✓ | ✓ | ✓ |

**Isi setiap sel:** ✓ (ada & konsisten), ✗ (missing), ~ (ada tapi inkonsisten)

**Inkonsistensi yang ditemukan:**
> Tidak ada inkonsistensi yang terlihat pada matriks perencanaan di atas. Semua variabel dan pertanyaan riset terlacak dari Intro hingga Conclusion.

**Tindakan perbaikan:**
> Tetap memonitor saat tahap penulisan agar tidak ada metrik baru (misalnya tiba-tiba membahas Cumulative Layout Shift/CLS) di Discussion yang tidak ada di bagian Method.

---

## Latihan 3 — Writing Quality Check

Ambil satu paragraf dari tulisan Anda (atau tulis paragraf baru) dan evaluasi kualitasnya.

**Paragraf asli:**
> Berdasarkan data hasil eksperimen yang telah didapatkan pada saat proses pengujian, framework Tailwind CSS memiliki nilai performa yang lebih bagus dan lebih kencang saat meloading halaman jika dibandingkan dengan Bootstrap, ini disebabkan karena Tailwind sangat kecil ukurannya.

| Kriteria | Evaluasi | Perbaikan |
|----------|---------|-----------|
| Clarity | Kalimat terlalu panjang dan bertele-tele ("berdasarkan data hasil eksperimen yang telah didapatkan pada saat proses pengujian"). | Hapus filler words, langsung ke inti temuan. |
| Precision | "Performa yang lebih bagus", "lebih kencang" sangat ambigu. "Sangat kecil" tidak kuantitatif. | Ganti dengan metrik pasti: FCP lebih cepat, ukuran bundle CSS (KB). |
| Conciseness | Kata-kata tumpang tindih makna. | Persingkat susunan kalimat. |

**Paragraf setelah perbaikan:**
> Tailwind CSS merender halaman secara signifikan lebih cepat (FCP 1205ms) dibandingkan Bootstrap (1310ms) pada viewport mobile (p < 0.05). Kecepatan ini disebabkan oleh minimnya ukuran file CSS Tailwind setelah proses purges (JIT compiler), yang mengurangi dampak render-blocking.

---

## Refleksi

> Apa perbedaan antara menulis "tentang" riset dan menulis sebagai "argumen" riset? Bagaimana urutan penulisan (Method → Discussion → Introduction) mengubah kualitas tulisan?

> Menulis "tentang" riset terasa seperti laporan praktikum kronologis (saya melakukan A lalu B). Menulis "argumen" riset berarti menyusun bukti-bukti (hasil) untuk mengarahkan pembaca pada suatu pemahaman baru. Urutan penulisan yang dimulai dari Method dan Result sangat efisien, karena mengunci fondasi fakta terlebih dahulu. Setelah fakta tersaji jelas di Discussion, kita bisa menyusun Introduction dengan lebih tajam, memastikan janji di awal benar-benar sesuai dengan temuan akhir, tanpa ada yang menyimpang.
