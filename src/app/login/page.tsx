'use client';
import React, {use, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Login from '@/views/login';
import Loading from '@/components/Loading';
import useAuth from '@/hooks/useAuth';
const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {login, auth, error}: any = useAuth();
  useEffect(() => {
    auth().then((isAuth: boolean) => {
      if (isAuth) {
        router.push('/portal');
      } else {
        setLoading(false);
      }
    });
  }, []);

  return !loading ? (
    <Login
      error={error}
      onSubmit={({email, password}) => {
        login({
          email,
          password,
        }).then((res) => {
          console.log('res', res);
          //res.status === 200 && router.push('/portal');
        });
      }}
    />
  ) : (
    <Loading />
  );
};
export default LoginPage;
