// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Login from '../components/login';
import Dashboard from '../components/dashboard';
import NotFound from '../components/notfound';
import Register from '../components/register';
import Contacts from '../components/contacts';

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/contacts">
                    <Contacts />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default AppRoutes;
