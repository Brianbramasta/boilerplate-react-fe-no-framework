import { KaryawanMapper } from '../../data/mappers/KaryawanMapper';
import type { KaryawanDTO } from '../../data/dtos/KaryawanDTO';

describe('KaryawanMapper', () => {
  it('maps a service DTO to a domain entity', () => {
    const dto: KaryawanDTO = {
      id_karyawan: '1',
      employee_code: 'EMP-001',
      nama_lengkap: 'Andi Pratama',
      email: 'andi@example.com',
      departemen: 'Engineering',
      jabatan: 'Developer',
      tanggal_bergabung: '2022-03-14',
      status: 'active',
    };

    expect(KaryawanMapper.toEntity(dto)).toEqual({
      id: '1',
      employeeCode: 'EMP-001',
      fullName: 'Andi Pratama',
      email: 'andi@example.com',
      department: 'Engineering',
      role: 'Developer',
      joinDate: new Date('2022-03-14'),
      status: 'active',
    });
  });
});
