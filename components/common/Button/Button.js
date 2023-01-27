
import React, { useEffect, useState } from 'react'
const Index = ({ type, text,animate }) => {
    const [isMobile, setMobile] = useState(false)
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
    useEffect(() => {
        try {
            // Chrome & Firefox
            window.matchMedia(`(max-width : 1025px)`).addEventListener("change", isMobileHandler)
            setMobile(window.matchMedia(`(max-width : 1025px)`).matches)
        } catch (e1) {
            try {
                // Safari
                window.matchMedia(`(max-width : 1025px)`).addListener(() => isMobileHandler())
                setMobile(window.matchMedia(`(max-width : 1025px)`).matches)
            } catch (e2) {
                console.error(e2)
            }
        }
    }, [])
    return <>
        <div className={`button-container ${type}`} >
            <div className="btn-text lato-regular base" >
                {text}
            </div>
            {!isMobile &&animate&&
                <div className="btn-text lato-regular second" >
                    {text}
                </div>
            }

        </div>
    </>
};

export default Index;
