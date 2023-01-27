



import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from "next-i18next"
import { motion } from "framer-motion";
import { useAnimationContext } from '../../context/animationContext';
import Image from 'next/image';
const OverviewSection = ({ categoryName, categoryDescription, categoryImg }) => {
  const { menuOpened } = useAnimationContext();
  let { t } = useTranslation("common")
  const [isMobile, setMobile] = useState(false)
  const { locale } = useRouter()
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
      <div className='products-overview-section'>
        {/* <div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}> */}
        <div className={`insideLyr`}>
          <div className='overview-section-header'>
            <div className='header-container'>
              {/* <span>
                <Link href={`/${locale}/`} style={{ cursor: 'pointer' }}>{`${t("head.home")} / `}</Link>
                <Link href={`/${locale}/products`}>{`${t("head.products")} / `}</Link>
                <Link href={` `}>{`${t("head.category")}`}</Link>
              </span> */}
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: .75 }}
              >
                {categoryName}</motion.h1>
              <motion.span
                initial={{ opacity: 0,  }}
                whileInView={{ opacity: 1,  }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: .75 }}
              >
                {categoryDescription}</motion.span>
            </div>
          </div>
          {!isMobile &&
          <motion.div className='circle-section'
          initial={{ opacity: 0,  }}
          whileInView={{ opacity: 1, }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: .75 }}
          >
            <div className='circle-container'>
            <div className='big-img-container'>
              {/* <img src={categoryImg} className='big-img' alt='category-img' */}
              <Image 
              src={categoryImg} className='big-img' alt='category-img'
              layout='fill'
              priority
              quality={100}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: true }}
              transition={{ delay: 2, duration: .75 }}/>
            </div>
            <motion.div className='small-img-container'
            initial={{ opacity: 0,  }}
            whileInView={{ opacity: 1,  }}
            viewport={{ once: true }}
            transition={{ delay: 2.7, duration: .75 }}
            >
              <img src='/img/products/image 20.svg' className='small-img' alt='small-img' />
            </motion.div>
            </div>
          </motion.div>
          }
        </div>
      </div>

    </>

  )
}

export default OverviewSection




