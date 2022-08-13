import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


export default function BurgerIngridient(props) {
    return (
        <>
            <img src={props.image} alt={props.name}/>
            <span className="text text_type_digits-default"><CurrencyIcon/> {props.price}</span>
            <span className={"text text_type_main-default pt-4"}>{props.name}</span>
        </>
    );
}
BurgerIngridient.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};