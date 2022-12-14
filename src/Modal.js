import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./index.css";

const Modal = props => {
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
      {/* <div class="modal-dialog" style={{overflowY: "scroll"}} >  */}
        <div className="modal-content" onClick={e => e.stopPropagation()} style={props.style}>
          <div className="modal-header">
            <h2 className="modal-title">{props.title}</h2>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            {props.button ? props.button : <button onClick={props.onClose} className="refresh_now" style={{float: "right", width: "100px"}}>
               Send Mail
            </button>}
          </div>
        </div>
        {/* </div> */}
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
