import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  loading: true,

  login: ({ token, user }) => {
    localStorage.setItem('token', token);
    set({ token, user, loading: false });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },

  setUser: (user) => set({ user }),

  setLoading: (loading) => set({ loading }),
}));

export default useAuthStore;
