import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faLocationDot, faPhoneFlip, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "./modal";



export const PerfilAdmin = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [itemId, setItemId] = useState(null);
    /*const [users, setUsers] = useState([]);
    const [plans, setPlans] = useState([]);*/

    // Obtiener usuarios y planes
    useEffect(() => {
        actions.getUsersList();
        actions.getPlansList(); 
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
    

        return ( <div className="container">
            <h1>Administrador</h1>
      
            {/* Users Section */}
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
                        <Link
                          to={`/editUser/${user.id}`} // Assuming edit user route
                          className="btn btn-primary btn-sm me-2"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Link>
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
      
            {/* Plans Section */}
            <h2>Planes</h2>
            {store.plans.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {store.plans.map((plan, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{plan.name}</td>
                      <td>
                        <Link
                          to={`/editPlan/${plan.id}`} // Assuming edit plan route
                          className="btn btn-primary btn-sm me-2"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => openModal(plan.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay planes disponibles.</p>
            )}
      
            <Modal
              showModal={showModal}
              handleClose={closeModal}
              handlerDelete={() => {
                itemId ? deleteUser(itemId) : deletePlan(itemId); // Differentiate based on itemId
              }}
            />
          </div>
        )
        };