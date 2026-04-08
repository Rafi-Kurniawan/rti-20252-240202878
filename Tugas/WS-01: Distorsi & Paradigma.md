# WS-01 & WS-02  
## Research Mindset Self-Assessment & Problem Statement Builder  
### Berdasarkan Paper:
### **A high-accuracy phishing website detection method based on machine learning**  
**Bahaghighat, Ghasemi, & Ozen (2023)**

---

## Template A.1 — Research Mindset Self-Assessment

**Nama Peneliti** : ____________________  
**Tanggal** : ____________________

### 1. Ketika membaca klaim "metode X 95% akurat":
- **Pertanyaan pertama saya:**  
  Akurasi tersebut diperoleh dari dataset seperti apa, dengan distribusi kelas, metode evaluasi, dan baseline pembanding yang bagaimana?

- **Data yang dibutuhkan untuk verifikasi:**  
  Dataset yang digunakan, ukuran dan distribusi kelas, metode preprocessing, teknik validasi, confusion matrix, metrik evaluasi lengkap, serta perbandingan dengan model baseline.

---

### 2. Posisi paradigma:
- **Pendekatan:**  
  [x] Positivis  
  [ ] Interpretivis  
  [ ] Design Science  
  [ ] Mixed  

- **Alasan:**  
  Penelitian ini berfokus pada pengujian performa model machine learning secara objektif melalui data kuantitatif dan metrik evaluasi seperti accuracy, precision, recall, specificity, dan runtime. Tujuan utamanya adalah menguji efektivitas metode dalam mendeteksi phishing website secara empiris.

---

### 3. Identifikasi distorsi:
- **Asumsi tersembunyi:**  
  Dataset yang digunakan diasumsikan cukup representatif untuk menggambarkan karakteristik phishing website di dunia nyata.

- **Sumber bias potensial:**  
  Ketidakseimbangan kelas, kualitas fitur, pemilihan dataset, preprocessing yang terlalu spesifik terhadap data tertentu, serta kemungkinan overfitting pada data latih.

- **Langkah mitigasi:**  
  Menggunakan balancing dataset, validasi yang jelas, membandingkan beberapa model baseline, melaporkan seluruh tahapan preprocessing, dan mengevaluasi model pada data yang terpisah dari data pelatihan.

---

### 4. Komitmen etika:
- **Data yang tidak akan dimanipulasi:**  
  Hasil metrik evaluasi, distribusi dataset, hasil confusion matrix, serta runtime eksperimen.

- **Batasan yang diakui sejak awal:**  
  Hasil penelitian bergantung pada kualitas dan cakupan dataset yang digunakan, sehingga generalisasi terhadap seluruh bentuk phishing website di dunia nyata tetap memiliki keterbatasan.

---

# Latihan 1 — Identifikasi Distorsi

## Paper yang dipilih:
> **Judul:** *A high-accuracy phishing website detection method based on machine learning*  
> **Penulis (Tahun):** Bahaghighat, Ghasemi, & Ozen (2023)

| Tahap | Apa yang Dilakukan | Potensi Distorsi |
|-------|-------------------|-----------------|
| **Reality → Data** | Mengumpulkan dataset website phishing dan legitimate berdasarkan fitur-fitur tertentu | Dataset mungkin tidak sepenuhnya merepresentasikan variasi phishing terbaru di dunia nyata |
| **Data → Processing** | Melakukan preprocessing, balancing dataset, penghapusan fitur konstan, dan reduksi fitur | Pemrosesan data dapat mengubah distribusi asli data dan berpotensi membuat model terlalu “cocok” dengan dataset |
| **Processing → Analysis** | Melatih dan membandingkan beberapa model machine learning | Pemilihan hyperparameter atau konfigurasi model dapat memengaruhi hasil secara signifikan |
| **Analysis → Inference** | Menarik kesimpulan bahwa model tertentu memiliki performa terbaik | Performa tinggi pada satu dataset belum tentu berlaku pada konteks atau dataset lain |
| **Inference → Knowledge** | Menyimpulkan bahwa pendekatan machine learning efektif untuk deteksi phishing | Risiko overgeneralisasi jika hasil eksperimen dianggap berlaku universal tanpa validasi tambahan |

