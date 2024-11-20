import "./Highlights.css";

export default function Highlights({highlights}){
    

    return <div className="highlights" aria-label="product highlights" dangerouslySetInnerHTML={{
        __html:highlights
    }}>
        
    </div>
}