import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";
import toast from "react-hot-toast";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Parse query params for success flag from Google Auth redirect
    const queryParams = new URLSearchParams(location.search);
    const isAuthSuccess = queryParams.get("success");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/v1/auth/me", {
                    withCredentials: true,
                });
                setUser(data.user);
                if (!data.success) {
                    navigate("/");
                }
            } catch (error) {
                // Not authenticated
                navigate("/");
            }
        };

        if (isAuthSuccess) {
            fetchUser();
        }
    }, [isAuthSuccess, navigate]);


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // You might want to pass the amount dynamically based on a cart or order
        // For now using a fixed amount or retrieving from local storage/context if persisted

        // Note: In a real app, you should probably persist the cart state or 
        // fetch the pending order details from the backend using the authenticated user.

        const createPaymentIntent = async () => {
            try {
                const { data } = await axios.post("http://localhost:5000/api/v1/payment/create-payment-intent",
                    { amount: 2000, currency: "usd" }, // Example: $20.00
                    { withCredentials: true }
                );
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Error creating payment intent", error);
                toast.error("Failed to initialize payment");
            }
        };

        if (user) {
            createPaymentIntent();
        }

    }, [user]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    if (!user) {
        return <div>Loading Auth...</div>;
    }

    return (
        <section className="payment-section">
            <div className="container">
                <h1>Complete Your Payment</h1>
                <p>Welcome, {user.firstName}!</p>
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </section>
    );
};

export default Payment;
