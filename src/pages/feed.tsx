import React, {FC} from "react";
import {Link, useLocation, useRouteMatch} from 'react-router-dom';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import feedStyle from "./feed.module.css";
import {TOrder} from '../utils/types';
import {useSelector} from '../services/hook'

function OrderCardPrice(orderId: any) {
    const getID = JSON.parse(JSON.stringify(orderId));
    const {ordersFullList} = useSelector(store => store.feed);
    const data = useSelector(store => {
        return store.ingredients.ingredientsFullList;
    });
    let total: any = 0;
    let ingredients = ordersFullList?.find(order => order._id === getID.orderId)?.ingredients;
    ingredients?.map((element: string) => {
        total += data?.find(ingredient => ingredient._id === element)?.price;
    })

    return (
        <>
            {total}
        </>
    );
}

export const FeedPage: FC = () => {

    const {ordersFullList, doneAllTime, doneToday} = useSelector(store => store.feed);
    const location = useLocation();
    const isUserOrder = useRouteMatch({path: '/profile/orders'});
    const data = useSelector(store => {
        return store.ingredients.ingredientsFullList;
    });
    let totalPrice: number = 0;
    return (
        <>
            <h1 className={`text text_type_main-large mt-10 mb-5 pl-5`}>
                Лента заказов
            </h1>
            <section className={feedStyle.section}>
                <div className={feedStyle.column}>
                    <ul className={feedStyle.list}>
                        {ordersFullList?.map((element: TOrder) => (
                            <li className={feedStyle.item} key={element._id}>
                                <Link to={{pathname: `/feed/${element._id}`, state: {background: location}}}>
                                    <div className={feedStyle.card}>
                                        <div className={feedStyle.info}>
                                            <p className={`text text_type_digits-default pb-6`}>
                                                #{element.number}
                                            </p>
                                            <p className='text text_type_main-default text_color_inactive'>
                                                {element.createdAt}
                                            </p>
                                        </div>
                                        <p className={`${feedStyle.white} text text_type_main-medium pr-6 pl-6`}>{element.name}</p>
                                        <div className={feedStyle.info}>
                                            <ul className={feedStyle.ingredients}>
                                                <li className={feedStyle.ingredient}>
                                                    <div className={feedStyle.ingredient_preview}>
                                                        {element.ingredients?.map((element: string) => (
                                                            <img
                                                                src={data?.find(ingr => ingr._id === element)?.image}
                                                                alt={data?.find(ingr => ingr._id === element)?.name}
                                                            />
                                                        ))}
                                                    </div>
                                                </li>
                                            </ul>

                                            <div className={`${feedStyle.card} ${feedStyle.total}`}>
                                                <p className='text text_type_digits-default mr-2'>
                                                    <OrderCardPrice orderId={element._id}/>
                                                </p>
                                                <CurrencyIcon type='primary'/>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                        }
                    </ul>
                </div>
                {!isUserOrder &&
                    <div className={feedStyle.ordercolumn}>
                        <div className={feedStyle.boards}>
                            <div className={feedStyle.board}>
                                <p className='text text_type_main-medium mb-4'>Готовы:</p>

                                <ul className={`${feedStyle.orderlist} ${feedStyle.done}`}>
                                    {ordersFullList?.filter(
                                        (el: TOrder) => el.status ===
                                            'done').map((element) => (
                                        <li className={'text text_type_digits-default'} key={element._id}>
                                            {element.number}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={feedStyle.board}>
                                <p className='text text_type_main-medium mb-4'>В работе:</p>
                                <ul className={feedStyle.orderlist}>
                                    {ordersFullList.filter(
                                        (el: TOrder) => el.status !==
                                            'done').map((element) => (
                                        <li className={'text text_type_digits-default'}>
                                            {element.number}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
                        <p className={`${feedStyle.ts} text text_type_digits-large`}>{doneAllTime}</p>
                        <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
                        <p className={`${feedStyle.ts} text text_type_digits-large`}>{doneToday}</p>
                    </div>
                }
            </section>
        </>
    );
};