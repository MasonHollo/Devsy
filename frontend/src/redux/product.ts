import { csrfFetch } from "./csrf";
import { Idata, Iproduct, ProductState } from "./types/product";

const GET_ALL_PRODUCTS = 'products/getAllProducts';
const CREATE_A_PRODUCT = 'products/createAProduct';

const getAllProductsAction = (data: Idata) => ({
    type: GET_ALL_PRODUCTS,
    payload: data
});

const createAProductAction = (data: Idata) => ({
    type: CREATE_A_PRODUCT,
    payload: data
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

        default:
            return state;
    }
};

export default productReducer;
