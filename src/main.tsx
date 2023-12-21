import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from './redux/Provider.tsx';
import App from './App.tsx';
import './index.css';
import { ConfigProvider } from 'antd';
import Theme from './utils/theme.json';

const container = document.getElementById('root')! as HTMLElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <ReduxProvider>
      <ConfigProvider theme={Theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
