// import { counter } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
// import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
// import map from './components/Map'
import { BrowserRouter, HashRouter } from 'react-router-dom';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  // switched from browser to hash router so refreshes wouldn't send fetch reqs w/ the url
  <HashRouter>
    <App tab='home' />
  </HashRouter>
);
