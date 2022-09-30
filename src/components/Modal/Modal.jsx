import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from "./Modal.module.css"

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({showModal,url}) => {

useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => {
        window.removeEventListener("keydown", handleKey)
    }
})

const handleKey = (event) => {
    if (event.code === "Escape") {
        showModal();
    }
};

const handleBackdrop = (event) => {
    if (event.currentTarget === event.target) {
        showModal();
    }
};

    return createPortal(
    <div className={s.overlay} onClick={handleBackdrop}>
        <div className={s.modal}>
            <img src={url} alt="" />
        </div>
    </div>,
      modalRoot
    )
}

 Modal.propTypes = {
    showModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
} 
    