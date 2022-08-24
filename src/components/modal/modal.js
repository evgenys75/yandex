import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById('modal-root')

export default function Modal({onClose, children}) {

    React.useEffect(() => {
        const closeOnEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
    })

    return ReactDOM.createPortal((
        <>
            <div className={styles.modal}>
                <span className={`${styles.modalContent} p-30`}>{children}</span>
                <button className={styles.close} onClick={onClose}>
                    <CloseIcon type='primary'/>
                </button>
            </div>
            <ModalOverlay onClose={onClose}/>
        </>
    ), modalRoot);
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
}