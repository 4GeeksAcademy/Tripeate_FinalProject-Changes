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
  // const handleProfileRedirect = () => {
  //   navigate(-1);
  // };


  return (
    <div className="container-fluid" style={{ background: "rgba(250,199,144)" }}>
      <div className="container">
        <nav className="navbar" style={{ backgroundColor: "rgba(250,199,144)" }}>
          <Link to="/">
            <div className="navbar-brand mb-0">
              <h1
                style={{
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Tripeate
              </h1>
            </div>
          </Link>
          <div className="ml-auto">
            {store.token ? ( // Si hay token, mostrar "Cerrar Sesión" y el botón del perfil
              <>
                {location.pathname !== "/userinfo" && location.pathname !== "/perfiladmin" && (

                  <Link className="btn btn-light me-2" style={{ fontWeight: "bold", color: "rgb(165, 68, 65)", backgroundColor: "rgb(243, 234, 214)" }}
                    to={store.currentUser.is_admin ? "/perfiladmin" : "/userinfo"}>
                    Mi Perfil
                  </Link>

                )}
                <button
                  className="btn btn-outline-light ml-2"
                  onClick={() => handleLogOut()} style={{ fontWeight: "bold", color: "rgb(165, 68, 65)" }}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : ( // Si no hay token y no estamos en la página de login, mostrar "Iniciar Sesión"
              location.pathname !== "/loginuser" && (
                <Link to="/loginuser">
                  <button className="btn btn-light" style={{ fontWeight: "bold", color: "rgb(165, 68, 65)", backgroundColor: "rgb(243, 234, 214)" }}>
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
