import mongoose, { model } from "mongoose";


const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true , default: 0,}
}, {
    timestamps: true
});
export const OrderModel = model("Order", orderSchema);