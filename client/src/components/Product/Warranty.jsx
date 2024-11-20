export default function Warranty({brand, warranty}) {
    return <div aria-label="warranty" style={{backgroundColor: "#fff" , margin:"5px 0px", display:"flex", alignItems:"center", gap:"10px", padding:"5px 16px"}}>
        <div aria-label="brand logo">
            <img width={"45px"} src={`/${brand}.png`} alt={brand} />
        </div>
        <div>
            <p style={{fontSize:"0.8rem", padding: "0 10px"}}>
            {warranty} Year Warranty on this Product from Manufacturer {brand}
            </p>
        </div>
    </div>
}