import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from './redux/Provider.tsx';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')! as HTMLElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
);
