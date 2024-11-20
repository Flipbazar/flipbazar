import {  DiGoogleAnalytics } from "react-icons/di";

export default function Analytics({count}) {
    return <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"5px",
        padding:"10px 0px",
        backgroundColor:"#fff"

    }} aria-label="analytics">
        <DiGoogleAnalytics color="#309c56" size={"20px"} />
        <span style={{ fontSize:".7rem", fontWeight:"500"}}>{count} People Reach Out in Last 7 Days</span>
    </div>
}