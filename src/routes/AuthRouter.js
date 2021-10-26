// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Login from '../components/login/Login';
import Register from '../components/register/Register';

export const AuthRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/auth/login" component={Login} />
                <Route exact path="/auth/register" component={Register} />
            </Switch>
        </div>
    );
};