**Distorsi paling besar di tahap:**  
> **Reality → Data**

**Dua distorsi spesifik yang teridentifikasi:**
1. Dataset mungkin tidak cukup mewakili pola phishing terbaru atau variasi serangan di dunia nyata.  
2. Proses balancing dan feature selection berpotensi membuat hasil evaluasi terlalu optimistis jika tidak diuji pada skenario yang lebih realistis.

---

# Latihan 2 — Analisis Kasus Etika

**Skenario:** Seorang peneliti menemukan bahwa jika 3 data point outlier dihapus, hasil eksperimennya menjadi signifikan. Dengan outlier, hasilnya tidak signifikan.

| Perspektif | Analisis |
|------------|---------|
| **Kejujuran ilmiah** | Peneliti tidak boleh menghapus outlier hanya untuk memperoleh hasil yang lebih baik. Outlier hanya boleh dihapus jika ada alasan metodologis yang sah dan terdokumentasi. |
| **Transparansi** | Peneliti harus melaporkan hasil analisis baik dengan maupun tanpa outlier, serta menjelaskan alasan jika dilakukan pembersihan data. |
| **Peer review** | Reviewer kemungkinan akan mempertanyakan validitas hasil jika penghapusan outlier tidak dijelaskan secara terbuka dan sistematis. |

**Keputusan akhir dan justifikasi:**
> Outlier tidak boleh dihapus semata-mata untuk membuat hasil menjadi signifikan. Keputusan yang paling etis adalah melaporkan kedua hasil, menjelaskan karakteristik outlier, serta memberikan justifikasi metodologis yang jelas apabila outlier memang perlu dikeluarkan. Hal ini penting untuk menjaga integritas ilmiah dan transparansi penelitian.

---

# Latihan 3 — Posisi Paradigma

**Topik riset:**  
> **Deteksi website phishing menggunakan machine learning**

| Kriteria | Positivis | Interpretivis | Design Science |
|----------|-----------|---------------|----------------|
| **Kesesuaian dengan topik (1–5)** | **5** | **1** | **4** |
| **Jenis data yang dikumpulkan** | Dataset kuantitatif berupa fitur website dan label phishing/legitimate | Persepsi atau pengalaman pengguna terhadap phishing | Artefak sistem, prototipe deteksi, atau model klasifikasi |
| **Limitasi paradigma** | Cenderung fokus pada metrik performa dan kurang mengeksplorasi perilaku manusia | Kurang cocok untuk evaluasi performa model klasifikasi | Fokus pada pembangunan solusi, tetapi tidak selalu menekankan pembuktian generalisasi ilmiah |

**Paradigma yang dipilih:**  
> **Positivis**

**Alasan:**  
> Penelitian ini berfokus pada pengujian objektif terhadap performa metode machine learning dalam mendeteksi phishing website menggunakan data kuantitatif dan metrik evaluasi yang dapat diukur secara empiris.

---

# Refleksi

> Sebelum membaca materi ini, apakah pernah mempertanyakan klaim "95% akurat"? Setelah memahami rantai distorsi, pertanyaan apa yang sekarang akan diajukan saat membaca paper?

**Jawaban:**
> Sebelum memahami konsep distorsi dalam penelitian, klaim seperti “95% akurat” cenderung diterima secara langsung sebagai indikator bahwa suatu metode sudah sangat baik. Namun setelah memahami rantai distorsi penelitian, saya menyadari bahwa angka akurasi saja tidak cukup untuk menilai kualitas suatu penelitian.  
>
> Saat membaca paper, saya kini akan menanyakan: data apa yang digunakan, apakah dataset-nya representatif, apakah kelas datanya seimbang, bagaimana preprocessing dilakukan, metrik apa saja yang dilaporkan, apakah ada baseline pembanding, dan apakah hasil tersebut dapat direplikasi atau digeneralisasi ke konteks lain.

---
