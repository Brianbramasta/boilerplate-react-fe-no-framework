import type { KaryawanDTO } from '../dtos/KaryawanDTO';

const dummyKaryawan: KaryawanDTO[] = [
  {
    id_karyawan: '1',
    employee_code: 'EMP-001',
    nama_lengkap: 'Andi Pratama',
    email: 'andi.pratama@example.com',
    departemen: 'Teknologi Informasi',
    jabatan: 'Frontend Developer',
    tanggal_bergabung: '2022-03-14',
    status: 'active',
  },
  {
    id_karyawan: '2',
    employee_code: 'EMP-002',
    nama_lengkap: 'Siti Rahmawati',
    email: 'siti.rahmawati@example.com',
    departemen: 'Human Resources',
    jabatan: 'HR Specialist',
    tanggal_bergabung: '2020-08-03',
    status: 'active',
  },
  {
    id_karyawan: '3',
    employee_code: 'EMP-003',
    nama_lengkap: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    departemen: 'Keuangan',
    jabatan: 'Finance Analyst',
    tanggal_bergabung: '2021-01-18',
    status: 'inactive',
  },
  {
    id_karyawan: '4',
    employee_code: 'EMP-004',
    nama_lengkap: 'Dewi Lestari',
    email: 'dewi.lestari@example.com',
    departemen: 'Operasional',
    jabatan: 'Operations Manager',
    tanggal_bergabung: '2019-11-25',
    status: 'active',
  },
  {
    id_karyawan: '5',
    employee_code: 'EMP-005',
    nama_lengkap: 'Rizky Maulana',
    email: 'rizky.maulana@example.com',
    departemen: 'Pemasaran',
    jabatan: 'Marketing Specialist',
    tanggal_bergabung: '2023-06-05',
    status: 'terminated',
  },
];

export class KaryawanApiService {
  async fetchAll(): Promise<KaryawanDTO[]> {
    return dummyKaryawan.map((karyawan) => ({ ...karyawan }));
  }
}
