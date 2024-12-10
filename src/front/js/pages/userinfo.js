import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navuser.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from "../component/modal";



export const PerfilUser = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [itemType, setItemType] = useState(null);
    const [collapsed, setCollapsed] = useState(false); 
    const [userPlans, setUserPlans] = useState([]);
    const [activeSection, setActiveSection] = useState(null)

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };
    
    const [userData, setUserData] = useState({
        name: '', 
        last_name: '',
        email: ''
    });

    useEffect(() => {
        if (store.currentUser){
        setUserData({
            name: store.currentUser.name || '',
            last_name: store.currentUser.last_name || '',
            email: store.currentUser.email || '',
        });
    }
    }, [store.currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos a enviar:", userData);
        const token = localStorage.getItem("token");
        try {
          await actions.updateUser(store.currentUser.id,
            userData.name,
            userData.last_name,
            userData.email,
            token);
          setUserData({
            name: userData.name,
            last_name: userData.last_name,
            email: userData.email
          });
          alert("Información actualizada con éxito");
        } catch (error) {
          console.error("Error al actualizar:", error);
          alert("Error al actualizar la información");
        }
      };
    
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
          if (itemType === 'plan') {
            await actions.deletePlan(itemId);
          }
          closeModal();
          const plans = await actions.getPlansList();
          const filteredPlans = plans.filter(plan => plan.user_id === store.currentUser.id);
          setUserPlans(filteredPlans);
        } catch (error) {
          console.error("Error al eliminar:", error);
        }
      };

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
                                    <a className="nav-link active" aria-current="page" href="#" onClick={() => handleSectionChange('perfil')}><p><strong>Mi Perfil</strong></p></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Compras</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Favoritos</a>
                                </li>
                                <hr className="dropdown-divider border border-dark" style={{width: "135px"}}   />
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={() => handleSectionChange('ventas')}>Ventas</a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-new" type="submit"><FontAwesomeIcon icon={faPlus} /> Nuevo trip</button>
                                </li>
                            </ul>
                        </div>
                    )}
                
            </nav>
                <div className="container">
                    <div className="container mt-5 text-center" >
                        <div style={{ marginLeft: "-10px", position: "adsolute"}}>
                        <img src="https://picsum.photos/300/200" width="125" height="125" style={{ borderRadius: "50%"}}/>
                        <h1 className="mt-0">¡Hola, {userData.name ? `${userData.name}!` : 'Invitado!'}</h1>
                        <h5>{store.currentUser ? `${userData.email}` : 'email'}</h5>
                        </div>
                    </div>
                    {activeSection === 'ventas' && (
                    <div className="container mt-5">
                    <h1 className="text-center">Mis Trips</h1>
                    <table className="table" style={{backgroundColor: "white", borderRadius: "10px"}}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre del Trip</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPlans.length > 0 ? (
                                userPlans.map((plan, index) => (
                                    <tr key={plan.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{plan.name}</td>
                                        <td>{plan.status}</td>
                                        <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => openModal(plan.id, 'plan')}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No tienes planes disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="text-center mt-5">
                        <button className="btn btn-new" type="submit"><FontAwesomeIcon icon={faPlus} /> Agregar nuevo trip</button>                       
                    </div>
                    </div>
                    )}
                    {activeSection === 'perfil' && (
                    <div className="container mt-5 p-4" style={{backgroundColor: "white", maxWidth: "800px", borderRadius: "10px"}}>
                        <form onSubmit={handleSubmit}>
                            <div className="pt-2">
                                <label style={{color:"rgb(165, 68, 65)"}}><strong>Nombre:</strong></label>
                                <input type="text" name="name" value={userData.name} onChange={handleChange} required />
                            </div>
                            <div className="pt-2">
                            <label style={{color:"rgb(165, 68, 65)"}}><strong>Apellido:</strong></label>
                                <input type="text" name="last_name" value={userData.last_name} onChange={handleChange} />
                            </div>
                            <div className="pt-2">
                            <label style={{color:"rgb(165, 68, 65)"}}><strong>Correo electrónico:</strong></label>
                                <input type="email" name="email" value={userData.email} onChange={handleChange} required />
                            </div>
                            <div className="text-center mt-5">
                            <button className="btn btn-new" type="submit">Actualizar Información</button>
                            </div>
                        </form>
                    </div>
                    )}
                    <Modal
                        showModal={showModal}
                        handlerClose={closeModal}
                        handlerDelete={handlerDelete}
                    />
            </div>
            </div>
    )
};
           