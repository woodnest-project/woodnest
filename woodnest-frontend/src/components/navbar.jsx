import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow px-4">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold text-warning" to="/">WoodNest</Link>
                
                <div className="d-flex align-items-center ms-auto">
                    <Link className="nav-link text-white-50 me-3" to="/">Browse Items</Link>
                    <Link className="btn btn-warning text-dark fw-bold px-3" to="/add">+ Add Furniture</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;