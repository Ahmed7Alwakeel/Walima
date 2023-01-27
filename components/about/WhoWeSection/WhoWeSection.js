import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../api_baseURL";
import { motion } from "framer-motion";
import Image from "next/image";

const WhoWeSection = ({ whoData, whoImg }) => {
	const [isMobile, setMobile] = useState(false);
	const { locale } = useRouter();
	const isMobileHandler = (e) => {
		setMobile(e.matches);
	};
	useEffect(() => {
		window
			.matchMedia(`(max-width : 768px)`)
			.addEventListener("change", isMobileHandler);
		setMobile(window.matchMedia(`(max-width : 768px)`).matches);
	}, []);
	return (
		<>
			<div className="who-we-section">
				<div className="header-section">
					<div className="text-container">
						<motion.h1
							initial={{ opacity: 0,  }}
							whileInView={{ opacity: 1,  }}
							viewport={{ once: true, amount: 0.9 }}
							transition={{ duration: .75, delay:.1 }}
						>
							{whoData?.header}
						</motion.h1>
						<motion.p
							className="text-description"
							initial={{ opacity: 0,  }}
							whileInView={{ opacity: 1,  }}
							viewport={{ once: true }}
							transition={{ duration: .75, delay:.3 }}
						>{`${whoData?.text}`}</motion.p>
					</div>
					<div className="img-container">
						{isMobile ? (
							<motion.div
								className="top-img-container"
								initial={{ opacity: 0, y: -20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: .75, delay: 0.1 }}
							>
								<Image  layout="fill" objectFit="cover" src={whoData?.image&&`${whoData?.image?.url}`} alt={whoData?.image?.name} />

							</motion.div>
						) : (
							<>
								<motion.div
									className="top-img-container"
									initial={{ opacity: 0, y: -20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.9 }}
									transition={{ duration: .75, delay: 0.4 }}
								>
									{/* <img src="/img/about/who-we-top.png" alt="top-img" /> */}
									<Image  layout="fill" objectFit="contain" src={whoData?.image&&`${whoData?.image?.url}`} alt={whoData?.image?.name} />
								</motion.div>
								<div className="circles-container">
									<motion.div
										className="green-circle"
										initial={{ opacity: 0, y: -20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.9 }}
										transition={{ duration: .75, delay: 0.7 }}
									></motion.div>
									<motion.div
										className="blue-big-circle"
										initial={{ opacity: 0, y: -20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.9 }}
										transition={{ duration: .75, delay: 0.8 }}
									></motion.div>
									<motion.div
										className="blue-small-circle"
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.9 }}
										transition={{ duration: .75, delay: 0.9 }}
									></motion.div>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="middle-section">
					<motion.div
						className="middle-text"
						initial={{ opacity: 0,  }}
						whileInView={{ opacity: 1,  }}
						viewport={{ once: true, amount: 0.9 }}
						transition={{ duration: .75, delay: 0.5 }}
					>
						<p>{whoData?.side_text}</p>
					</motion.div>

					<div className="img-container">
						{isMobile ? (
							<motion.div className="bottom-img-container" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay: 0.6}}>
								<Image  layout="fill" objectFit="contain" src={whoData?.sub_image && `${whoData?.sub_image?.url}`} alt={whoData?.sub_image.name}/>
							</motion.div>
						) : (
							<>
								<motion.div className="bottom-img-container " initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{duration: .75, delay: 0.2}}>
									{/* <img src="/img/about/who-we-bottom.png" alt="top-img" /> */}
									<Image  layout="fill" objectFit="contain" src={whoData?.sub_image && `${whoData?.sub_image?.url}`} alt={whoData?.sub_image.name}/>
								</motion.div>
								<div className="circles-container">
									<motion.div className="green-circle" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay: 0.7}}></motion.div>
									<motion.div className="blue-big-circle" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay: 0.8}}></motion.div>
									<motion.div className="blue-small-circle" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay: 0.7}}></motion.div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default WhoWeSection;
