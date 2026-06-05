import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { signupUser } from '../userApi';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signupUser(user);
            if (response.status === 201) {
                alert("Account created successfully! Please login.");
                navigate('/login');
            }
        } catch (error) {
            alert(error.response?.data?.error || "Registration Failed");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-12">
                        <div className="card shadow border-0 p-4">
                            <h3 className="text-center fw-bold mb-4">Create WoodNest Account</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Your Name</label>
                                    <input type="text" name="name" onChange={handleChange} className="form-control" placeholder="Enter full name" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email Address</label>
                                    <input type="email" name="email" onChange={handleChange} className="form-control" placeholder="Enter email" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Password</label>
                                    <input type="password" name="password" onChange={handleChange} className="form-control" placeholder="Create safe password" required />
                                </div>
                                <button type="submit" class="btn btn-dark w-full py-2.5 mt-3">Register</button>
                            </form>
                            <p className="text-center mt-3 text-muted">
                                Already have an account? <Link to="/login" className="text-warning">Login here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
