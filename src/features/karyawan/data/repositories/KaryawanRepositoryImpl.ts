import type { Karyawan } from '../../domain/entities/Karyawan';
import type { IKaryawanRepository } from '../../domain/repositories/KaryawanRepository.interface';
import { KaryawanMapper } from '../mappers/KaryawanMapper';
import { KaryawanApiService } from '../services/KaryawanApiService';

export class KaryawanRepositoryImpl implements IKaryawanRepository {
  constructor(private readonly karyawanApiService: KaryawanApiService) {}

  async getAllKaryawan(): Promise<Karyawan[]> {
    const karyawanDTOs = await this.karyawanApiService.fetchAll();
    return karyawanDTOs.map(KaryawanMapper.toEntity);
  }
}
