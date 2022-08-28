import React from 'react';
import {DragIcon, ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import {useState} from "react";
import OrderDetails from "../order-details/order-details"
import Modal from '../modal/modal';
import {useSelector, useDispatch} from 'react-redux';
import {useDrop, useDrag} from "react-dnd";
import {
    ADD_INGREDIENT_TO_BURGER,
    DELETE_INGREDIENT_FROM_BURGER,
    CHANGE_POSITION
} from '../../services/actions/user-burger';
import {sendOrder} from "../../services/actions/order"

export default function BurgerConstructor() {
    const dispatch = useDispatch();
    const [, dragRef] = useDrag({
        type: "sort",
        item: {}
    });
    const [, dropRef] = useDrop({
        accept: "sort",
        drop(item) {
            dispatch({type: CHANGE_POSITION, payload: {itemId: item}});
        },
    });
    const {ingredients: userBurgerIngredients} = useSelector(store => store.userBurger);
    const {ingredientsFullList} = useSelector(store => store.ingredients);
    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(itemId) {
            const type = ingredientsFullList.filter(el => el._id === itemId.id)[0].type;
            dispatch({type: ADD_INGREDIENT_TO_BURGER, payload: {itemId: itemId, type: type}});
        },
    });
    const [isOpen, setIsOpen] = useState(false);
    const bunIngredient = userBurgerIngredients.bun != null ? ingredientsFullList.filter(el => el._id === userBurgerIngredients.bun.id)[0] : null;
    const mainIngredient = userBurgerIngredients.filling != null ? userBurgerIngredients.filling : null;
    const handleDelete = (id) => {
        dispatch({type: DELETE_INGREDIENT_FROM_BURGER, payload: {itemId: id}});
    };
    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const createOrder = () => {
        const orderRequest = `{"ingredients": ["${bunIngredient._id}","${bunIngredient._id}"]}`;
        dispatch(sendOrder(orderRequest));
        setIsOpen(true);
    }
    return (
        <div ref={dropTarget}>
            <ul className={`pt-25 pl-10 ${styles.constructor}`}>
                {bunIngredient != null &&
                    <li>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bunIngredient.name} (верх)`}
                            price={bunIngredient.price}
                            thumbnail={bunIngredient.image}
                        />
                    </li>
                }
                {mainIngredient != null &&
                    mainIngredient.map((element, index) => (
                        <li key={element.id} className={"p-5"} ref={dropRef}>
                            <div className={styles.ingredient} ref={dragRef}>
                                <DragIcon/>
                                <ConstructorElement
                                    handleClose={() => handleDelete(element.id)}
                                    isLocked={false}
                                    text={ingredientsFullList.filter(el => el._id === element.id)[0].name}
                                    price={ingredientsFullList.filter(el => el._id === element.id)[0].price}
                                    thumbnail={ingredientsFullList.filter(el => el._id === element.id)[0].image}
                                />
                            </div>
                        </li>
                    ))
                }
                {bunIngredient != null &&
                    <li>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bunIngredient.name} (низ)`}
                            price={bunIngredient.price}
                            thumbnail={bunIngredient.image}
                        />
                    </li>
                }
                <li className={`pt-10 ${styles.total}`}>
                    {bunIngredient != null &&
                        <span className={"text text_type_digits-medium pr-10"}>5950 <CurrencyIcon
                            type="primary"/></span>
                    }
                    <Button type="primary" size="large" onClick={createOrder}>
                        Оформить заказ
                    </Button>
                </li>
            </ul>
            {isOpen &&
                <Modal onClose={handleCloseModal}>
                    <OrderDetails/>
                </Modal>
            }
        </div>
    );
}