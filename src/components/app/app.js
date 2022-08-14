import React from 'react';
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {useState, useEffect} from "react";
import {apiEndPoint} from '../../utils/data';

export default function App() {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    })

    useEffect(() => {
        const getIngredients = async () => {
            setState({isLoading: true, hasError: false, data: []});
            fetch(apiEndPoint).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Can't get ingredients");
                }
            }).then((data) => {
                setState({isLoading: false, hasError: false, data: data.data});
            }).catch((error) => {
                setState({isLoading: false, hasError: true, data: []});
            })
        }
        getIngredients();
    }, [])
    return (
        <>
            <AppHeader/>
            {state.isLoading && 'Loading...'}
            {state.hasError && 'Error'}
            {!state.isLoading &&
                !state.hasError &&
                state.data.length &&
                <main className={appStyles.main}>
                    <BurgerIngredients ingredients={state.data}/>
                    <BurgerConstructor/>
                </main>
            }
        </>
    );
}