import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import useAuthContext from "./useAuthContext";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    // baseURL: "https://my-hostel-server.onrender.com/api/v1"
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut, setUser, setDatabaseUser } = useAuthContext();

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("food-wagon-token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }),
        (error) => {
            return Promise.reject(error);
        };

    axiosSecure.interceptors.response.use(
        (res) => {
            return res;
        },
        (error) => {
            const status = error.status;
            if (status === 403) {
                navigate("/forbidden");
                setUser(null);
                setDatabaseUser(null);
            } else if (status === 401) {
                logOut()
                    .then(() => {
                        navigate("/login");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
