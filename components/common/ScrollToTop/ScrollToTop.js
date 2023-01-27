/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { animateScroll as scroll, scroller } from "react-scroll"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const lastScrollTop = 0;

  const scrollTop = () => {
    scroll.scrollToTop()
  }
  const handleScroll = () => {
    scrollTop()
  }

  useEffect(() => {
    const listenToScroll = () => {
      const winScroll = window.pageYOffset || document.documentElement.scrollTop
      if (winScroll > lastScrollTop) {
        !isVisible && // to limit setting state only the first time
          setIsVisible(false)
      }
      else if (window.pageYOffset <= 50) {
        setIsVisible(false)
      }
      else {
        setIsVisible(true)
      }
      lastScrollTop = winScroll <= 0 ? 0 : winScroll
    }
    window.addEventListener("scroll", listenToScroll)
    return () => window.removeEventListener("scroll", listenToScroll)
  }, [])

  return (
    <>
      {isVisible && 
        <div className="scroll-to-top" onClick={() => handleScroll()}>
          <img src="/img/up-arrow.svg" alt='arrow-img' />
        </div>}
    </>
  )
}
