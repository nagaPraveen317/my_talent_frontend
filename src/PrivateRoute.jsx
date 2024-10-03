import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from './LoginContext';

const PrivateRoute = ({ element, role, ...rest }) => {
    const { isLoggedIn, user } = useContext(LoginContext);

    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return <Navigate to="/login" />;
    }

    if (role && user.type !== role) {
        // Redirect to the home page if user doesn't have the required role
        return <Navigate to="/home" />;
    }

    return element;
};

export default PrivateRoute;