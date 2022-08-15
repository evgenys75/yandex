import React from 'react';
import PropTypes from 'prop-types';
import doneImg from '../../images/done.png';
import Modal from '../modal/modal';

export default function OrderDetails(prop) {
    return (
        <Modal onClose={prop.onClose}>
            <span className={"pt-30 pb-8 text text_type_digits-large"}>034536</span>
            <span className={"text text_type_main-medium"}>идентификатор заказа</span>
            <span className={"pt-15 pb-15"}><img alt={"Done"} src={doneImg}/></span>
            <span className={"pb-2 text text_type_main-default"}>Ваш заказ начали готовить</span>
            <span className={"pb-30 text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</span>
        </Modal>
    );
}
OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired
}