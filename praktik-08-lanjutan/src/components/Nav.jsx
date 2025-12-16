import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          {isAuthenticated ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
