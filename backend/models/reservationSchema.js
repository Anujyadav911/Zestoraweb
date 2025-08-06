import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must be at least 3 characters "],
    maxLength: [30, "First name cannot exceed 30 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must be at least 3 characters "],
    maxLength: [30, "Last name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Plzz enter a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [7, "Phone number must contain 7 digits "],
    maxLength: [10, "Phone number must contain 10 digits"],
  },
  address: {
    type: String,
    required: true,
    minLength: [10, "Address must be at least 10 characters"],
    maxLength: [200, "Address cannot exceed 200 characters"],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  orderItems: {
    type: Array,
    default: [],
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
