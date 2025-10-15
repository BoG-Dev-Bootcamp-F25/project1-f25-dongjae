import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
import LinesPage from './pages/LinesPage';
import About from "./pages/About";
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/lines/:lineColor" element={<LinesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
