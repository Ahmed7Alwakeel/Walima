

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useAnimationContext } from '../../context/animationContext';

const OverviewSection = ({ heading, text, banner, bannerAlt }) => {
  const { menuOpened } = useAnimationContext();
  const [isMobile, setMobile] = useState(false)
  const { locale } = useRouter();
  const {t} = useTranslation('common');
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    try {
      // Chrome & Firefox
      window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
      setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
    } catch (e1) {
      try {
        // Safari
        window.matchMedia(`(max-width : 1024px)`).addListener(() => isMobileHandler())
        setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
      } catch (e2) {
        console.error(e2)
      }
    }
  }, [])
  return (
    <>
      <div className='recipe-overview-section'>
        <div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}>
          <div className='overview-section-header'>
            <div className='header-container'>
              {/* <span>
                <Link href={`/${locale}/`} style={{ cursor: 'pointer' }} passHref><span>{t('head.home')} / </span></Link>
                <Link href={``}>{t('head.recipes')}</Link>
              </span> */}
              <motion.h1 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75}}>{heading}</motion.h1>
              <motion.span initial={{ opacity: 0,  }} whileInView={{ opacity: 1,  }} viewport={{ once: true }} transition={{duration: .75, delay: 0.3}}>{text} </motion.span>
            </div>
          </div>
          <div className='circles-container'>
            <motion.div className='img-container' initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: isMobile?0:"1.5rem" }} viewport={{ once: true }} transition={{duration: .75, delay: 0.5}}>
              <img src={banner} alt={bannerAlt}/>
              {/* <img src='/img/recipes/bigRecipe.png' alt='main-image'/> */}
            </motion.div>
            <motion.div className='green-circle' initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay: 0.7}}></motion.div>
            <motion.div className='green-circle small1' initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay: 0.9}}></motion.div>
            <motion.div className='green-circle small2' initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay: 1.1}}></motion.div>
            <motion.div className='green-circle medium1' initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay: 0.9}}></motion.div>
            <motion.div className='green-circle medium2' initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{duration: .75, delay: 0.9}}></motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OverviewSection

