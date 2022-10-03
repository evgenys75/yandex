import React, {ChangeEvent, FormEvent} from "react";
import {
    Button,
    EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import pageStyle from "./pages.module.css";
import {Link, Redirect} from "react-router-dom";
import {useAuth} from '../services/auth';
import {useState} from 'react';
import {useSelector} from "react-redux";

export function ForgotPasswordPage() {
    const state = useSelector((store:any) => store);
    let auth:any = useAuth();
    const [email, setEmail] = useState('');
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    let forgot =
        (e: FormEvent) => {
            e.preventDefault();
            auth.forgot(email);
        }
    if (state.user.userForgotPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: "/reset-password",
                }}
            />
        );
    }
    return (
        <section className={pageStyle.page}>
            <form onSubmit={forgot}>
                <div className={pageStyle.wrap}>
                    <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                    <div className={`${pageStyle.input} pb-6 pt-6`}>
                        <EmailInput onChange={onChange} value={email} name={'email'}/>
                    </div>
                    <div className="pb-20">
                        <Button>Восстановить</Button>
                    </div>
                    <p className="text text_type_main-small text_color_inactive">
                        Вспомнили пароль?
                        <Link to="/login" className={pageStyle.textLink}>
                            Войти
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    );
}