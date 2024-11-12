'use client';
import React from 'react';
import {useRouter} from 'next/navigation';
import Login from '@/views/login';
import useAuth from '@/hooks/useAuth';
const LoginPage = () => {
  const router = useRouter();
  const {auth_user, error}: any = useAuth();
  return (
    <Login
      error={error}
      onSubmit={({email, password}) => {
        auth_user({
          email,
          password,
        }).then(() => {
          router.push('/');
        });
      }}
    />
  );
};
export default LoginPage;
