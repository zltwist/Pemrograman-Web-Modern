import React from 'react';
import BasicCSS from './components/BasicCSS';
import CSSModules from './components/CSSModules';
import StyledComponents from './components/StyledComponents';
import TailwindCSS from './components/TailwindCSS';
import ConditionalStyling from './components/ConditionalStyling';
import MaterialUI from './components/MaterialUI';
import './App.css';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="app">
      <header className="app-hero">
        <Typography variant="h4" component="h1" gutterBottom>
          Demo Berbagai Metode Styling di React
        </Typography>
        <p>
          Contoh implementasi mulai dari CSS biasa sampai komponen framework modern, semuanya dalam satu halaman.
        </p>
      </header>

      <div className="demo-grid">
        <section className="demo-section">
          <h2>1. Basic CSS</h2>
          <BasicCSS />
        </section>

        <section className="demo-section">
          <h2>2. CSS Modules</h2>
          <CSSModules />
        </section>

        <section className="demo-section">
          <h2>3. Styled Components</h2>
          <StyledComponents />
        </section>

        <section className="demo-section">
          <h2>4. Tailwind CSS</h2>
          <TailwindCSS />
        </section>

        <section className="demo-section">
          <h2>5. Conditional Styling</h2>
          <ConditionalStyling />
        </section>

        <section className="demo-section">
          <h2>6. Material UI</h2>
          <MaterialUI />
        </section>
      </div>
    </div>
  );
}

export default App;
