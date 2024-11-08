import PropTypes from "prop-types";
import React from "react";


export const Modal = (props) => {

  return (
    <>
      {props.showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={props.handlerClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  If you delete this thing, the entire universe will go down!
                </p>
              </div>
              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={props.handlerClose}
                >
                  Oh no!
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={props.handlerDelete}
                >
                  Yes baby!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  showmodal: PropTypes.bool,
  handlerClose: PropTypes.func,
  handlerDelete: PropTypes.func,
};