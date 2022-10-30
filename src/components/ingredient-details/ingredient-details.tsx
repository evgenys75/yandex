import React from 'react';
import styles from './ingredient-details.module.css';
import {useSelector} from '../../services/hook'
import {useParams} from "react-router-dom";
import {TIngredient} from '../../utils/types';

export default function IngredientDetails() {

    const id: string = useParams();
    const getID = JSON.parse(JSON.stringify(id));
    const data = useSelector(store => {
        return store.ingredients.ingredientsFullList;
    });
    let {ingredientDetails} = useSelector(store => store.ingredients);
    console.log(id);
    if (id) {
        ingredientDetails = data.find((ingr: TIngredient) => ingr._id === getID.id);
    }
    return (
        <>
            {ingredientDetails != null &&
                <div className={styles.ingredient}>
                    <span
                        className={`pt-10 pl-10 pr-10 text_type_main-large ${styles.infoTitle}`}>Детали ингредиента</span>
                    <span className={'pt-15 pb-15'}><img alt={ingredientDetails.name}
                                                         src={ingredientDetails.image_large}/></span>
                    <span
                        className={'pb-4 pt-2 text text_type_main-medium'}>{ingredientDetails.name}</span>
                    <ul className={`${styles.ingredientInfo} pb-15`}>
                        <li className={'text text_type_main-default text_color_inactive'}>Калории,
                            ккал<br/><span
                                className={'text_type_digits-default'}>{ingredientDetails.calories}</span>
                        </li>
                        <li className={'text text_type_main-default text_color_inactive ml-5'}>Белки,
                            г<br/><span
                                className={'text_type_digits-default'}>{ingredientDetails.proteins}</span>
                        </li>
                        <li className={'text text_type_main-default text_color_inactive ml-5'}>Жиры,
                            г<br/><span
                                className={'text_type_digits-default'}>{ingredientDetails.fat}</span>
                        </li>
                        <li className={'text text_type_main-default text_color_inactive ml-5'}>Углеводы,
                            г<br/><span
                                className={'text_type_digits-default'}>{ingredientDetails.carbohydrates}</span>
                        </li>
                    </ul>
                </div>
            }

        </>
    );
}