import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navuser.css";

export const PerfilUser = () => {
    const { store, actions } = useContext(Context);
    const [collapsed, setCollapsed] = useState(false); // Estado para controlar el colapso

    const toggleNavbar = () => {
        setCollapsed(!collapsed); // Alternar el estado de colapso
    }

    return (
        <div>
            <div className="container mt-5">
                <h1 className="mt-0">Hola, {store.currentUser ? `${store.currentUser.name} ${store.currentUser.last_name}` : 'Invitado'}</h1>
                <h5>{store.currentUser ? `${store.currentUser.email}` : 'email'}</h5>
            </div>
            <nav className={`navbar bg-body-tertiary fixed-top ${collapsed ? 'collapsed' : ''}`} style={{ height: "100vh", width: "250px", right: "0", transition: "transform 0.3s ease", transform: collapsed ? "translateX(100%)" : "translateX(0)" }}>
                <div className="container-fluid flex-column">
                    <button className="btn btn-primary" onClick={toggleNavbar} style={{ marginBottom: "20px" }}>
                        {collapsed ? 'Expandir' : 'Colapsar'}
                    </button>
                    {!collapsed && (
                        <>
                            <a className="navbar-brand" href="#">Navbar Vertical</a>
                            <ul className="navbar-nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Pricing</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
};