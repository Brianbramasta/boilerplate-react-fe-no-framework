import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { KaryawanPage } from '../../presentation/pages/KaryawanPage';

describe('KaryawanPage', () => {
  it('displays dummy employees and filters the table by search input', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <KaryawanPage />
      </QueryClientProvider>,
    );

    expect(await screen.findByText('Andi Pratama')).toBeInTheDocument();
    expect(screen.getByText('Siti Rahmawati')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('searchbox', { name: 'Cari karyawan' }), {
      target: { value: 'siti' },
    });

    expect(screen.getByText('Siti Rahmawati')).toBeInTheDocument();
    expect(screen.queryByText('Andi Pratama')).not.toBeInTheDocument();
  });
});
