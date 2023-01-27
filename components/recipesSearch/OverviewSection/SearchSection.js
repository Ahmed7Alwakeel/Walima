
import { useContext, useEffect, useRef, useState } from "react"
import Select from "react-select"
import Button from "../../common/Button/Button"
import Link from 'next/link'
import { Tab, TabList, Tabs, TabPanel } from "react-tabs"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {motion} from 'framer-motion'
import { FiFilter } from "react-icons/fi"
const SearchSection = ({ categoriesData, productsData, productsSearchPage,
    setInsideProducts, setInsideCategories, setInsideRecipes, recipesSearchPage }) => {
    let { t } = useTranslation("common")
    const router = useRouter()
    const [categoriesOptions, setCategoriesOptions] = useState()
    const [recipesOptions, setRecipesOptions] = useState()
    const [categoriesSelect, setCategoriesSelect] = useState("")
    const [productsSelect, setProductsSelect] = useState("")
    const [recipesSelect, setRecipesSelect] = useState("")
    const [categoryProducts, setCategoryProducts] = useState()
    const [productsOptions, setProductsOptions] = useState()
    const [categoryError, setCategoryError] = useState(false)
    const recipeRef = useRef()
    const productRef = useRef()
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: '#222222',
            color: 'white',
            padding: '0',
            zIndex: '50'
        }),
        menuList: (provided, state) => ({
            ...provided,
            padding: 0,
            maxHeight: '13rem',
            '&::-webkit-scrollbar': {
                width: '6px'
            },
            '&::-webkit-scrollbar-track': {
                background: '#f1f1f1'
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#888'
            }
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'unset',
            boxShadow: 'none',
            borderRadius: '1rem',
            borderColor: `${!categoryError ? 'rgba(255, 255, 255, 0.3)' : 'red'}`,
            height: '3rem',
            transition: '1s all',
            zIndex: '1',
            '&:hover': {
                borderColor: `${!categoryError ? 'white' : 'red'}`
            },
            cursor: 'pointer',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: state.isFocused ? 'white' : '#FFFFFF95'
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            display: 'none',
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            backgroundColor: state.isSelected ? '#934d11' : (state.isFocused) ? 'grey' : 'transparent',
            '&:active': {
                backgroundColor: 'grey'
            }
        })
    };
    //to fill category options
    useEffect(() => {
        let categories = []
        categoriesData?.sort((a, b) => a.order - b.order).map((category, index) => {
            categories.push({
                label: category.name,
                value: category.slug,
            })
        })
        setCategoriesOptions(categories)
    }, [categoriesData])

    //category function
    const categoryHandler = (categoryOption) => {
        recipeRef.current.clearValue()
        productRef.current.clearValue()
        setInsideCategories(categoryOption)
        // setInsideProducts(productsSelect ? productsSelect : "all")
        setInsideProducts("all")
        // setInsideRecipes(recipesSelect ? recipesSelect : "all")
        setInsideRecipes("all")
        setCategoriesSelect(categoryOption)
        setCategoryError(false)
        let products = []
        categoriesData?.map((category, index) => {
            if (categoryOption == category.slug) {
                products.push(category.products)
            }
        })
        setCategoryProducts(...products)
    }
    //to fill products options
    useEffect(() => {
        let productsSelect = [];
        categoryProducts?.map((pro, index) => {
            productsSelect.push({
                label: pro.name,
                value: pro.slug,
            })
        })
        productsSelect!=0?setProductsOptions([{label: `${t("search.all")}`,value:"all"},...productsSelect]):
        setProductsOptions(productsSelect)
    }, [categoryProducts])
    //to fill recipe options
    useEffect(() => {
        let recipesSelect = [];
        productsSelect != 'all' ?
            productsData?.map((pro, index) => {
                pro.slug == productsSelect &&
                    pro.recipes.map(recipe => {
                        recipesSelect.push({
                            label: recipe.name,
                            value: recipe.slug,
                        })
                    })
            })
            :
            categoriesData?.map(cat => {
                cat.slug == categoriesSelect &&
                    cat.products.map(pro => {
                        pro.recipes.map(recipe => {
                            recipesSelect.push({
                                label: recipe.name,
                                value: recipe.slug,
                            })
                        })
                    })
            })
        recipesSelect.length != 0 ? setRecipesOptions([{ label: `${t("search.all")}`, value: "all" }, ...recipesSelect]) :
            setRecipesOptions(recipesSelect)
    }, [productsSelect, productsData, categoriesData])
    useEffect(() => {
        let recipesSelect = [];
        categoriesData?.map(cat => {
            cat.slug == categoriesSelect &&
                cat.products.map(pro => {
                    pro.recipes.map(recipe => {
                        recipesSelect.push({
                            label: recipe.name,
                            value: recipe.slug,
                        })
                    })
                })
        })
        recipesSelect.length != 0 ? setRecipesOptions([{ label: `${t("search.all")}`, value: "all" }, ...recipesSelect]) :
            setRecipesOptions(recipesSelect)
    }, [categoriesData, categoriesSelect])

    //button logic
    const productSearchResult = (value) => {
        setInsideProducts(value)
        setInsideRecipes("all")
    }
    const recipeSearchResult = (value) => {
        setInsideRecipes(value)
    }
    

    return (
        <>
            <motion.div className={`search-filters-recipes searchFilterAnimation ${recipesSearchPage ? 'recipesSearchPage' : ''} `} initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay:1}}>
                <div className="title somatic-rounded">
                    <span> {`${t("search.recipes_filter")}`} <FiFilter /></span>
                </div>
                <div className="search-box-container">
                    <div className="search-box">
                        {/* <h1 className="text-light test">explore now</h1> */}
                        <div className="search-input-group">
                             <Select isSearchable={false}  
                                options={categoriesOptions}
                                onChange={(e) => { categoryHandler(e.value) }}
                                placeholder={`${t("search.select_category")}`}
                                className="select-drop-down"
                                styles={customStyles}
                                noOptionsMessage={() => `${t("search.no_options")}`}
                            />
                        </div>
                        <div className="search-input-group">
                             <Select isSearchable={false}  
                                ref={productRef}
                                options={productsOptions}
                                onChange={(e) => { setProductsSelect(e?.value); recipeRef.current.clearValue(); productSearchResult(e?.value) }}
                                placeholder={`${t("search.select_product")}`}
                                className="select-drop-down "
                                styles={customStyles}
                                noOptionsMessage={() => `${t("search.no_options")}`}
                            />
                        </div>
                        <div className="search-input-group">
                             <Select isSearchable={false}  
                                ref={recipeRef}
                                options={recipesOptions}
                                onChange={(e) => { setRecipesSelect(e?.value); recipeSearchResult(e?.value) }}
                                placeholder={`${t("search.select_recipe")}`}
                                className="select-drop-down"
                                styles={customStyles}
                                noOptionsMessage={() => `${t("search.no_options")}`}
                            />
                        </div>
                    </div>
                    {/* <div className="somatic-rounded buttonOuterContainer button-animation button button--wayra button--border-thin button--round-s"
                        // onClick={recipeSearchResult}
                        >
                        <Button animate type="normal" text={`${t("search.search")}`} />
                    </div> */}
                </div>
            </motion.div>
        </>
    )
}

export default SearchSection


