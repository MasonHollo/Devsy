import { csrfFetch  } from "./csrf";
import { Idata, Ireview } from "./types/review";

const GET_ALL_REVIEWS = 'reviews/getAllReviews';
const CREATE_A_REVIEW = 'reviews/createAReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';

const getAllReviewsAction = (data: Idata) => ({
    type: GET_ALL_REVIEWS,
    payload: data
});

const createAReviewAction = (data: Idata) => ({
    type: CREATE_A_REVIEW,
    payload: data
});

const updateReviewAction = (data: Idata) => ({
    type: UPDATE_REVIEW,
    payload: data
})

export const deleteAReviewAction = (reviewId: number) => ({
    type: DELETE_REVIEW,
    payload: reviewId,
});

export const getAllReviewsThunk = (productId: string): any => async (dispatch: any) => {
  try {
    const res = await csrfFetch(`/api/product/${productId}/reviews`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllReviewsAction(data));
    } else {
      throw res;
    }
  } catch (error) {
    throw error;
  }
};


export const createAReviewThunk = (productId: number, reviewData: { body: string; stars: number }): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch(`/api/product/${productId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createAReviewAction(data));
            return data;
        } else {
            throw res;
        }
    } catch (error) {
        throw error;
    }
};

export const updateReviewThunk = (reviewData: Ireview) => async (dispatch: any) => {
    try {
        const response = await csrfFetch(`/api/review/${reviewData.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });

        if (!response.ok) throw response;

        const data = await response.json();
        dispatch(updateReviewAction(data));
    } catch (error) {
        console.error("Failed to update ", error);
        throw error;
    }
};


export const deleteAReviewThunk = (reviewId: number) => async (dispatch: any) => {
    try {

         const response = await csrfFetch(`/api/review/${reviewId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" } 
        });
        if (!response.ok) throw response;

        dispatch(deleteAReviewAction(reviewId));
    } catch (error) {
        console.error("Failed to delete", error);
        throw error;
    }
};

const initialState: ReviewState = {
    allReviews: [],
    byId: {},
};
const reviewReducer = (state = initialState, action: any) => {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            const reviewArr = action.payload.Reviews;
console.log(reviewArr)
            newState = { ...state };
            newState.allReviews = reviewArr;
            let newByIdGetAllReviews: any = {};
            for (let review of reviewArr) {
                newByIdGetAllReviews[review.id] = review;
            }
            newState.byId = newByIdGetAllReviews;
            return newState;
        }
        case CREATE_A_REVIEW: {
            const newReview = action.payload;
            newState = { ...state };
            newState.allReviews = [...state.allReviews, newReview];
            newState.byId = { ...state.byId, [newReview.id]: newReview };
            return newState;
        }

        case  UPDATE_REVIEW: {
            const updatedReview = action.payload;
            newState = { ...state };
            newState.byId = { ...state.byId, [updatedReview.id]: updatedReview };
            newState.allReviews = state.allReviews.map(review =>
                review.id === updatedReview.id ? updatedReview : review
            );
            return newState;
        }

        case DELETE_REVIEW: {
            const deletedId = action.payload;
            newState = { ...state };
            const newById = { ...state.byId };
            delete newById[deletedId];
            newState.byId = newById;
            newState.allReviews = state.allReviews.filter(product => product.id !== deletedId);

            return newState;
        }


        default:
            return state;
    }
};

export default reviewReducer;
