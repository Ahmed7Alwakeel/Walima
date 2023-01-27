
import TipsItems from '../../common/TipsItems/TipsItems'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const TipsSection = ({title}) => {
    const [isMobile, setMobile] = useState(false)
    const { locale } = useRouter()
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
         useEffect(() => {
        try {
          // Chrome & Firefox
          window.matchMedia(`(max-width : 1023px)`).addEventListener("change", isMobileHandler)
          setMobile(window.matchMedia(`(max-width : 1023px)`).matches)
        } catch (e1) {
          try {
            // Safari
            window.matchMedia(`(max-width : 1023px)`).addListener(() => isMobileHandler())
            setMobile(window.matchMedia(`(max-width : 1023px)`).matches)
          } catch (e2) {
            console.error(e2)
          }
        }
      }, [])
    const array = [
        {
            img: '/img/unsplash_-YHSwy6uqvk.png',
            text: '36 Little Cooking Habits You Should Actually Ditch ASAP'
        }, {
            img: '/img/unsplash_-YHSwy6uqvk (1).png',
            text: '36 Little Cooking Habits You Should Actually Ditch ASAP'
        }, {
            img: '/img/unsplash_-YHSwy6uqvk (1).png',
            text: '36 Little Cooking Habits You Should Actually Ditch ASAP'
        },


    ]
    return (
        <>
            <div className='tips-items-container '>
                <h1>{title?title:'you might also like'}</h1>
                {isMobile ?
                    <>
                        {array.map((item, index) => (
                            <>
                                <TipsItems imgUrl={item.img} text={item.text} />
                            </>
                        ))}
                    </>
                    : <>
                       <TipsItems  />
                    </>}
            </div>

        </>
    )
}

export default TipsSection

