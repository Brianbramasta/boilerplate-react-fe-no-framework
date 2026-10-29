Berikut adalah penjelasan detail fungsi dari masing-masing folder dan file berdasarkan blueprint **Feature-Based Clean Architecture**, lengkap dengan contoh kode konkret menggunakan TypeScript dan React.

Kita akan menggunakan contoh studi kasus fitur **Karyawan**.

---

🧠 1. Domain Layer (`domain/`)

Layer ini adalah **otak dari bisnis Anda**. Layer ini mutakhir, suci, dan **tidak boleh mengimport apa pun dari React atau library luar** (seperti Axios). Hanya berisi TypeScript murni.

📁 `domain/entities/Karyawan.ts`

- **Fungsi:** Mendefinisikan struktur data murni yang dibutuhkan oleh aplikasi/bisnis Anda.
- **Contoh Isi:**

ts

``` javascript
export interface Karyawan {
  id: string;
  fullName: string;
  role: string;
  joinDate: Date; // Menggunakan objek Date asli, bukan string dari API
}
```

Gunakan kode dengan hati-hati.

📁 `domain/repositories/KaryawanRepository.interface.ts`

- **Fungsi:** Membuat _kontrak_ atau janji tentang apa saja aksi data yang bisa dilakukan. Domain tidak peduli datanya diambil dari REST API, GraphQL, atau LocalStorage.
- **Contoh Isi:**

ts

``` javascript
import { Karyawan } from "../entities/Karyawan";

export interface IKaryawanRepository {
  getAllKaryawan(): Promise<Karyawan[]>;
}
```

Gunakan kode dengan hati-hati.

📁 `domain/usecases/GetKaryawanUseCase.ts`

- **Fungsi:** Berisi aturan bisnis (_business logic_). Menggunakan prinsip _Dependency Inversion_ dengan menerima repository lewat _constructor/parameter_.
- **Contoh Isi:**

ts

``` javascript
import { IKaryawanRepository } from "../repositories/KaryawanRepository.interface";
import { Karyawan } from "../entities/Karyawan";

export class GetKaryawanUseCase {
  constructor(private karyawanRepo: IKaryawanRepository) {}

  async execute(): Promise<Karyawan[]> {
    // Di sini Anda bisa menaruh business logic tambahan, misal filter otomatis
    const data = await this.karyawanRepo.getAllKaryawan();
    return data.sort((a, b) => b.joinDate.getTime() - a.joinDate.getTime());
  }
}
```

Gunakan kode dengan hati-hati.

---

💾 2. Data Layer (`data/`)

Layer ini bertanggung jawab mengambil data mentah dari API/Infrastruktur, menyelaraskannya, dan mengimplementasikan kontrak dari Domain.

📁 `data/dtos/KaryawanDTO.ts`

- **Fungsi:** _Data Transfer Object_. Meniru persis struktur data kotor/asli yang dikirim oleh Backend (biasanya masih berupa `snake_case` atau format mentah).
- **Contoh Isi:**

ts

```javascript
export interface KaryawanDTO {
  id_karyawan: string;
  nama_lengkap: string;
  jabatan_code: string;
  created_at: string; // Masih berupa string tanggal dari DB
}
```

Gunakan kode dengan hati-hati.

📁 `data/mappers/KaryawanMapper.ts`

- **Fungsi:** Mengubah data kotor `KaryawanDTO` (dari API) menjadi data bersih `Karyawan` (Entity Domain) yang siap dipakai UI.
- **Contoh Isi:**

ts

```javascript
import { KaryawanDTO } from "../dtos/KaryawanDTO";
import { Karyawan } from "../../domain/entities/Karyawan";

export class KaryawanMapper {
  static toEntity(dto: KaryawanDTO): Karyawan {
    return {
      id: dto.id_karyawan,
      fullName: dto.nama_lengkap,
      role: dto.jabatan_code === "MGR" ? "Manager" : "Staff", // Transformasi data bisnis
      joinDate: new Date(dto.created_at), // String diubah jadi Objek Date asli
    };
  }
}
```

Gunakan kode dengan hati-hati.

📁 `data/services/KaryawanApiService.ts`

- **Fungsi:** Melakukan hit HTTP request langsung menggunakan axios/fetch client global.
- **Contoh Isi:**

ts

```javascript
import { apiClient } from "@/infrastructure/api/apiClient";
import { KaryawanDTO } from "../dtos/KaryawanDTO";

export class KaryawanApiService {
  async fetchAll(): Promise<KaryawanDTO[]> {
    const response = await apiClient.get<KaryawanDTO[]>("/v1/karyawan");
    return response.data;
  }
}
```

Gunakan kode dengan hati-hati.

📁 `data/repositories/KaryawanRepositoryImpl.ts`

- **Fungsi:** Implementasi nyata dari kontrak interface di Domain. Di sini Service dan Mapper digabungkan.
- **Contoh Isi:**

ts

