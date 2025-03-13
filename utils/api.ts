import { useAuthStore } from "@/stores/authStore";
const API_BASE_URL = 'http://localhost:5000'

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    ...options,
    headers
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error("Error: ", errorData.error || "Something went wrong")
  }

  return response.json() as Promise<T>
}