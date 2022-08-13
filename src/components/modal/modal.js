import React from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import PropTypes from 'prop-types';

export default function Modal(props) {
    return (
        <div className={`${styles.modal} ${props.isOpen ? styles.aсtive : ''}`}>
            <span className={styles.modalContent}>{props.children}</span>
            <span className={styles.close}><CloseIcon onClick={() => props.setIsOpen(false)} type='primary'/></span>
        </div>
    );
}
Modal.propTypes = {
    setIsOpen: PropTypes.func
};