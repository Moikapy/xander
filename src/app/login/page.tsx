"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/views/login";
import Loading from "@/views/Loading";
import { useAuthContext } from "@/providers/AuthProvider";

const LoginPage = () => {
  const router = useRouter();
  const { isAuthenticated, loading, error, login } = useAuthContext();
  useEffect(() => {
    console.log("checking authentication...");
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  return !loading ? (
    <div className="flex flex-col justify-center items-center h-full">
      <Login
        error={error}
        onSubmit={({ email, password }) => {
          login({
            email,
            password,
          }).then((res: { status: number; message: string }) => {
            console.log("res", res);
            //res.status === 200 && router.push('/portal');
          });
        }}
      />
    </div>
  ) : (
    <Loading />
  );
};
export default LoginPage;
