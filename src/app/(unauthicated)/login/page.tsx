"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, LogIn, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    router.push("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <BarChart2 className="h-8 w-8 text-primary mr-2" />
            <CardTitle className="text-2xl font-bold">Survur.io</CardTitle>
          </div>
          <CardDescription>Enter your email and password to login</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

// "use client"

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { apiRequest } from "@/utils/api";
// import { useAuthStore } from "@/stores/authStore";

// export default function Auth() {
//   const { login } = useAuthStore();
//   const router = useRouter();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
    
//     try {
//       const endpoint = isLogin ? "/auth/login" : "/auth/register";
//       const data = await apiRequest(endpoint, {
//         method: "POST",
//         body: JSON.stringify(form),
//       }) as { token: string };

//       localStorage.setItem("token", data.token);
//       router.push("/dashboard");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     }
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login(form.email, form.password);
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-semibold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         {!isLogin && (
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full mb-2 p-2 border rounded"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//         )}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-2 p-2 border rounded"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-2 p-2 border rounded"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
//           {isLogin ? "Login" : "Sign Up"}
//         </button>
//         <p className="mt-2 text-center">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <button className="text-blue-500 ml-1" onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
