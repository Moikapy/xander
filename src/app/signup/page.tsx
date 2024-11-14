'use client';
// /app/signup/page.jsx
import {useEffect, useState} from 'react';
import {api} from '@/lib/api';
import {useRouter} from 'next/navigation';
import Signup from '@/views/signup';
import useAuth from '@/hooks/useAuth';
import Loading from '@/views/Loading';
const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const {auth}: any = useAuth();
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
  const handleSignup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError(null);

    try {
      const response: any = await api.signup.post({
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        router.push('/settings');
      } else {
        setError(response.data.body.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
    }
  };
  return !loading ? (
    <div className='flex flex-col justify-center items-center h-full'>
      <Signup
        handleSignup={({
          email,
          password,
        }: {
          email: string;
          password: string;
        }): void => {
          handleSignup({email, password}).then(() => {
            console.log('Signup successful');
          });
        }}
        error={error}
      />
    </div>
  ) : (
    <Loading />
  );
};

export default SignupPage;
