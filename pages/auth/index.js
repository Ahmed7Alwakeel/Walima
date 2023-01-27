
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Index = () => {
    const router=useRouter()
    useEffect(() => {
        Cookies.get("token")
            ? router.push(`/`)
            : router.push(`/auth/signin`)
    }, [])
  return (
   <></>
  )
}

export default Index

