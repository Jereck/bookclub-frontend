"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";

export default function Auth() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const data = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(form),
      }) as { token: string };

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-2 p-2 border rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-2 rounded">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="mt-2 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button className="text-blue-500 ml-1" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
