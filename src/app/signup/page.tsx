"use client";
// /app/signup/page.jsx
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);

    try {
      const response: any = await api.signup.post({
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        router.push("/login");
      } else {
        setError(response.data.body.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred during signup");
    }
  };
  return (
    <div className="flex justify-center items-center bg-base-100 font-mono">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSignup}>
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
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center text-primary mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-secondary hover:text-primary">
              Log in
            </a>
          </p>
          {error&&error}
        </div>
      </div>
    </div>
  );
};

export default Signup;
