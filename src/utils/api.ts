const API_BASE_URL = "http://localhost:5000/api";

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong");
  }

  return response.json() as Promise<T>;
}

// ================================
// 📌 Wrapper Functions for User Profile APIs
// ================================

// ✅ Update Reading Goal
export async function updateReadingGoal(goal: number) {
  return apiRequest("/user/reading-goal", {
    method: "PUT",
    body: JSON.stringify({ readingGoal: goal }),
  });
}

// ✅ Update Reading Progress (Books Completed)
export async function updateReadingProgress(completedBooks: number) {
  return apiRequest("/user/reading-progress", {
    method: "PUT",
    body: JSON.stringify({ completedBooks }),
  });
}

// ✅ Update Reading Streak (Triggers Backend Calculation)
export async function updateReadingStreak() {
  return apiRequest("/user/reading-streak", {
    method: "PUT",
  });
}

// ✅ Set Currently Reading Book & Page Progress
export async function setCurrentlyReading(bookId: string, page: number) {
  return apiRequest("/user/currently-reading", {
    method: "PUT",
    body: JSON.stringify({ bookId, currentPage: page }),
  });
}