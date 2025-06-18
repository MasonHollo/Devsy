import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState  } from '../../redux/store';
import "./productDetails.css"



const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const ProductDetail = () => {
  const { productId } = useParams<{ id: string }>();
  const product = useTypedSelector(state => state.product.byId[productId]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product) setLoading(false);
  }, [product]);

  if (loading || !product || !product.ProductImages) return <p>Loading product details...</p>;

  const previewImage = product.ProductImages.length > 0 ? product.ProductImages[0].url : '';

  return (
    <div className="productDetail">
      <h3>{product.name}</h3>
    

      <div className="productImages">
        {previewImage && <img src={previewImage} alt={product.name} width={'400px'} />}
      </div>


      <div className="purchaseBox">
        <p>{product.description}</p>
        <div>
          <p className="price">${product.price}</p>
          <button onClick={() => alert('Purchase feature coming soon')}>
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
