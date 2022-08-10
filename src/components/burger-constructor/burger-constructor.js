import React from 'react';
import {DragIcon, ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import {currentIngridientsArray} from '../utils/data';

export default function BurgerConstructor() {
    return (
        <ul className={styles.constructor}>
            {currentIngridientsArray.filter(el => el.type === 'bun').map((element, index) => (
                <li key={element._id}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={element.name}
                        price={element.price}
                        thumbnail={element.image}
                    />
                </li>
            ))}
            {currentIngridientsArray.filter(el => el.type === 'main').map((element, index) => (
                <li key={element._id} className={"p-5"}>
                    <DragIcon/><ConstructorElement
                    isLocked={false}
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                />
                </li>
            ))}
            {currentIngridientsArray.filter(el => el.type === 'bun').map((element, index) => (
                <li key={element._id}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={element.name}
                        price={element.price}
                        thumbnail={element.image}
                    />
                </li>
            ))}
            <li>
                100 <CurrencyIcon/>
                <Button>
                    Оформить заказ
                </Button>
            </li>
        </ul>
    );
}