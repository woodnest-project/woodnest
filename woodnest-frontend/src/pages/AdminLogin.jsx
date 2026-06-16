import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials.name === 'admin' && credentials.password === 'admin123') {
            alert('Welcome, Admin! Access Granted.');
            navigate('/admin/dashboard'); 
        } else {
            setError('Invalid Admin Username or Password.');
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{
            background: '#2b2b2b',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="card p-4 shadow-lg border-0" style={{ width: '400px', borderRadius: '15px', background: 'rgba(255, 255, 255, 0.95)' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-dark m-0">Admin Login</h2>
                    <p className="text-muted small mt-1">WoodNest Control Subsystem</p>
                </div>

                {error && <div className="alert alert-danger text-center py-2 small">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold text-secondary">Admin Username</label>
                        <input 
                            type="text" 
                            name="name"
                            className="form-control border-dark-subtle" 
                            placeholder="Enter username"
                            value={credentials.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold text-secondary">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            className="form-control border-dark-subtle" 
                            placeholder="Enter fixed password" 
                            value={credentials.password}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-dark w-100 py-2 fw-bold text-uppercase tracking-wider mt-2">
                        Log In 🔒
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;