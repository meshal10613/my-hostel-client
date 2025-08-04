import React from 'react';
import { Link, useRouteError } from 'react-router';
import Error from '/error-page.png';
import { IoArrowUndo } from 'react-icons/io5';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='flex flex-col items-center justify-center gap-0'>
            <img src={Error} alt="" className='w-fit' />
            <p className='text-red-500'>{error.data}</p>
            <Link to="/" className='btn bg-primary text-white'><IoArrowUndo />Back to Home</Link>
        </div>
    );
};

export default ErrorPage;