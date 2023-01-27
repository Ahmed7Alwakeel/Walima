
import { useContext, useEffect, useRef, useState } from "react"
import Select from "react-select"
import Button from "../Button/Button"
import Link from 'next/link'
import { Tab, TabList, Tabs, TabPanel } from "react-tabs"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { useSearch } from "../../context/searchData"
import { useAnimationContext } from "../../context/animationContext"

const SearchSection = ({ setMenu, isMenuOpened }) => {
    let { t } = useTranslation("common")
    const { categoriesData, productsData } = useSearch()
    const { setMenuOpened } = useAnimationContext();
    const router = useRouter()
    const [categoriesOptions, setCategoriesOptions] = useState()
    const [recipesOptions, setRecipesOptions] = useState()
    const [categoriesSelect, setCategoriesSelect] = useState("")
    const [productsSelect, setProductsSelect] = useState("")
    const [recipesSelect, setRecipesSelect] = useState("")
    const [categoryProducts, setCategoryProducts] = useState()
    const [productsOptions, setProductsOptions] = useState()
    const [categoryError, setCategoryError] = useState(false)
    const productRef = useRef()
    const recipeRef = useRef()
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: '#2a3238',
            color: 'white',
            padding: '0',
            zIndex: '2',
        }),
        menuList: (provided, state) => ({
            ...provided,
            padding: 0,
            maxHeight: '13rem',
            '&::-webkit-scrollbar' :{
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
            borderColor: `${!categoryError ? 'white' : 'red'}`,
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
        placeholder: (provided, state) => ({
            ...provided,
            color: 'white'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: 'white'
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
        productRef.current.clearValue()
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
        categoryProducts?.sort((a, b) => a.order - b.order).map((pro, index) => {
            productsSelect.push({
                label: pro.name,
                value: pro.slug,
            })
        })
        productsSelect != 0 ? setProductsOptions([{ label: `${t("search.all")}`, value: "all" }, ...productsSelect]) :
            setProductsOptions(productsSelect)
    }, [categoryProducts])
    useEffect(() => {
        let productsSelect = [];
        categoryProducts?.map((pro, index) => {
            productsSelect.push({
                label: pro.name,
                value: pro.slug,
            })
        })
        productsSelect != 0 ? setProductsOptions([{ label: `${t("search.all")}`, value: "all" }, ...productsSelect]) :
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
    const productSearchResult = () => {
        categoriesSelect == ""
            ? setCategoryError(true) : 
            (router.push(`/${router.locale}/products/search?category=${categoriesSelect}&product=${productsSelect ? productsSelect : "all"}`),setMenuOpened(false),
            setMenu(false))
    }
    const recipeSearchResult = () => {
        categoriesSelect == ""
            ? setCategoryError(true) : 
            (router.push(`/${router.locale}/recipes/search?category=${categoriesSelect}&product=${productsSelect ? productsSelect : "all"}&recipe=${recipesSelect ? recipesSelect : "all"}`),
            setMenuOpened(false),
            setMenu(false))
    }
    return (
        <>
            <div className={`menu-search-filters searchFilterAnimation `}>
                <div className="tabs-container">
                    {/* <h1 className="text-light somatic-rounded">EXPLORE NOW</h1> */}
                    <Tabs>
                        <TabList>
                            <Tab className={`tab-item text-light ${isMenuOpened ? 'itemAppear' : 'itemRemoval'}`} onClick={() => { setCategoriesSelect(""), setProductsSelect(""), setCategoryError(false), categoryHandler("") }}>{`${t("search.products")}`}</Tab>
                            <Tab className={`tab-item text-light ${isMenuOpened ? 'itemAppear' : 'itemRemoval'}`} onClick={() => { setCategoriesSelect(""), setProductsSelect(""), setCategoryError(false), categoryHandler("") }}>{`${t("search.recipes")}`}</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="search-box-container">
                                <div className="search-box product-search">
                                    <div className={`search-input-group ${isMenuOpened ? 'itemAppear' : 'itemRemoval'}`}>
                                        <Select isSearchable={false}
                                            options={categoriesOptions}
                                            onChange={(e) => { categoryHandler(e.value) }}
                                            placeholder={`${t("search.select_category")}`}
                                            className="select-drop-down"
                                            styles={customStyles}
                                            noOptionsMessage={() => `${t("search.no_options")}`}
                                        />
                                    </div>
                                    <div className={`search-input-group ${isMenuOpened ? 'itemAppear' : 'itemRemoval'}`}>
                                        <Select isSearchable={false}
                                            ref={productRef}
                                            options={productsOptions}
                                            onChange={(e) => { setProductsSelect(e?.value) }}
                                            placeholder={`${t("search.select_product")}`}
                                            className="select-drop-down "
                                            styles={customStyles}
                                            noOptionsMessage={() => `${t("search.no_options")}`}
                                        />
                                    </div>
                                </div>
                                <div className={`somatic-rounded searchBtn ${isMenuOpened ? 'itemAppear' : 'itemRemoval'} button-animation button button--wayra button--border-thin button--round-s`}
                                    onClick={productSearchResult}>
                                    <Button animate type="normal" text={`${t("search.search")}`} />
                                </div>
                            </div>
                            {/* <span className={`${!categoryError && 'invisible'} select-error`}>*Please Select Category</span> */}
                        </TabPanel>
                        <TabPanel>
                            <div className="search-box-container">
                                <div className="search-box">
                                    <div className="search-input-group">
                                        <Select isSearchable={false}
                                            options={categoriesOptions}
                                            onChange={(e) => { categoryHandler(e.value), recipeRef.current.clearValue() }}
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
                                            onChange={(e) => { setProductsSelect(e?.value), recipeRef.current.clearValue() }}
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
                                            onChange={(e) => { setRecipesSelect(e?.value) }}
                                            placeholder={`${t("search.select_recipe")}`}
                                            className="select-drop-down"
                                            styles={customStyles}
                                            noOptionsMessage={() => `${t("search.no_options")}`}
                                        />
                                    </div>
                                </div>
                                <div className="somatic-rounded searchBtn button-animation button button--wayra button--border-thin button--round-s"
                                    onClick={recipeSearchResult}>
                                    <Button animate type="normal" text={`${t("search.search")}`} />
                                </div>
                            </div>
                            {/* <span className={`${!categoryError && 'invisible'} select-error`}>*Please Select Category</span> */}
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default SearchSection


