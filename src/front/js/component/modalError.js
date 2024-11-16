import React from 'react';
import Modal from 'react-modal';
import "../../styles/modalError.css";

const ErrorModal = ({ isOpen, onRequestClose, errorMessage }) => {
    return (
        <Modal 
            isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}
            className="modal-content"  overlayClassName="modal-overlay" 
        >
            <div className="modal-header">
                <h5 className="modal-title">Se ha producido un error</h5>
                <button type="button" className="btn-close" onClick={onRequestClose}aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <h6>{errorMessage}</h6>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={onRequestClose}
                >
                    Cerrar
                </button>
            </div>
        </Modal>
    );
};

export default ErrorModal;