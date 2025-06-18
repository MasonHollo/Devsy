import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductThunk, getAllProductsThunk } from "../../redux/product";
import { useNavigate, useParams } from 'react-router-dom';
import { Iproduct } from "../../redux/types/product";

const UpdateProduct = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams<{ id: string }>();


    const product = useSelector((state: any) => state.product.byId[productId]);


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (!product) {
            dispatch(getAllProductsThunk());
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price.toString());
        }
    }, [dispatch, product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedProduct: Iproduct = {
            id: productId,
            name,
            description,
            price: parseFloat(price),
        };

        try {
            await dispatch(updateProductThunk(updatedProduct));
            navigate(`/`);
        } catch (error) {
            throw error
        }
    };

    if (!product) return <p>Loading product...</p>;

    return (
        <div>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
