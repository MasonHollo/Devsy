
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../redux/product";
import ProductCard from "../subcomponents/productCards";
import "./products.css"
import "../subcomponents/productCard.css"

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.product.allProducts);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  return (
    <div id="productCard">
      {products && products.length > 0 ? (
        products.map((product: any) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default Products;
