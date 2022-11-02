import React from 'react';
import doneImg from '../../images/done.png';
import {useSelector} from '../../services/hook'

export default function OrderDetails() {
    const {orderId} = useSelector(store => store.order);
    return (
        <>
            {orderId &&
                <>
                <span
                    className={'pl-30 pr-30 pt-30 pb-8 text text_type_digits-large'}>{orderId}</span>
                    <span
                        className={'text text_type_main-medium'}>идентификатор заказа</span>
                    <span className={'pt-15 pb-15'}><img alt={'Done'} src={doneImg}/></span>
                    <span className={'pb-2 text text_type_main-default'}>Ваш заказ начали готовить</span>
                    <span
                        className={'pb-30 text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</span>
                </>
            }
        </>
    )
}