## 📝 Ringkasan Singkat

Ini adalah starter template frontend yang dibangun dengan:

- **React 19** + **TypeScript** (strict mode)
- **Vite** (cepat banget buat development!)
- **Clean Architecture** + **Feature-Based Structure** (biar kode rapi dan mudah di-maintain)

### ✅ Contoh Fitur Nyata yang Sudah Jalan di Repo Ini

Dua fitur di bawah ini **benar-benar ada di kode** (bukan cuma contoh dokumentasi) dan bisa langsung dibuka/dijalankan sebagai referensi pola:

| Fitur     | Lokasi                 | Yang didemokan                                                                                                                       |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `landing` | `src/features/landing` | Pola Clean Architecture dengan **dummy data** (tanpa backend)                                                                        |
| `auth`    | `src/features/auth`    | Pola yang sama tapi **benar-benar panggil API** (`apiService`), simpan token, dan di-wire ke routing terproteksi (`ProtectedOutlet`) |

Kalau kamu bingung dengan contoh kode di bawah (yang pakai nama `employee`/`attendance` sebagai ilustrasi), buka langsung dua folder di atas — itu implementasi nyata yang sudah teruji jalan.

Selain itu, `src/_reference_ui/` berisi katalog komponen contoh dari template lama (bukan bagian aplikasi aktif) — bisa dilihat di aplikasi lewat menu sidebar **Reference UI** (`/reference-ui`) saat sudah login.

---

## 🚀 Cara Menjalankan Proyek

### 1. Pasang Dependensi

Pertama, install semua package yang dibutuhkan:

```powershell
npm install
```

### 2. Jalankan Aplikasi (Dev Server)

Kemudian jalankan aplikasi di mode development:

```powershell
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang ditampilkan di terminal).

### 3. Jalankan Test

Untuk menjalankan unit test:

```powershell
npm test
```

### 4. Cek Kualitas Kode Sebelum Commit

Perintah ini juga otomatis jalan lewat Husky pre-commit/pre-push, tapi bisa dijalankan manual:

```powershell
npm run lint          # ESLint
npm run format:check  # Cek format Prettier (npm run format untuk auto-fix)
npx tsc -b --noEmit    # Type-check
npm run build          # Full build (juga jalan di pre-push)
```

### 5. Bikin Pull Request

Ada 1 template PR (`.github/pull_request_template.md`) yang **otomatis ke-load di setiap PR baru**, tidak peduli target branch-nya apa (GitHub tidak punya fitur auto-pilih template per branch tanpa GitHub Action — jadi ini didesain 1 file saja biar tidak ada langkah pilih manual yang gampang kelewat).

Isinya ada checklist dasar yang wajib untuk semua PR, plus dua section tambahan (`Tambahan kalau target staging` dan `Tambahan kalau target main`) — isi bagian yang relevan sesuai branch tujuan PR-mu, hapus yang tidak relevan.

---

## 🏗️ Arsitektur Proyek (Yang Penting Kamu Pahami!)

Proyek ini menggunakan **Feature-Based Clean Architecture**. Artinya:

- Semua kode dipecah per **fitur** (contoh: `landing`, `auth`, `payroll`, dll.)
- Setiap fitur punya **3 layer utama** dengan tugas masing-masing
- Layer tidak boleh "lompat" (harus berurutan)

### 🎯 Alur Kerja Sederhana

```
User klik tombol
  → Page (tampilan)
    → Hook (logic)
      → Usecase (aturan bisnis)
        → Repository (akses data)
          → Service (panggil API)
            → Backend
