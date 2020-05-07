import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from "./homepage";
import LoginPage from './login'
import RegisterPage from './register';

const App = (props) => {
    const {userID, loggedIn, loginAction, logoutAction, userInfo} = props;
    const aboutAccount = {userID, loggedIn, loginAction, logoutAction};
    const aboutUser = {userInfo};
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/login"}>
                    <LoginPage loginAction={loginAction}/>
                </Route>
                <Route path={"/register"}>
                    <RegisterPage loginAction={loginAction}/>
                </Route>
                <Route path={"/"}>
                    <HomePage aboutAccount={aboutAccount} aboutUser={aboutUser}/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;