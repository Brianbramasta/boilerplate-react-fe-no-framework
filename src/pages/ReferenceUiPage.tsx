import { useMemo, useState } from 'react';
import { referenceUiCatalog } from '@/_reference_ui/manifest';
import ReferenceUiPreview from './reference-ui/ReferenceUiPreview';
import { ChevronDownIcon } from '@/icons';

export default function ReferenceUiPage() {
  const [query, setQuery] = useState('');
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (!query.trim()) return referenceUiCatalog;
    const q = query.toLowerCase();
    return referenceUiCatalog
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => item.name.toLowerCase().includes(q) || group.category.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  const totalCount = referenceUiCatalog.reduce((sum, g) => sum + g.items.length, 0);

  const togglePreview = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-(--breakpoint-2xl)">
      <div className="mb-6">
        {/* <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90">Reference UI</h1> */}
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Katalog {totalCount} komponen contoh dari template lama (bukan bagian dari aplikasi
          aktif). Klik nama komponen untuk lihat preview-nya. Salin/ambil pola dari sini saat
          membangun fitur baru — jangan import langsung dari <code>src/_reference_ui</code> ke dalam{' '}
          <code>src/features</code>. Daftar ini digenerate otomatis lewat{' '}
          <code>npm run generate:reference-manifest</code>.
        </p>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari kategori atau nama komponen..."
        className="mb-6 h-11 w-full max-w-md rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
      />

      <div className="grid grid-cols-1 items-start gap-5">
        {filtered.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {group.category} <span className="font-normal">({group.items.length})</span>
            </h3>
            <ul className="space-y-1.5">
              {group.items.map((item) => {
                const isExpanded = expandedPaths.has(item.path);
                return (
                  <li key={item.path}>
                    <button
                      type="button"
                      onClick={() => togglePreview(item.path)}
                      title={`src/_reference_ui/${item.path}`}
                      className="flex w-full items-center justify-between gap-2 rounded-md py-1 text-left text-sm text-gray-700 hover:text-brand-500 dark:text-gray-300 dark:hover:text-brand-400"
                    >
                      <span className="truncate">{item.name}</span>
                      <ChevronDownIcon
                        className={`size-4 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="mt-2 mb-2">
                        <ReferenceUiPreview path={item.path} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada komponen yang cocok.</p>
      )}
    </div>
  );
}
