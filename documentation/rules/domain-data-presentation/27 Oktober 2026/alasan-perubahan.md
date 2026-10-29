
Dokumen ini mencatat ringkasan perbaikan, penambahan pola, dan alasan teknis di balik pembaruan aturan arsitektur (**Feature-Based Clean Architecture**) dari versi  lama [[rules-(old)]] ke versi baru ([[rules]]).

## 🛠️ Ringkasan 6 Poin Perbaikan Utama

### 1. Penambahan Dependency Injection Layer (`di/`)

- **Apa yang Diperbarui:** Memperkenalkan folder `di/` (_Dependency Injection_) di dalam setiap modul fitur untuk merakit instansiasi class dari _Data Layer_ dan _Domain Layer_ secara terpusat (misalnya `KaryawanContainer.ts`).
    
- **Alasan Perbaikan:**
    
    - Menerapkan prinsip _Dependency Inversion_ dengan lebih ketat dan elegan.
        
    - Mencegah _Presentation Layer_ (seperti _Hooks_ atau _Pages_) tahu-menahu mengenai cara merakit instance _Repository_ atau _Service_. UI tinggal mengonsumsi instance _UseCase_ yang sudah dirakit dan siap pakai.
        

### 2. Standarisasi Pola Mapping Data (`DTO` & `Mapper`)

- **Apa yang Diperbarui:** Memisahkan _Data Layer_ secara eksplisit menjadi `dtos/` (struktur data mentah/kotor dari API) dan `mappers/` (fungsi/class transformasi dari DTO ke Domain Entity).
    
- **Alasan Perbaikan:**
    
    - Mencegah "kebocoran" skema data backend (misalnya format `snake_case` atau field yang kotor) langsung masuk ke logika bisnis atau komponen UI.
        
    - Memilih pendekatan yang tahan terhadap perubahan (_resilient_): Jika backend mengubah nama field/API di kemudian hari, kita hanya perlu mengubah berkas DTO & Mapper tanpa merusak kode di _Domain_ maupun _Presentation Layer_.
        

### 3. Modernisasi State Management & Data Fetching (TanStack Query & Zustand)

- **Apa yang Diperbarui:** Menggantikan penggunaan dasar `useState`/`useEffect` di _Presentation Layer_ dengan standar industri terkini: **TanStack Query (React Query)** untuk _server state_ dan **Zustand** untuk _local UI state_.
    
- **Alasan Perbaikan:**
    
    - Menghindari _boilerplate code_, masalah _race condition_, serta manajemen _caching_ dan _refetching_ manual yang rentan bug saat aplikasi bertambah besar.
        
    - Memberikan pemisahan yang jelas antara state yang berasal dari server/database (_Server State_) dan state lokal murni interaksi pengguna (_Client State_).
        

### 4. Penegasan & Penyesuaian Naming Convention

- **Apa yang Diperbarui:** Penyesuaian konvensi penamaan berkas fisik dan ekspor kode:
    
    - Nama file _store_ Zustand dan _custom hooks_ menggunakan format **camelCase** (contoh: `useKaryawanStore.ts`, `useKaryawanQuery.ts`).
        
    - Nama folder menggunakan format **kebab-case** / huruf kecil dengan dash.
        
- **Alasan Perbaikan:**
    
    - Menyesuaikan dengan standar dan konvensi _best practice_ ekosistem React/TypeScript modern.
        
    - Menjaga konsistensi di dalam tim dan mencegah potensi isu _case-sensitivity_ antar sistem operasi (macOS, Linux, Windows) saat _build_ atau _deployment_.
        

### 6. Enkapsulasi Ketat via Feature Public API (`index.ts` Utama)

- **Apa yang Diperbarui:** Menegaskan berkas `features/[feature-name]/index.ts` sebagai satu-satunya _Public API_ atau "penjaga gawang" bagi setiap modul fitur.
    
- **Alasan Perbaikan:**
    
    - Memastikan kapsulasi modular yang murni (_Encapsulation_).
        
    - Folder internal seperti `domain/`, `data/`, dan `di/` tertutup dari pihak luar. Fitur lain tidak boleh mengimpor langsung dari folder internal tersebut, sehingga refactoring di dalam fitur tidak akan merusak (_break_) fitur-fitur lainnya.
        

## 🧪 Panduan Tambahan: Unit Testing 

### A. Strategi Unit Testing (`__tests__/`)

Testing disusun mengikuti hierarki layer untuk mempermudah isolasi bug:

1. **Domain Layer (Prioritas Utama):**
    
    - Menguji _UseCase_ dan aturan bisnis murni.
        
    - Menggunakan _mock repository_ sehingga tes berjalan sangat cepat tanpa dependensi ke jaringan/API.
        
2. **Data Layer:**
    
    - Menguji _Mapper_ (memastikan transformasi DTO ke Entity akurat) dan _Repository Implementation_.
        
3. **Presentation Layer:**
    
    - Menguji _Custom Hooks_ (menguji state _loading/error/success_) dan _Store_ Zustand.
        
