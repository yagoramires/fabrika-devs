// React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Router
import { BrowserRouter } from 'react-router-dom';

// Context
import { DarkModeProvider } from './context/DarkModeContext';

// Components
import App from './App';

// Styles
import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DarkModeProvider>
  </React.StrictMode>
);
