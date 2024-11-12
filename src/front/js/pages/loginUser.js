import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const LoginUser = () => {
    const { actions, store } = useContext(Context);
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f0f2f5" }}>
                <div className="card p-5" style={{ maxWidth: "500px", width: "100%", borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}>
                    <h2 className="text-center mb-4" style={{ color: "#333", fontWeight: "500", fontSize: "1.8rem" }}>Iniciar Sesión</h2>
                    <form>
                        <div className="form-group mb-4">
                            <label htmlFor="email" style={{ color: "#555", fontSize: "1rem" }}>Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Ingresa tu correo"
                                required
                                style={{
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                    padding: "12px",
                                    boxShadow: "none",
                                    outline: "none",
                                    fontSize: "1.1rem"
                                }}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" style={{ color: "#555", fontSize: "1rem" }}>Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                required
                                style={{
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                    padding: "12px",
                                    boxShadow: "none",
                                    outline: "none",
                                    fontSize: "1.1rem"
                                }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" style={{
                            backgroundColor: "#007bff",
                            border: "none",
                            borderRadius: "10px",
                            padding: "14px",
                            fontSize: "1.2rem",
                            fontWeight: "600"
                        }}>
                            Iniciar Sesión
                        </button>
                    </form>
                    <p className="text-center mt-4" style={{ color: "#777", fontSize: "1rem" }}>
                        ¿No tienes una cuenta? <Link to="/register"><button className="text-primary border-0" style={{ fontWeight: "500", background: "transparent", }}>Regístrate</button></Link>
                    </p>
                </div>
            </div>

        </>
    )
} 