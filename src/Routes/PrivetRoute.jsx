import React from 'react';
import useAuthContext from '../Hooks/useAuthContext';
import Loading from '../Components/Shared/Loading';
import { Navigate } from 'react-router';

const PrivetRoute = ({children}) => {
    const { user, loading } = useAuthContext();

    if(loading){
        return <Loading/>;
    }else if(user){
        return children;
    }else{
        <Navigate to="/auth"/>
    };
};

export default PrivetRoute;