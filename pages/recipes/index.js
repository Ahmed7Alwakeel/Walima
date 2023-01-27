import React, { useEffect, useState } from "react";
import OverviewSection from "../../components/recipes/OverviewSection/OverviewSection";
import Head from "next/head";
import SearchSection from "../../components/recipes/SearchSection/SearchSection";
import CategoriesSection from "../../components/recipes/CategoriesSection/CategoriesSection";
import BlogsSection from "../../components/common/BlogsSection/BlogsSection";
import Footer from "../../components/common/Footer/Footer";
import { getData, API_URL } from "../../components/api_baseURL";
import { dehydrate, QueryClient, useQuery } from "react-query";
import LoaderSection from "../../components/common/LoaderSection/LoaderSection";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useAnimationContext } from "../../components/context/animationContext";
import { NextSeo } from "next-seo";
const Recipes = () => {
	const { menuOpened } = useAnimationContext();
	let { t } = useTranslation("common");
	const [isMobile, setMobile] = useState(false);
	const { locale, asPath } = useRouter();
	const topics = "topics";
	const [topicsData, setTopicsData] = useState();
	const isMobileHandler = (e) => {
		setMobile(e.matches);
	};
	useEffect(() => {
		try {
			// Chrome & Firefox
			window
				.matchMedia(`(max-width : 1024px)`)
				.addEventListener("change", isMobileHandler);
			setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
		} catch (e1) {
			try {
				// Safari
				window
					.matchMedia(`(max-width : 1024px)`)
					.addListener(() => isMobileHandler());
				setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
			} catch (e2) {
				console.error(e2);
			}
		}
	}, []);
	const recipePage = "recipe-page";
	const categories = "categories";
	const products = "products";
	const [categoriesData, setcategoriesData] = useState();
	const [productsData, setProductsData] = useState();
	const [recipePageData, setRecipePageData] = useState();
	const { data, isSuccess, isLoading, isError } = useQuery(
		["recipes", locale],
		() => getData(locale, recipePage)
	);
	const categoriesQuery = useQuery(["categories", locale], () =>
		getData(locale, categories)
	);
	const productsQuery = useQuery(["products", locale], () =>
		getData(locale, products)
	);
	const topicsQuery = useQuery(["topics", locale], () =>
		getData(locale, topics)
	);
	useEffect(() => {
		categoriesQuery.isSuccess && setcategoriesData(categoriesQuery.data);
	}, [categoriesQuery.data, categoriesQuery.isSuccess]);
	useEffect(() => {
		productsQuery.isSuccess && setProductsData(productsQuery.data);
	}, [productsQuery.data, productsQuery.isSuccess]);
	useEffect(() => {
		isSuccess && setRecipePageData(data[0]);
	}, [data, isSuccess]);
	useEffect(() => {
		topicsQuery.isSuccess && setTopicsData(topicsQuery.data);
	}, [topicsQuery.data, topicsQuery.isSuccess]);
	if (isLoading) {
		return <LoaderSection />;
	}
	if (isError) {
		return (
			<div className="w-100 text-center">
				<div className={`loader-container `}>
					<div
						className={`lyr 
    ${asPath == "/products" && "bg-products"}
      ${
				asPath.includes("products/") &&
				!asPath.includes("products/category/") &&
				!asPath.includes("products/search")
					? "bg-product-detail"
					: ""
			}
      ${asPath == "/" && "bg-home"} `}
					>
						<h1 className="text-light">{`${t("network_error.check")}`}</h1>
					</div>
				</div>
			</div>
		);
	}
	return (
		<>
		<NextSeo
        title={`${t('head.website_title')} | ${t('head.recipes')}`}
        description={'Walima recipes'}
      />
			<div className="overview-recipe-bg">
				{/* {!isMobile && <img src='/img/recipes/recipe-bg1.png' className='bg-img'></img>} */}
				<OverviewSection
					heading={recipePageData?.heading}
					text={recipePageData?.text}
					banner={recipePageData?.banner?.url}
					bannerAlt={recipePageData?.banner?.name}
				/>
			</div>
			<div className="d-flex justify-content-center background-white">
				<div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}>
					<SearchSection
						categoriesData={categoriesData}
						productsData={productsData}
					/>
				</div>
			</div>
			<div className="category-recipe-bg">
				{!isMobile && (
					<img src="/img/recipes/recipe-bg2.png" className="bg-img" alt="recipe_bg"></img>
				)}
				<CategoriesSection recipeCategory={recipePageData?.RecipeCategory} />
			</div>
			<div className="products-recipe-recipeDetail-bg ">
				{!isMobile && (
					<img
						src="/img/recipes/recipeDetails/recipe-detail2.png"
						className="bg-img bg2"
						alt="recipe_details"
					></img>
				)}
				{/* <BlogsSection
					topics={topicsData}
					title={recipePageData?.MainBlog?.title}
					blogsData={recipePageData?.MainBlog?.blogs}
				/> */}
			</div>
			<Footer />
		</>
	);
};

export default Recipes;
export async function getServerSideProps({ locale }) {
	const queryClient = new QueryClient();
	const recipePage = "recipe-page";
	const topics = "topics";
	const products = "products";
	await queryClient.prefetchQuery(["topics", locale], () =>
		getData(locale, topics)
	);
	await queryClient.prefetchQuery(["products", locale], () =>
		getData(locale, products)
	);
	await queryClient.prefetchQuery(["recipes", locale], () =>
		getData(locale, recipePage)
	);
	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...(await serverSideTranslations(locale, ["common"])),
		},
	};
}
