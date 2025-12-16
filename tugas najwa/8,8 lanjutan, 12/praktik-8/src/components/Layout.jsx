import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2024 My React App. Pertemuan 8 - React Router</p>
      </footer>
    </div>
  );
};

export default Layout;
