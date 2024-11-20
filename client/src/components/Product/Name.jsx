export default function Name({name}) {
    return <div style={{
        margin:"10px 0px",
    }} aria-label="Product Name">
        <p style={{fontSize:'1rem'}}>{name}</p>
    </div>
}