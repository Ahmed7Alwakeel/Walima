
import React from 'react'
import { useTranslation } from "next-i18next"
import { motion } from 'framer-motion'

const NutritionFacts = ({recipeNutritionFacts}) => {
    let { t } = useTranslation("common")
    // const nutrition = [
    //     { name: 'Calories :', value: '445' },
    //     { name: 'Protein :', value: '445 g' },
    //     { name: 'Carbohydrate :', value: '445' },
    //     { name: 'Fat :', value: '445 g' },]


    return (
        <div className='recipe-detail-nutrition-section'>
            <motion.h1 className='header'
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                delay: 0.2,
                duration: .75,
            }}>{t('recipe_details_page.nutrition_facts')}</motion.h1>
            <motion.p className='description'
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                delay: 0.4,
                duration: .75,
            }}>{t('recipe_details_page.per')} : {recipeNutritionFacts?.per_servings} {t('recipe_details_page.gms')}</motion.p>
            <div className='nurtition-container'>
                <div className='nutrition-group'>
                    {recipeNutritionFacts?.NutritionValues.map((item, index) => (
                        index<4&&<motion.div className='nutrition-items' key={index}
                        initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                delay: parseFloat(index/10 + 0.3),
                duration: .75,
            }}>
                        <p className='item name'>{item.name} :</p>
                        <p className='item value'>{item.value}</p>
                    </motion.div>
                    ))}
                </div>
                <div className='nutrition-group'>
                {recipeNutritionFacts?.NutritionValues.map((item, index) => (
                     index>3&&<motion.div className='nutrition-items' key={index}
                     initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                delay: parseFloat(index/10 + 0.3),
                duration: .75,
            }}>
                     <p className='item name'>{item.name} :</p>
                     <p className='item value'>{item.value}</p>
                 </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NutritionFacts

