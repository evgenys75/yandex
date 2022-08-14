import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function Modal({onClose, children}) {
    const modalRoot = document.getElementById('modal-root')
    const closeOnEsc = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }
    React.useEffect(() => {
        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
    })

    return ReactDOM.createPortal((
        <>
            <div className={styles.modal}>
                <span className={styles.modalContent}>{children}</span>
                <button className={styles.close} onClick={onClose}>
                    <CloseIcon type='primary'/>
                </button>
            </div>
            <ModalOverlay onClose={onClose}/>
        </>
    ), modalRoot);
}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node
}