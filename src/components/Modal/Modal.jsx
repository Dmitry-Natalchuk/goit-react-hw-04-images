import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import s from "./Modal.module.css"

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

componentDidMount() {
    window.addEventListener("keydown", this.handleKey);
};
componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKey);
};

handleKey = (event) => {
    if (event.code === "Escape") {
        this.props.showModal();
    }
};

handleBackdrop = (event) => {
    if (event.currentTarget === event.target) {
        this.props.showModal();
    }
};

render(){
    return createPortal(
    <div className={s.overlay} onClick={this.handleBackdrop}>
        <div className={s.modal}>
            <img src={this.props.url} alt="" />
        </div>
    </div>,
      modalRoot
    )
 };
}

 Modal.propTypes = {
    showModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
} 
    