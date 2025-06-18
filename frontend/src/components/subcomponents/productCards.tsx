import { Link } from "react-router-dom";
import "./productCard.css"

interface ProductImage {
  url: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  ProductImages: ProductImage[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const previewImage =
    product.ProductImages && product.ProductImages.length > 0
      ? product.ProductImages[0].url
      : "";

  return (
      <Link to={`/products/${product.id}`} key={product.id} className="productItem">
    <div className="singleCard">
        {previewImage && <img width="100px" id="productImage" src={previewImage} alt={product.name} />}
        <div className="tooltip">{product.name}</div>
        <p id="price">${product.price} per unit</p>
    </div>
      </Link>
  );
};

export default ProductCard;
