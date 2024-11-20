import { Link } from "react-router-dom"
import Category from "../components/Category"
import Sale from "../components/Sale"
import ProductSection from "../components/ProductSection"
import data from "../products.json";

import {useEffect} from "react"
import Timer from "../components/Product/Timer";

const oneplus = data.products.filter((e) => {
    if(e.brand==="oneplus"){
        return e
    }
});

const boat = data.products.filter(e => {
    if(e.brand === "boat") {
        return e;
    }
})

const noise = data.products.filter(e => {
    if(e.brand === "noise") {
        return e;
    }
})


export default function Home(props) {
    
    
    useEffect(()=>{
        document.body.style.height = "auto"
        document.body.style.overflow = "auto";
    },[])

    return <>
        <Category/>
        <Sale/>
        <Timer label={"FLIPKART BIG SALE"} hourse={2} />
 
        <ProductSection products={oneplus} title={"OnePlus Featured"} bg_color={"white"}/>
        <br />
        <ProductSection products={boat} title={"Boat Mega Sale"} bg_color={"white"}/>
        <br />
        <ProductSection products={noise} title={"Noise New Launched"} bg_color={"white"}/>
 
    </>
}