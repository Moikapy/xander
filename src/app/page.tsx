'use client';
import Home from '@/views/home';
import React, {useMemo, useState} from 'react';
import {useRouter} from 'next/navigation';
import Loading from '@/views/Loading';
import useAuth from '@/hooks/useAuth';
import Feed from '@/views/feed';
import {useAuthContext} from '@/providers/AuthProvider';
const HomePage = () => {
  const router = useRouter();
  const {isAuthenticated, loading} = useAuthContext();
  const [isAuth, setIsAuth] = useState(false);

  useMemo(() => {
    if (isAuthenticated) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuthenticated, loading, router]);
  if (loading) {
    return <Loading />;
  }
  return isAuth ? <Feed topics={[]} initialposts={[]} /> : <Home />;
};

export default HomePage;
