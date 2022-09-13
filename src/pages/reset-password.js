import React from "react";
import {
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyle from "./pages.module.css";
import {Link, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAuth} from '../services/auth';

export function ResetPasswordPage() {
    const state = useSelector((store) => store);
    let auth = useAuth();
    const [pass, setValuePass] = React.useState("");
    const [token, setValueToken] = React.useState("");

    let reset =
        e => {
            e.preventDefault();
            auth.reset(pass, token);
        }

    if (!state.user.userForgotPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: "/forgot-password",
                }}
            />
        );
    }

    return (
        <section className={pagesStyle.page}>
            <form onSubmit={reset}>
                <div className={pagesStyle.wrap}>
                    <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                    <div className={`${pagesStyle.input} pb-6 pt-6`}>
                        <PasswordInput
                            value={pass}
                            onChange={(e) => setValuePass(e.target.value)}
                        />
                    </div>
                    <div className={`${pagesStyle.input}`}>
                        <Input
                            placeholder="Введите код из письма"
                            value={token}
                            onChange={(e) => setValueToken(e.target.value)}
                        />
                    </div>
                    <div className="pb-20 pt-6">
                        <Button>Сохранить</Button>
                    </div>
                    <p className="text text_type_main-small text_color_inactive">
                        Вспомнили пароль?
                        <Link to="/login" className={pagesStyle.textLink}>
                            Войти
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    );
}