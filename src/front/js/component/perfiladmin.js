import PropTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCircleCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "./modal";




export const PerfilAdmin = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [acceptedPlans, setAcceptedPlans] = useState([]);
    const [rejectedPlans, setRejectedPlans] = useState([]);
    const [pendingPlans, setPendingPlans] = useState([])
    

    // Obtener usuarios y planes
    useEffect(() => {
        actions.getUsersList();
        actions.getPlansList().then(plans => {
          // Clasificar los planes en listas separadas
          setAcceptedPlans(plans.filter(plan => plan.status === 'Aceptado'));
          setRejectedPlans(plans.filter(plan => plan.status === 'Rechazado'));
          setPendingPlans(plans.filter(plan => plan.status === 'Pendiente'));
      }); 
      }, []);
    

      const openModal = (id) => {
        setItemId(id);
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };
    
      const deleteUser = async (id) => {
        if (itemId) {
          await actions.deleteUser(id);
        }
        closeModal();
        await actions.getUsersList(); // Recuperar usuarios después de la eliminación
      };
    
      const deletePlan = async (id) => {
        if (itemId) {
          await actions.deletePlan(id);
        }
        closeModal();
        await actions.getPlansList(); // Recuperar planes después de la eliminación
      };

      const managePlan = async (planId, action) => {
        await actions.managePlan(planId, action);
        // Actualizar las listas después de la acción
        const updatedPlans = await actions.getPlansList();
        setAcceptedPlans(updatedPlans.filter(plan => plan.status === 'Aceptado'));
        setRejectedPlans(updatedPlans.filter(plan => plan.status === 'Rechazado'));
        setPendingPlans(updatedPlans.filter(plan => plan.status === 'Pendiente'));
    };


        return ( <div className="container">
            <h1>Administrador</h1>
      
            {/* Sección de Usuarios */}
            <h2>Usuarios</h2>
            {store.users.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {store.users.map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => openModal(user.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay usuarios disponibles.</p>
            )}
      
            {/* Sección de Planes */}
            {/* Sección de Planes Aceptados */}
            <h2>Planes Aceptados</h2>
            {acceptedPlans.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acceptedPlans.map((plan, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{plan.name}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => openModal(plan.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay planes aceptados.</p>
            )}

            {/* Sección de Planes Rechazados */}
            <h2>Planes Rechazados</h2>
            {rejectedPlans.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rejectedPlans.map((plan, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{plan.name}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => openModal(plan.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay planes rechazados.</p>
            )}

            {/* Sección de Planes Pendientes */}
            <h2>Planes Pendientes</h2>
            {pendingPlans.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingPlans.map((plan, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{plan.name}</td>
                                <td>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => managePlan(plan.id, 'accept')}
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => managePlan(plan.id, 'reject')}
                                    >
                                        Rechazar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => openModal(plan.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay planes pendientes.</p>
            )}
              
            <Modal
              showModal={showModal}
              handlerClose={closeModal}
              handlerDelete={() => {
                itemId ? deleteUser(itemId) : deletePlan(itemId); // Diferenciar en función del itemId
              }}
            />
          </div>
        )
        };