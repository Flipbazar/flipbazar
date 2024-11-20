import "./index.css";
import { useState, useEffect } from "react";

export default function Input({ name, placeholder, type, value, onChange, ...props }) {
    const [isFocus, set_isFocus] = useState(false);
   
    
    const focus = (e) => {
        set_isFocus(true);
    }

    const onblur = (e) => {
        if (!e.target.value)
            set_isFocus(false);
    }
    const la_style = {
        position: "absolute",
        fontSize: "0.8rem",
        top: "25%",
        left: "7px",
        backgroundColor: "#fff",
        padding: "2px",
        pointerEvent: "none",
        transition: "all 200ms ease"
    }
    const la_style1 = {
        ...la_style,
        position: "absolute",
        fontSize: "0.8rem",
        top: "-22%",
        left: "7px",
        padding: "2px",
        pointerEvent: "none",
        
    }
    const capture = (e) => {
        set_isFocus(true);
    }

    return <div className="input-container">
        <input onChangeCapture={capture} onBlur={onblur} onFocus={focus} value={value} onChange={onChange} type={type} name={name} id={name} />
        <label style={isFocus ? la_style1 : la_style} htmlFor={name}>{placeholder}</label>
    </div>
}