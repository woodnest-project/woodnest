import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('woodnest_user'));

const handleLogout = () => {
    localStorage.removeItem('woodnest_token');
    localStorage.removeItem('woodnest_user');
    alert("Logged out successfully");
    navigate('/');
    window.location.reload();
};

return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow px-4">
        <div className="container-fluid">
            <Link className="navbar-brand fw-bold text-warning" to="/">WoodNest</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                    <li className="nav-item">
                        <Link className="nav-link text-white me-3" to="/">Browse Items</Link>
                    </li>
                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link btn btn-warning text-dark fw-bold px-3 me-3" to="/add">+ Add Furniture</Link>
                            </li>
                            <li className="nav-item">
                                <span className="text-white-50 me-3">Welcome, <b>{user.name}</b></span>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm fw-bold px-3">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="btn btn-outline-warning text-warning fw-bold px-3 me-2" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-outline-warning text-warning fw-bold px-3" to="/signup">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    </nav>
);


};

export default Navbar;