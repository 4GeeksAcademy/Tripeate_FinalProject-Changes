import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const PerfilUser = () => {
    const {store, actions} = useContext(Context);
    
    
    return (
        <div className="container mt-5">
            <Link to ="/">
            <button className="btn btn-light" style={{ fontWeight: "bold" }}>
            Cerrar Sesión
            </button>        
            </Link>
            <h2 className="text-center">Hola, {store.currentUser ? `${store.currentUser.name} ${store.currentUser.last_name}` : 'Invitado'}</h2>

        </div>
    )
};