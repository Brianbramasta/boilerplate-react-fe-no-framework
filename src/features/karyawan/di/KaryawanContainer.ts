import { KaryawanRepositoryImpl } from '../data/repositories/KaryawanRepositoryImpl';
import { KaryawanApiService } from '../data/services/KaryawanApiService';
import { GetKaryawanUseCase } from '../domain/usecases/GetKaryawanUseCase';

const karyawanApiService = new KaryawanApiService();
const karyawanRepository = new KaryawanRepositoryImpl(karyawanApiService);

export const getKaryawanUseCase = new GetKaryawanUseCase(karyawanRepository);
