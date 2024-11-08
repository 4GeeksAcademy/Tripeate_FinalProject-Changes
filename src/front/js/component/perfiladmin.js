import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faLocationDot, faPhoneFlip, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "./modal";



export const ContactCard = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [contactId, setContactId] = useState(null);
    
        const openModal = (id) => {
            console.log(id)
            setContactId(id);
            
            setShowModal(true)
        }
    
        const closeModal = () => {
            setShowModal(false)
        }
    
        const HandlerDelete = async (id) => {
            if (contactId) {
                await actions.deleteContact(id);
            }
            closeModal();
            await actions.getContactsList();
        };

    return (
            
            <ol className="list-group list-group-numbered">
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Content for list item
                </div>
                <span className="badge text-bg-primary rounded-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Content for list item
                </div>
                <span className="badge text-bg-primary rounded-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Content for list item
                </div>
                <span className="badge text-bg-primary rounded-pill">14</span>
            </li>
            </ol>



        /*
        <div className="container justify-content-center">
    <div className="row">
        {store.contacts.length > 0 ? (
            store.contacts.map((contact, index) => (
                <div className="row border border-1 p-2" key={index}>
                    <div className="col-1 me-5 container-img ">
                    <img src="https://picsum.photos/300/200" width="100" height="100"/>
                    </div>
                    <div className="col-6 list">
                        <h5>{contact.name}</h5>
                        <ul className="list-group border-none d-flex align-items-start flex-column p-0" style={{ listStyle: 'none' }}>
                            <li>
                                <p><FontAwesomeIcon icon={faLocationDot} className="me-2 icon" />{contact.address}</p> 
                            </li>
                            <li>
                                <p><FontAwesomeIcon icon={faPhoneFlip} className="me-2 icon" />{contact.phone}</p> 
                            </li>
                            <li>
                                <p><FontAwesomeIcon  icon={faEnvelope} className="me-2 icon" />{contact.email}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex justify-content-end icons">
                        <Link to={`/updateContact/${contact.id}`}>
                                <FontAwesomeIcon icon={faPencilAlt} className="icon2 me-3" onClick={() => handleEdit(contact.id)} />
                        </Link>
                                <FontAwesomeIcon icon={faTrashAlt} className="icon2 icon2-1" onClick={() => openModal(contact.id)}/>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="col-12">
                <p className="list-group-item">No hay contactos disponibles.</p>
            </div> 
        )}
    </div>
    <Modal showModal={showModal} handlerClose={closeModal} handlerDelete={() => {HandlerDelete(contactId)}} />
</div>
*/
)
};