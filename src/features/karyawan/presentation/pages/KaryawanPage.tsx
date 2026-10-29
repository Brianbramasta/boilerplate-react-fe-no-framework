import { useMemo } from 'react';
import KaryawanTable from '../components/KaryawanTable';
import { useKaryawanQuery } from '../hooks/useKaryawanQuery';
import { useKaryawanStore } from '../store/useKaryawanStore';

export function KaryawanPage() {
  const { data: karyawan = [], error, isLoading, refetch } = useKaryawanQuery();
  const searchQuery = useKaryawanStore((state) => state.searchQuery);
  const setSearchQuery = useKaryawanStore((state) => state.setSearchQuery);
  const normalizedSearch = searchQuery.trim().toLocaleLowerCase('id-ID');

  const filteredKaryawan = useMemo(
    () =>
      karyawan.filter((item) =>
        [item.employeeCode, item.fullName, item.email, item.department, item.role].some((value) =>
          value.toLocaleLowerCase('id-ID').includes(normalizedSearch),
        ),
      ),
    [karyawan, normalizedSearch],
  );

  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Data Karyawan</h1>
        <p className="mt-1 text-sm text-gray-500">
          Contoh fitur dengan pemisahan Domain, Data, DI, dan Presentation.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Daftar karyawan</h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredKaryawan.length} dari {karyawan.length} karyawan
            </p>
          </div>
          <label className="w-full sm:max-w-xs">
            <span className="sr-only">Cari karyawan</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Cari nama, NIK, email..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </label>
        </div>

        {error ? (
          <div className="p-6" role="alert">
            <p className="text-sm text-red-600">
              Gagal memuat data karyawan: {error.message}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Coba lagi
            </button>
          </div>
        ) : (
          <KaryawanTable karyawan={filteredKaryawan} isLoading={isLoading} />
        )}
      </div>
    </section>
  );
}
