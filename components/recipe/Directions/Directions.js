import React from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
const Directions = ({ recipeInstructions }) => {
	let { t } = useTranslation("common");
	const arr = [1, 2, 3, 4];
	return (
		<div className="recipe-detail-directions-section">
			<motion.h1
				className="header"
				initial={{ opacity: 0, y: -10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{
					delay: 0.2,
					duration: .75,
				}}
			>
				{t("recipe_details_page.directions")}
			</motion.h1>
			<div className="steps-section-container">
				{recipeInstructions?.map((step, index) => (
					<motion.div
						className="steps"
						key={index}
						initial={{ opacity: 0, }}
						whileInView={{ opacity: 1,  }}
						viewport={{ once: true }}
						transition={{
							delay: parseFloat(index/8 + 0.2),
							duration: .75,
						}}
					>
						<div className="step-header">
							<div className="circle">
								<img alt="icon" src="/img/recipes/recipeDetails/step.png" />
							</div>
							<span>
								{t("recipe_details_page.step")} {index + 1}
							</span>
						</div>
						<div className="step-description">{step.text}</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Directions;
