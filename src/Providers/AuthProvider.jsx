import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase-init';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    const registerUser = (email, password) => {
        setLoading(true);
        return sign
        ltw1
        
    };

    const authData = {
        user,
        setUser,
        loading,
        setLoading,
        loginUser
    };

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;