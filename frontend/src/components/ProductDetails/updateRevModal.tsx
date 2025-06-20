import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateReviewThunk } from '../../redux/review';
import { useModal } from '../../context/Modal';
import { Ireview } from '../../redux/types/review';

const UpdateReviewModal = ({ review }: { review: Ireview }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [reviewText, setReviewText] = useState(review.body);  
    const [stars, setStars] = useState(review.stars); 
    const [hoverStars, setHoverStars] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedReview = {
            ...review,
            body: reviewText,
            stars,
        };

        if (reviewText && stars > 0) {
            await dispatch(updateReviewThunk(updatedReview));
            closeModal();
        } 
    };

    return (
        <div className="postreviewmodal">
            <h2>Edit Your Review</h2>
            <input id='reviewinput'
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Update your review..."
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
            <button id='submitreview' onClick={handleSubmit} disabled={reviewText.length < 10 || stars === 0}>
                Submit Your Update
            </button>
        </div>
    );
};

export default UpdateReviewModal;
