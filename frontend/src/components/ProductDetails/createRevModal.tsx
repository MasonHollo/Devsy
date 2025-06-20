import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAReviewThunk } from '../../redux/review';
import { useModal } from '../../context/Modal';

const PostReviewModal = ({ productId }: { productId: number }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReviewText] = useState("");  
    const [stars, setStars] = useState(0); 
    const [hoverStars, setHoverStars] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = {
            body: review,
            stars: stars,
        };

        if (reviewData.body && reviewData.stars > 0) {
            await dispatch(createAReviewThunk(productId, { body: review, stars }));
            closeModal();
        } 
    };

    return (
        <div className="postreviewmodal">
            <h2>How was this product?</h2>
            <input id='reviewinput'
                value={review}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
            />
            <div id='starholder'>
             {[1, 2, 3, 4, 5].map((num) => (
                    <span 
                        key={num} 
                        className={`star ${num <= (hoverStars || stars) ? 'filled' : ''}`}
                        onMouseEnter={() => setHoverStars(num)}
                        onMouseLeave={() => setHoverStars(0)}
                        onClick={() => setStars(num)}
                    >★</span>
             ))}
             <p> Stars</p>
            </div>
            <button id='submitreview' onClick={handleSubmit} disabled={review.length < 10 || stars === 0}>
                Submit Your Review
            </button>
        </div>
    );
};

export default PostReviewModal;
