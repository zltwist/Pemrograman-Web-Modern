import Identity from './components/Identity';
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <>
<Identity />
<div className="rangga-wrapper">
<ThemeProvider>
      <UserProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <Home />
          </div>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  
</div>
</>);
}

export default App;
