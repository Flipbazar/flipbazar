import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { AiOutlineCloseCircle } from "react-icons/ai";


import {
    Pagination,
    Zoom,
    Controller
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";


import { useLoaderData } from "react-router-dom";


import Name from "../components/Product/Name";
import Analytics from "../components/Product/Analytics"
import Rating from "../components/Product/Rating";
import Price from "../components/Product/Price";
import Timer from "../components/Product/Timer";
import Warranty from "../components/Product/Warranty";
import SafeCheckout from "../components/Product/SafeCheckout";
import Checkoutbutton from "../components/Product/Footer";
import Highlights from "../components/Product/Highlights";
import Description from "../components/Product/Description";
import Related from "../components/Product/Related";


export default function Product(props) {

    const info = useLoaderData();

    const [preview, set_preview] = useState(false);

    const [ref_swi_1, set_ref_swi_1] = useState(null);
    const [ref_swi_2, set_ref_swi_2] = useState(null);

    useEffect(() => {
        if (preview) {
            document.body.style.height = "100vh";
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.height = "auto";
            document.body.style.overflow = "auto";
        }
    }, [preview])

    useEffect(() => window.scrollTo(0, 0), [])

    return <div aria-label="product page" style={
        {
            marginTop: "60px",
            backgroundColor: "#f1f2f4"
        }
    }>

        {/* Image Preview */}
        {
            preview ? window.scrollTo(0, 0) : null
        }
        <div aria-label="product image preview"
            style={
                {
                    width: "100%",
                    height: "100vh",
                    position: "fixed",
                    left: "0%",
                    top: "0%",
                    zIndex: "3",
                    backgroundColor: "#fff",
                    visibility: preview ? "visible" : "hidden"
                }
            }
        >
            <AiOutlineCloseCircle size={"40px"} style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 4
            }} onClick={() => set_preview(false)} />

            <Swiper
                modules={[Zoom, Pagination, Controller]}
                pagination={{ enabled: true, clickable: true }}
                style={{ height: "90%" }}
                loop={true}
                zoom={true}
                controller={{ control: ref_swi_2 }}
                onSwiper={(swiper) => {
                    set_ref_swi_1(swiper)
                }}
            >
                {
                    info.images.map((e, i) => <SwiperSlide zoom={true} key={i}><img width={"90%"} src={e} alt={e} /></SwiperSlide>)
                }
            </Swiper>
        </div>
        {/* End Image Preview */}


        <div aria-label="image slider">
            <Swiper
                modules={[Pagination, Controller]}
                pagination={{ enabled: true, clickable: true }}
                style={{ height: "400px", backgroundColor: "#fff" }}
                loop={true}
                controller={{ control: ref_swi_1 }}
                onSwiper={(swiper) => {
                    set_ref_swi_2(swiper)
                }}
            >
                {
                    info.images.map((e, i) => <SwiperSlide onClick={() => set_preview(true)} style={{ width: "100%", display: "grid", placeItems: "center" }} key={i}><img width={"90%"} src={e} alt={e} /></SwiperSlide>)
                }
            </Swiper>
        </div>

        <Analytics count={Math.round(Math.random()*2500)} />
        <div aria-label="product info" style={{ padding: "5px 10px", margin: "5px 0px", background: "#fff" }}>
            <Name name={info.name} />
            <Rating count={info.rating_count} rating={info.rating} />
            <Price regular_price={info.regular_price} sale_price={info.sale_price} />
        </div>
        <div aria-label="sale countdown" style={{ padding: "2px 0px", margin: "5px 0px", background: "#fff" }}>
            <Timer label={"BIG BILLION DAYS SALE IS LIVE"} />
        </div>
        <div aria-label="warranty" style={{ padding: "2px 0px", margin: "5px 0px", background: "#fff" }}>
            <Warranty brand={info.brand} warranty={2} />
        </div>
        <div aria-label="product info" style={{ padding: "2px 0px", margin: "5px 0px", background: "#fff" }}>
            <SafeCheckout cod={info.cod} />
        </div>

        <div aria-label="product Highlights" style={{ padding: "2px 10px", margin: "5px 0px", background: "#fff" }}>
            <p style={{ fontSize: "1rem", margin: "5px 0px", fontWeight: "500" }}>Product Highlights</p>
            <Highlights highlights={info.highlights} />
        </div>

        <div aria-label="product Highlights" style={{ padding: "2px 10px", margin: "5px 0px", background: "#fff" }}>
            <p style={{ fontSize: "1rem", margin: "5px 0px", fontWeight: "500" }}>Product Description</p>
            <Description description={info.description} />
        </div>

        <Related brand={info.brand} />

        <div style={{ height: "45px" }}></div>
        <Checkoutbutton name={info.name} />


    </div>
}