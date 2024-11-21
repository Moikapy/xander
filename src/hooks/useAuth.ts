import { useState } from "react";
import { api } from "@/lib/api";

export default function useAuth() {
  const [error, setError] = useState<string | null>(null);

  const auth = async (): Promise<boolean> => {
    try {
      const response: any = await api.auth.get({
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        return true;
      }

      setError(response?.message || "Unauthorized");
      return false;
    } catch (error: any) {
      setError("Unauthorized");
      return false;
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> => {
    try {
      const response: any = await api.login.post({
        email,
        password,
      });

      if (response.status === 200 && response.data.body.token) {
        localStorage.setItem("authToken", response.data.body.token);
        return response;
      } else {
        setError(response.message || "Login failed");
        throw new Error(response.message || "Login failed");
      }
    } catch (err: any) {
      setError("An error occurred during login");
      return {
        status: 500,
        message: "An error occurred during login: " + err.message,
      };
    }
  };

  return { error, auth, login };
}
