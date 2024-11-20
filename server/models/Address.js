const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true },
});

module.exports = mongoose.model("Address", addressSchema);
