import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {burgerIngridientsArray} from '../utils/data';
import BurgerIngridient from '../burger-ingridient/burger-ingridient'
import styles from "./burger-ingridient.module.css";

export default function BurgerIngredients() {
    const scrollToIngredientSectionBun = () => {
        refBun.current.scrollIntoView();
    };
    const scrollToIngredientSectionSauce = () => {
        refSauce.current.scrollIntoView();
    };
    const scrollToIngredientSectionMain = () => {
        refMain.current.scrollIntoView();
    };
    const refBun = React.useRef();
    const refSauce = React.useRef();
    const refMain = React.useRef();

    return (
        <section className={styles.ingredientsSection}>
            <h1>Соберите бургер</h1>
            <div className={styles.tabs}>
                <Tab value="bun" active="true" onClick={scrollToIngredientSectionBun}>
                    Булки
                </Tab>
                <Tab value="sauce" onClick={scrollToIngredientSectionSauce}>
                    Соусы
                </Tab>
                <Tab value="main" onClick={scrollToIngredientSectionMain}>
                    Начинка
                </Tab>
            </div>
            <ul className={styles.ingredientsList}>
                <li ref={refBun} className={`${styles.sectionTitle} p-5`}>Булки</li>
                {burgerIngridientsArray.filter(el => el.type === 'bun').map((element, index) => (
                    <li key={element._id}>
                        <BurgerIngridient image={element.image} name={element.name}
                                          price={element.price}/>
                    </li>
                ))}
                <li ref={refSauce} className={`${styles.sectionTitle} p-5`}>Соусы</li>
                {burgerIngridientsArray.filter(el => el.type === 'sauce').map((element, index) => (
                    <li key={element._id}>
                        <BurgerIngridient key={index} image={element.image} name={element.name}
                                          price={element.price}/>
                    </li>
                ))}
                <li ref={refMain} className={`${styles.sectionTitle} p-5`}>Ингридиенты</li>
                {burgerIngridientsArray.filter(el => el.type === 'main').map((element, index) => (
                    <li key={element._id}>
                        <BurgerIngridient key={index} image={element.image} name={element.name}
                                          price={element.price}/>
                    </li>
                ))}
            </ul>
        </section>
    );
}