// src/stripe/StripeProviderWrapper.jsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_YourStripePublicKeyHere"); // replace with your Stripe public key

export default function StripeProviderWrapper({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
