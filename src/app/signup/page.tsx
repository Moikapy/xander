'use client';
// /app/signup/page.jsx
import {useState} from 'react';
import {api} from '@/lib/api';
import {useRouter} from 'next/navigation';
import Signup from '@/views/signup';
const SignupPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        router.push('/user/edit');
      } else {
        setError(response.data.body.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
    }
  };
  return (
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
  );
};

export default SignupPage;
