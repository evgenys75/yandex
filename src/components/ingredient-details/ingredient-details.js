import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import styles from './ingredient-details.module.css';

export default function IngredientDetails(prop) {
    return (
        <Modal onClose={prop.onClose}>
                    <span
                        className={`pt-10 pl-10 pr-10 text_type_main-large ${styles.infoTitle}`}>Детали ингедиента</span>
                <span className={"pt-15 pb-15"}><img alt={prop.info.name} src={prop.info.image_large}/></span>
                <span className={"pb-4 pt-2 text text_type_main-medium"}>{prop.info.name}</span>
                <ul className={`${styles.ingredientInfo} pb-15`}>
                    <li className={"text text_type_main-default text_color_inactive"}>Калории, ккал<br/><span
                        className={"text_type_digits-default"}>{prop.info.calories}</span></li>
                    <li className={"text text_type_main-default text_color_inactive ml-5"}>Белки, г<br/><span
                        className={"text_type_digits-default"}>{prop.info.proteins}</span></li>
                    <li className={"text text_type_main-default text_color_inactive ml-5"}>Жиры, г<br/><span
                        className={"text_type_digits-default"}>{prop.info.fat}</span></li>
                    <li className={"text text_type_main-default text_color_inactive ml-5"}>Углеводы, г<br/><span
                        className={"text_type_digits-default"}>{prop.info.carbohydrates}</span></li>
                </ul>
        </Modal>
    );
}
IngredientDetails.propTypes = {
    onClose: PropTypes.func.isRequired
}