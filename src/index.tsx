// ./src/index.tsx
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import './styles/globals.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
 
hydrateRoot(
 document.getElementById('root'),
  <BrowserRouter>
<ThemeProvider>
    <App />
</ThemeProvider>
  </BrowserRouter>
);
