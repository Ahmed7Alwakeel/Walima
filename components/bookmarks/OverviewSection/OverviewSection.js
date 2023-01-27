
import React from 'react'
import { useRouter } from "next/router"
import Link from "next/link"
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useAnimationContext } from '../../context/animationContext';
const OverviewSection = () => {
    const { menuOpened } = useAnimationContext();
    const {locale}=useRouter();
    const {t} = useTranslation('common');
    return (
        <>
            <div className='bookmarks-overview-section'>
            {/* <div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}> */}
            {/* <div className={`insideLyr`}> */}
                <div className='header-container'>
                {/* <span>
                    <Link href={`/${locale}/`} style={{ cursor: 'pointer' }}><span>{t('head.website_title')} / </span></Link>
                    <Link href={``}>{t('head.bookmarks')}</Link>
                </span> */}
                <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: .75 }}
                >
                    {t('bookmarks.my_bookmarks')}
                    </motion.h1>
                {/* <p>
                    {t('bookmarks.desc')}
                </p> */}
                </div>
            {/* </div> */}
            </div>
        </>
    )
}

export default OverviewSection

