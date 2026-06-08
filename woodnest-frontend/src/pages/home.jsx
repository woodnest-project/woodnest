import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllFurniture, deleteFurniture } from '../userApi';

const Home = () => {
const navigate = useNavigate();
const [products, setProducts] = useState([]);
const [sortOrder, setSortOrder] = useState("");
const [selectedProduct, setSelectedProduct] = useState(null); // Controls the modal

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
    e.stopPropagation(); // Prevents modal from opening when clicking cart
    const savedCart = JSON.parse(localStorage.getItem('woodnest_cart')) || [];
    const existing = savedCart.find(c => c._id === item._id);
    if (existing) {
        existing.quantity += 1;
    } else {
        savedCart.push({ ...item, quantity: 1 });
    }
    
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

// Helper function to decide where to load the image from
const getImgUrl = (imgField) => {
    if (!imgField) return 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600';
    return imgField.startsWith('http') ? imgField : `http://localhost:8000/uploads/${imgField}`;
};

return (
    <>
        <Navbar />
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
                        <div className="card h-100 shadow-sm border-0 cursor-pointer" style={{cursor: 'pointer'}}>
                            <img 
                                src={getImgUrl(item.image)} 
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

        {/* Product Detail Modal */}
        {selectedProduct && (
            <div className="modal show d-block" style={{background: 'rgba(0,0,0,0.6)'}}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content p-4">
                        <div className="d-flex justify-content-between">
                            <h3>{selectedProduct.name}</h3>
                            <button className="btn-close" onClick={() => setSelectedProduct(null)}></button>
                        </div>
                        <img 
                            src={getImgUrl(selectedProduct.image)} 
                            className="img-fluid my-3 rounded" 
                            alt="Product"
                        />
                        <p><strong>Category:</strong> {selectedProduct.category}</p>
                        <p><strong>Description:</strong> {selectedProduct.description || "Premium handcrafted piece designed for optimal comfort and elegance."}</p>
                        <p><strong>Material:</strong> {selectedProduct.material || "Premium Hardwood"}</p>
                        <p><strong>Stock Available:</strong> {selectedProduct.stock !== undefined ? selectedProduct.stock : 10}</p>
                        
                        {/* Ratings Section */}
                        <div className="mt-3 border-top pt-3">
                            <h5>Ratings & Reviews</h5>
                            <div className="text-warning">★★★★★</div>
                            <textarea className="form-control my-2" placeholder="Write a review..."></textarea>
                            <button className="btn btn-sm btn-dark">Submit Review</button>
                        </div>

                        {/* Admin Delete */}
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