import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import {AiOutlineArrowLeft} from "react-icons/ai";
import "./Navbar1.css";
import {useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Navbar1(props) {

    const [url , set_url ] = useState(-1);

    const location = useLocation()

    useEffect(()=>{
        if(location.pathname.includes("/product")){
            set_url("..")
        }else {
            set_url(-1)
        }
    })

    const navigate = useNavigate();
    return <nav className="nav-1">
    <div className="f-1">
        <div className="f-1-ch1">
            <AiOutlineArrowLeft onClick={()=>navigate(url)} color="#fff" size={"20px"} />
            <img width={"35px"} onClick={()=>navigate("/")} src="/logo-2.png"  alt="logo" />                 
        </div>
        <div className="f-1-ch2">
            <div>
                <AiOutlineSearch color="#fff" size={"20px"} />
            </div>
            <div>
                <AiOutlineShoppingCart color="#fff" size={"20px"} />
            </div>
        </div>
    </div>
</nav>
}