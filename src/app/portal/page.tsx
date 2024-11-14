// src/PortalPage.js
'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import Loading from '@/views/Loading';
import useAuth from '@/hooks/useAuth';
const PortalPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {auth}: any = useAuth();
  useEffect(() => {
    auth().then((isAuth: boolean) => {
      console.log(isAuth);
      if (!isAuth) {
        console.log(isAuth)
        router.push('/login');
      } else {
        setLoading(false);
      }
    });
  }, []);
  return !loading ? (
    <div className='min-h-screen bg-base-200 flex flex-col items-center justify-start p-4'>
      <h1 className='text-3xl font-bold text-center mb-6'>
        Welcome to the Portal
      </h1>

      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        {/* Studio Card */}
        <div className='card w-80 bg-base-100 shadow-xl transition-transform transform hover:scale-105'>
          <div className='card-body text-center'>
            <h2 className='card-title'>Studio</h2>
            <p>
              Explore our creative tools and AI-powered workspace to bring your
              projects to life.
            </p>
            <div className='card-actions justify-center mt-4'>
              <Link href='/studio' className='btn btn-primary'>
                Go to Studio
              </Link>
            </div>
          </div>
        </div>

        {/* Chat Card */}
        <div className='card w-80 bg-base-100 shadow-xl transition-transform transform hover:scale-105'>
          <div className='card-body text-center'>
            <h2 className='card-title'>Chat</h2>
            <p>Join the conversation and connect with our AI chat tools.</p>
            <div className='card-actions justify-center mt-4'>
              <Link href='/chat' className='btn btn-secondary'>
                Go to Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PortalPage;
