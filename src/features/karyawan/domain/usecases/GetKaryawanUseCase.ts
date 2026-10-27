import type { Karyawan } from '../entities/Karyawan';
import type { IKaryawanRepository } from '../repositories/KaryawanRepository.interface';

export class GetKaryawanUseCase {
  constructor(private readonly karyawanRepository: IKaryawanRepository) {}

  execute(): Promise<Karyawan[]> {
    return this.karyawanRepository.getAllKaryawan();
  }
}
