import React, { useState } from "react";
import { api } from "@/lib/api";

export default function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  return {
    error,
    auth_user: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        const response: any = await api.login.post({
          email,
          password,
        });
        console.log(response);

        if (response.status === 200 && response.data.body.token) {
          // Save the token to local storage or cookies (you can choose your preferred storage method)
          localStorage.setItem("authToken", response.data.body.token);
        } else {
          setError(response.message || "Login failed");
        }
      } catch (err) {
        setError("An error occurred during login");
      }
    },
  };
}