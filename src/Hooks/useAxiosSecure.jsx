import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: "https://my-hostel-server.onrender.com"
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;