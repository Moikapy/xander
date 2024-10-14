// src/App.tsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { generateRoutes } from './routeLoader';


//import {Navigation} from './components/Navbar.tsx'
const routes = generateRoutes();

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
  <head>
    <title>
      Moikas
    </title>
    <style jsx>{`
    html,body,#root{
      height:100%
    }`}
    </style>
  </head>
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  </Suspense>
);

export default App;
