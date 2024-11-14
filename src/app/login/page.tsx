'use client';
import React, {use, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Login from '@/views/login';
import Loading from '@/views/Loading';
import useAuth from '@/hooks/useAuth';
const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {login, auth, error}: any = useAuth();
  useEffect(() => {
    console.log('checking authentication...');
    auth().then((isAuth: boolean) => {
      if (isAuth) {
        router.push('/');
      } else {
        setLoading(false);
      }
    });
  }, [auth]);

  return !loading ? (
    <div className='flex flex-col justify-center items-center h-full'>
      <Login
        error={error}
        onSubmit={({email, password}) => {
          login({
            email,
            password,
          }).then((res: {status: number; message: string}) => {
            console.log('res', res);
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
