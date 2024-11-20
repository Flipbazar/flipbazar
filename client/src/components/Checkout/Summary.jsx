import Rating from "../../components/Product/Rating";
import Price from "../../components/Product/Price";
import { BiRupee } from "react-icons/bi";


export default function Summary({ address, product, active, set_active }) {
    return <div aria-label="Order Summary" style={{
        backgroundColor: "#f1f3f6",
        padding: "20px, 0"
    }}>

        <div aria-label="adddress" style={{
            padding: "10px 20px",
            backgroundColor: "#fff",
            margin: "15px 0px",
            display: 'flex',
            flexDirection: "column",
            gap: "10px"
        }}>
            <p style={{ fontWeight: "500", fontSize: "1rem" }}>Deliver to:</p>
            <p style={{ fontSize: ".8rem", fontWeight: "500" }}>{address.name}</p>
            <p style={{ fontSize: ".8rem" }}>{address.address1} {address.address2} {address.state} {address.pincode} </p>
            <p style={{ fontSize: ".8rem" }}>{address.phone}</p>
        </div>


        <p style={{ padding: "15px 20px", backgroundColor: "#fff", fontSize: "0.8rem" }}>
            Delivery agent will open the package so you can check the correct product, damage or missing items.
        </p>

        <div aria-label="product" style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            padding: "10px 10px",
            margin: "15px 0px",
            gap: "10px",
            backgroundColor: "#fff"
        }}>
            <div aria-label="product image" style={{ display: "grid", placeItems: "center" }}>
                <img width={"100px"} src={product.thumb} alt={product.name} />
            </div>
            <div aria-label="product info" style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "1rem",margin:"8px 0", fontWeight: "500" }}>{product.name}</p>
                <Price iconsize={"1rem"} fontsize={"0.8rem"} regular_price={product.regular_price} sale_price={product.sale_price} />
                <Rating iconsize={"1rem"} fontsize={".8rem"} count={product.rating_count} rating={product.rating} />
                <p style={{ fontSize: "0.8rem", marginTop: "auto", fontWeight: "500" }}>Delivery in {product.delivery} days</p>
            </div>

        </div>
        <div aria-label="price details"
            style={{
                padding: "10px 20px",
                backgroundColor: "#fff",
                margin: "0px 0px",
            }}
        >
            <p style={{ fontSize: "1rem", margin: "20px 0px", fontWeight: "500" }}>Price Details</p>
            <div aria-label="details">
                <p style={{ display: 'flex', fontSize: "0.8rem", margin: "10px 0px", justifyContent: "space-between" }}>
                    <span>Price</span>
                    <span style={{ display: "flex", alignItems: "center" }}><BiRupee size={"15px"} />{product.regular_price}</span>
                </p>
                <p style={{ display: 'flex', justifyContent: "space-between", fontSize: "0.8rem", margin: "10px 0px" }}>
                    <span>Discount</span>
                    <span style={{ display: "flex", alignItems: "center" }}><BiRupee size={"15px"} />-{product.regular_price - product.sale_price}</span>
                </p>
                <p style={{ display: 'flex', justifyContent: "space-between", fontSize: "0.8rem", margin: "10px 0px" }}>
                    <span>Delivery Charge</span>
                    <span style={{ display: "flex", alignItems: "center", color:product.delivery_charge?"#000":"green" }}>{product.delivery_charge ? <BiRupee size={"15px"} /> : null}{product.delivery_charge ? product.delivery_charge : "DELIVERY FREE"}</span>
                </p>
            </div>
        </div>

        <p style={{ borderTop: "0.5px dashed rgb(224 224 224)", padding: "15px 20px", backgroundColor: "#fff", display: 'flex', justifyContent: "space-between", fontSize: "0.9rem", fontWeight: "500" }}>
            <span>Total Amount</span>
            <span style={{ display: "flex", alignItems: "center" }}><BiRupee size={"15px"} />{product.sale_price + product.delivery_charge}</span>
        </p>
        <p style={{ borderTop: "0.5px solid rgb(224 224 224)", color: "green", padding: "15px 15px", backgroundColor: "#fff", fontWeight: "500", fontSize: ".9rem" }}>
            <span style={{ display: "flex", alignItems: "center" }}><span>You Will Save</span> <BiRupee size={"15px"} /><span> {product.regular_price - product.sale_price}  On this order</span></span>
        </p>
 
 
        <div aria-label="trust">
            <div aria-label="container"
                style={{
                    display:"grid",
                    gridTemplateColumns:"1fr 7fr",
                    placeItems:"center",
                    padding:"10px 20px",
                    margin:"10px 0px",
                    gap:"15px"
                }}
            >
                <div aria-label="image">
                    <img src="/shield-checkmark-line-icon.svg" width={"30px"} />
                </div>
                <div aria-label="message">
                    <p style={{color : "#8a8a8a",fontSize:"0.8rem", marginBottom:"8px"}}>Safe and secure payments. Easy returns. 100% Authentic products</p>
                </div>
            </div>
        </div>
 
 
        <div style={{ height: "70px" }}></div>
{/*         
        <div style={{
            position: "fixed",
            bottom: "0%",
            left: "0%",
            width: "100%",
            height: "50px",

        }}>
            <button style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#2874f0",
                color: "#fff",
                fontWeight: "500",
                fontSize: "1rem",
                outline: "none",
                border: "none"
            }} onClick={() => {
                set_active(active + 1)
            }}>Continue</button>
        </div> */}


<div style={{
            position: "fixed",
            bottom: "0%",
            left: "0%",
            width: "100%",
            height: "60px",
            display: "flex",
            padding: "10px",
            backgroundColor: "#fff"
        }}>
            <p style={{ flex: "1", fontSize: "1.1rem", fontWeight: "500", margin: "auto", padding: "0 20px" }}>{product.sale_price + product.delivery_charge}</p>
            <button style={{
                backgroundColor: "#2874f0",
                color: "#fff",
                fontWeight: "500",
                fontSize: "1rem",
                outline: "none",
                border: "none",
                borderRadius: "5px",
                flex: "1"
            }} onClick={()=> set_active(active + 1)}>Continue</button>
        </div>



        
    </div>
}