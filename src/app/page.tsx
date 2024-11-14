"use client";
import Home from "@/views/home";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/views/Loading";
import useAuth from "@/hooks/useAuth";
import Feed from "@/views/feed/feed";
const HomePage = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const { auth }: any = useAuth();
  useMemo(() => {
    setLoading(true);
    auth().then((_isAuth: boolean) => {
      if (_isAuth) {
        setIsAuth(true);
        setLoading(false);
      } else {
        setIsAuth(false);
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return <Loading />;
  }
  return isAuth ? (
    <Feed initialTweets={undefined} topics={undefined} />
  ) : (
    <Home />
  );
};

export default HomePage;
