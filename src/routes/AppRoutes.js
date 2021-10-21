// Dependencies
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Context
import AuthProvider, { AuthContext } from '../context/auth';

// Components
import Login from '../components/login/Login';
import Dashboard from '../components/dashboard/Dashboard';
import NotFound from '../components/notfound';

const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <PrivateRoute exact={true} path="/">
                        <Dashboard />
                    </PrivateRoute>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes;
