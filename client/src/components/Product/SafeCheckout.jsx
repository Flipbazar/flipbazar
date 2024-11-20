import { BsHouseCheck, BsCash } from "react-icons/bs";


export default function SafeCheckout({cod}) {
    const style = {
        display:"grid",
        placeItems:"center",
        gap:"5px",
        padding:"0 5px"
    }
    
    return <div aria-label="safe checkout"
        style={{
            display:"grid",
            alignItems:"center",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"20px",
            margin:"0px 0px",
            padding:"8px 0px",
            backgroundColor:"#fff"
        }}
    >
        <div style={style}>
            <BsHouseCheck color="#367CF9" size={"25px"} />
            <p style={{textAlign:"center", fontSize:"0.6rem"}}>7 Days Service Center</p>
        </div>
        <div style={style}>
            <BsCash color={ cod ? "#22a522" : "#808080"} size={"25px"} />
            <p style={{textAlign:"center", fontSize:"0.6rem"}}>{cod ? "Cash On Delivery available" : "Cash On Delivery not available"}</p>
        </div>
        <div style={style}>
            <img src="/fa_62673a.png" width={"70px"} alt="f-assured"/>
            <p style={{textAlign:"center", fontSize:"0.6rem"}} >Flipkart Assured Plus</p>
        </div>
    </div>
}