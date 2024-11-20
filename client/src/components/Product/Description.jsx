import { useState, useRef, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";

import "./Description.css"

export default function Decription({ description }) {

    const [height, setheight] = useState("200px");

    const ref = useRef(null);

    useEffect(()=>{
        ref.current.style.transition = "all 200ms ease"
    },[])
    
    return <div>
        <div ref={ref} className="description" style={{overflow:"hidden", fontSize: ".8rem", height: height }} aria-label="product description" dangerouslySetInnerHTML={{
            __html: description
        }}></div>
        <div aria-label="button" style={{
            display:'flex',
            alignItems:"center",
            justifyContent:"space-between",
            padding:"15px 0px",
            cursor:"pointer"
        }} onClick={()=>{
            if(height === "200px") {
                setheight("auto")
            }else {
                setheight("200px")
            }
        }}>
            <p style={{color:"rgb(23 74 158)",fontSize:"0.8rem", fontWeight:"500"}}>VIEW ALL</p>
            <AiOutlineRight style={{transition : "all 200ms ease",color:"rgb(23 74 158)",fontSize:"0.8rem", transform: height == "200px" ? "rotate(0deg)" : "rotate(90deg)"}} />
        </div>
    </div>
}