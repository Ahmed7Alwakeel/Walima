
//MainSection-OLD

// <div className='main-section' >
//             {isMobile ?
//                 <>
//                     <div className="row">
//                         <Swiper
//                             key={Math.random()}
//                             style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
//                             modules={[Navigation, Pagination, EffectFade]}
//                             className="swiper-nav"
//                             navigation={{
//                                 nextEl: ".swiper-next-button",
//                                 prevEl: ".swiper-prev-button",
//                             }}
//                             fadeEffect={{
//                                 crossFade: true
//                             }}
//                             effect="fade"
//                         >
//                             {arr.map((arr) => (
//                                 <SwiperSlide key={arr}>
//                                     <div className='intro-section__h1 fiber-vintage text-center d-flex align-items-center justify-content-center'>
//                                         <h1>{arr}</h1>
//                                     </div>
//                                     <div className="swiper-items">
//                                         <div className="main-circle">
//                                             <div className="white-circle">
//                                                 <img src="/img/bi_arrow-up-right-circle.png"></img>
//                                             </div>
//                                         </div>
//                                         <div className="swiper-mobile-img text-center">
//                                             <img className="main-section__img " src="/img/Rectangle2523.png"></img>
//                                         </div>
//                                         <MainCard />
//                                     </div>
//                                 </SwiperSlide>
//                             ))}

//                             <div className="swiper-mobile-direction swiper-nav">
//                                 {locale == "ar" ?
//                                     <>
//                                         <div className="swiper-prev-button swiper-prev">
//                                             <AiOutlineArrowRight className="text-ligth" />
//                                         </div>
//                                         <div className="swiper-next-button swiper-next">
//                                             < AiOutlineArrowLeft className="text-ligth" />
//                                         </div>


//                                     </> :
//                                     <>
//                                         <div className="swiper-prev-button swiper-prev">
//                                             <AiOutlineArrowLeft className="text-ligth" />
//                                         </div>
//                                         <div className="swiper-next-button swiper-next">
//                                             <AiOutlineArrowRight className="text-ligth" />
//                                         </div>
//                                     </>
//                                 }

//                             </div>
//                         </Swiper>
//                         <div className="buttons-mobile-group">
//                             <div className="button-mobile-container brown somatic-rounded " onClick={() => {
//                                 router.push(`${router.locale}/recipes`)
//                             }}>
//                                 <Button type="normal" text="Explore Recipes" className=" "></Button>
//                             </div>
//                             <div className="button-mobile-container transparent somatic-rounded  " onClick={() => {
//                                 router.push(`${router.locale}/products`)
//                             }}>
//                                 <Button type="normal" text="Explore Products" className=""></Button>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//                 :
//                 <>
//                     <Swiper
//                         modules={[Navigation, Pagination, EffectFade]}
//                         key={Math.random()}
//                         style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
//                         className="swiper-nav"
//                         navigation={{
//                             nextEl: ".swiper-next-button",
//                             prevEl: ".swiper-prev-button",
//                         }}
//                         fadeEffect={{
//                             crossFade: true
//                         }}
//                         effect="fade"

//                     >
//                         {arr.map((arr, index) => (
//                             <SwiperSlide key={arr}>
//                                 <div className='intro-left-section'>
//                                     <div className='intro-section__h1 fiber-vintage'>
//                                         <h1>{arr}</h1>
//                                     </div>
//                                     <div className='intro-section__p '>
//                                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing<br /> elit,
//                                             sed do eiusmod tempor incididunt ut labore et <br />dolore magna </p>
//                                     </div>
//                                     <div className="buttons-group">
//                                         <div className="button-container brown somatic-rounded " onClick={() => {
//                                             router.push(`${router.locale}/recipes`)
//                                         }}>
//                                             <Button type="normal" text="Explore Recipes" className=" "></Button>
//                                         </div>
//                                         <div className="button-container transparent somatic-rounded  " onClick={() => {
//                                             router.push(`${router.locale}/products`)
//                                         }}>
//                                             <Button type="normal" text="Explore Product" className=""></Button>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className='intro-right-section'>
//                                     <div className="swiper-section ">
//                                         <div className="main-circle">
//                                             <div className="white-circle">
//                                                 <img src="/img/vector.png"></img>
//                                             </div>
//                                         </div>
//                                         <img className="main-section__img" src="/img/Rectangle2523.png"></img>
//                                         <MainCard />
//                                     </div>
//                                 </div>
//                                 <div className="test"></div>
//                             </SwiperSlide>
//                         ))}
//                         <div className="swiper-direction ">
//                             <div className="swiper-next swiper-next-button" >
//                                 <AiOutlineArrowRight className="text-ligth" />
//                             </div>
//                             <div className="swiper-next swiper-prev-button" >
//                                 <AiOutlineArrowLeft className="text-ligth" />
//                             </div>
//                         </div>
//                     </Swiper>
//                 </>
//             }
//         </div>