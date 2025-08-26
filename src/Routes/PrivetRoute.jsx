import React from 'react';
import useAuthContext from '../Hooks/useAuthContext';
import Loading from '../Components/Shared/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();
    console.log(location)

    if(loading){
        return <Loading/>;
    }else if(user){
        return children;
    }else{
        <Navigate to="/auth"/>
    };
};

export default PrivetRoute;