import {Swiper , SwiperSlide } from "swiper/react";
import {  Autoplay, Pagination } from "swiper/modules";

import "./Sale.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";



export default function Sale(props) {
    return <section>
        <Swiper
            modules={[Autoplay, Pagination,]}
            pagination={{clickable:true}}
            autoplay={{delay:"5000"}}
            loop={true}
        >
            <SwiperSlide style={{height:"250px", backgroundImage:"url(/banner/1.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}></SwiperSlide>
            <SwiperSlide style={{height:"250px", backgroundImage:"url(/banner/2.webp)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}></SwiperSlide>
            <SwiperSlide style={{height:"250px", backgroundImage:"url(/banner/3.webp)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}></SwiperSlide>
            <SwiperSlide style={{height:"250px", backgroundImage:"url(/banner/4.webp)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}></SwiperSlide>
            <SwiperSlide style={{height:"250px", backgroundImage:"url(/banner/5.webp)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}></SwiperSlide>
            
        </Swiper>
    </section>
}