import React from 'react';

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-base-100'>
      <div className='flex flex-col items-center'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
        <p className='mt-4 text-lg font-semibold'>
          Checking User Authentication...
        </p>
      </div>
    </div>
  );
};

export default Loading;
