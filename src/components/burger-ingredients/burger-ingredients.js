import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {burgerIngridientsArray} from '../utils/data';
import BurgerIngridient from '../burger-ingridient/burger-ingridient'
import styles from "./burger-ingridient.module.css";
import Modal from '../modal/modal';

export default function BurgerIngredients() {
    const [info, setIsOpen] = useState(false);
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
            <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>
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
                <li ref={refBun} className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>Булки</li>
                {burgerIngridientsArray.filter(el => el.type === 'bun').map((element, index) => (
                    <li key={element._id} className={`pt-6 pb-10 ${styles.ingredient}`}
                        onClick={() => setIsOpen(element)}>
                        <BurgerIngridient image={element.image} name={element.name}
                                          price={element.price}/>
                    </li>
                ))}
                <li ref={refSauce} className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>Соусы</li>
                {burgerIngridientsArray.filter(el => el.type === 'sauce').map((element, index) => (
                    <li key={element._id} className={`pt-6 pb-10 ${styles.ingredient}`}
                        onClick={() => setIsOpen(element)}>
                        <BurgerIngridient key={index} image={element.image} name={element.name}
                                          price={element.price}/>
                    </li>
                ))}
                <li ref={refMain} className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>Ингридиенты</li>
                {burgerIngridientsArray.filter(el => el.type === 'main').map((element, index) => (
                    <li key={element._id} className={`pt-6 pb-10 ${styles.ingredient}`}
                        onClick={() => setIsOpen(element)}>
                        <BurgerIngridient key={index} image={element.image} name={element.name}
                                          price={element.price}/>
                    </li>
                ))}
            </ul>
            <Modal isOpen={info} setIsOpen={setIsOpen}>
                <span className={`pt-10 pl-10 pr-10 text_type_main-large ${styles.infoTitle}`}>Детали ингедиента</span>
                <span className={"pt-15 pb-15"}><img alt={info.name} src={info.image_large}/></span>
                <span className={"pb-4 pt-2 text text_type_main-medium"}>{info.name}</span>
                <ul className={`${styles.ingredientInfo} pb-15`}>
                    <li className={"text text_type_main-default text_color_inactive"}>Калории, ккал<br/><span
                        className={"text_type_digits-default"}>{info.calories}</span></li>
                    <li className={"text text_type_main-default text_color_inactive ml-5"}>Белки, г<br/><span
                        className={"text_type_digits-default"}>{info.proteins}</span></li>
                    <li className={"text text_type_main-default text_color_inactive ml-5"}>Жиры, г<br/><span
                        className={"text_type_digits-default"}>{info.fat}</span></li>
                    <li className={"text text_type_main-default text_color_inactive ml-5"}>Углеводы, г<br/><span
                        className={"text_type_digits-default"}>{info.carbohydrates}</span></li>
                </ul>
            </Modal>
        </section>
    );
}