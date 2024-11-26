import React, { useState } from 'react';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // OTP digits
  const [maskedOtp, setMaskedOtp] = useState(['', '', '', '', '', '']); // Masked OTP (as asterisks)

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    const newMaskedOtp = [...maskedOtp];
    newOtp[index] = value;
    newMaskedOtp[index] = '*';
    setOtp(newOtp);
    setMaskedOtp(newMaskedOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
      const newMaskedOtp = [...maskedOtp];
      newMaskedOtp[index] = '';
      setMaskedOtp(newMaskedOtp);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch("https://flipbazar-api.vercel.app/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otp.join("") }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        alert(`Error: ${errorData}`);
        return;
      }

      const data = await response.json();
      alert(data.message || "OTP submitted successfully!");
    } catch (error) {
      alert("An error occurred while submitting OTP.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.otpBox}>
        <h2 style={styles.heading}>Enter OTP</h2>
        <div style={styles.otpInputContainer}>
          {maskedOtp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={styles.otpInput}
            />
          ))}
        </div>
         {/* Copyright text */}
         <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <p style={{ fontSize: "0.8rem", color: "#999" }}>
            Copyright © 2024 Great Career Start Here | Powered byder
          </p>
        </div>
        <button
          onClick={handleOtpSubmit}
          style={styles.button}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Submit OTP
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    boxSizing: 'border-box',
  },
  otpBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 2px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '350px',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
  },
  otpInputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    width: '100%',
  },
  otpInput: {
    width: '40px',
    height: '40px',
    margin: '0 5px',
    textAlign: 'center',
    fontSize: '1.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#ff4f00',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#ff3b00',
  },
};

// Add Media Query for Mobile
const addMediaStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 480px) {
      .otpBox {
        padding: 15px;
      }
      .otpInput {
        width: 35px;
        height: 35px;
        font-size: 1.2rem;
      }
      .button {
        padding: 8px 16px;
        font-size: 0.9rem;
      }
    }
  `;
  document.head.appendChild(style);
};

addMediaStyles();

export default Otp;
