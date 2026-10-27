import { useQuery } from '@tanstack/react-query';
import { getKaryawanUseCase } from '../../di/KaryawanContainer';

export const useKaryawanQuery = () =>
  useQuery({
    queryKey: ['karyawan-list'],
    queryFn: () => getKaryawanUseCase.execute(),
  });
