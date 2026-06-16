import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllFurniture, deleteFurniture } from '../userApi';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const handleAddToCart = (e, item) => {
        e.stopPropagation();
        const savedCart = JSON.parse(localStorage.getItem('woodnest_cart')) || [];
        const existing = savedCart.find(c => c._id === item._id);
        if (existing) existing.quantity += 1;
        else savedCart.push({ ...item, quantity: 1 });
        
        localStorage.setItem('woodnest_cart', JSON.stringify(savedCart));
        window.dispatchEvent(new Event('cart_updated'));
        alert(`${item.name} added to cart!`);
    };

    const handleBuyNow = (e, item) => {
        e.stopPropagation();
        handleAddToCart(e, item);
        navigate('/cart');
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this listing (Admin Only)?")) {
            await deleteFurniture({ id });
            setSelectedProduct(null);
            fetchProducts();
        }
    };

    const getSortedItems = () => {
        let sorted = [...products];
        if (sortOrder === "low") return sorted.sort((a, b) => a.price - b.price);
        if (sortOrder === "high") return sorted.sort((a, b) => b.price - a.price);
        return sorted;
    };

    return (
        <>
            <Navbar />

            <div className="bg-dark text-white shadow-lg w-100" style={{ 
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600")', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                margin: '0',
                padding: '0'
            }}>
                <div className="container py-5 text-center">
                    <h1 className="display-1 fw-extrabold mb-4" style={{ letterSpacing: '-1px' }}>
                        Experience Luxury Living <br />
                        <span className="text-warning">With WoodNest</span>
                    </h1>
                    <p className="fs-3 fw-light mb-5 text-light opacity-90 mx-auto" style={{ maxWidth: '850px', lineHeight: '1.6' }}>
                        Discover our collection of handcrafted architectural marvels. 
                        Made from premium, sustainably sourced solid Sheesham and Teak wood—built to last generations.
                    </p>
                    <div className="d-flex justify-content-center gap-4">
                        <button 
                            className="btn btn-warning btn-lg px-5 py-3 fs-5 fw-bold text-uppercase shadow" 
                            onClick={() => window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
                        >
                            Explore Collection 🛒
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">WoodNest Premium Catalogue</h2>
                    <select className="form-select border-dark" style={{width: '200px'}} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="">Default Sorting</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>

                <div className="row">
                    {getSortedItems().map((item) => (
                        <div className="col-md-3 mb-4" key={item._id} onClick={() => setSelectedProduct(item)}>
                            <div className="card h-100 shadow-sm border-0" style={{cursor: 'pointer'}}>
                                <img 
                                    src={item.image.startsWith('http') ? item.image : `http://localhost:8000/uploads/${item.image}`} 
                                    className="card-img-top" 
                                    height="200" 
                                    style={{objectFit: 'cover'}} 
                                    alt={item.name} 
                                />
                                <div className="card-body">
                                    <h5 className="fw-bold">{item.name}</h5>
                                    <h6 className="text-warning">₹{item.price.toLocaleString('en-IN')}</h6>
                                    <div className="d-grid gap-2 mt-3">
                                        <button onClick={(e) => handleAddToCart(e, item)} className="btn btn-warning btn-sm fw-bold">Add to Cart 🛒</button>
                                        <button onClick={(e) => handleBuyNow(e, item)} className="btn btn-dark btn-sm fw-bold">Buy Now ⚡</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <div className="modal show d-block" style={{background: 'rgba(0,0,0,0.6)'}}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content p-4">
                            <div className="d-flex justify-content-between">
                                <h3>{selectedProduct.name}</h3>
                                <button className="btn-close" onClick={() => setSelectedProduct(null)}></button>
                            </div>
                            <img 
                                src={selectedProduct.image.startsWith('http') ? selectedProduct.image : `http://localhost:8000/uploads/${selectedProduct.image}`} 
                                className="img-fluid my-3 rounded" 
                                style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                                alt={selectedProduct.name}
                            />
                            <p><strong>Category:</strong> {selectedProduct.category}</p>
                            <p><strong>Description:</strong> {selectedProduct.description || "Premium handcrafted piece of furniture."}</p>
                            <p><strong>Material:</strong> {selectedProduct.material || "Sustainably Sourced Solid Wood"}</p>
                            <p><strong>Stock Available:</strong> {selectedProduct.stock ?? "Available on Request"}</p>
                            
                            <div className="mt-3 border-top pt-3">
                                <h5>Ratings & Reviews</h5>
                                <div className="text-warning">★★★★☆</div>
                                <textarea className="form-control my-2" placeholder="Write a review..."></textarea>
                                <button className="btn btn-sm btn-dark">Submit Review</button>
                            </div>

                            <div className="mt-4 pt-3 border-top text-end">
                                <button onClick={() => handleDelete(selectedProduct._id)} className="btn btn-link text-danger text-decoration-none">Delete Listing (Admin Only)</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;