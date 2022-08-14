import React from 'react';
import {DragIcon, ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import {currentIngridientsArray} from '../../utils/data';
import {useState} from "react";
import OrderDetails from "../order-details/order-details"

export default function BurgerConstructor() {
    const [isOpen, setIsOpen] = useState(false);
    const handleCloseModal = () => {
        setIsOpen(false);
    }
    return (
        <>
            <ul className={`pt-25 pl-10 ${styles.constructor}`}>
                {currentIngridientsArray.filter(el => el.type === 'bun').map((element, index) => (
                    <li key={element._id}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${element.name} (верх)`}
                            price={element.price}
                            thumbnail={element.image}
                        />
                    </li>
                ))}
                {currentIngridientsArray.filter(el => el.type === 'main').map((element, index) => (
                    <li key={element._id} className={"p-5"}>
                        <span className={styles.ingredient}>
                        <DragIcon/>
                        <ConstructorElement
                            isLocked={false}
                            text={element.name}
                            price={element.price}
                            thumbnail={element.image}
                        />
                        </span>
                    </li>
                ))}
                {currentIngridientsArray.filter(el => el.type === 'bun').map((element, index) => (
                    <li key={element._id}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${element.name} (низ)`}
                            price={element.price}
                            thumbnail={element.image}
                        />
                    </li>
                ))}
                <li className={`pt-10 ${styles.total}`}>
                    <span className={"text text_type_digits-medium pr-10"}>100 <CurrencyIcon type="primary"/></span>
                    <Button type="primary" size="large" onClick={() => setIsOpen(true)}>
                        Оформить заказ
                    </Button>
                </li>
            </ul>
            {isOpen &&
                <OrderDetails onClose={handleCloseModal} />
            }
        </>
    );
}