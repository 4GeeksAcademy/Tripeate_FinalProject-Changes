import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store } = useContext(Context);

  return (
    <div className="container-fluid" style={{ background: "#4b3331" }}>
      <div className="container">
        <nav className="navbar" style={{ backgroundColor: "#4b3331" }}>
          <Link to="/">
            <div className="navbar-brand mb-0">
              <h2
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Tripeate
              </h2>
            </div>
          </Link>
          <div className="ml-auto">
            <Link to="/loginuser">
              <button className="btn btn-light" style={{ fontWeight: "bold" }}>
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
