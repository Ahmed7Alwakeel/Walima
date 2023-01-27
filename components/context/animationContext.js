import React, { useState, useContext,useEffect, useLayoutEffect } from "react";

const AnimationContext = React.createContext();
export function useAnimationContext() {
    return useContext(AnimationContext)
}
export default function AnimationProvider({ children }) {
    const [menuOpened, setMenuOpened] = useState(false);
    const [inProductPage, setInProductPage] = useState(false);

    const value = {
        menuOpened,
        setMenuOpened,
        inProductPage,
        setInProductPage
    }
    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    )
}