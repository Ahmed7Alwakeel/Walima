import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "next-i18next";




export default function MainCard({ cardData }) {
  const {t} = useTranslation('common');
  const [isMobile, setMobile] = useState(false)
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
    < >
      <div className="main-card">
        <div className="card-body">
          <h5 className="card-title somatic-rounded">{cardData?.name}</h5>
          {/* <div className="itemsContainer">
            <div className="item">
              <img src="/img/alarm.png" className="mb-1" alt="alarm"></img>
              <span className="ms-2 me-2 ">{cardData?.time} {t('main.mins')}</span>
            </div>
            <div className="item">
              <img src="/img/users.png" className="mb-1" alt="users"></img>
              <span className="ms-2 me-2 ">{t('main.persons')} {cardData?.serving}</span>
            </div>
            <div className="item">
              <img src="/img/users.png" className="mb-1" alt="users"></img>
              <span className="ms-2 me-2 ">{t('main.main_product')}</span>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}



