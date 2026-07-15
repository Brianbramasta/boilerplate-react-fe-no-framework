import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  path: string;
}

interface State {
  hasError: boolean;
}

// Banyak komponen di _reference_ui butuh props/data/context spesifik (mis. hasil fetch,
// DnD provider, dsb) yang tidak tersedia di preview generik ini. Error boundary di sini
// mencegah 1 komponen yang crash menjatuhkan seluruh halaman katalog.
export class PreviewErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
          Komponen ini butuh props/data spesifik sehingga tidak bisa di-preview langsung. Buka
          source-nya di <code>src/_reference_ui/{this.props.path}</code> untuk lihat cara pakainya.
        </div>
      );
    }
    return this.props.children;
  }
}

export default PreviewErrorBoundary;
