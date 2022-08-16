import React from 'react';
import {Logo, ListIcon, BurgerIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';

export default function AppHeader() {
    return (
        <header className={`p-4 ${headerStyles.header}`}>
            <nav className={headerStyles.nav}>
                <span className={headerStyles.leftMenu}>
                <a href={'#constructor'}>
                    <BurgerIcon type="primary"/>
                    <span className={"text text_type_main-default pl-2 pr-4"}>Конструктор</span>
                </a>
                <a href={'#orders'}>
                    <ListIcon type="secondary"/>
                    <span className={"text text_type_main-default text_color_inactive pl-2 pr-4"}>Лента заказов</span>
                </a>
                </span>
                <a href={'/'}>
                    <Logo/>
                </a>
                <a href={'#dashboard'}>
                    <ProfileIcon type="secondary"/>
                    <span className={"text text_type_main-default text_color_inactive pl-2 pr-4"}>Личный кабинет</span>
                </a>
            </nav>
        </header>
    );
}