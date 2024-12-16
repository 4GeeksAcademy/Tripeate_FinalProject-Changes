import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = async () => {
    const result = await actions.logoutUser();
    if (result) {
      navigate("/loginuser");
    } else {
      alert("Hubo un problema al cerrar sesión. Intenta nuevamente.");
    }
  };

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
            {store.token ? ( // Si hay token, mostrar "Cerrar Sesión" y el botón del perfil
            <>
            {location.pathname !== "/userinfo" && (
              <Link to="/userinfo">
                <button className="btn btn-light me-2" style={{ fontWeight: "bold" }}>
                  Mi Perfil
                </button>
              </Link>
              )}
                <button
                  className="btn btn-outline-light ml-2"
                  onClick={()=>handleLogOut()}
                  >
                  Cerrar Sesión
                </button>
            </>
            ) : ( // Si no hay token y no estamos en la página de login, mostrar "Iniciar Sesión"
              location.pathname !== "/loginuser" && (
              <Link to="/loginuser">
                <button className="btn btn-light" style={{ fontWeight: "bold" }}>
                  Iniciar Sesión
                </button>
              </Link>
              )
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
