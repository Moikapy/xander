import React from 'react'
import { Button } from "@material-tailwind/react";

const Home = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex items-center">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Moikas: The Future of AI Content Creation
        </h1>
        <p className="text-lg mb-6">
          Empowering brands and creators with AI tools to build innovative content and experiences.
        </p>
        <Button className="bg-white text-blue-600">Explore Our Projects</Button>
      </div>
    </section>
  );
};

export default Home;
