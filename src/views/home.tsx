import React from 'react'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <section className="text-black text-mono h-screen flex items-center">
      <div className="container flex flex-col items-center mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 text-mono">
          Moikas
        </h1>
        <p className="text-lg mb-6">
          Open-Source AI Studio.
        </p>
        
        <div className="flex flex-col space-y-4">
          <Link to="/studio" className="btn btn-wide text-white">Enter</Link>
        </div>
     </div>
    </section>
  );
};

export default Home;
