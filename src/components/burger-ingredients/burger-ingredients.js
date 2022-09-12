import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngridient from '../burger-ingridient/burger-ingridient';
import styles from './burger-ingridient.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import {useDispatch, useSelector} from 'react-redux';
import {SET_INGREDIENT_DETAILS} from '../../services/actions/ingredients';
import {Link, useLocation} from "react-router-dom";

export default function BurgerIngredients() {
    const dispatch = useDispatch();
    const location = useLocation();
    const {ingredientsFullList} = useSelector(store => store.ingredients);
    const {ingredients: userBurgerIngredients} = useSelector(
        store => store.userBurger);
    const [state, setIsOpen] = useState({
        isOpen: false,
    });
    const [currentTab, setCurrentTab] = useState('buns');
    const handleCloseModal = () => {
        setIsOpen({isOpen: false});
        dispatch({type: SET_INGREDIENT_DETAILS, data: []});
    };
    const scrollToIngredientSectionBun = () => {
        refBun.current.scrollIntoView({behavior: 'smooth'});
    };
    const scrollToIngredientSectionSauce = () => {
        refSauce.current.scrollIntoView({behavior: 'smooth'});
    };
    const scrollToIngredientSectionMain = () => {
        refMain.current.scrollIntoView({behavior: 'smooth'});
    };
    const refBun = React.useRef();
    const refSauce = React.useRef();
    const refMain = React.useRef();

    const tabsFollow = () => {
        const saucesHeadingBox = refSauce.current.getBoundingClientRect();
        const mainHeadingBox = refMain.current.getBoundingClientRect();

        if (saucesHeadingBox.y < 275 && mainHeadingBox.y > 275 && currentTab !==
            'sauces') {
            setCurrentTab('sauce');
        } else if (mainHeadingBox.y < 275 && currentTab !== 'main') {
            setCurrentTab('main');
        } else if (saucesHeadingBox.y > 275 && currentTab !== 'buns') {
            setCurrentTab('buns');
        }

    };

    return (
        <section className={styles.ingredientsSection}>
            <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>
            <div className={styles.tabs}>
                <Tab value="bun" active={currentTab === 'buns'}
                     onClick={scrollToIngredientSectionBun}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'}
                     onClick={scrollToIngredientSectionSauce}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'}
                     onClick={scrollToIngredientSectionMain}>
                    Начинка
                </Tab>
            </div>
            {ingredientsFullList.length > 0 &&
                <ul className={styles.ingredientsList} onScroll={tabsFollow}>
                    <li ref={refBun}
                        className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>Булки
                    </li>
                    {ingredientsFullList.filter(el => el.type === 'bun').map((element, index) => (
                        <li key={element._id}
                            className={`pt-6 pb-10`}
                        >
                            <Link
                                to={{
                                    pathname: `/ingredients/${element._id}`,
                                    state: {"onPage": location},
                                }}
                                key={element._id}
                                className={styles.ingredientLink}
                            >
                                <BurgerIngridient image={element.image}
                                                  name={element.name}
                                                  price={element.price} id={element._id}
                                                  qty={userBurgerIngredients.bun !=
                                                  null &&
                                                  userBurgerIngredients.bun.id ===
                                                  element._id ? 2 : null}/>
                            </Link>
                        </li>
                    ))}
                    <li ref={refSauce}
                        className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>Соусы
                    </li>
                    {ingredientsFullList.filter(el => el.type === 'sauce').map((element, index) => (
                        <li key={element._id}
                            className={`pt-6 pb-10`}>
                            <Link
                                to={{
                                    pathname: `/ingredients/${element._id}`,
                                    state: {"onPage": location},
                                }}
                                key={element._id}
                                className={styles.ingredientLink}
                            >
                                <BurgerIngridient image={element.image}
                                                  name={element.name}
                                                  price={element.price} id={element._id}
                                                  qty={userBurgerIngredients.filling.find(
                                                      el => el.id === element._id) !=
                                                  null
                                                      ? userBurgerIngredients.filling.filter(
                                                          el => el.id ===
                                                              element._id).length
                                                      : null}/>
                            </Link>
                        </li>
                    ))}
                    <li ref={refMain}
                        className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>Ингридиенты
                    </li>
                    {ingredientsFullList.filter(el => el.type === 'main').map((element, index) => (
                        <li key={element._id}
                            className={`pt-6 pb-10`}>
                            <Link
                                to={{
                                    pathname: `/ingredients/${element._id}`,
                                    state: {"onPage": location},
                                }}
                                key={element._id}
                                className={styles.ingredientLink}
                            >
                                <BurgerIngridient image={element.image}
                                                  name={element.name}
                                                  price={element.price} id={element._id}
                                                  qty={userBurgerIngredients.filling.find(
                                                      el => el.id === element._id) !=
                                                  null
                                                      ? userBurgerIngredients.filling.filter(
                                                          el => el.id ===
                                                              element._id).length
                                                      : null}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            }
            {state.isOpen &&
                <Modal onClose={handleCloseModal}>
                    <IngredientDetails/>
                </Modal>
            }
        </section>
    );
}