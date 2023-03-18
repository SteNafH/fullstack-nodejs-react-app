import React from 'react';
import { useAuth } from '../hooks';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;
