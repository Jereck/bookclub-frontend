"use client"

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'
import { apiRequest } from '@/utils/api'

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => void
  fetchUserData: () => Promise<void>
}

interface User {
  id: string
  email: string
  username: string
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: true,

      login: async(email: string, password: string) => {
        try {
          const API_URL = 'http://localhost:5000'

          const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })

          const data = await res.json()
          if (res.ok) {
            const decoded: User = jwtDecode(data.token)
            set({
              user: decoded,
              token: data.token,
              isAuthenticated: true,
              loading: false
            })
          } else {
            console.log("Error logging in")
          }
        } catch (error) {
          console.error("Login request failed: ", error)
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      checkAuth: () => {
        const token = get().token;
        if (token) {
          try {
            set({ token })
            get().fetchUserData()
          } catch (error) {
            console.error("Error checking auth: ", error)
            set({ user: null, token: null })
          }
        }
      },

      fetchUserData: async () => {
        try {
          const user = await apiRequest<User>('/users/me')
          set({ user, loading: false })
        } catch (error) {
          console.error("Error fetching user data: ", error)
          set({ user: null, token: null, isAuthenticated: false, loading: false })
        }
      }
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

useAuthStore.subscribe((state) => console.log("Updated Auth State: ", state))