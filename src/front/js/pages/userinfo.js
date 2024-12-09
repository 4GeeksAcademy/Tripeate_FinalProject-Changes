import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navuser.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
//import { Modal } from "../component/modal";



export const PerfilUser = () => {
    const { store, actions } = useContext(Context);
    const [collapsed, setCollapsed] = useState(false); 
    const [ userPlans, setUserPlans] = useState([]);

    const toggleNavbar = () => {
        setCollapsed(!collapsed); 
    }

    useEffect(() => {
        const fetchUserPlans = async () => {
            if (store.currentUser) { 
                const plans = await actions.getPlansList();
                const filteredPlans = plans.filter(plan => plan.user_id === store.currentUser.id); // Filtrar por el ID del usuario
                setUserPlans(filteredPlans);
            }
        };
        fetchUserPlans();
    }, [store.currentUser]);

    //   const openModal = (id, type) => {
    //     setItemId(id);
    //     setItemType(type);
    //     setShowModal(true);
    //   };
    
    //   const closeModal = () => {
    //     setShowModal(false);
    //   };
    
    //   const handlerDelete = async () => {
    //     if (!itemId || !itemType) return;
    //     try {
    //       if (itemType === 'user') {
    //         await actions.deleteUser(itemId);
    //       } else if (itemType === 'plan') {
    //         await actions.deletePlan(itemId);
    //         // Actualiza el estado local eliminando el plan
    //         setAcceptedPlans(prevPlans => prevPlans.filter(plan => plan.id !== itemId));
    //         setRejectedPlans(prevPlans => prevPlans.filter(plan => plan.id !== itemId));
    //         setPendingPlans(prevPlans => prevPlans.filter(plan => plan.id !== itemId));
    //       }
    //       closeModal();
    //       await fetchData();
    //     } catch (error) {
    //       console.error("Error al eliminar:", error);
    //     }
    //   };

    return (
        <div style={{ display: "flex", marginTop: "0", paddingTop: "0" }}>
            <nav className={`navbar bg-body-tertiary fixed-left ${collapsed ? 'collapsed' : ''} d-block ps-2 pt-5 text-end pe-4 nav-user mt-5`} 
            style={{ backgroundColor: "white", borderBlockEnd: "rgb(165, 68, 65)", height: "100vh", width: "170px", transition: "transform 0.3s ease", margin: "0", 
                transform: collapsed ? "translateX(-60%)" : "translateX(0)", left: "0", top: "0", position: "relative", color: "rgb(165, 68, 65)" }}>
                
                    <div>
                      <button className="btn" onClick={toggleNavbar} style={{ boxShadow: "none",color: "rgb(165, 68, 65)", width: "", marginBottom: "", paddingLeft: "" }}>
                        {collapsed ? <FontAwesomeIcon icon={faBars} className="fa-2x"/> : <><FontAwesomeIcon icon={faBars}/><br></br></>}
                    </button>
                    </div>
                    {!collapsed && (
                        <div>
                            
                            <ul className="navbar-nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#"><p><strong>Mi Perfil</strong></p></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Compras</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Favoritos</a>
                                </li>
                                <hr className="dropdown-divider border border-dark" style={{width: "135px"}}   />
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Ventas</a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-new" type="submit"><FontAwesomeIcon icon={faPlus} /> Nuevo trip</button>
                                </li>
                            </ul>
                            {/*<form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>*/}
                        </div>
                    )}
                
            </nav>
                <div className="container">
                    <div className="container mt-5 text-center" >
                        <div style={{ marginLeft: "-170px", position: "adsolute"}}>
                        <img src="https://picsum.photos/300/200" width="125" height="125" style={{ borderRadius: "50%"}}/>
                        <h1 className="mt-0">¡Hola, {store.currentUser ? `${store.currentUser.name}!` : 'Invitado!'}</h1>
                        <h5>{store.currentUser ? `${store.currentUser.email}` : 'email'}</h5>
                        </div>
                    </div>
                    <div>
                    
                    <h2>Mis Planes</h2>
                        <ul>
                        {userPlans.length > 0 ? (
                                userPlans.map(plan => 
                                    <li key={plan.id}>{plan.name} - {plan.status}</li>
                            )
                        ) : (
                        <li>No tienes planes disponibles</li>

                    )}
                        </ul>
                    <div className="text-center mt-5">
                        <button className="btn btn-new" type="submit"><FontAwesomeIcon icon={faPlus} /> Agregar nuevo trip</button>                       
                    </div>
                    </div>
                    </div>
            </div>
    )
};
           