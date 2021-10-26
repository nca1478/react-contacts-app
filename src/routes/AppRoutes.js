// Dependencies
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Context
import { AuthContext } from '../context/auth';

// Components
import Dashboard from '../components/dashboard/Dashboard';
import NotFound from '../components/notfound';

// Routes
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthRouter } from './AuthRouter';

const AppRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Router>
            <Switch>
                <PrivateRoute
                    exact={true}
                    path="/"
                    component={Dashboard}
                    isAuthenticated={isAuthenticated}
                />
                <PublicRoute
                    path="/auth"
                    component={AuthRouter}
                    isAuthenticated={isAuthenticated}
                />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default AppRoutes;
