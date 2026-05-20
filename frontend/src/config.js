const DEV = "http://localhost:5000/api";

export const API_URL = import.meta.env.VITE_API_URL || DEV;
export const LOGIN_URL = `${API_URL}/auth/login`;
export const SIGNUP_URL = `${API_URL}/auth/signup`;
export const MY_ORDERS_URL = `${API_URL}/orders/my`;
export const CREATE_ORDER_URL = `${API_URL}/orders`;
export const CREATE_PAYMENT_INTENT_URL = `${API_URL}/create-payment-intent`;

export const STRIPE_PUBLISHABLE_KEY =
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
    "";