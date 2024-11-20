import { useContext, useEffect, useRef } from "react";
import timerContext from "../../context/TimerContext";

export default function Timer({ label }) {

    const hrs_ref = useRef();
    const min_ref = useRef();
    const sec_ref = useRef();

    const countdown = useContext(timerContext);


    useEffect(() => {
        const interval = setInterval(() => {
            let diff = (new Date(countdown) - new Date()) / 1000;
            if(diff < 0) {
                return
            }
            hrs_ref.current.innerHTML = Math.floor((diff / 3600) % 24);
            min_ref.current.innerHTML = Math.floor((diff / 60) % 60);
            sec_ref.current.innerHTML = Math.floor(diff % 60);
        }, 1000);
        return () => clearInterval(interval)
    }, [])


    const style = {
        fontSize:"1.6rem",
        color:"#2874f0",
        fontWeight:"500"
    }

    return <div aria-label="countdown timer"
            style={{
                padding:"10px 16px",
                margin:"10px 0px",
                backgroundColor:"#fff"
            }}
        >
        <p style={{textAlign:"center", fontSize:"1.1rem", fontWeight:"500"}}>{label}</p>
        <div aria-label="timer"
            style={{
                display:"grid",
                placeItems:"center",
                gridTemplateColumns:"repeat(3,1fr)",
                margin:"10px 0"
            }}
        >
        <div id="hou">
            <span style={style} ref={hrs_ref}>0</span>
            <span style={{color : "#585858"}}>hrs</span>
        </div>
        <div id="min">
            <span style={style} ref={min_ref}>0</span>
            <span style={{color : "#585858"}}>min</span>
        </div>
        <div id="sec">
            <span style={style} ref={sec_ref}>0</span>
            <span style={{color : "#585858"}}>sec</span>
        </div>
        </div>
    </div>
}