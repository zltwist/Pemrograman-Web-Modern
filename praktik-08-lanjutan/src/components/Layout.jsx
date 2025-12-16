import React from 'react';
import { Outlet } from "react-router-dom";
import Nav from './Nav';

const Layout = () => {
  return (
    <div>
      <header>
        <h1>My Application</h1>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2025 My Application</p>
      </footer>
    </div>
  );
};

export default Layout;