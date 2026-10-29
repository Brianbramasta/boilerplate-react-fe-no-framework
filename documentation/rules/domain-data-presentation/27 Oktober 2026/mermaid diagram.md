Berikut adalah gambaran arsitektur **Feature-Based Clean Architecture** front-end yang telah kita bahas. Diagram ini menunjukkan bagaimana struktur folder disusun, bagaimana arah dependensi mengalir (hanya boleh masuk ke dalam/Domain), serta bagaimana **DI Layer** dan **Public API (`index.ts`)** menjaga pembatasan kode.

📐 1. Diagram Aliran Data & Hubungan Antar-Layer (Satu Fitur)

Diagram ini menggambarkan bagaimana sebuah fitur (misal: `karyawan`) bekerja di dalamnya. Perhatikan bahwa **Domain Layer berada di tengah dan bersifat suci (tidak punya dependensi ke luar)**.

mermaid

``` mermaid
graph TD
    %% Styling
    classDef domain fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724;
    classDef data fill:#cce5ff,stroke:#007bff,stroke-width:2px,color:#004085;
    classDef pres fill:#fff3cd,stroke:#ffc107,stroke-width:2px,color:#856404;
    classDef di fill:#e2e3e5,stroke:#6c757d,stroke-width:2px,color:#383d41;
    classDef infra fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24;

    %% Global Infrastructure Boundary
    subgraph Global_Infra [🌐 Global Infrastructure & Shared]
        apiClient[apiClient.ts <br>Axios / Fetch API]:::infra
        sharedUI[Shared UI Kit <br>Components / Utils]:::infra
    end

    %% Feature Boundary
    subgraph Feature_Karyawan [📦 Feature: Karyawan]
        
        %% Public API Gate
        publicAPI[🚪 index.ts <br>Feature Public API]:::pres

        %% Presentation Layer
        subgraph Presentation_Layer [🎨 Presentation Layer]
            page[KaryawanPage.tsx]:::pres
            comp[Components <br>KaryawanCard.tsx]:::pres
            store[Store <br>useKaryawanStore.ts]:::pres
            hook[Hooks <br>useKaryawanQuery.ts]:::pres
        end

        %% DI Layer
        subgraph DI_Layer [🔌 DI Layer]
            container[KaryawanContainer.ts <br>Factory Engine]:::di
        end

        %% Domain Layer
        subgraph Domain_Layer [🧠 Domain Layer - PURE TS]
            usecase[GetKaryawanUseCase.ts]:::domain
            repoInterface[IKaryawanRepository.interface.ts]:::domain
            entity[Karyawan.ts <br>Entities]:::domain
        end

        %% Data Layer
        subgraph Data_Layer [💾 Data Layer]
            repoImpl[KaryawanRepositoryImpl.ts]:::data
            service[KaryawanApiService.ts]:::data
            mapper[KaryawanMapper.ts]:::data
            dto[KaryawanDTO.ts]:::data
        end
    end

    %% Dependency & Data Flow Directions
    page --> hook
    page --> store
    comp --> page
    
    %% The Secret Bridge (DI)
    hook --> container
    container --> usecase
    container --> repoImpl
    container --> service

    %% Inner Connections
    usecase --> repoInterface
    repoInterface --> entity
    
    repoImpl -.->|Implements| repoInterface
    repoImpl --> mapper
    repoImpl --> service
    
    service --> dto
    mapper --> dto
    mapper --> entity

    %% External Connections
    service --> apiClient
    page --> sharedUI
    
    %% Public API Gate Connection
    publicAPI --> page
    publicAPI --> entity
    
    %% Outside Consumer
    AppRouter[AppRouter.tsx] -->|Hanya boleh akses pintu utama| publicAPI

```

Gunakan kode dengan hati-hati.

---

🧱 2. Diagram Komunikasi Antar-Fitur (Cross-Feature Boundaries)

Diagram ini menunjukkan bagaimana **Feature Public API (`index.ts`)** dan folder **Shared** bertindak sebagai benteng perlindungan agar Fitur A dan Fitur B tidak mengalami _tight coupling_ (saling keterikatan yang berantakan).

mermaid

```mermaid
graph LR 
    classDef feature fill:#e8e8e8,stroke:#333,stroke-width:2px;
    classDef public fill:#28a745,stroke:#1e7e34,stroke-width:2px,color:#fff;
    classDef private fill:#dc3545,stroke:#bd2130,stroke-width:2px,color:#fff;
    classDef shared fill:#17a2b8,stroke:#117a8b,stroke-width:2px,color:#fff;

    subgraph Fitur_Penggajian [📦 Fitur Penggajian]
        UI_Gaji[PenggajianPage.tsx]
    end

    subgraph Fitur_Karyawan [📦 Fitur Karyawan]
        Gate[🚪 index.ts <br>Public API]:::public
        Private_Code[isi perut fitur: <br>Domain / Data / Hooks]:::private
    end

    subgraph Layer_Shared [🤝 Shared Layer]
        Shared_Store[Global Store / Auth]:::shared
        Shared_UI[Shared UI Kit / Components]:::shared
    end

    %% Jalur Komunikasi Yang Benar
    UI_Gaji -->|✅ BOLEH <br>Ambil Halaman Utama| Gate
    UI_Gaji -->|✅ BOLEH <br>Ambil UI Global / Auth| Layer_Shared
    Gate --> Private_Code

    %% Jalur Yang Dilarang (Ditahan ESLint)
    UI_Gaji x-.->|❌ DILARANG TEROBOS! <br>Deep Import Perut Fitur| Private_Code

```

Gunakan kode dengan hati-hati.

🔍 Cara Membaca Diagram:

1. **Paling Suci (Hijau/Domain):** Kotak hijau di tengah tidak memiliki panah keluar menuju layer data atau presentation. Dia terisolasi sempurna dan hanya menerima perintah.
2. **Pabrik Perakitan (Abu-abu/DI):** Menjadi satu-satunya area yang boleh menyentuh Domain dan Data sekaligus untuk merakit fungsi (UseCase) sebelum diberikan ke Presentation Layer.
3. **Pintu Gerbang (Pintu Cokelat/Public API):** Pihak luar seperti `AppRouter` dilarang keras mengintip kotak merah (`Private_Code`). Semua akses wajib melalui `index.ts` (Pintu Hijau).

---

💡 **Tip Tambahan untuk Hindari Over-Engineering**

• **Zustand Hook Naming**: Pastikan penamaan file store di `presentation/store/` tetap konsisten menggunakan **camelCase** (misal: `useKaryawanStore.ts`). Ekspor hook dengan nama yang sama agar selaras dengan ekosistem React.

Apakah Anda ingin saya buatkan **contoh file tiruan (Mock Repository)** di dalam arsitektur ini agar Anda bisa melihat bagaimana DI Layer secara instan menukar data API menjadi data lokal saat melakukan **Unit Testing**?