import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-details.module.css';
import {useParams} from "react-router-dom";
import {useSelector} from '../../services/hook'

export default function FeedDetails() {
    const id: string = useParams();
    const getID = JSON.parse(JSON.stringify(id));
    const data = useSelector(store => {
        return store.ingredients.ingredientsFullList;
    });
    const uniqueIds: Array<string> = [];
    const {ordersFullList} = useSelector(store => store.feed);
    const orderDetails = ordersFullList.find(el => el._id === getID.id);
    let totalPrice:number = 0;
    const unique = orderDetails?.ingredients?.filter(element => {
        totalPrice += data?.filter(ingr => ingr._id === element)[0].price;
        const isDuplicate = uniqueIds.includes(element);
        if (!isDuplicate) {
            uniqueIds.push(element);
            return true;
        }
        return false;
    });

    return (
        <div className={styles.container}>
            <p className={'text text_type_digits-default mt-6'}>#{orderDetails?.number}</p>
            <p className='text text_type_main-medium mt-10'>{orderDetails?.name}</p>
            <p className={`text text_type_main-default mt-3`}>{orderDetails?.status}</p>
            <p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>
            <ul className={styles.ingredients}>
                {unique != null &&
                    unique.map((element, index: number) => (
                        orderDetails?.ingredients?.filter(el => el === element)?.length &&
                        <li className={styles.ingredient} key={index}>
                            <div className={styles.ingredient_preview}>
                                <img
                                    src={data?.find(ingr => ingr._id === element)?.image}
                                    alt={data?.find(ingr => ingr._id === element)?.name}
                                />
                            </div>
                            <p className={`${styles.desc} text text_type_main-default ml-4`}>{data?.find(ingr => ingr._id === element)?.name}</p>
                            <div className={`${styles.price}`}>
                                <p className='text text_type_digits-default mr-2'>{data?.filter(ingr => ingr._id === element)[0].price} x {orderDetails?.ingredients?.filter(el => el === element)?.length}</p>
                                <CurrencyIcon type='primary'/>
                            </div>
                        </li>
                    ))}
            </ul>

            <div className={styles.time_price}>
                <p className='text text_type_main-default text_color_inactive'>
                    {orderDetails?.createdAt}
                </p>
                {totalPrice}
            </div>
        </div>
    );
}
