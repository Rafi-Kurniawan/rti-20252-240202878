# WS-01: Distorsi & Paradigma

> **Bab 1 — Research Mindset in IT**

---

## Template A.1 — Research Mindset Self-Assessment

Nama Peneliti    : Rafi Kurniawan  
Tanggal          : 1 April 2026  

1. Ketika membaca klaim "metode X 95% akurat":
   - Pertanyaan pertama saya: Akurasi tersebut diperoleh dari dataset apa, dan apakah dataset tersebut representatif terhadap kondisi dunia nyata?
   - Data yang dibutuhkan untuk verifikasi: Dataset uji, distribusi data, confusion matrix, serta metode evaluasi (train-test split atau cross-validation).

2. Posisi paradigma:
   - Pendekatan: [x] Positivis  [ ] Interpretivis  [x] Design Science  [ ] Mixed  
   - Alasan: Penelitian di bidang TI umumnya menggunakan pendekatan kuantitatif berbasis eksperimen terkontrol (positivis), serta melibatkan pengembangan artefak seperti model atau sistem untuk menguji hipotesis (design science).

3. Identifikasi distorsi:
   - Asumsi tersembunyi: Dataset dianggap cukup merepresentasikan kondisi dunia nyata.
   - Sumber bias potensial: Sampling bias, dataset bias, dan overfitting terhadap data latih.
   - Langkah mitigasi: Menggunakan dataset yang beragam, validasi silang, serta pengujian pada data di luar distribusi (out-of-distribution).

4. Komitmen etika:
   - Data yang tidak akan dimanipulasi: Seluruh hasil eksperimen, termasuk hasil yang tidak sesuai hipotesis.
   - Batasan yang diakui sejak awal: Keterbatasan dataset, potensi bias, dan keterbatasan generalisasi model.

---

## Latihan 1 — Identifikasi Distorsi

**Paper yang dipilih:**
- Judul: *Deep Residual Learning for Image Recognition*  
- Penulis (Tahun): Kaiming He et al. (2016)  
- Dataset: ImageNet (±1.2 juta gambar, 1000 kelas)

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| Reality → Data | Fenomena pengenalan objek di dunia nyata direpresentasikan menggunakan dataset ImageNet | Dataset bias: didominasi gambar berkualitas tinggi dan kondisi terkontrol |
| Data → Processing | Preprocessing dan augmentasi data (cropping, flipping, dll) | Augmentasi dapat menciptakan distribusi data yang tidak realistis |
| Processing → Analysis | Training model ResNet pada dataset besar | Overfitting terhadap pola spesifik dataset |
| Analysis → Inference | Evaluasi menggunakan top-1 dan top-5 accuracy | Ketergantungan pada satu metrik tanpa mengukur robustness |
| Inference → Knowledge | Klaim bahwa ResNet meningkatkan performa secara signifikan | Generalisasi berlebihan ke semua kondisi tanpa uji lintas domain |

**Distorsi paling besar di tahap:**  
> Reality → Data  

**Alasan:**  
Dataset merupakan representasi awal dari realitas. Jika data sudah bias sejak awal, maka seluruh tahapan berikutnya akan membawa bias tersebut (garbage in, garbage out).

**Dua distorsi spesifik yang teridentifikasi:**
1. Dataset bias — ImageNet tidak sepenuhnya merepresentasikan kondisi dunia nyata (misalnya kondisi low-light atau noise tinggi).  
2. Overfitting implisit — Model belajar pola spesifik dataset, bukan fenomena umum.  

---

## Latihan 2 — Analisis Kasus Etika

| Perspektif | Analisis |
|------------|---------|
| Kejujuran ilmiah | Menghapus outlier tanpa justifikasi merupakan bentuk manipulasi data yang dapat mengarah pada kesimpulan yang menyesatkan |
| Transparansi | Peneliti wajib menjelaskan keberadaan outlier, alasan penghapusan (jika dilakukan), dan dampaknya terhadap hasil |
| Peer review | Reviewer akan mempertanyakan validitas hasil jika terdapat indikasi cherry-picking data |

**Keputusan akhir dan justifikasi:**

Outlier tidak boleh dihapus hanya untuk mencapai hasil yang signifikan. Peneliti harus melaporkan kedua kondisi (dengan dan tanpa outlier) serta memberikan justifikasi yang kuat apakah outlier tersebut merupakan error pengukuran atau bagian dari fenomena yang valid. Praktik ini penting untuk menjaga integritas ilmiah dan menghindari bias seperti p-hacking.

---

## Latihan 3 — Posisi Paradigma

**Topik riset:**  
Prediksi burnout mahasiswa menggunakan machine learning berbasis data akademik  

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| Kesesuaian dengan topik (1–5) | 5 | 3 | 4 |
| Jenis data yang dikumpulkan | Data numerik (nilai, kehadiran) | Persepsi dan pengalaman mahasiswa | Model prediksi sebagai artefak |
| Limitasi paradigma | Kurang menangkap aspek psikologis | Sulit digeneralisasi | Fokus pada artefak, bukan teori |

**Paradigma yang dipilih:**  
Positivis + Design Science  

**Alasan:**  
Pendekatan positivis digunakan untuk menguji performa model secara kuantitatif, sedangkan design science digunakan dalam pembangunan model sebagai artefak untuk menguji hipotesis.

---

## Refleksi

Sebelum memahami konsep Research Trust Model, saya cenderung menerima klaim seperti "akurasi 95%" tanpa mempertanyakan proses di baliknya. Namun, setelah memahami adanya rantai distorsi dari reality hingga knowledge, saya menyadari bahwa setiap tahap berpotensi menghasilkan bias.

Saat ini, saya akan lebih kritis dengan mempertanyakan sumber data, metode pemrosesan, metrik evaluasi, serta kemampuan generalisasi hasil. Saya juga memahami bahwa akurasi tinggi tidak selalu menunjukkan kualitas model jika tidak didukung oleh validitas yang kuat.
