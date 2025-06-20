import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import "./productDetails.css"
import { getAllReviewsThunk } from '../../redux/review';
import { useModal } from '../../context/Modal';
import CreateRevModal from './createRevModal'
import DeleteRevModal from './deleteRevModal';
import UpdateReviewModal from './updateRevModal';



const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = useTypedSelector(state => state.product.byId[productId]);
  const reviews = useTypedSelector(state => state.review.allReviews);
  const user = useTypedSelector(state => state.session.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const handleDeleteReview = (reviewId: number) => {
    setModalContent(<DeleteRevModal reviewId={reviewId} />);
  };
  const handleUpdateReview = (review) => {
    setModalContent(<UpdateReviewModal review={review} />);
  };


  console.log(productId)
  useEffect(() => {
    if (productId) {
      dispatch(getAllReviewsThunk(productId));
    }
  }, [dispatch, productId]);


  useEffect(() => {
    if (product && reviews) {
      setLoading(false);
    }
  }, [product, reviews]);

  if (loading) {
    return <p>Loading spot details...</p>;
  }

  if (!product || !product.ProductImages) {
    return <p>Loading spot details...</p>;
  }

  const previewImage = product.ProductImages.length > 0 ? product.ProductImages[0].url : '';
  const reviewText = reviews.length === 0 ? "⭐ New" : reviews.length === 1 ? `⭐ ${product.avgRating} · 1 Review ` : `⭐ ${product.avgRating} · ${reviews.length} Reviews`;
  const userHasReviewed = user && reviews.length > 0 && reviews.some(review => review.userId === user.id);
  const formatReviewDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString(undefined, options);
  };


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


      <div className='reviewsarea'>
        <h2>{reviewText}</h2>
        {user && !userHasReviewed && (
          <button id='postreviewbutton' onClick={() => setModalContent(<CreateRevModal productId={productId} />)}>

            Post Your Review
          </button>

        )}

        {reviews.length > 0 ? (
          <div className="reviewsList">
            {reviews.map((review) => (
              <div key={review.id} className="reviewItem">
                <p><strong>{review.User.firstName}</strong></p>
                <p>{formatReviewDate(review.createdAt)}</p>
                <p>{review.body}</p>
                {user && review.userId === user.id && (
                  <div className="reviewActions">
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="deleteReviewButton"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdateReview(review)}
                      className="updateReviewButton"
                    >
                      Update
                    </button>
                  </div>
                )}


              </div>
            ))}
          </div>
        ) : (
          <p>Be the first to post a review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
