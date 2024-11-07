import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/registerUser.css";

export const RegisterUser = () => {
  const { actions, store } = useContext(Context);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [checkTerms, setCheckTerms] = useState(false);

  const toggleModal = () => {
    //muestra el modal al darle click en los terminos y condiciones
    setShowModal(!showModal);
  };

  const handleCheckboxChange = (e) => {
    //Actualiza el estado checkTerms cada vez que el usuario marca o desmarca el checkbox
    const isChecked = e.target.checked;
    setCheckTerms(isChecked);
    if (!isChecked) {
      setError("Debes aceptar los Términos y Condiciones");
      return;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (!checkTerms) {
      setError("Debes aceptar los Términos y Condiciones");
      return;
    }
    setError(""); // Resetea el error

    const registeredUser = await actions.registerUser(userData);
    if (!registeredUser) {
      setError("Error al registrar usuario");
    } else {
      // Puedes redirigir o mostrar un mensaje de éxito
      console.log("Usuario registrado con éxito:", registeredUser);
    }
  };

  return (
    <div className="form-container">
      <form className="form mt-4" onSubmit={handleSubmit}>
        <h2 className="form-title">Registro de Usuario</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="ingrese su nombre"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user">Usuario</label>
          <input
            type="text"
            id="user"
            name="user"
            placeholder="Ingrese un Usuario"
            value={userData.user}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ingrese su correo"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="ingrese su contraseña"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirme su contraseña"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check d-flex gap-2 p-0">
          <input
            type="checkbox"
            id="termsCheck"
            checked={checkTerms}
            onChange={handleCheckboxChange}
          />
          <label className="mt-2" htmlFor="termsCheck">
            Aceptar los{" "}
            <a href="#" onClick={toggleModal}>
              Términos y Condiciones
            </a>
          </label>
        </div>

        <button type="submit" className="submit-button">
          Regístrate
        </button>
      </form>
      {showModal && (
        <>
          <div className={`modal-backdrop fade ${showModal ? "show" : ""}`} />
          <div
            className="modal show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title ms-2">Términos y Condiciones</h5>
                  <button
                    type="button"
                    className="btn-close mb-1 me-2"
                    onClick={toggleModal}
                    aria-label="Close"
                    style={{
                      fontFamily: "cursive",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Última actualización:</strong> 02/11/2024 <br />
                    <br /> <b>1. Aceptación de los Términos</b>
                    <br /> Al registrarte en nuestra plataforma, aceptas cumplir
                    con estos Términos y Condiciones. Si no estás de acuerdo con
                    alguno de los términos aquí establecidos, no podrás acceder
                    ni utilizar los servicios ofrecidos.
                    <br />
                    <br /> <b>2. Uso de la Cuenta</b>
                    <br />
                    Solo podrás crear una cuenta si tienes al menos 18 años.
                    Eres responsable de toda actividad que ocurra bajo tu cuenta
                    y deberás mantener la confidencialidad de tu contraseña.
                    Aceptas notificar de inmediato a <b>Tripeate</b> sobre
                    cualquier uso no autorizado de tu cuenta.
                    <br />
                    <br /> <b>3. Privacidad</b> <br /> Nos comprometemos a
                    proteger la privacidad de tus datos personales. Para más
                    detalles, consulta nuestra Política de Privacidad. Al
                    registrarte, consientes en que podamos recopilar, almacenar
                    y procesar tus datos personales de acuerdo con nuestra
                    política.
                    <br />
                    <br />
                    <b>4. Conducta del Usuario</b>
                    <br /> Al utilizar nuestra plataforma, te comprometes a no:
                    Utilizar la cuenta para actividades ilegales o no
                    autorizadas. Compartir información falsa o engañosa.
                    Interferir con el funcionamiento de la plataforma ni
                    intentar acceder a datos de otros usuarios.
                    <br /> <br /> <b>5. Terminación de la Cuenta</b>
                    <br />
                    Nos reservamos el derecho a suspender o terminar tu cuenta
                    en caso de violación de estos <i>
                      Términos y Condiciones
                    </i>{" "}
                    o de cualquier comportamiento que consideremos inadecuado o
                    perjudicial para nuestra comunidad. <br />
                    <br />
                    <b>6. Modificaciones</b>
                    <br /> a los Términos Podremos modificar estos{" "}
                    <i>Términos y Condiciones</i> en cualquier momento. Te
                    notificaremos sobre cualquier cambio y, al continuar usando
                    la plataforma, aceptas cumplir con los Términos y
                    Condiciones actualizados.
                    <br />
                    <br />
                    <b>7. Limitación de Responsabilidad</b>
                    <br /> <i>Tripeate</i> no será responsable de ninguna
                    pérdida o daño indirecto derivado del uso de nuestra
                    plataforma.
                    <br />
                    <br /> <b>8. Contacto</b>
                    <br /> Para cualquier consulta sobre estos Términos y
                    Condiciones, puedes contactarnos a través de{" "}
                    <i>
                      <b>tripeate@tripeate.com</b>
                    </i>
                    .
                  </p>
                </div>
                <div className="modal-footer ">
                  <div className="form-check d-flex gap-2">
                    <input
                      type="checkbox"
                      id="exampleCheck1"
                      checked={checkTerms}
                      onChange={handleCheckboxChange}
                    />
                    <label className="mt-2" htmlFor="termsCheck">
                      Aceptar los{" "}
                      <a href="#" onClick={toggleModal}>
                        Términos y Condiciones
                      </a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
