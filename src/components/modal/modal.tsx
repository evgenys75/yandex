import React, {FC, ReactNode} from "react";
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ModalOverlay} from '../modal-overlay/modal-overlay';

interface IModal {
    children: ReactNode;
    onClose: () => void;
}

const modalRoot = document.getElementById('modal-root');
export const Modal: FC<IModal> = ({onClose, children}) => {
    React.useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
    });

    return modalRoot ? ReactDOM.createPortal((
        <>
            <div className={styles.modal} id="modal">
                <span className={`${styles.modalContent}`}>{children}</span>
                <button className={styles.close} onClick={onClose}>
                    <CloseIcon type="primary"/>
                </button>
            </div>
            <ModalOverlay onClose={onClose}/>
        </>
    ), modalRoot) : null;
}