import type { Karyawan } from '../../domain/entities/Karyawan';
import type { KaryawanDTO } from '../dtos/KaryawanDTO';

export class KaryawanMapper {
  static toEntity(dto: KaryawanDTO): Karyawan {
    return {
      id: dto.id_karyawan,
      employeeCode: dto.employee_code,
      fullName: dto.nama_lengkap,
      email: dto.email,
      department: dto.departemen,
      role: dto.jabatan,
      joinDate: new Date(dto.tanggal_bergabung),
      status: dto.status,
    };
  }
}
