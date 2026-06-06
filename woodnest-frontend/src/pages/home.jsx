import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getAllFurniture, deleteFurniture } from '../userApi';

const Home = () => {
    const [products, setProducts] = useState([]);
    
    // 1. ADD SORT STATE (As shown in your screenshot)
    const [sortOrder, setSortOrder] = useState(""); // "" means default, "low" or "high"

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAllFurniture();
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure want to delete this item?")) {
                const response = await deleteFurniture({ id });
                if (response.status === 201) {
                    alert("Data Deleted Successfully!");
                    fetchProducts(); // Refresh listings instantly
                } else {
                    alert("Something Went Wrong");
                }
            }
        } catch (error) {
            console.error("Error while deleting product:", error);
        }
    };

    // 2. ADD GET SORTED ITEMS HELPER (As shown in your screenshot)
    const getSortedItems = () => {
        let sorted = [...products]; // Copies your existing products state array
        if (sortOrder === "low") {
            return sorted.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high") {
            return sorted.sort((a, b) => b.price - a.price);
        }
        return sorted; // Default unsorted array
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                {/* Header Title */}
                <h2 className="text-center mb-4 fw-bold text-dark">WoodNest Premium Catalogue</h2>
                
                {/* 3. ADD DROP-DOWN UI PANEL */}
                <div className="d-flex justify-content-end mb-4">
                    <div className="d-flex align-items-center">
                        <label className="me-2 fw-bold text-muted text-nowrap">Sort By:</label>
                        <select 
                            className="form-select border-dark shadow-sm" 
                            style={{ width: '180px' }}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">Default</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid Section */}
                <div className="row">
                    {getSortedItems().length === 0 ? (
                        <div className="col-12 text-center mt-5">
                            <p className="text-muted">No furniture products found. Start adding some!</p>
                        </div>
                    ) : (
                        // 4. MAP LOOP READS SORTED FUNCTION
                        getSortedItems().map((item) => (
                            <div className="col-lg-3 col-md-6 col-12 mb-4" key={item._id}>
                                <div className="card h-100 shadow border-0 overflow-hidden">
                                    <div className="position-relative">
                                        <img 
                                            src={item.image.startsWith('http') ? item.image : `http://localhost:8000/uploads/${item.image}`} 
                                            alt={item.name} 
                                            className="card-img-top object-fit-cover" 
                                            style={{ height: "200px" }}
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600'; }}
                                        />
                                        <span className="badge bg-dark position-absolute top-2 start-2 m-2">{item.category}</span>
                                    </div>
                                    <div className="card-body d-flex flex-column justify-content-between p-4">
                                        <div>
                                            <h5 className="card-title fw-bold text-dark mb-1">{item.name}</h5>
                                            <h6 className="text-warning fw-bold fs-5 mb-3">₹{item.price.toLocaleString('en-IN')}</h6>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button 
                                                onClick={() => handleDelete(item._id)} 
                                                className="btn btn-outline-danger btn-sm w-100 fw-semibold"
                                            >
                                                Delete Item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;