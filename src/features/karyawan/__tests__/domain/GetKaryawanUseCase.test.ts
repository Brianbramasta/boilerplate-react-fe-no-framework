import { GetKaryawanUseCase } from '../../domain/usecases/GetKaryawanUseCase';
import type { Karyawan } from '../../domain/entities/Karyawan';
import type { IKaryawanRepository } from '../../domain/repositories/KaryawanRepository.interface';

describe('GetKaryawanUseCase', () => {
  it('returns employees from the repository', async () => {
    const employees: Karyawan[] = [
      {
        id: '1',
        employeeCode: 'EMP-001',
        fullName: 'Andi Pratama',
        email: 'andi@example.com',
        department: 'Engineering',
        role: 'Developer',
        joinDate: new Date('2022-03-14T00:00:00.000Z'),
        status: 'active',
      },
    ];
    const repository: IKaryawanRepository = {
      getAllKaryawan: jest.fn().mockResolvedValue(employees),
    };
    const useCase = new GetKaryawanUseCase(repository);

    await expect(useCase.execute()).resolves.toEqual(employees);
    expect(repository.getAllKaryawan).toHaveBeenCalledTimes(1);
  });
});
