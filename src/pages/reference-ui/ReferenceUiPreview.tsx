import { lazy, Suspense } from 'react';
import { PreviewErrorBoundary } from './PreviewErrorBoundary';

// Lazy-loaded per file (bukan eager) supaya kode 200+ komponen reference tidak ikut
// ke bundle utama - hanya di-fetch saat devnya benar-benar klik untuk preview.
const modules = import.meta.glob<{ default: React.ComponentType }>('/src/_reference_ui/**/*.tsx');

interface ReferenceUiPreviewProps {
  path: string;
}

export default function ReferenceUiPreview({ path }: ReferenceUiPreviewProps) {
  const loader = modules[`/src/_reference_ui/${path}`];

  if (!loader) {
    return (
      <p className="text-xs text-gray-400">
        Tidak dapat memuat komponen ini (path tidak ditemukan).
      </p>
    );
  }

  const LazyComponent = lazy(loader);

  return (
    <PreviewErrorBoundary path={path}>
      <Suspense fallback={<p className="text-xs text-gray-400">Memuat preview...</p>}>
        <div className="max-h-[480px] overflow-auto rounded-lg border border-dashed border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-950/30">
          <LazyComponent />
        </div>
      </Suspense>
    </PreviewErrorBoundary>
  );
}
