import React from 'react';
import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import {useState} from 'react';
import OrderDetails from '../order-details/order-details';
import {Modal} from '../modal/modal';
import {useDispatch} from 'react-redux';
import {useSelector} from '../../services/hook'
import {useDrop} from 'react-dnd';
import {
    DELETE_INGREDIENT_FROM_BURGER,
} from '../../services/actions/user-burger';
import {addIngredientToBurger} from '../../services/actions/user-burger';
import {sendOrder} from '../../services/actions/order';
import {BurgerConstructorRow}
    from '../burger-constructor-row/burger-constructor-row';
import {useHistory} from "react-router-dom";
import {TIngredient, TIngredientWithUniqueId} from '../../utils/types';

export default function BurgerConstructor() {
    const dispatch = useDispatch();
    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: TIngredient) {
            const dragElementId = Object.values(item)[0];
            const type = ingredientsFullList.filter(
                (el: any) => el._id === dragElementId)[0].type;
            item.type = type;
            dispatch(addIngredientToBurger(item));
        },
    });
    const {ingredients: userBurgerIngredients} = useSelector(
        store => store.userBurger);

    const {ingredientsFullList} = useSelector(store => store.ingredients);


    const [isOpen, setIsOpen] = useState(false);
    const bunIngredient = userBurgerIngredients.bun != null
        ? ingredientsFullList.filter(
            (el: any) => el._id === userBurgerIngredients.bun._id)[0]
        : null;
    const mainIngredient = userBurgerIngredients.filling != null
        ? userBurgerIngredients.filling
        : null;
    const handleDelete = (id: String) => {
        dispatch({type: DELETE_INGREDIENT_FROM_BURGER, payload: {itemId: id}});
    };
    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const history = useHistory();
    const authUser = useSelector((store: any) => store.user.userAuth);
    const createOrder = () => {
        if (!authUser) {
            return history.replace("/login");
        } else {
            const orderRequest = `{"ingredients": ["${bunIngredient?._id}","${bunIngredient?._id}"]}`;
            dispatch(sendOrder(orderRequest) as any);
            setIsOpen(true);
        }
    };

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
                    mainIngredient.map((element: TIngredientWithUniqueId, index: number) => (
                        <li className={'p-5'} key={element.uuid}>
                            <BurgerConstructorRow uuid={element.uuid} handleDelete={handleDelete}
                                                  text={ingredientsFullList.filter(
                                                      (el: TIngredient) => el._id ===
                                                          element._id)[0].name}
                                                  price={ingredientsFullList.filter(
                                                      (el: any) => el._id ===
                                                          element._id)[0].price}
                                                  thumbnail={ingredientsFullList.filter(
                                                      (el: any) => el._id ===
                                                          element._id)[0].image}/>
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
                {bunIngredient != null &&
                    <li className={`pt-10 ${styles.total}`}>
                        <span className={'text text_type_digits-medium pr-10'}>5990<CurrencyIcon
                            type="primary"/></span>

                        <Button type="primary" size="large" onClick={createOrder}>
                            Оформить заказ
                        </Button>
                    </li>
                }
            </ul>
            {isOpen &&
                <Modal onClose={handleCloseModal}>
                    <OrderDetails/>
                </Modal>
            }
        </div>
    );
}