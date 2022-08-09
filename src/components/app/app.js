import React from 'react';
import AppHeader from "../appheader/appheader";
import appStyles from "./app.module.css";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

class App extends React.Component {
    render() {
        return (
            <>
                <AppHeader/>
                <main className={appStyles.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            </>
        );
    }
}

export default App;