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
          if (deleteUser.token) {
            localStorage.setItem("token", deleteUser.token); // Almacena el token
          }
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
        console.log(plans)
        setAcceptedPlans(updatedPlans.filter(plan => plan.status === 'Accepted'));
        setRejectedPlans(updatedPlans.filter(plan => plan.status === 'Rejected'));
        setPendingPlans(updatedPlans.filter(plan => plan.status === 'Pending'));
    };


        return ( <div className="container">
            <h1 className="text-center">Administrador</h1>
            <h2>Bienvenido, {store.currentUser ? `${store.currentUser.name} ${store.currentUser.last_name}` : 'Invitado'}</h2>
            
      
            {/* Sección de Usuarios */}
            <h3>Usuarios</h3>
            {store.users.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre y Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {store.users.map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name} {user.last_name}</td>
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
            <h3>Planes Aceptados</h3>
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
            <h3>Planes Rechazados</h3>
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
            <h3>Planes Pendientes</h3>
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