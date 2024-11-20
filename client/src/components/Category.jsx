const categories = [
    {
        name : "Grocery",
        img_src : "Grocery.webp"
    },
    {
        name : "electronics",
        img_src : "electronics.webp"
    },
    {
        name : "fashion",
        img_src : "fashion.webp"
    }, 
    {
        name : "appliences",
        img_src : "appliences.webp"
    },
    {
        name : "mobiles",
        img_src : "mobiles.webp"
    },
    {
        name : "Home",
        img_src : "home and ferniture.webp"
    },
    {
        name : "travel",
        img_src : "travel.webp"
    }
]


function Item({name , img_src}) {
    const styles = {
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        gap: "8px"
    };
    return <div style={styles}>
        <img style={{
            width:"45px"
        }} src={img_src} alt={name} />
        <span style={{
            fontSize: "0.8rem",
        }}>{name}</span>
    </div>
}
export default function Category(props) {
    return <div  style={{
        width:"100%",
        overflowX : "auto",
        display : "flex",
        gap:"30px",
        padding:"5px 10px",
        marginTop:"125px" 
    }}>
        {
            categories.map(e => <Item key={e.name} name={e.name} img_src={`/categories/${e.img_src}`} />)
        }
    </div>
}