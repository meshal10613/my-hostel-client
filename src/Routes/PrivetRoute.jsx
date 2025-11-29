import React from 'react';
import useAuthContext from '../Hooks/useAuthContext';
import Loading from '../Components/Shared/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default PrivetRoute;