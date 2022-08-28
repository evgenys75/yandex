import React from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";
import styles from './burger-ingredient.module.css';

export default function BurgerIngridient(props) {

    const id = props.id;
    const count = 1;
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id,count}
    });
    return (
        <>
            {props.qty > 0  &&
                <div className={styles.counter}>
                    <Counter count={props.qty} size="default"/>
                </div>
            }
            <img src={props.image} alt={props.name} ref={dragRef}/>
            <span className="text text_type_digits-default"><CurrencyIcon/> {props.price}</span>
            <span className={"text text_type_main-default pt-4"}>{props.name}</span>
        </>
    );
}
BurgerIngridient.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};