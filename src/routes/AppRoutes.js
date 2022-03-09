// Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Context
import { AuthContext } from '../context/auth';

// Components
import Dashboard from '../components/dashboard/Dashboard';
import NotFound from '../components/notfound/NotFound';

// Routes
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthRouter } from './AuthRouter';

const AppRoutes = () => {
    const { rehydrate, isAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            rehydrate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [setLoading]);

    if (loading) {
        return (
            <div className="preloader-container">
                <div className="preloader"></div>
            </div>
        );
    }

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
