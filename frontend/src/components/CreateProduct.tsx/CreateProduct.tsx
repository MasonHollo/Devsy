import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAProductThunk } from "../../redux/product";
import { useNavigate } from 'react-router-dom';
import { Iproduct } from "../../redux/types/product";

function CreateProducts(): JSX.Element {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData: Omit<Iproduct, "id" | "userId"> = {
      name,
      description,
      price: parseFloat(price),
    };

    try {
      await dispatch(createAProductThunk(productData));
      setName("");
      setDescription("");
      setPrice("");
      navigate(`/`)
    } catch (err) {
        throw err
    }
  };

  return (
    <div>
      <h1>Manage Products</h1>
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
   
        <button type="submit">Create Product</button>
        
  
      </form>
    </div>
  );
}

export default CreateProducts;