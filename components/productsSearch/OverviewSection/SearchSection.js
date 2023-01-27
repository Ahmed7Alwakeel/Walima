
import { useContext, useEffect, useRef, useState } from "react"
import Select from "react-select"
import Button from "../../common/Button/Button"
import Link from 'next/link'
import { Tab, TabList, Tabs, TabPanel } from "react-tabs"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FiFilter } from "react-icons/fi";

const SearchSection = ({ categoriesData, productsData, productsSearchPage,
    setInsideProducts, setInsideCagtegories }) => {
    let { t } = useTranslation("common")
    const router = useRouter()
    const [categoriesOptions, setCategoriesOptions] = useState()
    const [productsSelect, setProductsSelect] = useState("")
    const [categoryProducts, setCategoryProducts] = useState()
    const [productsOptions, setProductsOptions] = useState()
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
            borderColor: 'rgba(255, 255, 255, 0.3)',
            height: '3rem',
            transition: '1s all',
            zIndex: '1',
            '&:hover': {
                borderColor: 'white'
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
        productRef.current.clearValue()
        setInsideProducts("all")
        setInsideCagtegories(categoryOption)
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
    //button logic
    const productSearchResult = (value) => {
        setInsideProducts(value)
    }
    return (
        <>
            <div className={`search-filters-product-search searchFilterAnimation ${productsSearchPage ? 'productsSearchPage' : ''}`}>
                <div className="tabs-container">
                <div className="title somatic-rounded">
                    <span> {`${t("search.explore_products")}`} <FiFilter /></span>
                </div>
                    <Tabs>
                        <TabPanel>
                            <div className="search-box-container">
                                <div className="search-box product-search">
                                    <div className="search-input-group">
                                        <Select isSearchable={false}
                                            options={categoriesOptions}
                                            onChange={(e) => { categoryHandler(e.value); }}
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
                                            onChange={(e) => { setProductsSelect(e?.value), productSearchResult(e?.value) }}
                                            placeholder={`${t("search.select_product")}`}
                                            className="select-drop-down "
                                            styles={customStyles}
                                            noOptionsMessage={() => `${t("search.no_options")}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default SearchSection


