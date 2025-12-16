import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
