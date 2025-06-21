import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProductThunk, getAllProductsThunk } from "../../redux/product"; 
import ProductCard from "../subcomponents/productCards";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./deleteModal";
import { useModal } from "../../context/Modal";
import './manageProducts.css';

import { RootState } from "../../redux/store";

const ManageProducts = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { setModalContent, openModal, closeModal } = useModal();

  const products = useSelector((state: RootState) => state.product);
  const currentUser = useSelector((state: RootState) => state.session.user);

  useEffect(() => {
    if (products.allProducts.length === 0) {
      dispatch(getAllProductsThunk());
    }
  }, [dispatch, products.allProducts.length]);

  const userProducts = products.allProducts.filter(product => product.userId === currentUser?.id);
  const hasProducts = userProducts.length > 0;

  const handleUpdate = (productId: number) => {
    navigate(`/products/${productId}/edit`);
  };

  const openDeleteModal = (productId: number) => {
    setModalContent(
      <DeleteModal 
        productId={productId} 
        handleDelete={handleDelete} 
        closeModal={closeModal}
      />
    );
    openModal();
  };

  const handleDelete = async (productId: number) => {
    try {
      await dispatch(deleteAProductThunk(productId));
      navigate('/manageProducts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 id="manageheader">Manage Your Products</h1>

      <div className="productList">
        {hasProducts ? (
          userProducts.map(product => {
            const productImage = product.images?.[0]?.url || null;
            return (
              <div key={product.id} className="productTile">
                <ProductCard product={product} productImage={productImage} />
                <div className="manage-buttons">
                  <button onClick={() => handleUpdate(product.id)}>Update</button>
                  <button onClick={() => openDeleteModal(product.id)}>Delete</button>
                </div>
              </div>
            );
          })
        ) : (
           <button id="create-button" onClick={() => navigate('/products/new')}>
        Create A New Product
      </button>
        )}
      </div>
    </>
  );
};

export default ManageProducts;
