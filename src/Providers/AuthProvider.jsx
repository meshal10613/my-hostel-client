import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase-init";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateProfile,
} from "firebase/auth";
import useAxios from "../Hooks/useAxios";

const AuthProvider = ({ children }) => {
    const axios = useAxios();
    const [user, setUser] = useState(null);
    const [databaseUser, setDatabaseUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState({});
    const [search, setSearch] = useState(""); //? meals page and banner search

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem("food-wagon-token");
        return signOut(auth);
    };

    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    };

    const updateUserPassword = (password) => {
        return updatePassword(user, password);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser?.email) {
                const userData = { email: currentUser.email };
                const res = await axios.post("/users/jwt", userData);
                setDatabaseUser(res.data.user);
                localStorage.setItem("food-wagon-token", res.data.token);
            } else {
                localStorage.removeItem("food-wagon-token");
            }
        });

        return () => {
            unsubscribe();
        };
    }, [axios]);

    const authData = {
        user,
        setUser,
        databaseUser,
        setDatabaseUser,
        loading,
        setLoading,
        search,
        setSearch,
        paymentInfo,
        setPaymentInfo,
        loginUser,
        registerUser,
        logOut,
        updateUserProfile,
        updateUserPassword,
    };

    return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