```javascript
import { IKaryawanRepository } from "../../domain/repositories/KaryawanRepository.interface";
import { Karyawan } from "../../domain/entities/Karyawan";
import { KaryawanApiService } from "../services/KaryawanApiService";
import { KaryawanMapper } from "../mappers/KaryawanMapper";

export class KaryawanRepositoryImpl implements IKaryawanRepository {
  constructor(private apiService: KaryawanApiService) {}

  async getAllKaryawan(): Promise<Karyawan[]> {
    const rawData = await this.apiService.fetchAll();
    return rawData.map(KaryawanMapper.toEntity); // Mengubah semua DTO menjadi Entity bersih
  }
}
```

Gunakan kode dengan hati-hati.

---

🔌 3. Dependency Injection Layer (`di/`)

Layer penghubung rahasia agar presentasi tidak bocor ke data layer.

📁 `di/KaryawanContainer.ts`

- **Fungsi:** Merakit instansiasi class dari data layer dan domain layer sehingga siap diekspor ke UI/Hooks sebagai objek jadi.
- **Contoh Isi:**

ts

```javascript
import { KaryawanApiService } from "../data/services/KaryawanApiService";
import { KaryawanRepositoryImpl } from "../data/repositories/KaryawanRepositoryImpl";
import { GetKaryawanUseCase } from "../domain/usecases/GetKaryawanUseCase";

// 1. Rakit data source
const karyawanApiService = new KaryawanApiService();

// 2. Inject service ke repositori impl
const karyawanRepository = new KaryawanRepositoryImpl(karyawanApiService);

// 3. Inject repositori ke UseCase murni. UseCase siap pakai!
export const getKaryawanUseCase = new GetKaryawanUseCase(karyawanRepository);
```

Gunakan kode dengan hati-hati.

---

🎨 4. Presentation Layer (`presentation/`)

Layer yang hanya peduli tentang tampilan, interaksi pengguna, dan manajemen state UI.

📁 `presentation/hooks/useKaryawanQuery.ts`

- **Fungsi:** Menghubungkan TanStack Query (React Query) dengan UseCase yang sudah dirakit di folder DI.
- **Contoh Isi:**

ts

```javascript
import { useQuery } from "@tanstack/react-query";
import { getKaryawanUseCase } from "../../di/KaryawanContainer";

export const useKaryawanQuery = () => {
  return useQuery({
    queryKey: ["karyawan-list"],
    queryFn: () => getKaryawanUseCase.execute(), // Memanggil usecase murni yang sudah dirakit
  });
};
```

Gunakan kode dengan hati-hati.

📁 `presentation/store/useKaryawanStore.ts`

- **Fungsi:** Menyimpan state lokal UI yang kompleks untuk fitur ini (misal pencarian/filter aktif), menggunakan Zustand.
- **Contoh Isi:**

ts

```javascript
import { create } from "zustand";

interface KaryawanState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useKaryawanStore = create<KaryawanState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
```

Gunakan kode dengan hati-hati.

📁 `presentation/pages/KaryawanPage.tsx`

- **Fungsi:** Komponen halaman utama tempat data di-render ke user. Komponen sangat bersih karena tidak ada logika API sama sekali di sini.
- **Contoh Isi:**

tsx

```javascript
import React from "react";
import { useKaryawanQuery } from "../hooks/useKaryawanQuery";
import { useKaryawanStore } from "../store/useKaryawanStore";
import { Button } from "@/shared/components/ui/Button"; // Contoh import dari shared ui

export const KaryawanPage: React.FC = () => {
  const { data: karyawanList, isLoading, error } = useKaryawanQuery();
  const { searchQuery, setSearchQuery } = useKaryawanStore();

  if (isLoading) return <div>Loading data karyawan...</div>;
  if (error) return <div>Terjadi kesalahan sistem.</div>;

  return (
    <div className="p-6">
      <input 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Cari karyawan..." 
      />
      <ul>
        {karyawanList?.map((karyawan) => (
          <li key={karyawan.id}>
            {karyawan.fullName} - <strong>{karyawan.role}</strong>
          </li>
        ))}
      </ul>
      <Button onClick={() => alert("Tambah")}>Tambah Karyawan</Button>
    </div>
  );
};
```

Gunakan kode dengan hati-hati.

---

💡 **Tips Praktis untuk Implementation Lanjutan**


• **Zustand Hook Naming**: Gunakan **camelCase** nama file di `presentation/store/` (misal: `useKaryawanStore.ts`). Ekspor hook dengan nama serupa: `export const useKaryawanStore = create<KaryawanState>(...)`.

🚪 5. Feature Public API (`index.ts` Utama)

📄 `features/karyawan/index.ts`

- **Fungsi:** Penjaga gawang fitur. Hanya mengekspos apa yang boleh diakses oleh fitur lain (seperti komponen halaman untuk dipasang di Router).
- **Contoh Isi:**

ts

```javascript
// Fitur lain HANYA boleh mengakses file ini. 
// Folder domain/, data/, di/ di dalam tidak boleh disentuh langsung dari luar!
export { KaryawanPage } from "./presentation/pages/KaryawanPage";
```

Gunakan kode dengan hati-hati.

Apakah Anda ingin melanjutkan dengan melihat **bagaimana menulis berkas Unit Testing (`__tests__`)** untuk menguji `GetKaryawanUseCase` dan `KaryawanMapper` di atas, atau ada bagian dari **layer infrastruktur API** yang ingin Anda bedah lebih dalam?