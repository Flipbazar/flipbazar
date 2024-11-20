import {BiRupee} from "react-icons/bi"

export default function Price({regular_price, sale_price,iconsize, fontsize}) {
    return <div aria-label="product price"
        style={{
            display:"flex",
            alignItems:"center",
            gap:"5px"
            , fontWeight:"500",
            fontSize:fontsize ? fontsize : "1.2rem"
        }}
    >
        <div><p style={{color: "#008C00"}}>
            {
                Math.floor(((regular_price - sale_price)/regular_price) *100 )
            }% off
            </p></div>
        <div>
            <del>{regular_price}</del>
        </div>
        <div style={{
            display:"flex",
            alignItems:"center"
        }}>
            <BiRupee size={iconsize ? iconsize : "1.4rem"} /> <p>{sale_price}</p>
        </div>
    </div>
}