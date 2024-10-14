import React from 'react';
import Home from '../views/home.tsx'
import {Layout} from '../components/Layout.tsx'
const HomePage = () => {
  return (
    <Layout>
    <div className=" flex flex-col justify-center items-center bg-gray-900 text-black font-mono">
     <Home/> 
    </div>
    </Layout>
  );
};

export default HomePage;
