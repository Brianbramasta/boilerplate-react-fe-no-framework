import type { Karyawan } from '../../domain/entities/Karyawan';

interface KaryawanTableProps {
  karyawan: Karyawan[];
  isLoading: boolean;
}

const statusLabels = {
  active: 'Aktif',
  inactive: 'Tidak aktif',
  terminated: 'Keluar',
} as const;

const statusStyles = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-yellow-100 text-yellow-800',
  terminated: 'bg-gray-100 text-gray-600',
} as const;

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});

export default function KaryawanTable({ karyawan, isLoading }: KaryawanTableProps) {
  if (isLoading) {
    return (
      <div className="px-6 py-12 text-center text-sm text-gray-500" role="status">
        Memuat data karyawan...
      </div>
    );
  }

  if (karyawan.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-sm text-gray-500">
        Tidak ada karyawan yang cocok dengan pencarian.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              NIK
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Nama karyawan
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Departemen & jabatan
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Tanggal bergabung
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {karyawan.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-700">
                {item.employeeCode}
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                <div className="text-sm font-medium text-gray-900">{item.fullName}</div>
                <div className="text-sm text-gray-500">{item.email}</div>
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                <div className="text-sm font-medium text-gray-800">{item.department}</div>
                <div className="text-sm text-gray-500">{item.role}</div>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                {dateFormatter.format(item.joinDate)}
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[item.status]}`}
                >
                  {statusLabels[item.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
