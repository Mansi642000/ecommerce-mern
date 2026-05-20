import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { MY_ORDERS_URL } from "../config";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    const fetchOrders = async () => {
        try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(MY_ORDERS_URL, {
        headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
    } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch orders");
} finally {
    setLoading(false);
    }
    };

    fetchOrders();
}, []);

if (loading) return <p className="text-center py-8">Loading your orders...</p>;
if (error) return <p className="text-center text-red-600 py-8">{error}</p>;

return (
    <div className="max-w-5xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">My Orders</h1>
    {orders.length === 0 ? (
        <p className="text-gray-600">No orders found yet.</p>
) : (
    <div className="space-y-4">
        {orders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg p-4">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p>Total: ${order.total?.toFixed(2)}</p>
            <p>Status: {order.paymentStatus}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Items: {order.items?.length || 0}</p>
            </div>
        ))}
        </div>
)}
</div>
);
}