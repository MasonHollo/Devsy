import { csrfFetch  } from "./csrf";
import { Idata, Iproduct, ProductState } from "./types/product";

const GET_ALL_PRODUCTS = 'products/getAllProducts';
const CREATE_A_PRODUCT = 'products/createAProduct';
const UPDATE_PRODUCT = 'products/updateProduct';
const DELETE_PRODUCT = 'products/deleteProduct'

const getAllProductsAction = (data: Idata) => ({
    type: GET_ALL_PRODUCTS,
    payload: data
});

const createAProductAction = (data: Idata) => ({
    type: CREATE_A_PRODUCT,
    payload: data
});

const updateProductAction = (data: Idata) => ({
    type: UPDATE_PRODUCT,
    payload: data
})

export const deleteAProductAction = (productId: number) => ({
    type: DELETE_PRODUCT,
    payload: productId,
});

export const getAllProductsThunk = (): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch('/api/product');
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllProductsAction(data));
        } else {
            throw res;
        }
    } catch (error) {
        throw error
    }
}

export const createAProductThunk = (productData: Iproduct): any => async (dispatch: any) => {
    try {
        const res = await csrfFetch('/api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createAProductAction(data));
            return data;
        } else {
            throw res;
        }
    } catch (error) {
        throw error;
    }
};

export const updateProductThunk = (productData: Iproduct) => async (dispatch: any) => {
    try {
        const response = await csrfFetch(`/api/product/${productData.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });

        if (!response.ok) throw response;

        const data = await response.json();
        dispatch(updateProductAction(data));
    } catch (error) {
        console.error("Failed to update ", error);
        throw error;
    }
};


export const deleteAProductThunk = (productId: number) => async (dispatch: any) => {
    try {

         const response = await csrfFetch(`/api/product/${productId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" } 
        });
        if (!response.ok) throw response;

        dispatch(deleteAProductAction(productId));
    } catch (error) {
        console.error("Failed to delete", error);
        throw error;
    }
};

const initialState: ProductState = {
    allProducts: [],
    byId: {},
};
const productReducer = (state = initialState, action: any) => {
    let newState;
    switch (action.type) {
        case GET_ALL_PRODUCTS: {
            const productArr = action.payload.products;

            newState = { ...state };
            newState.allProducts = productArr;
            let newByIdGetAllProdcts: any = {};
            for (let product of productArr) {
                newByIdGetAllProdcts[product.id] = product;
            }
            newState.byId = newByIdGetAllProdcts;
            return newState;
        }
        case CREATE_A_PRODUCT: {
            const newProduct = action.payload;
            newState = { ...state };
            newState.allProducts = [...state.allProducts, newProduct];
            newState.byId = { ...state.byId, [newProduct.id]: newProduct };
            return newState;
        }

        case UPDATE_PRODUCT: {
            const updatedProduct = action.payload;
            newState = { ...state };
            newState.byId = { ...state.byId, [updatedProduct.id]: updatedProduct };
            newState.allProducts = state.allProducts.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            return newState;
        }

        case DELETE_PRODUCT: {
            const deletedId = action.payload;
            newState = { ...state };
            const newById = { ...state.byId };
            delete newById[deletedId];
            newState.byId = newById;
            newState.allProducts = state.allProducts.filter(product => product.id !== deletedId);

            return newState;
        }


        default:
            return state;
    }
};

export default productReducer;
