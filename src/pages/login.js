import React, {useCallback, useState} from 'react';
import {
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Redirect, Link} from 'react-router-dom';
import loginStyle from "./login.module.css";
import {useAuth} from '../services/auth';

export function LoginPage() {
    let auth = useAuth();
    const [value, setValue] = useState("");
    const onChange = (e) => {
        setValue(e.target.value);
    };
    const [valuePassword, setValuePassword] = useState("");
    const onChangePassword = (e) => {
        setValuePassword(e.target.value);
    };
    const loginHandler = useCallback(
        (e) => {
            e.preventDefault();
            auth.signIn(value, valuePassword);
        },
        [auth, value, valuePassword]
    );

    if (auth.user.userAuth) {
        return <Redirect to="/"/>;
    }

    return (
        <section className={loginStyle.main}>
            <form className={loginStyle.form} onSubmit={loginHandler}>
                <h1 className="pb-6 text text_type_main-medium">Вход</h1>
                <div className={"pb-6"}>
                    <EmailInput placeholder="Email" name="email" value={value} onChange={onChange}/>
                </div>
                <div className={"pb-6"}>
                    <PasswordInput
                        placeholder="Password"
                        name="password"
                        value={valuePassword}
                        onChange={onChangePassword}
                    />
                </div>
                <div className="pb-20 text">
                    <Button>Войти</Button>
                </div>
                <div className={`pb-4 ${loginStyle.content}`}>
                    <p
                        className={`text text_type_main-small text_color_inactive ${loginStyle.text}`}
                    >
                        Вы - новый пользователь?
                    </p>
                    <Link
                        to="/register"
                        className={`text text_type_main-small ${loginStyle.textLink}`}
                    >
                        Зарегистрироваться
                    </Link>
                </div>
                <div className={loginStyle.content}>
                    <p
                        className={`text text_type_main-small text_color_inactive ${loginStyle.text}`}
                    >
                        Забыли пароль?
                    </p>
                    <Link
                        to="/forgot-password"
                        className={`text text_type_main-small ${loginStyle.textLink}`}>Восстановить пароль
                    </Link>
                </div>
            </form>
        </section>
    )
        ;
}