```

---

## 📁 Struktur Folder

### 🎯 Versi Ringkas

```bash
src/
├── features/              # 🔥 Semua fitur bisnis
│   ├── employee/          # Fitur karyawan
│   │   ├── domain/        # Business logic & entities
│   │   ├── data/          # API calls & data mapping
│   │   ├── presentation/  # UI components & pages
│   │   └── index.ts       # Export public API
│   └── attendance/       # Fitur absensi
│       ├── domain/
│       ├── data/
│       ├── presentation/
│       └── index.ts
├── shared/                # 🔧 Komponen reusable
│   ├── components/        # UI components umum
│   ├── hooks/             # Custom hooks umum
│   ├── utils/             # Helper functions
│   └── types/             # Shared types
├── infrastructure/        # 🌐 External dependencies
│   └── api/               # API client & endpoints
├── App.tsx                # 🏠 Root component
└── main.tsx               # 🚀 Entry point
```

### �📋 Versi Lengkap (Detail Implementasi)

Berikut adalah struktur folder utama yang kamu butuhkan ketahui:

```bash
src/
├── features/          # Semua fitur ada di sini! (paling penting)
│   ├── landing/      # Contoh fitur landing
│   │   ├── domain/    # Layer bisnis (aturan & data)
│   │   │   ├── entities/    # Definisi tipe data
│   │   │   └── usecases/    # Logic bisnis
│   │   ├── data/      # Layer data (API & mapping)
│   │   │   ├── models/      # Rubah format data API
│   │   │   ├── services/    # Panggil API
│   │   │   └── repositories/ # Hubungin service & model
│   │   ├── presentation/ # Layer tampilan (UI)
│   │   │   ├── hooks/       # Logic untuk UI
│   │   │   ├── components/  # Komponen UI khusus fitur
│   │   │   └── pages/       # Halaman utama fitur
│   │   └── index.ts   # Export apa yang bisa dipakai luar fitur
│   │
│   └── employee/     # Fitur Karyawan (contoh implementasi lengkap)
│       ├── domain/    # Layer bisnis (aturan & data)
│       │   ├── entities/    # Definisi tipe data
│       │   │   ├── Employee.ts           # Interface Employee
│       │   │   ├── Attendance.ts         # Interface Attendance
│       │   │   └── Position.ts           # Interface Position
│       │   └── usecases/    # Logic bisnis
│       │       ├── employee-data/
│       │       │   ├── GetEmployees.ts    # Logic get data karyawan
│       │       │   ├── CreateEmployee.ts  # Logic create karyawan
│       │       │   └── UpdateEmployee.ts  # Logic update karyawan
│       │       └── attendance/
│       │           ├── GetAttendance.ts   # Logic get data absensi
│       │           ├── CreateAttendance.ts # Logic create absensi
│       │           └── UpdateAttendance.ts # Logic update absensi
│       │
│       ├── data/      # Layer data (API & mapping)
│       │   ├── models/      # Rubah format data API
│       │   │   ├── employee-data/
│       │   │   │   ├── EmployeeModel.ts    # Model untuk API response
│       │   │   │   └── EmployeeMapper.ts   # Mapper API ke domain
│       │   │   └── attendance/
│       │   │       ├── AttendanceModel.ts  # Model untuk API response
│       │   │       └── AttendanceMapper.ts # Mapper API ke domain
│       │   ├── services/    # Panggil API
│       │   │   ├── employee-data/
│       │   │   │   ├── FetchEmployees.ts   # API call get employees
│       │   │   │   ├── CreateEmployee.ts   # API call create employee
│       │   │   │   └── UpdateEmployee.ts   # API call update employee
│       │   │   └── attendance/
│       │   │       ├── FetchAttendance.ts  # API call get attendance
│       │   │       ├── CreateAttendance.ts # API call create attendance
│       │   │       └── UpdateAttendance.ts # API call update attendance
│       │   └── repositories/ # Hubungin service & model
│       │       ├── employee-data/
│       │       │   └── EmployeeRepository.ts # Repository untuk employee
│       │       └── attendance/
│       │           └── AttendanceRepository.ts # Repository untuk attendance
│       │
│       ├── presentation/ # Layer tampilan (UI)
│       │   ├── hooks/       # Logic untuk UI
│       │   │   ├── employee-data/
│       │   │   │   ├── UseEmployeeData.ts   # Hook untuk data karyawan
│       │   │   │   └── UseEmployeeForm.ts   # Hook untuk form karyawan
│       │   │   └── attendance/
│       │   │       ├── UseAttendanceData.ts # Hook untuk data absensi
│       │   │       └── UseAttendanceForm.ts # Hook untuk form absensi
│       │   ├── components/  # Komponen UI khusus fitur
│       │   │   ├── employee-data/
│       │   │   │   ├── EmployeeTable.tsx   # Tabel data karyawan
│       │   │   │   ├── EmployeeForm.tsx    # Form input karyawan
│       │   │   │   └── EmployeeCard.tsx    # Card detail karyawan
│       │   │   └── attendance/
│       │   │       ├── AttendanceTable.tsx  # Tabel data absensi
│       │   │       ├── AttendanceForm.tsx   # Form input absensi
│       │   │       └── AttendanceCalendar.tsx # Kalender absensi
│       │   └── pages/       # Halaman utama fitur
│       │       ├── employee-data/
│       │       │   ├── EmployeeListPage.tsx # Halaman daftar karyawan
│       │       │   ├── EmployeeDetailPage.tsx # Halaman detail karyawan
│       │       │   └── EmployeeFormPage.tsx # Halaman form karyawan
│       │       └── attendance/
│       │           ├── AttendanceListPage.tsx # Halaman daftar absensi
│       │           ├── AttendanceDetailPage.tsx # Halaman detail absensi
│       │           └── AttendanceFormPage.tsx # Halaman form absensi
│       │
│       └── index.ts   # Export apa yang bisa dipakai luar fitur
│
├── components/        # Komponen UI yang bisa dipakai semua fitur
├── hooks/             # Hook umum yang bisa dipakai semua fitur
├── utils/             # Fungsi helper (format tanggal, dll.)
├── stores/            # State global (Auth, theme, dll.)
├── types/             # Tipe data umum
├── App.tsx            # Root aplikasi
└── main.tsx           # Entry point aplikasi
```

---

## 📝 Konvensi Penamaan File & Folder (WAJIB!)

### 🇬🇧 Bahasa Inggris untuk Semua Nama

**WAJIB menggunakan bahasa Inggris** untuk:

- File names: `Employee.ts`, `AttendanceTable.tsx`
- Folder names: `employee-data`, `attendance`
- Function names: `GetEmployees()`, `CreateAttendance()`
- Variable names: `employee_data`, `attendance_list`

### 📁 Rules Penamaan Folder

- **Huruf kecil semua**
- **Multi-kata gunakan '-' (dash)**
- ✅ Benar: `employee-data`, `user-management`, `data-table`
- ❌ Salah: `employeeData`, `EmployeeData`, `employee_data`

### 📄 Rules Penamaan File

- **Selalu PascalCase (huruf besar di awal)**
- ✅ Benar: `EmployeeTable.tsx`, `GetEmployees.ts`, `UseEmployeeData.ts`
- ❌ Salah: `employeeTable.tsx`, `getEmployees.ts`, `useEmployeeData.ts`

### 🎯 Rules Spesifik per Tipe File

#### Components (.tsx)

- **PascalCase**: `EmployeeTable.tsx`, `AttendanceForm.tsx`

#### Hooks (.ts)

- **PascalCase dengan "Use" prefix**: `UseEmployeeData.ts`, `UseAttendanceForm.ts`

#### Services (.ts)

- **PascalCase**: `FetchEmployees.ts`, `CreateAttendance.ts`

#### Entities/Models (.ts)

- **PascalCase**: `Employee.ts`, `AttendanceModel.ts`

#### Pages (.tsx)

- **PascalCase dengan "Page" suffix**: `EmployeeListPage.tsx`, `AttendanceDetailPage.tsx`

#### Usecases (.ts)

- **PascalCase**: `GetEmployees.ts`, `UpdateAttendance.ts`

---

## 🧩 Penjelasan Tiap Layer (Dengan Contoh!)

> ⚠️ **Catatan**: contoh kode `employee`/`attendance` di bawah ini bersifat **ilustratif** untuk menjelaskan pola per-layer — beberapa nama file/folder di sini disederhanakan untuk pembelajaran dan tidak 1:1 sama dengan struktur file di repo. Untuk melihat implementasi yang **benar-benar ada dan jalan**, buka langsung `src/features/landing` (contoh dummy-data) atau `src/features/auth` (contoh real API call, lihat bagian [Contoh Fitur Nyata](#-contoh-fitur-nyata-yang-sudah-jalan-di-repo-ini) di atas).

Kita pakai **fitur employee** sebagai contoh lengkap untuk menjelaskan konsepnya!

---

### 1️⃣ Domain Layer (Tempat Aturan Bisnis)

Ini layer **terpenting**! Di sini kita definisikan:

- Apa itu data (entity)
- Apa yang bisa dilakukan dengan data (usecase)

#### Contoh: `domain/entities/Employee.ts`

Ini definisi tipe data karyawan:

```typescript
export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
}

