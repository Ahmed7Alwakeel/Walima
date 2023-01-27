import React, { useEffect, useState } from "react"
import Hamburger, { Fade } from "hamburger-react"
import { slide as Menu } from "react-burger-menu"
import { useRouter } from "next/router"
import Link from "next/link"
import SlidingMenu from "./SlidingMenu"
import LangSwitcher from "../langSwitcher/LangSwitcher"
import { BiUserCircle } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from "../../context/authContext"
import { useTranslation } from "next-i18next"
import { useAnimationContext } from "../../context/animationContext"
import { motion } from 'framer-motion';
import { useQuery } from "react-query";
import { getData } from '../../../components/api_baseURL';
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  let { t } = useTranslation("common")
  const router = useRouter();
  const { locale, locales, defaultLocale, asPath, pathname } = useRouter()
  const [isMenuOpened, setMenuOpen] = useState(false)
  const [isMobile, setMobile] = useState(false);
  const { menuOpened, setMenuOpened } = useAnimationContext();
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  const handleMenu = () => {
    window.document.body.classList.remove("menu-open");
    setMenuOpen(false);
    setMenuOpened(false);
  }
  useEffect(() => {
    if (isMenuOpened) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
  }, [isMenuOpened])

  const [categoriesData, setCategoriesData] = useState()
  const categoriesQuery = useQuery(['categoriesMenu', locale], () => getData(locale, "categories"))
  useEffect(() => {
    categoriesQuery.isSuccess && setCategoriesData(categoriesQuery.data)
  }, [categoriesQuery.data, categoriesQuery.isSuccess])

  return (
    <>
      {isMobile &&
        <div className={`nav-bar-container ${asPath.includes("/auth") && 'bg-auth'} ${asPath == ("/contact-us") && 'bg-contact'} 
        ${asPath == 'bg-contact'}`}
        >
          <div className="logo-container">
            <Link href={`/${locale}`} passHref>
              {/* <img src="/img/Walima-LOGO-NEW.png" onClick={handleMenu} alt='logo'></img> */}
              <img src="/img/Walima-LOGO-NEW- png 1.svg" onClick={handleMenu} alt='logo'></img>
            </Link>
          </div>
          <div className="top-icons">
            <div className={`lang-icon ${isMenuOpened && 'add-opacity'}`} onClick={handleMenu}>
              <LangSwitcher>
                {locale == "ar" ?
                  <div className="somatic-rounded lang" >EN</div> :
                  <div className="ithra-bold">عربي</div>}
              </LangSwitcher>
            </div>
            {isAuthenticated && <Link href={`/${locale}/bookmarks`} passHref>
              <div className={`bookmark-icon ${isMenuOpened && 'add-opacity'}`} onClick={handleMenu}>
                <FaRegHeart size={22} color='white' />
              </div>
            </Link>}
            {isAuthenticated ?
              <div className={`profile-icon rotate  ${isMenuOpened && 'add-opacity'}`} onClick={logout}>
                <FiLogOut size={27} color='white' onClick={handleMenu} />
              </div>
              :
              <Link href={`/${locale}/auth/signin`} passHref>
                <div className={`profile-icon ${isMenuOpened && 'add-opacity'}`} onClick={handleMenu}>
                  <BiUserCircle size={27} color='white' />
                </div>
              </Link>
            }
            <div className="icon-container-menu" >
              <div className={`burger-menu-container ${isMenuOpened && 'open-menu'}`} onClick={() => { setMenuOpen(!isMenuOpened) }}>
                <div className={`burger-menu ${isMenuOpened && 'open'}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              {locale == "ar" &&
                // <Menu className="haMenu" height={"100%"} isOpen={isMenuOpened} width={"100%"} disableAutoFocus disableOverlayClick noOverlay customBurgerIcon={false} customCrossIcon={false}>
                //   <SlidingMenu setMenu={setMenuOpen} isMenuOpened={isMenuOpened} />
                // </Menu>
                <Menu className="haMenu" left height={"100%"} isOpen={isMenuOpened}
                  noTransition
                  width={"100%"} disableAutoFocus disableOverlayClick noOverlay customBurgerIcon={false} customCrossIcon={false}>
                  <SlidingMenu categoriesData={categoriesData} setMenu={setMenuOpen} isMenuOpened={isMenuOpened} />
                </Menu>
              }
              {locale == "en" &&
                // <Menu className="haMenu" height={"100%"} isOpen={isMenuOpened} width={"100%"} disableAutoFocus disableOverlayClick noOverlay customBurgerIcon={false} customCrossIcon={false}>
                //   <SlidingMenu setMenu={setMenuOpen} isMenuOpened={isMenuOpened} />
                // </Menu>
                <Menu className="haMenu"
                  noTransition
                  right height={"100%"} isOpen={isMenuOpened} width={"100%"} disableAutoFocus disableOverlayClick noOverlay customBurgerIcon={false} customCrossIcon={false}>
                  <SlidingMenu categoriesData={categoriesData} setMenu={setMenuOpen} isMenuOpened={isMenuOpened} />
                </Menu>
              }
            </div>
          </div>
        </div> }
        {!isMobile && 
          <div className={`nav-bar-container 
          ${asPath == "/" && 'bg-home'} 
          ${asPath == "/products" && 'bg-products'} 
          ${asPath.includes("/auth") && 'bg-auth'} 
            ${asPath.includes('products/') && !asPath.includes('products/category/') && !asPath.includes('products/search') ? 'bg-product-detail' : ""}`} >
            <div className="links-container" >
              <div className="logo-container" onClick={handleMenu}>
                <Link href={`/${locale}`} passHref>
                  {/* <img src="/img/Walima-LOGO-NEW.png" alt="logo"></img> */}
                  <img src="/img/Walima-LOGO-NEW- png 1.svg" alt="logo"></img>
                </Link>
              </div>
              <div className="nav-links " >
                <ul className="links-ul " >
                  <>
                    <Link href={`/${locale}/products`} passHref>
                      <li className={`links-li line-hover somatic-rounded ${asPath.includes('products') ? "active" : ""}`}
                      
                      >{t("navbar.products")}</li>
                    </Link>
                    <Link href={`/${locale}/recipes`} passHref>
                      <li className={`links-li line-hover somatic-rounded ${asPath.includes('recipes') ? "active" : ""}`}>{t("navbar.recipes")}</li>
                    </Link>
                    {/* <Link href={`/${locale}/blogs`} passHref>
                      <li className={`links-li line-hover somatic-rounded ${asPath.includes('blogs') ? "active" : ""}`}>{t("navbar.tips")}</li>
                    </Link> */}
                  </>
                  {/* } */}

                </ul>
                <div className="top-icons">
                  <div className={`lang-icon ${isMenuOpened && 'add-opacity'}`} onClick={handleMenu}>
                    <LangSwitcher>
                      {locale == "ar" ?
                        <div className="somatic-rounded lang" >EN</div> :
                        <div className="ithra-bold">عربي</div>}
                    </LangSwitcher>
                  </div>
                  {isAuthenticated && <Link href={`/${locale}/bookmarks`} passHref>
                    <div className={`bookmark-icon ${isMenuOpened && 'add-opacity'}`} onClick={handleMenu}>
                      <FaRegHeart size={22}  />
                    </div>
                  </Link>}
                  {isAuthenticated ?
                    <div className={`profile-icon rotate ${isMenuOpened && 'add-opacity'}`} onClick={logout}>
                      <FiLogOut size={27}  onClick={handleMenu} />
                    </div>
                    :
                    <Link href={`/${locale}/auth/signin`} passHref>
                      <div className={`profile-icon ${isMenuOpened && 'add-opacity'}`} onClick={handleMenu}>
                        <BiUserCircle size={27}  />
                      </div>
                    </Link>
                  }
                  <div className="icon-container-menu" >
                    <div className={`burger-menu-container ${isMenuOpened && 'open-menu'}`} onClick={() => { setMenuOpen(!isMenuOpened); setMenuOpened(!menuOpened) }}>
                      <div className={`burger-menu ${isMenuOpened && 'open'}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    {locale == "ar" &&
                      <Menu className={`haMenu ${isMenuOpened ? 'haMenuOpened' : ''}`} isOpen={isMenuOpened} disableAutoFocus disableOverlayClick noOverlay customBurgerIcon={false} customCrossIcon={false}>
                        <SlidingMenu categoriesData={categoriesData} setMenu={setMenuOpen} isMenuOpened={isMenuOpened} />
                      </Menu>
                    }
                    {locale == "en" &&
                      <Menu className={`haMenu ${isMenuOpened ? 'haMenuOpened' : ''}`} isOpen={isMenuOpened} disableAutoFocus disableOverlayClick noOverlay customBurgerIcon={false} customCrossIcon={false}>
                        <SlidingMenu categoriesData={categoriesData} setMenu={setMenuOpen} isMenuOpened={isMenuOpened} />
                      </Menu>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
    </>
  )
}

export default Navbar


