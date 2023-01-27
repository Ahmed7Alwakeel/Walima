import React, { useEffect, useState, useContext } from "react";
import Router from "next/router";
import { API_URL } from "../api_baseURL"
import axios from "axios";
import Cookie from "js-cookie";
import { useFavorite } from "./favoriteContext";

const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}
export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState()
    useEffect(() => {
        Cookie.get("token") ? setIsAuthenticated(true) : setIsAuthenticated(false)
    },[])
    const signUp = (values) => {

        if (typeof window === "undefined") {
            return;
        }
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}/auth/local/register`, values)
                .then((res) => {
                    setIsAuthenticated(true)
                    Cookie.set("token", res.data.jwt);

                    resolve(res);

                    Router.push("/");
                })
                .catch((error) => {

                    reject(error);
                });
        });
    };

    const login = (values) => {
        if (typeof window === "undefined") {
            return;
        }
        return new Promise((resolve, reject) => {
            axios
                .post(`${API_URL}/auth/local/`, values)
                .then((res) => {
                    setIsAuthenticated(true)
                    Cookie.set("token", res.data.jwt);
                    resolve(res);
                    Router.push("/");
                })
                .catch((error) => {
                    reject(error);
                });
        });



    };

    const logout = () => {
        Cookie.remove("token");
        setIsAuthenticated(false)
        localStorage.removeItem("currentUser")
        // delete window.__user;
        Router.push("/");
    };

    // function resetPassword(email) {
    //     return auth.sendPasswordResetEmail(email)
    // }

    const value = {
        currentUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
        signUp,
        login,
        logout,
        // resetPassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}