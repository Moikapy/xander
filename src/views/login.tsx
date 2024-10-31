"use client";
// /app/login/page.jsx

import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response: any = await api.login.post({
        email,
        password,
      });
      console.log(response);

      if (response.status === 200 && response.data.body.token) {
        // Save the token to local storage or cookies (you can choose your preferred storage method)
        localStorage.setItem("authToken", response.data.body.token);
        router.push("/");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 font-mono">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                onInput={(e) =>
                  setPassword((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-wide bg-black text-white w-full"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-secondary hover:text-primary">
              Sign up
            </a>
          </p>
          {error && error}
        </div>
      </div>
    </div>
  );
};

export default Login;
