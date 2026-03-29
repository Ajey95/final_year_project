import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      
      setUser: (user) => set({ user, isAuthenticated: true }),
      
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      
      updateUserStats: (stats) => set((state) => ({
        user: state.user ? { ...state.user, ...stats } : null
      }))
    }),
    {
      name: 'auth-storage',
    }
  )
)
