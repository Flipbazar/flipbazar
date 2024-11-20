import { useNavigate } from "react-router-dom";

export default function Footer({name}) {
    const navigate = useNavigate();

    

    const style = {
        width:"50%",
        height: "100%",
        border:"none",
        outline : "none",
        fontWeight:"500",
        backgroundColor:"#fff"
    }
    return <div style={
        {
      
            width:"100%",
            height:"50px",
            position: "fixed",
            bottom:"0%",
            left:"0%",
            zIndex:"2"
        }
    }>
        <button style={style}>Add to Cart</button>
        <button onClick={()=> navigate(`/checkout/${name}`)} style={{...style , backgroundColor : "#2874f0", color : "#fff" , borderTopLeftRadius:"3px", borderBottomLeftRadius:"3px"}}>Buy Now</button>
    </div>
}