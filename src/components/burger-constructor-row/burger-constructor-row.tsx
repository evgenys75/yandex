import React, {FC} from 'react';
import {
    DragIcon,
    ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../burger-constructor/burger-constructor.module.css';
import {useDispatch} from 'react-redux';
import {useDrop, useDrag} from 'react-dnd';
import {
    CHANGE_POSITION,
} from '../../services/actions/user-burger';
import {TIngredientWithUniqueId} from '../../utils/types';

interface IBurgerConstructorRowProps {
    uuid: string;
    text: string;
    price: number;
    thumbnail: string;

    handleDelete(value: string): void;
}

export const BurgerConstructorRow: FC<IBurgerConstructorRowProps> = ({
                                                                         uuid,
                                                                         text,
                                                                         price,
                                                                         thumbnail,
                                                                         handleDelete
                                                                     }) => {
    const dispatch = useDispatch();
    const [, dragRef] = useDrag({
        type: 'sort',
        item: {uuid},
    });
    const [, dropRef] = useDrop({
        accept: 'sort',
        drop(item: TIngredientWithUniqueId) {
            dispatch({type: CHANGE_POSITION, payload: {from: item.uuid, to: uuid}});
        },
    });
    return (
        <div ref={dropRef}>
            <div className={styles.ingredient} ref={dragRef}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    handleClose={() => handleDelete(uuid)}
                    isLocked={false}
                    text={text}
                    price={price}
                    thumbnail={thumbnail}
                />
            </div>
        </div>
    );
}