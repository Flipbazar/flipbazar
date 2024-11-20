const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    product: {
        name: { type: String, required: true },
        sale_price: { type: Number, required: true },
        delivery_charge: { type: Number, required: true },
    },
});

module.exports = mongoose.model("Payment", paymentSchema);
