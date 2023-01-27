
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import Link from "next/link"
import { ErrorMessage, useFormik } from "formik"
import * as Yup from "yup";
import Cookies from 'js-cookie';
import { useTranslation } from "next-i18next"
import Image from 'next/image';


const NewPasswordSection = () => {
    let { t } = useTranslation("common")
    const [isMobile, setMobile] = useState(false)
    const { locale } = useRouter()
    const router = useRouter()
    const [anError, setError] = useState();
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
    const validationSchema = Yup.object({
        password: Yup.string().required('*Required')
            .min(6, 'Password is too short - 6 chars minimum.'),
        confirmPassword: Yup.string()
            .required('*Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const initialValues = {

        password: '',
        confirmPassword: ''
    }

    const formik = useFormik({
        initialValues,

        validationSchema,
    })
      useEffect(() => {
        Cookies.get("token")
            ? router.push(`/`)
            : router.push(`/auth/new-password`)
    }, [])
    return (
        <>
            <div className='signin-section-container'>
                <div className='signin-section new-password'>
                    <div className='form-container '>
                        <div className='form-header forgot-header'>
                            <h1>{t("login.new_password")}</h1>
                            <div className='forgotPassword'>
                                <p>{t("login.enter_new_password")}</p>
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                        <div className={`formInput `} style={{ transitionDelay: '0.1s' }}>
                                <label>{t("login.password")}</label>
                                <input type="password" name='password' className={`${formik.touched.password && formik.errors.password ? 'form-error' : ''}`} id="exampleFormControlInput1" placeholder={t("login.password")} {...formik.getFieldProps("password")} />
                                {/* {formik.touched.password && formik.errors.password ? <p className="form-error">{formik.errors.password}</p> : null} */}

                            </div>
                            <div className={`formInput `} style={{ transitionDelay: '0.1s' }}>
                                <label>{t("login.confirm_password")}</label>
                                <input type="password" name='confirmPassword' className={`${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'form-error' : ''}`} id="exampleFormControlInput1" placeholder={t("login.confirm_password")} {...formik.getFieldProps("confirmPassword")} />
                                {/* {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="form-error">{formik.errors.confirmPassword}</p> : null} */}
                            </div>
                            <div className='form-button-container' type="submit">
                                <button className='form-button' type='submit'>{t("login.submit")}</button>
                            </div>
                        </form>
                    </div>
                    {!isMobile && <div className='img-container new-password'>
                    <Image layout='fill' objectFit="cover" src='/img/auth/new-password.png' alt='new-password'/>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default NewPasswordSection