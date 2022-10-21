import React from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import FeedDetails from '../feed-details/feed-details'
import {useEffect} from 'react';
import {useDispatch} from '../../services/hook';
import {getIngredientsFullList} from '../../services/actions/ingredients';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Switch, Route, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details"
import {Modal} from "../modal/modal";
import {
    ProfilePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, FeedPage
} from '../../pages';
import {ProtectedRoute} from '../protected-route/protected-route';
import {getCookie} from "../../utils/utils";
import {wsConnectionStartAction} from "../../services/actions/feed";
import {WS_URL, WS_URL_ALL} from "../../utils/data";


export default function App() {
    type TLocation = {
        background: {
            pathname: string;
            search: string;
            hash: string;
            state: null;
            key: string;
        }
        from: string;
        state?: object;
    };
    const location = useLocation<TLocation>();
    const background = location.state && location.state.background;
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getIngredientsFullList());
    }, []);

    function closeModal() {
        history.goBack();
    }



    return (<>
        <AppHeader/>

        <Switch location={background || location}>
            <Route path="/login" exact={true}>
                <LoginPage/>
            </Route>
            <Route path="/register" exact={true}>
                <RegisterPage/>
            </Route>
            <Route path="/forgot-password" exact={true}>
                <ForgotPasswordPage/>
            </Route>
            <Route path="/reset-password" exact={true}>
                <ResetPasswordPage/>
            </Route>
            <ProtectedRoute path="/profile">
                <ProfilePage/>
            </ProtectedRoute>
            <Route path="/" exact={true}>
                <main className={appStyles.main}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </main>
            </Route>
            <Route path="/ingredients/:id" exact={true}>
                <IngredientDetails/>
            </Route>

            <Route path='/ingredients/:id'>

            </Route>

            <Route path='/feed' exact={true}>
                <FeedPage/>
            </Route>
            <Route path='/feed/:id' exact={true}>
                <FeedDetails/>
            </Route>
        </Switch>
        {background && (
            <Route path='/feed/:id'>
                <Modal
                    onClose={() => {
                        closeModal();
                    }}
                >
                    <FeedDetails/>
                </Modal>
            </Route>
        )}
        {background && (
            <Route path="/ingredients/:id" exact={true}>
                <Modal
                    onClose={() => {
                        closeModal();
                    }}
                >
                    <IngredientDetails/>
                </Modal>
            </Route>
        )}

    </>);
}