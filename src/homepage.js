import React from "react";
import MenuBar from "./MenuBar";
import {Route, Switch} from "react-router";
import UserInfo from "./userpage";

const HomePage = ({aboutAccount, aboutUser}) => {
    const {userID, loggedIn, loginAction, logoutAction} = aboutAccount;
    return (
        <div>
            <MenuBar userID={userID} loggedIn={loggedIn} loginAction={loginAction} logoutAction={logoutAction}/>
            <Switch>
                <Route path={'/'} exact><h1>hi1</h1></Route>
                <Route path={'/user'} exact><UserInfo userID={userID}/></Route>
            </Switch>
        </div>
    )
};

export default HomePage;