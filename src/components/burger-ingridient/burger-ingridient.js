import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function BurgerIngridient(props) {
    return (
        <>
            <img src={props.image} alt={props.name}/>
            <CurrencyIcon/> {props.price} {props.name}
        </>
    );
}
BurgerIngridient.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};