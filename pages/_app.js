
import '../styles/globals.css'
import "../styles/scss/App.scss";
import "../styles/scss/App-rtl.scss";
import "../styles/scss/button-rtl.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import NextNProgress from "nextjs-progressbar"
import { appWithTranslation } from "next-i18next"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactQueryDevtools } from 'react-query/devtools'
import Head from 'next/head'
import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import Layout from '../components/common/Layout/Layout';
import AuthProvider, { useAuth } from '../components/context/authContext'
import FavoriteProvider, { useFavorite } from '../components/context/favoriteContext'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import Cookie from 'js-cookie';
import { API_URL } from '../components/api_baseURL';
import SearchProvider from '../components/context/searchData';
import AnimationProvider from '../components/context/animationContext';
import ScrollToTop from "../components/common/ScrollToTop/ScrollToTop";
import Script from 'next/script';


function MyApp({ Component, pageProps }) {
  const { locale } = useRouter()
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    window.document.body.style.overflowX = "hidden"
    let dir = locale == "ar" ? "rtl" : "ltr"
    document.querySelector("html").setAttribute("dir", dir)
  }, [locale])


  return (
    <>
      <AnimationProvider>
        <AuthProvider>
          <FavoriteProvider>
            <SearchProvider>
              <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                  <ReactQueryDevtools />
                  <Layout>

                    <Script
                      strategy="lazyOnload"
                      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <Script id="google-analytics" strategy="lazyOnload">
                      {`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
						page_path: window.location.pathname,
					});
				`}
                    </Script>


                    <NextNProgress
                      // color='#934d11'
                      color='white'
                      options={{ easing: "ease", showSpinner: false }} />
                    <Head>
                      <meta charSet="utf-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </Head>
                    <Component {...pageProps} />
                    <ScrollToTop />
                  </Layout>
                </Hydrate>
              </QueryClientProvider>
            </SearchProvider>
          </FavoriteProvider>
        </AuthProvider>
      </AnimationProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}