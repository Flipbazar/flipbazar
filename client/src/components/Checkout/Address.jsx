import Input from "./Input";
import { useState } from "react";

export default function Address({ address, set_address, active, set_active }) {
    const [isLoading, setIsLoading] = useState(false);

    const handle = ({ target: { name, value } }) => {
        set_address({
            ...address,
            [name]: value,
        });
    };

    const submitAddress = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(address),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                set_active(active + 1); // Proceed to next step
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error submitting address:", error);
            alert("An error occurred while submitting the address.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                aria-label="Checkout Address"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "10px",
                    margin: "20px 0px",
                }}
            >
                <Input
                    value={address.name}
                    onChange={handle}
                    type={"text"}
                    name={"name"}
                    placeholder={"Full Name (Required)*"}
                />
                <Input
                    value={address.phone}
                    onChange={handle}
                    type={"number"}
                    name={"phone"}
                    placeholder={"Phone Number (Required)*"}
                />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                    }}
                >
                    <Input
                        value={address.state}
                        onChange={handle}
                        type={"text"}
                        name={"state"}
                        placeholder={"State (Required)*"}
                    />
                    <Input
                        value={address.pincode}
                        onChange={handle}
                        type={"number"}
                        name={"pincode"}
                        placeholder={"Pincode (Required)*"}
                    />
                </div>
                <Input
                    value={address.address1}
                    onChange={handle}
                    type={"text"}
                    name={"address1"}
                    placeholder={"City Village Area (Required)*"}
                />
                <Input
                    value={address.address2}
                    onChange={handle}
                    type={"text"}
                    name={"address2"}
                    placeholder={"Road Name , Colony Building Name (Required)*"}
                />
            </div>

            <div style={{ height: "60px" }}></div>
            <div
                style={{
                    position: "fixed",
                    bottom: "0%",
                    left: "0%",
                    width: "100%",
                    height: "50px",
                }}
            >
                <button
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#2874f0",
                        color: "#fff",
                        fontWeight: "500",
                        fontSize: "1rem",
                        outline: "none",
                        border: "none",
                    }}
                    onClick={submitAddress}
                    disabled={isLoading}
                >
                    {isLoading ? "Submitting..." : "Continue"}
                </button>
            </div>
        </>
    );
}
