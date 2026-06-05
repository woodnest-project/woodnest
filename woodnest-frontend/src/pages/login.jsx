import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { loginUser } from '../userApi';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(credentials);
            if (response.status === 200) {
                localStorage.setItem('woodnest_token', response.data.token);
                localStorage.setItem('woodnest_user', JSON.stringify(response.data.user));
                
                alert(`Welcome back!, ${response.data.user.name}!`);
                navigate('/');
            }
        } catch (error) {
            alert(error.response?.data?.error || "Login Failed. Check details!");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-12">
                        <div className="card shadow border-0 p-4">
                            <h3 className="text-center fw-bold mb-4">Login to WoodNest</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email Address</label>
                                    <input type="email" name="email" onChange={handleChange} className="form-control" placeholder="Enter email" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Password</label>
                                    <input type="password" name="password" onChange={handleChange} className="form-control" placeholder="Enter password" required />
                                </div>
                                <button type="submit" className="btn btn-dark w-100 py-2.5 mt-3">Sign In</button>
                            </form>
                            <p className="text-center mt-3 text-muted mb-0">
                                Don't have an account? <Link to="/signup" className="text-warning text-decoration-none fw-bold">Register here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;