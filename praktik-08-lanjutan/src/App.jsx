import React, { createContext, useContext, useState } from 'react'
import './App.css'
import Identity from './components/Identity'

// Context Creation
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div style={{
      padding: '20px',
      backgroundColor: theme === 'light' ? '#eee' : '#333',
      color: theme === 'light' ? '#333' : '#eee',
      borderRadius: '8px',
      marginTop: '20px'
    }}>
      <h3>Current Theme: {theme.toUpperCase()}</h3>
      <p>Ini adalah contoh penggunaan Context API untuk Global State Management.</p>
      <button onClick={toggleTheme} style={{
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: theme === 'light' ? '#333' : '#eee',
        color: theme === 'light' ? '#eee' : '#333',
        border: 'none',
        borderRadius: '5px'
      }}>
        Switch Theme
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      <Identity />
      <div className="container">
        <h1>Praktik 8 Lanjutan: Context API</h1>
        <div className="content-placeholder">
          <ThemeProvider>
            <ThemedContent />
          </ThemeProvider>
        </div>
      </div>
    </>
  )
}

export default App
