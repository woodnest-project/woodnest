// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow px-4">
//             <div className="container-fluid">
//                 <Link className="navbar-brand fw-bold text-warning" to="/">WoodNest</Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-collapse navbar-nav ms-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/">Browse Items</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link btn btn-warning text-dark fw-bold px-3 ms-2" to="/add">Add Furniture</Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow px-4">
            <div className="container-fluid">
                {/* Brand Logo Link */}
                <Link className="navbar-brand fw-bold text-warning" to="/">WoodNest</Link>
                
                {/* Navigation Items aligned to the right */}
                <div className="d-flex align-items-center ms-auto">
                    <Link className="nav-link text-white-50 me-3" to="/">Browse Items</Link>
                    <Link className="btn btn-warning text-dark fw-bold px-3" to="/add">+ Add Furniture</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;