import { useEffect,useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import { useFavorite } from "../../context/favoriteContext";
import { API_URL,getData } from "../../api_baseURL";
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useRouter } from "next/router";
import { useSearch } from "../../context/searchData";
import { useAnimationContext } from "../../context/animationContext";
useAnimationContext
const Layout = ({ children }) => {
  const { locale, asPath } = useRouter()
  const {setUserFavoriteProducts,setUserFavoriteRecipes,setUserFavoriteBlogs } = useFavorite()
  const {menuOpened, inProductPage} = useAnimationContext();
  const { setProductsSearchData, setCategoriesSearchData } = useSearch()
  const categories = 'categories'
  const products = 'products'
  const categoriesQuery = useQuery(['categories', locale], () => getData(locale, categories))
  const productsQuery = useQuery(['products', locale], () => getData(locale, products))
  useEffect(() => {
    categoriesQuery.isSuccess && setCategoriesSearchData(categoriesQuery.data)
  }, [categoriesQuery.data, categoriesQuery.isSuccess])
  useEffect(() => {
    productsQuery.isSuccess && setProductsSearchData(productsQuery.data)
  }, [productsQuery.data, productsQuery.isSuccess])
  useEffect(() => {
    const id = localStorage.getItem("currentUser")
    id && axios.get(`${API_URL}/users/${id}`).then((res) => {
        const data = res.data
        setUserFavoriteProducts(data.favoriteProducts)
        setUserFavoriteRecipes(data.favoriteRecipes)
        setUserFavoriteBlogs(data.favoriteBlogs)
      })
  }, [])
 
  return (
    <>
      <Navbar/>
      {/* <div className={`page ${menuOpened && !inProductPage ? 'whileMenuOpening' : ''}`}> */}
      {/* <div className={`page`}> */}
        {children}
      {/* </div> */}
    </>
  );
};

export default Layout;
