import React, { useState } from 'react';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // OTP digits
  const [maskedOtp, setMaskedOtp] = useState(['', '', '', '', '', '']); // Masked OTP (as asterisks)

  // Handle OTP input and move to the next field automatically
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    const newMaskedOtp = [...maskedOtp];
    
    newOtp[index] = value; // Update actual OTP
    newMaskedOtp[index] = '*'; // Mask the OTP with asterisks

    setOtp(newOtp);
    setMaskedOtp(newMaskedOtp);

    // Move focus to the next field
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace and move to previous field
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Only focus on previous field if current field is empty
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
      // Reset the masked value to empty only if the digit is deleted
      const newMaskedOtp = [...maskedOtp];
      newMaskedOtp[index] = ''; // Reset only on backspace (don't show *)
      setMaskedOtp(newMaskedOtp);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch("https://flipbazar-api.vercel.app/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp.join(""), // Send actual OTP values
        }),
      });

      if (!response.ok) {
        const errorData = await response.text(); // Get the error response as text
        console.error("Error submitting OTP:", errorData);
        alert(`Error: ${errorData}`);
        return;
      }

      const data = await response.json();
      alert(data.message || "OTP submitted successfully!");
    } catch (error) {
      console.error("Error submitting OTP:", error);
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
              value={digit} // Display masked value (as asterisks)
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={styles.otpInput}
            />
          ))}
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
    justifyContent: 'center',  // Horizontally center content
    alignItems: 'center',      // Vertically center content
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  otpBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 10px',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
  },
  otpInputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    width: '100%',
  },
  otpInput: {
    width: '60px',  // Increased size of the input box
    height: '60px', // Increased height for larger size
    textAlign: 'center',
    fontSize: '2rem',  // Larger font-size for the asterisk
    borderRadius: '10px',
    border: '1px solid #ccc',
    margin: '0 5px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px 30px',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#ff4f00',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#ff3b00',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default Otp;
