import React from 'react';
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

export default function BurgerConstructorRow(props) {
    const dispatch = useDispatch();
    const id = props.id;
    const [, dragRef] = useDrag({
        type: 'sort',
        item: {id},
    });
    const [, dropRef] = useDrop({
        accept: 'sort',
        drop(item) {
            dispatch({type: CHANGE_POSITION, payload: {itemId: item}});
        },
    });
    return (
        <div ref={dropRef}>
            <div className={styles.ingredient} ref={dragRef}>
                <DragIcon/>
                <ConstructorElement
                    handleClose={() => props.handleDelete(props.id)}
                    isLocked={false}
                    text={props.text}
                    price={props.price}
                    thumbnail={props.thumbnail}
                />
            </div>
        </div>
    );
}