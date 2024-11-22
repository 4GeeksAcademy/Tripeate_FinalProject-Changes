import PropTypes from "prop-types";
import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "./modal";


export const PerfilAdmin = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [itemType, setItemType] = useState(null);
  const [Users, setUsers] = useState([]);
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

  const openModal = (id, type) => {
    setItemId(id);
    setItemType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlerDelete = async () => {
    if (!itemId || !itemType) return;
    try {
        if (itemType === 'user') {
            await actions.deleteUser(itemId);
            // Actualiza el estado local eliminando el usuario
            setStore(prevStore => ({
                ...prevStore,
                users: prevStore.users.filter(user => user.id !== itemId)
            }));
        } else if (itemType === 'plan') {
            await actions.deletePlan(itemId);
            // Actualiza el estado local eliminando el plan
            setAcceptedPlans(prevPlans => prevPlans.filter(plan => plan.id !== itemId));
            setRejectedPlans(prevPlans => prevPlans.filter(plan => plan.id !== itemId));
            setPendingPlans(prevPlans => prevPlans.filter(plan => plan.id !== itemId));
        }
        closeModal();
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
};

const managePlan = async (planId, action) => {
    const response = await actions.managePlan(planId, action);
    console.log(response);
    try {
        if (response.success) {
            // Actualiza el estado local según la acción
            if (action === 'accept') {
                setAcceptedPlans(prevPlans => [...prevPlans, response.plan]);
                setPendingPlans(prevPlans => prevPlans.filter(plan => plan.id !== planId));
            } else if (action === 'rejected') {
                setRejectedPlans(prevPlans => [...prevPlans, response.plan]);
                setPendingPlans(prevPlans => prevPlans.filter(plan => plan.id !== planId));
            }
        }
    } catch (error) {
        console.error(response.statusText);
    }
};

  return (<div className="container">
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
                  onClick={() => openModal(user.id, 'user')}
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
                  onClick={() => openModal(plan.id, 'plan')}
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
                  onClick={() => openModal(plan.id, 'plan')}
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
                  onClick={() => managePlan(plan.id, 'rejected')}
                >
                  Rechazar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => openModal(plan.id, 'plan')}
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
      handlerDelete={handlerDelete}
    />
  </div>
  )
};