import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1"
    // baseURL: "https://my-hostel-server.onrender.com"
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;