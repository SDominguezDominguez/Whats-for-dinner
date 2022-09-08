import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import tokenValidity from "../helpers/tokenValidity";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token && tokenValidity(token)) {
            getData();
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(token) {
        localStorage.setItem("token", token);
        getData();
    }

    function logout() {
        localStorage.clear();

        toggleIsAuth({
            isAuth: false,
            user: null,
            status: "done",
        });

        history("/");
    }

    async function getData() {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);

        try {
            const userData = await axios.get("https://frontend-educational-backend.herokuapp.com/api/user", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            toggleIsAuth({
                ...auth,
                isAuth: true,
                user: {
                    email: userData.data.email,
                    username: decodedToken.sub,
                },
                status: "done",
            });
            history("/profile");

        } catch (e) {
            console.error(e);

            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;