import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiRupee, BiCheck } from "react-icons/bi";

export default function Payment({ product }) {
  const [isFocused, setIsFocused] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [displayCvv, setDisplayCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const rawValue = value.replace(/\D/g, "");
      const formattedValue = rawValue.replace(/(.{4})/g, "$1 ").trim();
      setCardDetails({ ...cardDetails, cardNumber: formattedValue });
    } else if (name === "cvv") {
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
          cardNumber: cardDetails.cardNumber.replace(/\s+/g, ""),
          expiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv,
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
     
    >
      {/* Payment Method Images Section */}
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <img
          src="/thumb/Visa.png"
          alt="Visa"
          style={{ width: "50px", height: "35px", cursor: "pointer" }}
        />
        <img
          src="/thumb/Maestro.png"
          alt="Maestro "
          style={{ width: "50px", height: "35px", cursor: "pointer" }}
        />
        <img
          src="/thumb/rupay.png"
          alt="Rupay"
          style={{ width: "50px", height: "35px", cursor: "pointer" }}
        />
        <img
          src="/thumb/master.png"
          alt="master"
          style={{ width: "50px", height: "35px", cursor: "pointer" }}
        />
      </div>

      {/* Card Details Section */}
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
            maxLength="19"
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
                setDisplayCvv(cardDetails.cvv.replace(/./g, "*"));
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

      {/* Price Details Section */}
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

      {/* Total Amount Section */}
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

      {/* Footer Button */}
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

      {/* Footer Section */}
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
