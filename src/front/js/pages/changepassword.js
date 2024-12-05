import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useSearchParams } from "react-router-dom";
import ErrorModal from "../component/modalError";
import "../../styles/modalError.css";

export const ChangePassword = () => {
    const { actions } = useContext(Context);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    let [params, setSearchParams] = useSearchParams();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setError("Las contraseñas nuevas no coinciden.");
            setIsModalOpen(true);
            return;
        }
        try {
            const response = await actions.changePassword(newPassword, params.get("token"));
            if (response.success) {
                setSuccessMessage("Contraseña cambiada con éxito.");
                setNewPassword("");
                setConfirmNewPassword("");
            } else {
                setError(response.msg);
                setIsModalOpen(true);
            }
        } catch (error) {
            setError("Ocurrio un error al cambiar la contraseña.")
            setIsModalOpen(true);
            console.log("Error al cambiar la contraseña:", error)
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f0f2f5" }}>
                <div className="card p-5" style={{ maxWidth: "500px", width: "100%", borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}>
                    <h2 className="text-center mb-4" style={{ color: "#333", fontWeight: "500", fontSize: "1.8rem" }}>Cambiar Contraseña</h2>
                    <form onSubmit={handleChangePassword}>
                        <div className="form-group mb-4">
                            <label htmlFor="newPassword" style={{ color: "#555", fontSize: "1rem" }}>Nueva Contraseña</label>
                            <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Ingresa tu nueva contraseña" required />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="confirmNewPassword" style={{ color: "#555", fontSize: "1rem" }}>Confirmar Nueva Contraseña</label>
                            <input type="password" className="form-control" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirma tu nueva contraseña" required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#007bff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "1.2rem", fontWeight: "600" }}>
                            Cambiar Contraseña
                        </button>
                    </form>
                    <ErrorModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} errorMessage={error} />
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                </div>
            </div>
        </>
    );
};
    