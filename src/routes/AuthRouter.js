// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import RecoverPassword from '../components/recover/RecoverPassword';

export const AuthRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/auth/login" component={Login} />
                <Route exact path="/auth/register" component={Register} />
                <Route exact path="/auth/recover-password" component={RecoverPassword} />
            </Switch>
        </div>
    );
};
