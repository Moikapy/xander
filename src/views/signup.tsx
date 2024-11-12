'use client';
// /app/signup/page.jsx
import {useState} from 'react';

const Signup = ({
  handleSignup,
  error,
}: {
  handleSignup: ({email, password}: {email: string; password: string}) => void;
  error: string | null;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='flex justify-center items-center bg-base-100 font-mono'>
      <div className='card bg-white w-96 shadow-xl'>
        <div className='card-body'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>
          <form
            onSubmit={(e: {preventDefault: () => void}) => {
              e.preventDefault();
              handleSignup({
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
                className='btn btn-wide w-full'>
                Sign Up
              </button>
            </div>
          </form>
          <p className='text-center mt-4'>
            Already have an account?{' '}
            <a href='/login' className='text-secondary hover:text-accent'>
              Log in
            </a>
          </p>
          {error && error}
        </div>
      </div>
    </div>
  );
};

export default Signup;