export interface EmployeeRepository {
  GetAll(): Promise<Employee[]>;
  GetById(id: string): Promise<Employee>;
  Create(employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>): Promise<Employee>;
  Update(id: string, employee: Partial<Employee>): Promise<Employee>;
  Delete(id: string): Promise<void>;
}
```

#### Contoh: `domain/usecases/employee-data/GetEmployees.ts`

Ini logic untuk mengambil data karyawan:

```typescript
import { Employee, EmployeeRepository } from '../entities/Employee';

export const GetEmployees = (repository: EmployeeRepository) => {
  return async (): Promise<Employee[]> => {
    return await repository.GetAll();
  };
};

export const GetEmployeeById = (repository: EmployeeRepository) => {
  return async (id: string): Promise<Employee> => {
    return await repository.GetById(id);
  };
};
```

#### Contoh: `domain/usecases/employee-data/CreateEmployee.ts`

```typescript
import { Employee, EmployeeRepository } from '../entities/Employee';

export const CreateEmployee = (repository: EmployeeRepository) => {
  return async (
    employeeData: Omit<Employee, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Employee> => {
    // Business logic validation
    if (!employeeData.email.includes('@')) {
      throw new Error('Invalid email format');
    }

    return await repository.Create(employeeData);
  };
};
```

---

### 2️⃣ Data Layer (Tempat Ngambil Data)

Di sini kita:

- Panggil API ke backend
- Rubah format data API ke format yang kita butuhkan
- Hubungkan semuanya di repository

#### Contoh: `data/services/employee-data/FetchEmployees.ts`

Ini yang langsung ngelakuin request ke API:

```typescript
import { apiClient } from '@/infrastructure/api/apiClient';

export const FetchEmployees = async () => {
  const response = await apiClient.get('/employees');
  return response.data;
};

export const FetchEmployeeById = async (id: string) => {
  const response = await apiClient.get(`/employees/${id}`);
  return response.data;
};

export const CreateEmployee = async (employeeData: any) => {
  const response = await apiClient.post('/employees', employeeData);
  return response.data;
};
```

#### Contoh: `data/models/employee-data/EmployeeModel.ts`

Ini model untuk response dari API:

```typescript
export interface EmployeeApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  jobTitle: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeCreateRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  jobTitle: string;
}
```

#### Contoh: `data/models/employee-data/EmployeeMapper.ts`

Ini untuk rubah format API ke domain:

```typescript
import { Employee } from '@/features/employee/domain/entities/Employee';
import { EmployeeApiResponse } from './EmployeeModel';

