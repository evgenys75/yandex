import React from 'react';
import {Logo, ListIcon, BurgerIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';

export default function AppHeader() {
    return (
        <header>
            <nav className={headerStyles.nav}>
                <a href={'#constructor'}>
                    <BurgerIcon/>
                    Конструктор
                </a>
                <a href={'#orders'}>
                    <ListIcon/>
                    Лента заказов
                </a>
                <a href={'/'}>
                    <Logo/>
                </a>
                <a href={'#dashboard'}>
                    <ProfileIcon/>
                    Личный кабинет
                </a>
            </nav>
        </header>
    );
}