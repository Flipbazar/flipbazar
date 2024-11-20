import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import "./Navbar.css";
import SearchInput from "./SearchInput";
import logo from "../assets/logo.svg";

export default function Navbar(props) {
    return <nav>
        <div className="f-1">
            <div className="f-1-ch1">
                <AiOutlineMenu  color="#fff" size={"20px"} />
                <img style={{marginLeft:"-35px", pointerEvents:"none"}} src={logo}  alt="logo" />                 
            </div>
            <div className="f-1-ch2">
                <div>
                    <AiOutlineUser color="#fff" size={"20px"} />
                    <span style={{color:"#fff"}}>Login</span>
                </div>
                <div>
                    <AiOutlineShoppingCart color="#fff" size={"20px"} />
                </div>
            </div>
        </div>
        <SearchInput />
    </nav>
}