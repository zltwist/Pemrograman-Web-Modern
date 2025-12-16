import Identity from './components/Identity';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Homes from './pages/Homes';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';

import './App.css';

function App() {
  return (
    <>
<Identity />
<div className="rangga-wrapper">
<BrowserRouter basename="/praktik-08">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homes />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  
</div>
</>);
}

export default App;
