'use client'
import React from 'react'
import Navbar from '@/components/Navbar'
import ChatWidget from '@/components/ChatWidget';
//import '@/src/styles/globals.css';
export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <div className='layout h-dvh flex flex-col font-mono'>
      <Navbar />
      {children}

      {/* Footer */}
      {/* <ChatWidget /> */}
      <footer className='w-full flex justify-center py-6 text-sm'>
        <div className='max-w-7xl flex justify-between items-center'>
          <p>
            &copy; {new Date().getFullYear()} Moikas LLC. All Rights Reserved.
          </p>{' '}
          <p>v 0.1.0</p>
        </div>
      </footer>
    </div>
  );
}
