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

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredientsFullList());
    }, [dispatch]);

    return (
        <>
            <AppHeader/>
            <main className={appStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </>
    );
}