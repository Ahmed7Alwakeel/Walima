import { useEffect, useState } from "react";
import Button from "../../../common/Button/Button";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";

const ProductTypeCard = ({
	cardImg,
	cardTime,
	cardText,
	cardName,
	cardDescription,
	cardSlug,
	allProductData,
	index,
	inHomePage,
	category,
	categoriesData
}) => {
	const { t } = useTranslation("common");
	const arr = [1, 2, 3];
	const [isMobile, setMobile] = useState(false);
	const {locale}=useRouter()
	const [pastriesCategory,setPastriesCategory]=useState(false)
	const [seaFoodCategory,setSeaFoodCategory]=useState(false)
	const isMobileHandler = (e) => {
		setMobile(e.matches);
	};

	useEffect(() => {
		window
			.matchMedia(`(max-width : 1024px)`)
			.addEventListener("change", isMobileHandler);
		setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
	}, []);
	useEffect(()=>{
		locale=="en"&&category==1&&setPastriesCategory(true)
		locale=="ar"&&category==7&&setPastriesCategory(true)
		locale=="en"&&category==9&&setSeaFoodCategory(true)
		locale=="ar"&&category==11&&setSeaFoodCategory(true)
	},[category,locale])
	return (
		<>
			{isMobile &&
				<motion.div
					initial={{ opacity: 0, y: index == 0 ? 22 : 0 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: .2 }}
					transition={{
						// duration: .75,
						duration: (index < 3 && !isMobile) ? 0.75 : 0.4,
						delay:
							(index < 3 && !isMobile)
								? parseFloat(index / 10 + .1)
								: 0.05,
					}}
					className="product-type-card"
				>
					<div className="card-big-image">
						{/* <img src={cardImg} alt='card-image'></img> */}
						<Image src={cardImg} alt='card-image' layout="fill" objectFit="contain" quality={100} priority/>
					</div>
					<div className="card-items">
						<div className="card-head-text">
							<span>{cardText}</span>
						</div>
						<div className="card-text">
							<p>{cardDescription} </p>
						</div>
						<div className="card-images">
							{arr.map((item, index) => (
								<>
								<div key={item}>
									{!pastriesCategory&&index == 0 && <img src="/img/claims/preservantives.png" alt="icon"></img>}
									{index == 1 && seaFoodCategory&&<img src="/img/claims/af.png" alt="af.png"></img>}
									{index == 1 && !seaFoodCategory && <img alt="gmo.png" src='/img/claims/gmo.png'></img>}
									{index == 2 && <img src="/img/claims/artificial.png" alt="artificial.png"></img>}
									</div>
								</>
							))}
						</div>
						<Link href={`/products/${cardSlug}`} passHref>
							<div className="single-button button-animation
                                                    button button--wayra button--border-thin button--round-s">
								<Button
									animate
									type="normal"
									text={`${t("main.explore_product")}`}
									className="test"
								></Button>
							</div>
						</Link>
					</div>
				</motion.div>
			}
			{!isMobile &&
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: .2 }}
					transition={{
						// duration: .75,
						duration: (index < 3 && !isMobile) ? 0.75 : 0.4,
						delay:
							(index < 3 && !isMobile)
								? parseFloat(index / 10 + .1)
								: 0.05,
					}}
					className="product-type-card"
				>
					<div className="card-big-image">
						{/* <img src={cardImg} alt='card-image'></img> */}
						<Image src={cardImg} alt='card-image' layout="fill" objectFit="contain" quality={100} priority/>
					</div>
					<div className="card-items">
						<div className="card-head-text">
							<span>{cardText}</span>
						</div>
						<div className="card-text">
							<p>{cardDescription} </p>
						</div>
						<div className="card-images">
							{arr.map((item, index) => (
								<>
								<div key={item}>
									{!pastriesCategory&&index == 0 && <img src="/img/claims/preservantives.png" alt="icon" ></img>}
									{index == 1 && seaFoodCategory&&<img src="/img/claims/af.png" alt="af.png"></img>}
									{index == 1 && !seaFoodCategory && <img alt="gmo.png" src='/img/claims/gmo.png'></img>}
									{index == 2 && <img src="/img/claims/artificial.png" alt="artificial.png"></img>}
								</div>
								</>
							))}
						</div>
						<Link href={`/products/${cardSlug}`} passHref>
							<div className="single-button button-animation
                                                    button button--wayra button--border-thin button--round-s">
								<Button
									animate
									type="normal"
									text={`${t("main.explore_product")}`}
									className="test"
								></Button>
							</div>
						</Link>
					</div>
				</motion.div>
			}
		</>
	);
};
export default ProductTypeCard;
