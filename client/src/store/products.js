import { createSlice, createAction } from "@reduxjs/toolkit";
import productsService from "../services/products.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        dataLoaded: false
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        productsRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productsRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        },
        productsCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        productsUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceved,
    productsRequestedFailed,
    productsRemoved,
    productsCreated,
    productsUpdated
} = actions;

const removeProductRequested = createAction("products/removeProductRequested");
const createProductRequested = createAction("products/createProductRequested");
const updateProductRequested = createAction("products/updateProductRequested");

export const loadProductsList = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const data = await productsService.get();
        dispatch(productsReceved(data));
    } catch (error) {
        dispatch(productsRequestedFailed(error.message));
    }
};

export const removeProduct = (productId) => async (dispatch) => {
    dispatch(removeProductRequested());
    try {
        const data = await productsService.delete(productId);
        if (!data) {
            dispatch(productsRemoved(productId));
        }
    } catch (error) {
        dispatch(productsRequestedFailed(error.message));
    }
};

export const createProduct = (content) => async (dispatch) => {
    dispatch(createProductRequested);
    try {
        const data = await productsService.create(content);
        dispatch(productsCreated(data));
    } catch (error) {
        dispatch(productsRequestedFailed(error.message));
    }
};

export const updateProduct = (payload) => async (dispatch) => {
    dispatch(updateProductRequested());
    try {
        const data = await productsService.update(payload);
        dispatch(productsUpdated(data));
    } catch (error) {
        dispatch(productsRequestedFailed(error.message));
    }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductsLoading = () => (state) => state.products.isLoading;
export const getDataStatus = () => (state) => state.products.dataLoaded;
export const getProductById = (productId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((p) => p._id === productId);
    }
};

export default productsReducer;
