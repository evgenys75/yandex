import React, {FC} from 'react';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from 'react-dnd';
import styles from './burger-ingredient.module.css';

interface IBurgerIngredient {
    _id: number;
    image: string;
    name: string;
    qty: number;
    price: number;
}

export const BurgerIngredient: FC<IBurgerIngredient> = ({_id, image, name, qty,price}) => {
    const count = 1;
    const uuid = null;
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {_id, count, uuid},
    });
    return (
        <>
            {qty > 0 &&
                <div className={styles.counter}>
                    <Counter count={qty} size="default"/>
                </div>
            }
            <img src={image} alt={name} ref={dragRef}/>
            <span
                className="text text_type_digits-default"><CurrencyIcon type="primary"/> {price}</span>
            <span className={'text text_type_main-default pt-4'}>{name}</span>
        </>
    );
}