import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="container-fluid" style={{ background: "#ddd" }}>
      <div className="container">
        <nav className="navbar bg-body-secondary">
          <Link to="/">
            <div className="navbar-brand mb-0">
              <h2>Tripeate</h2>
            </div>
          </Link>
          <div className="ml-auto">
            <Link to="/register">
              <button className="btn btn-primary">Regístrate</button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
