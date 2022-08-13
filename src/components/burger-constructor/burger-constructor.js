import React from 'react';
import {DragIcon, ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import {currentIngridientsArray} from '../utils/data';
import Modal from '../modal/modal';
import {useState} from "react";
import doneImg from '../../images/done.png';

export default function BurgerConstructor() {
    const [isOpen, setIsOpen] = useState(false);
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
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <span className={"pt-30 pb-8 text text_type_digits-large"}>034536</span>
                <span className={"text text_type_main-medium"}>идентификатор заказа</span>
                <span className={"pt-15 pb-15"}><img alt={"Done"} src={doneImg}/></span>
                <span className={"pb-2 text text_type_main-default"}>Ваш заказ начали готовить</span>
                <span className={"pb-30 text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</span>
            </Modal>
        </>
    );
}