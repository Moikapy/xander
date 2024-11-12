'use client';
// /app/views/login/page.tsx
import {useState} from 'react';
const Login = ({
  onSubmit,
  error,
}: {
  onSubmit: ({email, password}: {email: string; password: string}) => void;
  error: string;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='flex justify-center items-center min-h-screen bg-base-100 font-mono'>
      <div className='card w-96 bg-white shadow-xl'>
        <div className='card-body'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              onSubmit({
                email,
                password,
              });
            }}>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='Email'
                className='input input-bordered w-full'
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              />
            </div>
            <div className='form-control mb-6'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='Password'
                className='input input-bordered w-full'
                onInput={(e) =>
                  setPassword((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <div className='form-control mt-6'>
              <button
                type='submit'
                className='btn btn-wide bg-black text-white w-full'>
                Login
              </button>
            </div>
          </form>
          <p className='text-center mt-4'>
            Don't have an account?{' '}
            <a href='/signup' className='text-secondary hover:text-primary'>
              Sign up
            </a>
          </p>
          {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
