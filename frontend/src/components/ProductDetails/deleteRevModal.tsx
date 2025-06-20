import { useDispatch } from 'react-redux';
import { deleteAReviewThunk } from '../../redux/review';
import { useModal } from '../../context/Modal';

const DeleteRevModal = ({ reviewId }: { reviewId: number }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal(); 

     const handleDelete = async (e) => {
        e.preventDefault();

        if (reviewId) {
            await dispatch(deleteAReviewThunk(reviewId));
            closeModal();
        }
    };

    return (
        <div className="deleteReviewModal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button id='deletebutton' onClick={handleDelete} className="confirmDeleteBtn">Yes (Delete Review)</button>
            <button id='canceldelbutton' onClick={closeModal} className="cancelDeleteBtn">No (Keep Review)</button>
        </div>
    );
};

export default DeleteRevModal;