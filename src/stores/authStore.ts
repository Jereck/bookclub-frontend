"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { apiRequest } from "@/utils/api";
import { User, UserLibrary, AuthState } from "../../types";


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      library: [],
      loading: true,

      login: async (email: string, password: string) => {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();
          if (res.ok) {
            const decoded: User = jwtDecode(data.token);
            console.log("✅ Decoded User:", decoded);

            set({
              user: decoded,
              token: data.token,
            });
          } else {
            console.error("❌ Login failed:", data.error);
          }
        } catch (error) {
          console.error("❌ Login request failed:", error);
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      checkAuth: () => {
        const token = get().token;
        if (token) {
          try {
            set({ token });
            get().fetchUserData();
          } catch (error) {
            console.error("❌ Invalid token:", error);
            set({ user: null, token: null });
          }
        }
      },

      fetchUserData: async () => {
        try {
          const userProfile = await apiRequest<User>("/user/profile");
          const libraryResponse = await apiRequest<{ library: UserLibrary[]}>("/library");

          set({
            user: userProfile,
            library: libraryResponse.library,
            loading: false,
          })
        } catch (error) {
          console.error("❌ Fetch user data failed:", error);
        }
      }
    }),
    {
      name: "auth-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // NEW: Uses Zustand's built-in storage
    }
  )
);

// Subscribe to log changes
useAuthStore.subscribe((state) => console.log("🔄 Updated Auth State:", state));
