'use client';
import React from 'react';
import Link from 'next/link';
const Home = () => {
  return (
    <section className='text-mono flex flex-col justify-center items-center justify-self-center self-center h-full'>
      <div className='container flex flex-col items-center mx-auto text-center'>
        <h1 className='text-xl font-bold mb-4'>Moikas</h1>
        <p className='text-sm mb-6'>Open-Source AI Studio.</p>

        <div className='flex flex-col space-y-4'>
          <Link href='/login' className='btn btn-wide bg-black'>
            Enter
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
