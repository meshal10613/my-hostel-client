import React from 'react';
import { useRouteError } from 'react-router';
import Error from '/error-page.png';

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error)
    return (
        <div className='border'>
            <img src={Error} alt="" className='border' />
        </div>
    );
};

export default ErrorPage;