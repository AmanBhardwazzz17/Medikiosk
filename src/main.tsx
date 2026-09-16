import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { logger } from './lib/logger';

logger.info('APP_INIT', 'MediKiosk Clinical Assistant initializing in browser environment', {
  version: '1.0.0-sih2026',
  env: import.meta.env.MODE,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
