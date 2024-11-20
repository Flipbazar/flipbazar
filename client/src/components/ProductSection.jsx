import "./ProductSection.css";
import Card from "./Card";



export default function ProductSection({title, bg_color, products }) {
    return <section style={{backgroundColor: bg_color, height:"auto", padding: "10px"}}>
        <p style={{margin: "15px 0px", fontWeight:"bold"}}>{title}</p>
        <div className="container">
            {
                products.map(e => <Card key={e.name} img_src={e.thumb} name={e.name} off={Math.round(((e.regular_price - e.sale_price) / e.regular_price )* 100)} />)
            }
        </div>
    </section>
}