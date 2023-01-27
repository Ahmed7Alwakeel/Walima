
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import ClaimCardsSection from '../../common/ClaimCardsSection/ClaimCardsSection'

const ClaimsSection = () => {
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
      <div className='products-calims-section'>
        <div className='claims-section-header'>
          {isMobile ? 
          <div className='circle-container'>
            <div className='big-img-container'>
              <img src='/img/products/SUN002_WALIMA_Garden-Peas_3D-category.png' className='big-img' alt='big-img'/>
            </div>
            <div className='small-img-container'>
              <img src='/img/products/image 20.png' className='small-img' alt='small-img'/>
            </div>
          </div> : ""}
          <div className='header-container'>
            <h1>Our CleaN LABEL CLAIMS</h1>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl,
              diam lectus sagittis, massa aliquam commodo blandit viverra.
              Sem arcu, ullamcorper egestas convallis. In velit sit montes,
              dui. Egestas ut aliquet quis praesent diam. </span>
          </div>
        </div>
        <ClaimCardsSection />

      </div>

    </>
  )
}

export default ClaimsSection

