import {create} from 'zustand';

const useThemeStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set((state: { theme: string; }) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useThemeStore;
