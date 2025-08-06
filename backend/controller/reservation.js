import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone, address, orderItems, totalAmount } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone || !address) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  try {
    await Reservation.create({
      firstName,
      lastName,
      email,
      date,
      time,
      phone,
      address,
      orderItems: orderItems || [],
      totalAmount: totalAmount || 0,
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};
