import React from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/providers/Providers';
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className='font-mono'>
        <Providers>
          <Navbar />
          {/* Layout UI */}
          <main>{children}</main>
          <footer className='w-full flex justify-center py-6 text-sm'>
            <div className='max-w-7xl flex justify-between items-center'>
              <p>
                &copy; {new Date().getFullYear()} Moikas LLC. All Rights
                Reserved.
              </p>{' '}
              <p>v 0.1.0</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
