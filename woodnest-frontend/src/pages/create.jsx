import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { addFurniture } from '../userApi';

const Create = () => {
    const navigate = useNavigate();
    const [item, setItem] = useState({
        name: "",
        price: "",
        category: "",
        image: ""
    });

    const getData = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const fileData = (e) => {
        setItem({ ...item, image: e.target.files[0] });
    };

    const submitData = async (e) => {
        e.preventDefault();

        if (item.name === '') {
            alert("Enter Furniture Name");
            return;
        }
        if (item.price === '') {
            alert("Enter Price");
            return;
        }
        if (item.category === '') {
            alert("Select Category");
            return;
        }
        if (item.image === '') {
            alert("Upload Product Image");
            return;
        }

        const formData = new FormData();
        formData.append('image', item.image, item.image.name);
        formData.append('name', item.name);
        formData.append('price', item.price);
        formData.append('category', item.category);

        try {
            const response = await addFurniture(formData);
            if (response.status === 201) {
                alert("Data Inserted Successfully!");
                navigate('/');
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit item. Make sure your server is running!");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-12">
                        <div className="card shadow border-0">
                            <div className="card-header bg-dark text-white text-center py-3">
                                <h4 className="m-0">Add New Furniture to WoodNest</h4>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={submitData}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Furniture Name <span className="text-danger">*</span></label>
                                        <input type="text" name="name" onChange={getData} className="form-control" placeholder="e.g. Teak Dining Table" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Price (INR) <span className="text-danger">*</span></label>
                                        <input type="number" name="price" onChange={getData} className="form-control" placeholder="e.g. 18500" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Category <span className="text-danger">*</span></label>
                                        <select name="category" onChange={getData} className="form-select">
                                            <option value="">--Select--</option>
                                            <option value="Living Room">Living Room</option>
                                            <option value="Bedroom">Bedroom</option>
                                            <option value="Kitchen">Kitchen</option>
                                            <option value="Office">Office</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Product Image <span className="text-danger">*</span></label>
                                        <input type="file" name="image" onChange={fileData} className="form-control" />
                                    </div>
                                    <div className="d-grid mt-4">
                                        <button type="submit" className="btn btn-dark py-2">Add Furniture Product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;