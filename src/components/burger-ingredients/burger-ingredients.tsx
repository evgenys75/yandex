import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIngredient} from '../burger-ingridient/burger-ingridient';
import styles from './burger-ingridient.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {Modal} from '../modal/modal';
import {useDispatch} from '../../services/hook';
import {useSelector} from '../../services/hook';
import {SET_INGREDIENT_DETAILS} from '../../services/actions/ingredients';
import {Link, useLocation} from "react-router-dom";

export default function BurgerIngredients() {
    const dispatch = useDispatch();
    const location = useLocation();
    const ingredientsFullList = useSelector(store => store.ingredients.ingredientsFullList);
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
    const refBun = React.useRef<HTMLLIElement>(null);
    const refSauce = React.useRef<HTMLLIElement>(null);
    const refMain = React.useRef<HTMLLIElement>(null);
    const scrollToIngredientSectionBun = () => {
        if (refBun?.current?.scrollIntoView) refBun.current.scrollIntoView({behavior: 'smooth'});
    };
    const scrollToIngredientSectionSauce = () => {
        refSauce?.current?.scrollIntoView({behavior: 'smooth'});
    };
    const scrollToIngredientSectionMain = () => {
        refMain?.current?.scrollIntoView({behavior: 'smooth'});
    };

    const tabsFollow = () => {
        const saucesHeadingBox = refSauce?.current?.getBoundingClientRect();
        const mainHeadingBox = refMain?.current?.getBoundingClientRect();

        if ((saucesHeadingBox?.y) && (mainHeadingBox?.y) && (saucesHeadingBox.y < 275 && mainHeadingBox.y > 275 && currentTab !==
            'sauces')) {
            setCurrentTab('sauce');
        } else if ((mainHeadingBox?.y) && (mainHeadingBox.y < 275 && currentTab !== 'main')) {
            setCurrentTab('main');
        } else if ((saucesHeadingBox?.y) && (saucesHeadingBox.y > 275 && currentTab !== 'buns')) {
            setCurrentTab('buns');
        }

    };

    return (
        <section className={styles.ingredientsSection}>
            <p className="text text_type_main-large pt-10 pb-5">???????????????? ????????????</p>
            <div className={styles.tabs}>
                <Tab value="bun" active={currentTab === 'buns'}
                     onClick={scrollToIngredientSectionBun}>
                    ??????????
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'}
                     onClick={scrollToIngredientSectionSauce}>
                    ??????????
                </Tab>
                <Tab value="main" active={currentTab === 'main'}
                     onClick={scrollToIngredientSectionMain}>
                    ??????????????
                </Tab>
            </div>
            {ingredientsFullList.length > 0 &&
                <ul className={styles.ingredientsList} onScroll={tabsFollow}>
                    <li ref={refBun}
                        className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>??????????
                    </li>
                    {ingredientsFullList.filter(el => el.type === 'bun').map((element: any) => (
                        <li key={element._id}
                            className={`pt-6 pb-10`}
                            data-test={element._id}
                        >
                            <Link
                                to={{
                                    pathname: `/ingredients/${element._id}`,
                                    state: {background: location}
                                }}
                                key={element._id}
                                className={styles.ingredientLink}
                            >
                                <BurgerIngredient image={element.image}
                                                  name={element.name}
                                                  price={element.price} _id={element._id}
                                                  qty={userBurgerIngredients.bun !==
                                                  0 &&
                                                  userBurgerIngredients.bun._id ===
                                                  element._id ? 2 : 0}/>
                            </Link>
                        </li>
                    ))}
                    <li ref={refSauce}
                        className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>??????????
                    </li>
                    {ingredientsFullList.filter(el => el.type === 'sauce').map((element: any) => (
                        <li key={element._id}
                            className={`pt-6 pb-10`}
                            data-test={element._id}>
                            <Link
                                to={{
                                    pathname: `/ingredients/${element._id}`,
                                    state: {background: location}
                                }}
                                key={element._id}
                                className={styles.ingredientLink}
                            >
                                <BurgerIngredient image={element.image}
                                                  name={element.name}
                                                  price={element.price} _id={element._id}
                                                  qty={userBurgerIngredients.filling.filter(
                                                      el => el._id ===
                                                          element._id)?.length}/>
                            </Link>
                        </li>
                    ))}
                    <li ref={refMain}
                        className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>??????????????????????
                    </li>
                    {ingredientsFullList.filter(el => el.type === 'main').map((element: any) => (
                        <li key={element._id}
                            className={`pt-6 pb-10`}
                            data-test={element._id}>
                            <Link
                                to={{
                                    pathname: `/ingredients/${element._id}`,
                                    state: {background: location}
                                }}
                                key={element._id}
                                className={styles.ingredientLink}
                            >
                                <BurgerIngredient image={element.image}
                                                  name={element.name}
                                                  price={element.price} _id={element._id}
                                                  qty={userBurgerIngredients.filling.filter(
                                                      el => el._id ===
                                                          element._id)?.length}/>
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