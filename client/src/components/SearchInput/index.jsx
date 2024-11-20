import { AiOutlineSearch } from "react-icons/ai"
import "./index.css";

export default function SearchInput(props) {
    return <div className="search">
        <label style={{flex: "0 0 auto" ,width:"35px",  display:"grid" , placeItems:"center"}} htmlFor="search">
            <AiOutlineSearch  size={"22px"}  color="#808080" />
        </label>
        <input style={{flex: "1 1 auto", height:"100%", 
        outline:"none",
        border:"none",
        paddingRight:"5px",
        
    }} placeholder="Search for Products, Brands and More" type="text" name="search" id="search" />
    </div>
}