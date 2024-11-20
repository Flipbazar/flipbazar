import {AiFillStar, AiOutlineStar} from "react-icons/ai";

export default function Rating({rating, count, iconsize, fontsize}) {

    return <div aria-label="product-rating"
            style={{
                display:'flex',
                alignItems : "center",
                gap:"8px",
                margin:"5px 0px"
            }}
        >
         <div>{
            Array.from(new Array(5)).map((e,i) => {
                if(i < rating) {
                    return <AiFillStar key={i} color="#008C00" size={iconsize ? iconsize : "1.3rem"} />
                }
                return <AiOutlineStar key={i} color="#008C00" size={iconsize ? iconsize : "1.3rem"} />
            })
        }</div>
         <p style={{color:"#0202c9", fontSize:fontsize ? fontsize : ".9rem" , marginBottom:"4.8px"}}>{count} ratings</p>
    </div>
}