import React from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getIngredientsFullList} from '../../services/actions/ingredients';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Switch, Route, useHistory, useLocation} from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details"
import Modal from "../modal/modal";
import {
    ProfilePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage
} from '../../pages';
import {ProtectedRoute} from '../protected-route/protected-route';

export default function App() {
    const location = useLocation();

    const background = location.state && location.state.background;
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(history.length);
    useEffect(() => {
        dispatch(getIngredientsFullList());
    }, [dispatch]);

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
            </Switch>
            {background && <Modal
                onClose={() => {
                    closeModal();
                }}
            >
                <Route path="/ingredients/:id" exact={true}>
                    <IngredientDetails/>
                </Route>
            </Modal>}
        </>);
}