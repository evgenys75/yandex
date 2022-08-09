import React from 'react';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
    render() {
        return (
            <section style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/meat-01.png'}
                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={'https://code.s3.yandex.net/react/code/meat-01.png'}
                />
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/meat-01.png'}
                />
                <div>
                    100 <CurrencyIcon/>
                    <Button>
                        Оформить заказ
                    </Button>
                </div>
            </section>
        );
    }
}

export default BurgerConstructor;