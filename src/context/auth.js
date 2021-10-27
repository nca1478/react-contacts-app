// Dependencies
import React, { useState } from 'react';

// Utils
import { getItem, setItem, removeItem, keyLocalStorage } from '../config/localStorage';

export const AuthContext = React.createContext();

const isValidToken = () => {
    const token = getItem(keyLocalStorage);
    // JWT decode & check token validity & expiration.
    if (token) return true;
    return false;
};

const AuthProvider = (props) => {
    const [isAuthenticated, makeAuthenticated] = useState(isValidToken());
    const [user, setUser] = useState({});

    function rehydrate() {
        const dataUser = JSON.parse(getItem(keyLocalStorage));
        if (dataUser) {
            setUser({ ...user, auth: { user: dataUser } });
        }
    }

    function authenticate(dataUser, cb) {
        setUser({ ...user, auth: { user: dataUser } });
        makeAuthenticated(true);
        setItem(keyLocalStorage, JSON.stringify(dataUser));
    }

    function signout(cb) {
        setUser({});
        makeAuthenticated(false);
        removeItem(keyLocalStorage);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                signout,
                user,
                rehydrate,
            }}
        >
            <>{props.children}</>
        </AuthContext.Provider>
    );
};

export default AuthProvider;
