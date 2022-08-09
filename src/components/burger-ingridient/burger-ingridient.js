import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngridient extends React.Component {
    render() {
        return (
            <>
                <img src={this.props.image} alt={this.props.name}/>
                <CurrencyIcon/> {this.props.price} {this.props.name}
            </>
        );
    }
}
export default BurgerIngridient;