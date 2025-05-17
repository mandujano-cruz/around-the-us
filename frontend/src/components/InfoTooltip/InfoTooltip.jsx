import React from "react";
import successIcon from "../../images/success.png";
import errorIcon from "../../images/error.png";
import closeIcon from "../../images/close.png";

export default function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
    if(!isOpen) return null;
    return (
        <div className="popup popup_tooltip">
            <button className="popup__close" onClick={onClose}>
                <img src={closeIcon} alt="Cerrar" />
            </button>
            <img 
                src={isSuccess ? successIcon : errorIcon}
                alt={isSuccess ? "Éxito" : "Error"}
                className="popup__icon"
            />
            <p className="popup__message">{message}</p>
        </div>
  );
}

