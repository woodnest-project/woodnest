import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        registeredUsers: 0,
        activeItems: 0,
        totalSales: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const usersRes = await axios.get('http://localhost:8000/api/users'); // Custom routing standard
                const itemsRes = await axios.get('http://localhost:8000/api/furnitures');
                const ordersRes = await axios.get('http://localhost:8000/api/orders');

                const salesTotal = ordersRes.data.reduce((sum, order) => sum + order.totalAmount, 0);

                setStats({
                    totalOrders: ordersRes.data.length,
                    registeredUsers: usersRes.data.length, // <── Yahan aapka register kiya hua actual count aayega
                    activeItems: itemsRes.data.length,
                    totalSales: salesTotal
                });
                setLoading(false);
            } catch (error) {
                console.error("Database se data fetch nahi ho paya:", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="text-center mt-5"><h4>Loading Live Dashboard Metrics... 🔄</h4></div>;
    }

    return (
        <div className="container-fluid py-4" style={{ background: '#f4f4f4', minHeight: '100vh' }}>
            <h2 className="fw-bold mb-4">Secure Master Dashboard 🔒</h2>
            
            <div className="row g-3 mb-4">
                <div className="col-md-3"><div className="card p-3 shadow-sm border-0 bg-dark text-white"><h5>Total Orders</h5><h3>{stats.totalOrders}</h3></div></div>
                <div className="col-md-3"><div className="card p-3 shadow-sm border-0 bg-primary text-white"><h5>Registered Users</h5><h3>{stats.registeredUsers}</h3></div></div>
                <div className="col-md-3"><div className="card p-3 shadow-sm border-0 bg-success text-white"><h5>Active Items</h5><h3>{stats.activeItems}</h3></div></div>
                <div className="col-md-3"><div className="card p-3 shadow-sm border-0 bg-warning text-dark"><h5>Total Sales</h5><h3>₹{stats.totalSales.toLocaleString('en-IN')}</h3></div></div>
            </div>

            <div className="card p-4 shadow-sm border-0">
                <h5 className="fw-bold mb-3">Product Sales Trends</h5>
                <div className="d-flex align-items-end justify-content-between" style={{ height: '200px', borderBottom: '2px solid #ddd' }}>
                    <div style={{ width: '40px', background: '#8b5a2b', height: '40%' }}></div>
                    <div style={{ width: '40px', background: '#8b5a2b', height: '75%' }}></div>
                    <div style={{ width: '40px', background: '#8b5a2b', height: '30%' }}></div>
                    <div style={{ width: '40px', background: '#8b5a2b', height: '60%' }}></div>
                    <div style={{ width: '40px', background: '#8b5a2b', height: '50%' }}></div>
                </div>
                <div className="d-flex justify-content-between mt-2 small text-muted">
                    <span>Sofas</span><span>Tables</span><span>Chairs</span><span>Beds</span><span>Decor</span>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;