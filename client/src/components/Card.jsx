import "./Card.css";
import { useNavigate } from "react-router-dom";

export default function Card({
    name , img_src, off
    }) {
        const navigate = useNavigate();
        
        return <div className="card" onClick={() => navigate(`/product/${name}`)}>
            <div className="image">
                <img src={img_src} alt={name} />
            </div>
            <div className="name">
                <p>{name}</p>
            </div>
            <div className="off">
                <p>Upto {off}% Off</p>
            </div>
        </div>
}