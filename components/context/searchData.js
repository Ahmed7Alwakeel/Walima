import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { API_URL } from '../api_baseURL';
const SearchContext = React.createContext();
export function useSearch() {
    return useContext(SearchContext)
}
export default function SearchProvider({ children }) {
    const [productsData, setProductsSearchData] = useState()
    const [categoriesData, setCategoriesSearchData] = useState()
    const value = {
        categoriesData, setCategoriesSearchData,
        productsData, setProductsSearchData
    }
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}