import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { API_URL } from '../api_baseURL';
const FavoriteContext = React.createContext();
export function useFavorite() {
    return useContext(FavoriteContext)
}
export default function FavoriteProvider({ children }) {
    const [userFavoriteProducts, setUserFavoriteProducts] = useState([])
    const [userFavoriteRecipes, setUserFavoriteRecipes] = useState([])
    const [userFavoriteBlogs, setUserFavoriteBlogs] = useState([])
    useEffect(() => {
        const id = localStorage.getItem("currentUser")
        id && axios.get(`${API_URL}/users/${id}`).then((res) => {
            const data = res.data
            setUserFavoriteProducts(data.favoriteProducts)
            setUserFavoriteRecipes(data.favoriteRecipes)
            setUserFavoriteBlogs(data.favoriteBlogs)
        })
    }, [])

    const value = {
        userFavoriteProducts,
        setUserFavoriteProducts,
        userFavoriteRecipes,
        setUserFavoriteRecipes,
        userFavoriteBlogs,
        setUserFavoriteBlogs
    }
    return (
        <FavoriteContext.Provider value={value}>
            {children}
        </FavoriteContext.Provider>
    )
}