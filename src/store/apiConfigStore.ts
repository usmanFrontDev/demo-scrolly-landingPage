import { create } from 'zustand';

interface ApiConfigState {
  enableAuth: boolean;
  getToken?: () => string | null;
}

export const useApiConfigStore = create<ApiConfigState>(() => ({
  enableAuth: false, // 👈 landing page default
  getToken: undefined,
}));
