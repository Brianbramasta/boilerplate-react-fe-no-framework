import type { KaryawanStatus } from '../../domain/entities/Karyawan';

export interface KaryawanDTO {
  id_karyawan: string;
  employee_code: string;
  nama_lengkap: string;
  email: string;
  departemen: string;
  jabatan: string;
  tanggal_bergabung: string;
  status: KaryawanStatus;
}
