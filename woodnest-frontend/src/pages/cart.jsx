import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createOrder } from '../userApi';

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState("");

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('woodnest_cart')) || [];
        setCart(savedCart);
    }, []);

    const updateQuantity = (id, delta) => {
        const updated = cart.map(item => {
            if (item._id === id) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: Math.max(1, newQty) };
            }
            return item;
        });
        setCart(updated);
        localStorage.setItem('woodnest_cart', JSON.stringify(updated));
    };

    const removeItem = (id) => {
        const filtered = cart.filter(item => item._id !== id);
        setCart(filtered);
        localStorage.setItem('woodnest_cart', JSON.stringify(filtered));
    };

    const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const getTax = () => Math.round(getSubtotal() * 0.18); // GST 18%
    const getTotal = () => getSubtotal() + getTax();

    const handleCheckout = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('woodnest_user'));

        if (!user) {
            alert("Please login first to place an order!");
            navigate('/login');
            return;
        }

        if (address.trim() === "") {
            alert("Please provide a valid delivery address!");
            return;
        }

        const newOrder = {
            orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
            address: address,
            items: cart.map(c => ({
                productId: c._id,
                name: c.name,
                price: c.price,
                quantity: c.quantity
            })),
            totalAmount: getTotal()
        };

        try {
            const response = await createOrder(newOrder);
            if (response.status === 201) {
                alert("Order Placed Successfully in MongoDB!");
                setCart([]);
                localStorage.setItem('woodnest_cart', JSON.stringify([]));
                navigate('/orders');
            }
        } catch (error) {
            console.error(error);
            alert("Checkout Failed. Make sure your server is running!");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="fw-bold mb-4">Your Shopping Cart</h2>
                {cart.length === 0 ? (
                    <div className="text-center py-5">
                        <h4 className="text-muted">Your cart is empty.</h4>
                        <button onClick={() => navigate('/')} className="btn btn-dark mt-3">Start Shopping</button>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            {cart.map((item) => (
                                <div className="card mb-3 shadow-sm border-0 p-3" key={item._id}>
                                    <div className="d-flex align-items-center gap-3">
                                        <img 
                                            src={item.image.startsWith('http') ? item.image : `http://localhost:8000/uploads/${item.image}`} 
                                            alt={item.name} 
                                            className="rounded" 
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                                        />
                                        <div className="flex-grow-1">
                                            <h5 className="fw-bold text-dark mb-1">{item.name}</h5>
                                            <h6 className="text-warning fw-bold">₹{item.price.toLocaleString('en-IN')}</h6>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 border rounded p-1">
                                            <button onClick={() => updateQuantity(item._id, -1)} className="btn btn-sm btn-light py-0 px-2 fw-bold">-</button>
                                            <span className="fw-bold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, 1)} className="btn btn-sm btn-light py-0 px-2 fw-bold">+</button>
                                        </div>
                                        <button onClick={() => removeItem(item._id)} className="btn btn-outline-danger btn-sm">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-lg-4 col-12">
                            <div className="card shadow-sm border-0 p-4">
                                <h4 className="fw-bold mb-3 border-b pb-2">Order Summary</h4>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>
                                    <span className="fw-bold">₹{getSubtotal().toLocaleString('en-IN')}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2 text-success">
                                    <span>Shipping:</span>
                                    <span className="fw-bold">Free</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Tax (GST 18%):</span>
                                    <span className="fw-bold">₹{getTax().toLocaleString('en-IN')}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4 fs-5 fw-bold text-dark">
                                    <span>Total:</span>
                                    <span className="text-warning">₹{getTotal().toLocaleString('en-IN')}</span>
                                </div>

                                <form onSubmit={handleCheckout}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Delivery Address *</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter complete address" 
                                            value={address} 
                                            onChange={(e) => setAddress(e.target.value)} 
                                            className="form-control" 
                                            required 
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-dark w-100 py-2.5 fw-bold">Proceed & Buy Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
