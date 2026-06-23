import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent benign ResizeObserver loop limit errors and parent iframe "Script error" notifications from causing app crashes
if (typeof window !== 'undefined') {
  const ignoreErrors = [
    'ResizeObserver',
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    'Script error.'
  ];
  
  window.addEventListener('error', (e) => {
    const msg = e.message || '';
    if (!msg || ignoreErrors.some(err => msg.includes(err)) || msg.toLowerCase().includes('script error')) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);

  window.addEventListener('unhandledrejection', (e) => {
    const reason = e.reason;
    const msg = (reason && (reason.message || String(reason))) || '';
    if (!msg || ignoreErrors.some(err => msg.includes(err)) || msg.toLowerCase().includes('script error')) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

