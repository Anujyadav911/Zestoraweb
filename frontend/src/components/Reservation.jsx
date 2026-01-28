import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();

  const handleReservation = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!firstName || !lastName || !email || !date || !time) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (items.length === 0) {
      toast.error('Please add items to cart before placing order');
      return;
    }

    // Save form data to localStorage so we can retrieve it after redirect
    localStorage.setItem("reservationData", JSON.stringify({
      firstName, lastName, email, date, time, phone, address,
      orderItems: items,
      totalAmount: getTotalPrice()
    }));

    // Redirect to Backend Google Auth
    window.location.href = "http://localhost:5000/api/v1/auth/google";
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A ORDER</h1>
            <p>For Further Questions, Please Call</p>


            {items.length > 0 && (
              <div className="cart-summary">
                <h3>Order Summary ({items.length} items)</h3>
                <div className="cart-items-list">
                  {items.map((item) => (
                    <div key={item.id} className="cart-item-summary">
                      <span>{item.title}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                </div>
              </div>
            )}
            <form>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="time"
                  placeholder="Time "
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="email_tag"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Delivery Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="address-input"
                />
              </div>
              <button type="submit" onClick={handleReservation}>
                ORDER NOW{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
