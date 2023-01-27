import React from 'react'
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
const SwiperArrows = () => {
    const {locale}=useRouter()
    return (
        <div className='swiper-arrows-container swiper-nav swiper-recipe-section swiper-main-section'>
            <div className='swiper-button swiper-prev swiper-prev-recipe swiper-prev-main'>
            {locale=="ar"? <AiOutlineArrowRight />: <AiOutlineArrowLeft />} 
            </div>
            <div className='swiper-button swiper-next swiper-next-recipe swiper-next-main'>
            {locale=="en"? <AiOutlineArrowRight />: <AiOutlineArrowLeft />} 
            </div>
        </div>
    )
}

export default SwiperArrows

