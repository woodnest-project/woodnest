import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getAllFurniture } from '../userApi';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllFurniture();
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 class="text-center mb-4 fw-bold">WoodNest Premium Catalogue</h2>
                <div className="row">
                    {products.length === 0 ? (
                        <div className="col-12 text-center mt-5">
                            <p className="text-muted">No furniture products found. Start adding some!</p>
                        </div>
                    ) : (
                        products.map((item) => (
                            <div className="col-lg-3 col-md-6 col-12 mb-4" key={item._id}>
                                <div className="card h-100 shadow-sm border-0">
                                    <img 
                                        src={`http://localhost:8000/uploads/${item.image}`} 
                                        alt={item.name} 
                                        className="card-img-top object-fit-cover" 
                                        style={{ height: "200px" }}
                                        onError={(e) => { e.target.src = '[https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600](https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600)'; }}
                                    />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <span className="badge bg-secondary mb-2">{item.category}</span>
                                            <h5 className="card-title fw-bold text-dark">{item.name}</h5>
                                        </div>
                                        <h6 className="text-warning fw-bold mt-2 fs-5">₹{item.price.toLocaleString('en-IN')}</h6>
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