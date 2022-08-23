import React from 'react';
import {DragIcon, ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import {useState, useContext} from "react";
import OrderDetails from "../order-details/order-details"
import {BurgerContext, OrderContext} from '../../services/burger-context';

export default function BurgerConstructor() {
    const [isOpen, setIsOpen] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const currentIngridientsArray = useContext(BurgerContext).ingredientsFullList;
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const bunIngredient = currentIngridientsArray.filter(el => el.type === 'bun')[random(0, currentIngridientsArray.filter(el => el.type === 'bun').length)];
    const mainIngredient = currentIngridientsArray.filter(el => el.type === 'main').sort(() => Math.random() - 0.5);
    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const createOrder = () => {
        const orderRequest = `{"ingredients": ["${bunIngredient._id}","${bunIngredient._id}"]}`;
        fetch('https://norma.nomoreparties.space/api/orders', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: orderRequest
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Can't create order");
            }
        }).then((data) => {
            console.log(data);
            setOrderId(data.order.number);
            setIsOpen(true);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <ul className={`pt-25 pl-10 ${styles.constructor}`}>
                <li>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bunIngredient.name} (верх)`}
                        price={bunIngredient.price}
                        thumbnail={bunIngredient.image}
                    />
                </li>
                {mainIngredient.slice(0, 2).map((element, index) => (
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
                <li>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunIngredient.name} (низ)`}
                        price={bunIngredient.price}
                        thumbnail={bunIngredient.image}
                    />
                </li>
                <li className={`pt-10 ${styles.total}`}>
                    <span className={"text text_type_digits-medium pr-10"}>100 <CurrencyIcon type="primary"/></span>
                    <Button type="primary" size="large" onClick={createOrder}>
                        Оформить заказ
                    </Button>
                </li>
            </ul>
            {isOpen &&
                <OrderContext.Provider value={orderId}>
                    <OrderDetails onClose={handleCloseModal}/>
                </OrderContext.Provider>
            }
        </>
    );
}