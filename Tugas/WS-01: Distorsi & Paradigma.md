## Template A.1 — Research Mindset Self-Assessment

Nama Peneliti    : Rafi Kurniawan
Tanggal          : 4/8/2026

1. Ketika membaca klaim "metode X 95% akurat":
   - Pertanyaan pertama saya: 95% akurat pada dataset seperti apa, dibanding metode apa, dan diuji dengan metrik apa?
   - Data yang dibutuhkan untuk verifikasi: Dataset yang digunakan, ukuran data, distribusi kelas, baseline pembanding, confusion matrix, dan metode evaluasi.

2. Posisi paradigma:
   - Pendekatan: [x] Positivis  [ ] Interpretivis  [x] Design Science  [ ] Mixed
   - Alasan: Karena penelitian ini mengukur performa algoritma secara objektif melalui eksperimen dan metrik kuantitatif.

3. Identifikasi distorsi:
   - Asumsi tersembunyi: Bahwa hasil tinggi pada benchmark berarti metode akan selalu unggul di semua konteks.
   - Sumber bias potensial: Bias dataset, data leakage, benchmark selection bias, dan tuning parameter yang tidak adil.
   - Langkah mitigasi: Gunakan beberapa dataset, cross-validation, baseline yang adil, dan dokumentasi preprocessing secara jelas.

4. Komitmen etika:
   - Data yang tidak akan dimanipulasi: Hasil eksperimen, outlier, distribusi data, dan metrik evaluasi.
   - Batasan yang diakui sejak awal: Hasil eksperimen hanya berlaku pada dataset dan skenario yang diuji.

---

## Latihan 1 — Identifikasi Distorsi

Pilih satu paper riset di bidang TI yang mengklaim "metode X meningkatkan performa." Telusuri setiap tahap Research Trust Model.

**Paper yang dipilih:**  
> Judul: *XGBoost: A Scalable Tree Boosting System*  
> Penulis (Tahun): Tianqi Chen & Carlos Guestrin (2016)  
> Link: [https://arxiv.org/abs/1603.02754](https://arxiv.org/abs/1603.02754)  
> PDF: [https://arxiv.org/pdf/1603.02754](https://arxiv.org/pdf/1603.02754)

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | Mengambil dataset benchmark machine learning untuk tugas klasifikasi dan ranking | Dataset tidak merepresentasikan kondisi dunia nyata secara penuh |
| Data → Processing | Membersihkan data, encoding fitur, menangani missing value, membagi train-test | Data leakage, preprocessing yang tidak konsisten antar model |
| Processing → Analysis | Melatih model XGBoost dan membandingkannya dengan baseline | Hyperparameter XGBoost dituning lebih baik daripada baseline |
| Analysis → Inference | Menyimpulkan bahwa XGBoost lebih cepat dan lebih baik | Generalisasi berlebihan dari hasil benchmark |
| Inference → Knowledge | Komunitas menerima XGBoost sebagai metode unggul | Overclaim bahwa XGBoost selalu terbaik untuk semua kasus |

**Distorsi paling besar di tahap:** Processing → Analysis

**Dua distorsi spesifik yang teridentifikasi:**
1. Unfair baseline comparison — model pembanding mungkin tidak dituning sebaik XGBoost
2. Benchmark selection bias — dataset yang dipilih bisa lebih menguntungkan metode tertentu

---

## Latihan 2 — Analisis Kasus Etika

Skenario: Seorang peneliti menemukan bahwa jika 3 data point outlier dihapus, hasil eksperimennya menjadi signifikan. Dengan outlier, hasilnya tidak signifikan.

| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | Laporkan kedua versi hasil (dengan dan tanpa outlier), bukan hanya versi yang signifikan |
| Transparansi | Penghapusan outlier harus dijelaskan alasannya, misalnya karena error input atau data corrupt |
| Peer review | Reviewer kemungkinan akan menilai tindakan ini sebagai p-hacking jika outlier dihapus hanya demi signifikansi |

**Keputusan akhir dan justifikasi:**  
> Peneliti sebaiknya melaporkan kedua hasil (dengan dan tanpa outlier), serta menjelaskan kriteria penghapusan outlier secara metodologis. Jika outlier memang valid sebagai bagian dari fenomena, maka hasil yang tidak signifikan tetap harus diterima sebagai temuan ilmiah yang sah.

---

## Latihan 3 — Posisi Paradigma

**Topik riset:** Apakah penggunaan XGBoost meningkatkan performa prediksi dibanding Random Forest dan Logistic Regression pada data tabular?

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | 5 | 1 | 4 |
| Jenis data yang dikumpulkan | Dataset numerik, akurasi, F1-score, training time | Persepsi atau pengalaman pengguna | Artefak algoritma dan hasil pengujian |
| Limitasi paradigma | Terlalu fokus pada angka dan kurang konteks penggunaan | Sulit mengukur performa komputasi secara objektif | Bisa terlalu fokus pada artefak daripada pengetahuan |

**Paradigma yang dipilih:** Positivis didukung Design Science  
**Alasan:** Karena penelitian ini berfokus pada pengujian klaim performa secara objektif melalui eksperimen kuantitatif. Selain itu, artefak (algoritma XGBoost) digunakan sebagai instrumen untuk menguji hipotesis.

---

## Refleksi

> Sebelum membaca materi ini, apakah pernah mempertanyakan klaim "95% akurat"? Setelah memahami rantai distorsi, pertanyaan apa yang sekarang akan diajukan saat membaca paper?

**Jawaban:**  
> Sebelum memahami konsep ini, klaim seperti "95% akurat" mungkin terlihat meyakinkan.  
> Namun sekarang saya akan bertanya: 95% akurat pada data apa, dibanding metode apa, diuji bagaimana, dan apakah hasil itu valid secara internal, eksternal, dan construct?

---

## Referensi

Chen, T., & Guestrin, C. (2016). *XGBoost: A Scalable Tree Boosting System*.  
arXiv preprint arXiv:1603.02754.  
Tersedia di: [https://arxiv.org/abs/1603.02754](https://arxiv.org/abs/1603.02754)
