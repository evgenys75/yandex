import React, {useState} from 'react';
import {
    Logo,
    ListIcon,
    BurgerIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';
import {Link} from "react-router-dom";

interface ILinkState {
    burger: boolean,
    feed: boolean,
    profile: boolean,
}
export default function AppHeader() {
    const [linkState, setLinkState] = useState<ILinkState>({burger: true, feed: false, profile: false});
    const onClick = (elem: String) => {
        elem === "burger"
            ? setLinkState({burger: true, feed: false, profile: false})
            : elem === "feed"
                ? setLinkState({burger: false, feed: true, profile: false})
                : setLinkState({burger: false, feed: false, profile: true});
    };
    return (
        <header className={`p-4 ${headerStyles.header}`}>
            <nav className={headerStyles.nav}>
                <span className={headerStyles.leftMenu}>
                <Link
                    to="/"
                    className={`text text_type_main-default ${
                        linkState.burger ? headerStyles.link_active : headerStyles.link
                    }`}
                    onClick={() => onClick("burger")}
                >
                    <BurgerIcon type={linkState.burger ? "primary" : "secondary"}/>
                    <span
                        className={'text text_type_main-default pl-2 pr-4'}>Конструктор</span>
                </Link>
                <Link to={'/feed'}>
                    <ListIcon type="secondary"/>
                    <span
                        className={'text text_type_main-default text_color_inactive pl-2 pr-4'}>Лента заказов</span>
                </Link>
                </span>
                <Link
                    to="/"
                >
                    <Logo/>
                </Link>
                <Link
                    to="/profile"
                    className={linkState.profile ? headerStyles.link_active : headerStyles.link}
                    onClick={() => onClick('')}
                >
                    <ProfileIcon type={linkState.profile ? "primary" : "secondary"}/>
                    <span
                        className={'text text_type_main-default pl-2 pr-4'}>Личный кабинет</span>
                </Link>
            </nav>
        </header>
    );
}