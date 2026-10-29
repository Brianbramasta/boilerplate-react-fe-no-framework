import { create } from 'zustand';

interface KaryawanState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useKaryawanStore = create<KaryawanState>((set) => ({
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
