import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getOrders } from '../userApi';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to load orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="fw-bold mb-4">Your Purchase History</h2>
                {loading ? (
                    <p className="text-center py-5 text-muted font-semibold">Loading orders from MongoDB...</p>
                ) : orders.length === 0 ? (
                    <div className="text-center py-5">
                        <h4 className="text-muted">No orders placed yet.</h4>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((ord) => (
                            <div className="card shadow-sm border-0 mb-4 overflow-hidden" key={ord.orderId}>
                                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3 px-4">
                                    <div>
                                        <span className="text-white-50 small font-semibold">Order ID</span>
                                        <h5 className="m-0 fw-bold">{ord.orderId}</h5>
                                    </div>
                                    <div className="text-end">
                                        <span className="text-white-50 small font-semibold">Date Placed</span>
                                        <h6 className="m-0 fw-bold">{ord.date}</h6>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <h6 className="fw-bold mb-3">Purchased Items:</h6>
                                    {ord.items.map((item, index) => (
                                        <div className="d-flex justify-content-between text-muted mb-2 border-bottom pb-1" key={index}>
                                            <span>{item.quantity}x {item.name}</span>
                                            <span className="fw-bold text-dark">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
                                        <span className="text-muted small">Deliver To: <b className="text-dark">{ord.address}</b></span>
                                        <h5 className="fw-bold text-warning m-0">Total Amount Paid: ₹{ord.totalAmount.toLocaleString('en-IN')}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Orders;