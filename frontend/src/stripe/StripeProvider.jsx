// src/stripe/StripeProvider.jsx
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

export default function StripeProviderWrapper({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
