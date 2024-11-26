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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for toggling dropdown
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
      {/* Payment Method Images Section */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <img
          src="/thumb/visa.png"
          alt="Visa"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
        <img
          src="/thumb/mastercard.png"
          alt="MasterCard"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
        <img
          src="/thumb/google.png"
          alt="Google Pay"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
        <img
          src="/thumb/phonepay.png"
          alt="PhonePay"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
        <img
          src="/thumb/rupay.png"
          alt="Rupay"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
      </div>

      <div
        aria-label="payment options"
        style={{ padding: "20px", backgroundColor: "#fff" }}
      >
        <h2>Enter Card Details</h2>

        {/* Toggle Dropdown for Card Details */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#f1f1f1",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
          }}
        >
          {isDropdownOpen ? "Hide Card Details" : "Show Card Details"}
        </button>

        {isDropdownOpen && (
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
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9/]/g, ""); // Allow only numbers and "/"
                  setCardDetails({ ...cardDetails, expiryDate: value });
                }}
                maxLength="5"
                inputMode="numeric" // Ensures numeric keyboard on mobile devices
                pattern="\d{2}/\d{2}" // Enforces the MM/YY pattern
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
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Allow only numeric input
                  setCardDetails({ ...cardDetails, cvv: value });
                  setDisplayCvv(isFocused ? value : value.replace(/./g, "*")); // Mask CVV on blur
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  setDisplayCvv(cardDetails.cvv.replace(/./g, "*")); // Mask CVV on blur
                }}
                maxLength="3"
                inputMode="numeric" // Ensures numeric keyboard on mobile devices
                pattern="\d{3}" // Enforces a numeric pattern for CVV
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
        )}
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
              {product.sale_price || 0}
            </span>
          </p>
          <p
            style={{
              display: "flex",
              fontSize: "0.8rem",
              margin: "10px 0px",
              justifyContent: "space-between",
            }}
          >
            <span>Delivery Charge</span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <BiRupee size={"15px"} />
              {product.delivery_charge || 0}
            </span>
          </p>
        </div>
        <p
          style={{
            display: "flex",
            fontSize: "1rem",
            fontWeight: "600",
            marginTop: "15px",
            justifyContent: "space-between",
          }}
        >
          <span>Total Price</span>
          <span style={{ display: "flex", alignItems: "center" }}>
            <BiRupee size={"15px"} />
            {product.sale_price + (product.delivery_charge || 0)}
          </span>
        </p>
      </div>

      <div
        style={{
          margin: "20px 0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={placeOrder}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 25px",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            border: "none",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Place Order"}
          <BiCheck size={"1.3rem"} />
        </button>
      </div>

      <footer
        style={{
          backgroundColor: "#f8f9fa",
          padding: "15px 0",
          textAlign: "center",
        }}
      >
        <p>Copyright © 2024 Great Career Start Here | Powered byder</p>
      </footer>
    </div>
  );
}