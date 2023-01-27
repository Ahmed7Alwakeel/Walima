import { useRouter } from 'next/router'
import React from 'react'

const LoaderSection = () => {
    const { asPath,query } = useRouter()
    return (
        <>
            <div className={`loader-container `}>
                <div className={`lyr 
                ${asPath == '/products'&& 'bg-products'}
                  ${asPath.includes('products/') && !asPath.includes('products/category/') && !asPath.includes('products/search')? 'bg-product-detail' : ""}
                  ${asPath == "/" && 'bg-home'} `}
                   >
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoaderSection

