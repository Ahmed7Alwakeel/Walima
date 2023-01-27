
import React from 'react'
import { useRouter } from "next/router"
import Link from "next/link"
const OverviewSection = () => {
    const {locale}=useRouter()
    return (
        <>
            <div className='recipe-category-overview-section'>
                <div className='header-container'>
                <span>
                    <Link href={`/${locale}/`} style={{ cursor: 'pointer' }}>Home / </Link>
                    <Link href={`/${locale}/recipes`}>Category</Link>
                </span>
                <h1>Quick Dinner Meals</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                </div>
               
            </div>
        </>
    )
}

export default OverviewSection

