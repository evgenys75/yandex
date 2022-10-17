import React, {ChangeEvent} from "react";
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import pagesStyle from "./pages.module.css";
import {useAuth} from '../services/auth';
import {Redirect} from "react-router-dom";

export function RegisterPage() {
    let auth:any = useAuth();
    const [valueName, setValueName] = React.useState("");
    const [valuePassword, setValuePassword] = React.useState("");
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setValuePassword(e.target.value);
    };
    const [valueEmail, setValueEmail] = React.useState("");
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setValueEmail(e.target.value);
    };

    if (auth.user.userAuth) {
        return <Redirect to="/"/>;
    }

    return (
        <section className={pagesStyle.page}>
            <form>
                <div className={pagesStyle.wrap}>
                    <p className="text text_type_main-medium">Регистрация</p>
                    <div className={`${pagesStyle.input} pb-6 pt-6`}>
                        <Input
                            type="text"
                            placeholder="Имя"
                            onChange={(e) => setValueName(e.target.value)}
                            value={valueName}
                        />
                    </div>
                    <div className={`${pagesStyle.input} pb-6`}>
                        <EmailInput
                            onChange={onChangeEmail}
                            value={valueEmail}
                            name={"email"}
                        />
                    </div>
                    <div className={`${pagesStyle.input}`}>
                        <PasswordInput
                            onChange={onChangePassword}
                            value={valuePassword}
                            name={"password"}
                        />
                    </div>
                    <div className="pb-20 pt-6">
                        <Button htmlType={"button"} type="primary" size="medium">
                            Зарегистрироваться
                        </Button>
                    </div>
                    <p className="text text_type_main-small text_color_inactive">
                        Уже зарегистрированы?
                        <Link to="/login" className={pagesStyle.textLink}>
                            Войти
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    );
}