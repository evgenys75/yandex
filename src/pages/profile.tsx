import React, {useState, useCallback} from "react";
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyle from "./pages.module.css";
import profileStyle from "./profile.module.css";
import {Switch, Route, useHistory} from "react-router-dom";
import {useAuth} from '../services/auth';
import {useDispatch} from '../services/hook';
import {useSelector} from '../services/hook';
import {updateUserProfile} from "../services/actions/user";
import {FeedPage} from "./feed";

export function ProfilePage() {
    const auth: any = useAuth();
    const logout = useCallback(
        (e) => {
            e.preventDefault();
            auth.signOut(localStorage.getItem("refreshToken"));
        },
        [auth]
    );
    const history = useHistory();
    const orders = () => {
        history.push("/profile/orders");
    };
    const profile = () => {
        history.push("/profile");
    };
    return (

        <section className={pagesStyle.page}>
            <div className={profileStyle.wrap}>
                <div className={profileStyle.main}>
                    <nav className={`pr-30 ${profileStyle.nav}`}>
                        <ul className={profileStyle.navList}>
                            <li
                                className={`text text_type_main-medium`}>
                <span onClick={profile} style={{cursor: "pointer"}}>
                  Профиль
                </span>
                            </li>
                            <li className={`text text_type_main-medium`}>
                <span
                    onClick={orders}
                    style={{cursor: "pointer"}}
                >
                  История Заказов
                </span>
                            </li>
                            <li
                                className={`text text_type_main-medium text_color_inactive ${profileStyle.navItem}`}
                            >
                <span onClick={logout} style={{cursor: "pointer"}}>
                  Выход
                </span>
                            </li>
                            <li className="pt-20 text text_type_main-small text_color_inactive">
                                В этом разделе вы можете изменить свои персональные данные
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path='/profile/orders' exact={true}>
                            <FeedPage/>
                        </Route>
                        <Route path="/profile" exact={true}>
                            <ProfileSection/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </section>
    );
}

function ProfileSection() {
    const dispatch = useDispatch();
    const state = useSelector(store => store);
    const userProfile = state.user.userAuthProfile;
    React.useEffect(() => {
        setName(userProfile.name);
        setEmail(userProfile.email);
    }, []);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function updateProfile(e: { preventDefault: () => void; }) {
        e.preventDefault();
        dispatch(updateUserProfile(email, password, name));
    }

    function resetProfile() {
        setName(state.user.userAuthProfile.name);
        setEmail(state.user.userAuthProfile.email);
        //setPassword(state.user.userAuthProfile.password);
    }

    return (
        <form onSubmit={updateProfile}>
            <div className={profileStyle.userProfile}>
                <div className={pagesStyle.input}>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type={"text"}
                        placeholder={"Имя"}
                        icon={"EditIcon"}
                        name={"name"}
                        size={"default"}
                    />
                </div>
                <div className={`${pagesStyle.input} pt-6 pb-6`}>
                    <EmailInput
                        onChange={(e) => setEmail(e.target.value)}
                        name={"email"}
                        value={email}
                    />
                </div>
                <div className={`${pagesStyle.input}`}>
                    <PasswordInput
                        name={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={`${profileStyle.buttons} pt-10`}>
                    <Button htmlType={"button"}>Сохранить</Button>
                    <Button htmlType={"button"} onClick={resetProfile}>Отмена</Button>
                </div>
            </div>
        </form>
    );
}