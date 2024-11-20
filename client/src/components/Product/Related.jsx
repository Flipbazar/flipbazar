import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";


import data from "../../products.json";

import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import Card from "../Card";


function sortSix() {
    const product_arr = new Set();
    for (let i = 0; i < data.products.length; i++) {
        let randIndex = Math.floor(Math.random() * data.products.length);
        product_arr.add(data.products[randIndex]);
        if (product_arr.size === 6) {
            return Array.from(product_arr);
        }
    }
    
}

export default function Related({ brand }) {
    const [products, set_products] = useState(sortSix());
    
    useEffect(()=>{
        console.log(sortSix())
    },[])
    return <div aria-label="related products" style={{
        padding:"20px 10px",
        backgroundColor:"#fff",
        margin:"10px 0px"
    }}>
            <p style={{
                margin:"10px 0px",
                marginBottom:"50px",
                fontSize:"1rem",
                fontWeight:"500"
            }}>Related Products</p>
        <Swiper
            modules={[Navigation]}
            navigation={{enabled:true}}
            slidesPerView={2}
            loop={true}
        >
            {
                products.map((e , i) => {
                    return <SwiperSlide style={{border:"none"}} key={i} >
                        <Card img_src={e.thumb} name={e.name} off={"10"} />
                    </SwiperSlide>
                })
            }

        </Swiper>
    </div>
}