export const MapApiToEmployee = (apiData: EmployeeApiResponse): Employee => {
  return {
    id: apiData.id.toString(),
    first_name: apiData.firstName,
    last_name: apiData.lastName,
    email: apiData.emailAddress,
    position: apiData.jobTitle,
    status: apiData.isActive ? 'active' : 'inactive',
    created_at: new Date(apiData.createdAt),
    updated_at: new Date(apiData.updatedAt),
  };
};

export const MapEmployeeToApi = (employee: Employee): EmployeeCreateRequest => {
  return {
    firstName: employee.first_name,
    lastName: employee.last_name,
    emailAddress: employee.email,
    jobTitle: employee.position,
  };
};
```

#### Contoh: `data/repositories/employee-data/EmployeeRepository.ts`

Ini yang hubungin service dan model:

```typescript
import { EmployeeRepository } from '@/features/employee/domain/entities/Employee';
import {
  FetchEmployees,
  FetchEmployeeById,
  CreateEmployee,
} from '../services/employee-data/FetchEmployees';
import { MapApiToEmployee, MapEmployeeToApi } from '../models/employee-data/EmployeeMapper';

export const EmployeeRepositoryImpl: EmployeeRepository = {
  GetAll: async (): Promise<Employee[]> => {
    const rawData = await FetchEmployees();
    return rawData.map(MapApiToEmployee);
  },

  GetById: async (id: string): Promise<Employee> => {
    const rawData = await FetchEmployeeById(id);
    return MapApiToEmployee(rawData);
  },

  Create: async (employeeData): Promise<Employee> => {
    const apiRequest = MapEmployeeToApi(employeeData);
    const response = await CreateEmployee(apiRequest);
    return MapApiToEmployee(response);
  },

  Update: async (id: string, employeeData) => {
    // Implementation for update
    throw new Error('Not implemented yet');
  },

  Delete: async (id: string) => {
    // Implementation for delete
    throw new Error('Not implemented yet');
  },
};
```

---

### 3️⃣ Presentation Layer (Tempat Tampilan)

Di sini kita:

- Buat halaman dan komponen UI
- Buat hook untuk logic UI
- Ngambil data dari domain layer

#### Contoh: `presentation/hooks/employee-data/UseEmployeeData.ts`

Hook untuk ngelola state dan logic:

```typescript
import { useState, useEffect } from 'react';
import { Employee } from '@/features/employee/domain/entities/Employee';
import {
  GetEmployees,
  GetEmployeeById,
} from '@/features/employee/domain/usecases/employee-data/GetEmployees';
import { CreateEmployee } from '@/features/employee/domain/usecases/employee-data/CreateEmployee';
import { EmployeeRepositoryImpl } from '@/features/employee/data/repositories/employee-data/EmployeeRepository';

