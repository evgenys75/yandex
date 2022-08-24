import React, {useContext, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngridient from '../burger-ingridient/burger-ingridient'
import styles from "./burger-ingridient.module.css";
import IngredientDetails from '../ingredient-details/ingredient-details'
import {BurgerContext} from '../../services/burger-context';
import Modal from '../modal/modal';

export default function BurgerIngredients(props) {
    const ingredients = useContext(BurgerContext).ingredientsFullList;
    const [state, setIsOpen] = useState({
        isOpen: false,
        info: []
    });
    const handleCloseModal = () => {
        setIsOpen(false);
    }
    const scrollToIngredientSectionBun = () => {
        refBun.current.scrollIntoView({behavior: "smooth"});
    };
    const scrollToIngredientSectionSauce = () => {
        refSauce.current.scrollIntoView({behavior: "smooth"});
    };
    const scrollToIngredientSectionMain = () => {
        refMain.current.scrollIntoView({behavior: "smooth"});
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
                {ingredients.filter(el => el.type === 'bun').map((element, index) => (
                    <li key={element._id} className={`pt-6 pb-10 ${styles.ingredient}`}
                        onClick={() => setIsOpen({isOpen: true, info: element})}>
                        <BurgerIngridient image={element.image} name={element.name}
                                          price={element.price}/>
                    </li>
                ))}
                <li ref={refSauce} className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>Соусы</li>
                {ingredients.filter(el => el.type === 'sauce').map((element, index) => (
                    <li key={element._id} className={`pt-6 pb-10 ${styles.ingredient}`}
                        onClick={() => setIsOpen({isOpen: true, info: element})}>
                        <BurgerIngridient image={element.image} name={element.name}
                                          price={element.price}/>
                    </li>
                ))}
                <li ref={refMain} className={`${styles.sectionTitle} p-10 text text_type_main-medium`}>Ингридиенты
                </li>
                {ingredients.filter(el => el.type === 'main').map((element, index) => (
                    <li key={element._id} className={`pt-6 pb-10 ${styles.ingredient}`}
                        onClick={() => setIsOpen({isOpen: true, info: element})}>
                        <BurgerIngridient image={element.image} name={element.name}
                                          price={element.price}/>
                    </li>
                ))}
            </ul>
            {state.isOpen &&
                <Modal onClose={handleCloseModal}>
                    <IngredientDetails info={state.info}/>
                </Modal>
            }
        </section>
    );
}