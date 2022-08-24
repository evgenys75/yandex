import React from 'react';
import {DragIcon, ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import {useState, useContext, useMemo} from "react";
import OrderDetails from "../order-details/order-details"
import {BurgerContext, OrderContext} from '../../services/burger-context';
import {apiEndPoint} from '../../utils/data';
import Modal from '../modal/modal';

export default function BurgerConstructor() {
    const [isOpen, setIsOpen] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const currentIngridientsArray = useContext(BurgerContext).ingredientsFullList;
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const bunIngredient = useMemo(() => currentIngridientsArray.filter(el => el.type === 'bun')[random(0, currentIngridientsArray.filter(el => el.type === 'bun').length)], [currentIngridientsArray]);
    const mainIngredient = useMemo(() => currentIngridientsArray.filter(el => el.type === 'main').sort(() => Math.random() - 0.5), [currentIngridientsArray]);

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    function checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`res.ok: ${res.ok}, res.status: ${res.status}`);
    }

    const createOrder = () => {
        const orderRequest = `{"ingredients": ["${bunIngredient._id}","${bunIngredient._id}"]}`;
        fetch(`${apiEndPoint}orders`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: orderRequest
        }).then(checkResponse)
            .then((data) => {
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
                    <Modal onClose={handleCloseModal}>
                        <OrderDetails/>
                    </Modal>
                </OrderContext.Provider>
            }
        </>
    );
}