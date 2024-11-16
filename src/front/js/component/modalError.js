import React from 'react';
import Modal from 'react-modal';

const ErrorModal = ({ isOpen, onRequestClose, errorMessage }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
            <h5 className="modal-title">Error</h5>
            <p>{errorMessage}</p>
            <button onClick={onRequestClose}>Cerrar</button>
        </Modal>
    );
};

export default ErrorModal;