import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Tripea from "../../img/Logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = async () => {
    const result = await actions.logoutUser();
    if (result) {
      navigate("/loginuser");
    } else {
      alert("Hubo un problema al cerrar sesión. Intenta nuevamente.");
    }
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
    <div className="container-fluid" style={{ background: "rgba(250,199,144)" }}>
      <div className="container">
        <nav className="navbar" style={{ backgroundColor: "rgba(250,199,144)" }}>
          <Link to="/">
            <div className="navbar-brand mb-0">
              <a className="navbar-brand" href="#">
                <img className="w-50" src="https://res.cloudinary.com/dazzcuinm/image/upload/v1734670598/Logo_tripeate-09_utqr8x.svg" alt="..." />
              </a>
            </div>
          </Link>
          <div className="ml-auto">
            <div
              className="dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: "relative" }}
            >
              <button
                className="dropdown"
                style={{
                  background: "transparent",
                  border: "0",
                  padding: "0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  width: "80px",
                  height: "80px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "5px",
                    backgroundColor: "#4b4b4b",
                    transition: "all 0.3s ease",
                    transform: menuOpen ? "rotate(45deg) translate(10px, 5px)" : "",
                    borderRadius: "5px",
                  }}
                ></div>
                <div
                  style={{
                    width: "60px",
                    height: "5px",
                    backgroundColor: "#4b4b4b",
                    transition: "opacity 0.3s ease",
                    opacity: menuOpen ? "0" : "1",
                    borderRadius: "5px",
                  }}
                ></div>
                <div
                  style={{
                    width: "60px",
                    height: "5px",
                    backgroundColor: "#4b4b4b",
                    transition: "all 0.3s ease",
                    transform: menuOpen ? "rotate(-45deg) translate(10px, -12px)" : "",
                    borderRadius: "5px",
                  }}
                ></div>
              </button>
              {dropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: "-10px",
                    minWidth: "350px",
                    padding: "30px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    zIndex: "1000",
                  }}
                >
                  {/* Show Profile only if logged in */}
                  {store.token && location.pathname !== "/userinfo" && location.pathname !== "/perfiladmin" && (
                    <Link
                      className="dropdown-item"
                      style={{
                        padding: "20px 25px",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        borderRadius: "8px",
                        transition: "background-color 0.3s",
                      }}
                      to={store.currentUser?.is_admin ? "/perfiladmin" : "/userinfo"}
                    >
                      <i className="fa-solid fa-user"></i> Mi Perfil
                    </Link>
                  )}
                  {/* Show Login or Logout */}
                  {!store.token ? (
                    <Link
                      className="dropdown-item"
                      to="/loginuser"
                      style={{
                        padding: "20px 25px",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        borderRadius: "8px",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión
                    </Link>
                  ) : (
                    <button
                      className="dropdown-item"
                      onClick={handleLogOut}
                      style={{
                        padding: "20px 25px",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        backgroundColor: "transparent",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        borderRadius: "8px",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <i className="fa-solid fa-right-from-bracket" style={{ color: "red" }}></i> Cerrar Sesión
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
