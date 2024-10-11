import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

//@ts-ignore
import { ClickToComponent } from 'click-to-react-component';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClickToComponent />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