export const UseEmployeeData = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const getEmployeesUseCase = GetEmployees(EmployeeRepositoryImpl);
      const result = await getEmployeesUseCase();
      setEmployees(result);
    } catch (err) {
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (
    employeeData: Omit<Employee, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    try {
      setLoading(true);
      setError(null);
      const createEmployeeUseCase = CreateEmployee(EmployeeRepositoryImpl);
      const newEmployee = await createEmployeeUseCase(employeeData);
      setEmployees((prev) => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      setError('Failed to create employee');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    getAllEmployees,
    createEmployee,
  };
};
```

#### Contoh: `presentation/components/employee-data/EmployeeTable.tsx`

Komponen tabel untuk menampilkan data karyawan:

```typescript
import React from 'react';
import { Employee } from '@/features/employee/domain/entities/Employee';

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, loading }) => {
  if (loading) {
    return <div>Loading employees...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.first_name} {employee.last_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  employee.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {employee.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

#### Contoh: `presentation/pages/employee-data/EmployeeListPage.tsx`

Halaman utama untuk menampilkan daftar karyawan:

```typescript
import React from 'react';
import { UseEmployeeData } from '../hooks/employee-data/UseEmployeeData';
import { EmployeeTable } from '../components/employee-data/EmployeeTable';

export const EmployeeListPage: React.FC = () => {
  const { employees, loading, error } = UseEmployeeData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
        <p className="mt-2 text-gray-600">Manage your organization's employees</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <EmployeeTable employees={employees} loading={loading} />
    </div>
  );
};
```

#### Contoh: `index.ts` (Public API untuk Feature)

Ini file yang mendefinisikan apa saja yang bisa dipakai dari luar feature:

```typescript
// Export pages untuk routing
export { EmployeeListPage } from './presentation/pages/employee-data/EmployeeListPage';
export { EmployeeDetailPage } from './presentation/pages/employee-data/EmployeeDetailPage';
export { EmployeeFormPage } from './presentation/pages/employee-data/EmployeeFormPage';

// Export hooks untuk dipakai di components lain
export { UseEmployeeData } from './presentation/hooks/employee-data/UseEmployeeData';
export { UseEmployeeForm } from './presentation/hooks/employee-data/UseEmployeeForm';

// Export entities untuk dipakai di shared types
export { Employee, EmployeeRepository } from './domain/entities/Employee';

// Export usecases untuk testing atau advanced usage
export { GetEmployees, CreateEmployee } from './domain/usecases/employee-data/GetEmployees';
```

---

## 🔄 Cara Pakai Feature di Luar

### Di Routing (App.tsx)

```typescript
import { EmployeeListPage } from '@/features/employee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employees" element={<EmployeeListPage />} />
      </Routes>
    </Router>
  );
}
```

### Di Components Lain

```typescript
import { UseEmployeeData } from '@/features/employee';

export const SomeComponent = () => {
  const { employees } = UseEmployeeData();

  return <div>Total employees: {employees.length}</div>;
};
```

---

## 📋 Aturan Penting Yang Harus Kamu Ikuti!

### ✅ Yang Boleh Kamu Lakukan

1. **Gunakan hook untuk logic** - Jangan tulis logic langsung di component
2. **Pisahkan fitur** - Setiap fitur harus independent (tidak bergantung fitur lain)
3. **Gunakan alias import** - Contoh: `import { Employee } from '@/features/landing'`
4. **Tulis type/interface** - Jangan pakai `any`!

### ❌ Yang Jangan Kamu Lakukan

1. **Jangan lompat layer** - Presentation → Domain ← Data (tidak boleh Presentation langsung ke Data!)
2. **Jangan panggil API langsung di hook/component** - Harus lewat service & repository
3. **Jangan import fitur lain secara langsung** - Gunakan shared layer atau index.ts
4. **Jangan tarik business logic di UI** - Semua aturan bisnis harus di domain layer

---

## 🏷️ Aturan Penamaan File & Folder

| Jenis         | Contoh                           | Keterangan                       |
| ------------- | -------------------------------- | -------------------------------- |
| **Folder**    | `landing`, `user-management`     | Huruf kecil, pakai `-`           |
| **Component** | `EmployeeTable.tsx`              | PascalCase                       |
| **Hook**      | `UseEmployees.ts`                | PascalCase, mulai dengan "Use"   |
| **Page**      | `LandingPage.tsx`                | PascalCase, akhiri dengan "Page" |
| **Function**  | `GetEmployees()`, `FormatDate()` | PascalCase                       |
| **Variable**  | `employee_data`, `is_loading`    | Huruf kecil, pakai `_`           |

---

## 🎯 Tabel Keputusan Cepat

| Kamu Butuh Apa?   | Tempatnya Dimana?                                              |
| ----------------- | -------------------------------------------------------------- |
| Panggil API       | `features/[fitur]/data/services/`                              |
| Aturan Bisnis     | `features/[fitur]/domain/usecases/`                            |
| Tampilan UI       | `features/[fitur]/presentation/pages/`                         |
| Logic UI          | `features/[fitur]/presentation/hooks/`                         |
| Komponen Reusable | `components/` atau `features/[fitur]/presentation/components/` |
| Helper Fungsi     | `utils/`                                                       |
| State Global      | `stores/`                                                      |

---

## 🆘 Butuh Bantuan?

Jika kamu bingung:

1. Lihat contoh fitur **landing** (dummy data) atau **auth** (real API call) yang sudah jadi
2. Buka `/reference-ui` di aplikasi untuk lihat katalog komponen UI yang tersedia
3. Baca dokumentasi di `documentation/rules/`
4. Tanya rekan tim yang lebih berpengalaman!

---

## 🎯 Tips & Best Practices

### ✅ Yang Harus Dilakukan:

1. **Selalu ikuti struktur folder** yang sudah ditentukan
2. **Gunakan bahasa Inggris** untuk semua nama file dan folder
3. **PascalCase untuk file**, **lowercase-dash untuk folder**
4. **Export lewat index.ts** untuk public API
5. **Business logic di domain layer**, bukan di UI

### ❌ Yang Tidak Boleh Dilakukan:

1. **Import langsung** dari feature lain (hanya lewat shared)
2. **Business logic di components/pages**
3. **Cross-layer dependencies** (presentation import data layer langsung)
4. **Nama file tidak sesuai konvensi**
5. **Mix bahasa** dalam penamaan

---

## 🚀 Quick Start Template

### Buat Feature Baru

1. Copy folder `landing` sebagai template
2. Rename sesuai nama feature (contoh: `employee`)
3. Update semua nama file dan folder sesuai konvensi
4. Implementasi business logic di domain layer
5. Tambahkan API calls di data layer
6. Buat UI di presentation layer
7. Export yang diperlukan di `index.ts`

### Contoh Struktur untuk Feature `attendance`

```
features/attendance/
├── domain/
│   ├── entities/
│   │   └── Attendance.ts
│   └── usecases/
│       └── attendance/
│           ├── GetAttendance.ts
│           └── CreateAttendance.ts
├── data/
│   ├── models/
│   │   └── attendance/
│   │       ├── AttendanceModel.ts
│   │       └── AttendanceMapper.ts
│   ├── services/
│   │   └── attendance/
│   │       ├── FetchAttendance.ts
│   │       └── CreateAttendance.ts
│   └── repositories/
│       └── attendance/
│           └── AttendanceRepository.ts
├── presentation/
│   ├── hooks/
│   │   └── attendance/
│   │       ├── UseAttendanceData.ts
│   │       └── UseAttendanceForm.ts
│   ├── components/
│   │   └── attendance/
│   │       ├── AttendanceTable.tsx
│   │       └── AttendanceForm.tsx
│   └── pages/
│       └── attendance/
│           ├── AttendanceListPage.tsx
│           └── AttendanceFormPage.tsx
└── index.ts
```

---

## 📝 Catatan Penting Lainnya

- **Jangan lupa buat branch** sebelum ngoding fitur baru
- **Selalu jalankan test** sebelum push kode
- **Follow convention** yang sudah ada - jangan bikin gaya sendiri!

Selamat ngoding! 🚀

---

_Last updated: 2026-05-11_
