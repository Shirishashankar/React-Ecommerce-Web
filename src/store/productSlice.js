
// Import createSlice from Redux Toolkit

import { createSlice } from "@reduxjs/toolkit";

// Import Axios for making HTTP requests

import axios from 'axios';

// Import toast for displaying operation notifications on the UI

import { toast } from 'react-toastify';


// Initial state for the products slice

const initial_State = {
    data: localStorage.getItem("productItems")
        ? JSON.parse(localStorage.getItem("productItems"))
        : [],
    itemToDisplay: localStorage.getItem("productView")
        ? JSON.parse(localStorage.getItem("productView"))
        : "",
    loading: false,
    error: null
};


// Async Thunk function for fetching data from the API and storing it in Redux state

export const fetchCardsData = () => async (dispatch) => {
    // console.log("function called")
    try {
        dispatch(setLoading());
        const response = await axios.get('https://my-json-server.typicode.com/Shirishashankar/cakeData/Products');
        dispatch(fetchCardsDataSuccess(response.data));
    } catch (error) {
        dispatch(fetchCardsDataFailed(error.message));
    }
};

// Action creator for setting loading state

export const addCardData = (cardData) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const response = await axios.post('https://my-json-server.typicode.com/Shirishashankar/cakeData/Products', cardData);
        dispatch(addCardDataSuccess(response.data));
    } catch (error) {
        dispatch(addCardDataFailed(error.message));
    }
};

// ___________________________________Put Request_______________________________________//
export const updateCardData = (cardData) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const response = await axios.put(`https://my-json-server.typicode.com/Shirishashankar/cakeData/Products/${cardData.id}`, cardData);
        dispatch(updateCardDataSuccess(response.data));
    } catch (error) {
        dispatch(updateCardDataFailed(error.message));
    }
};

// ___________________________________Delete Request_______________________________________//
export const deleteCardData = (id) => async (dispatch) => {
    try {
        dispatch(setLoading());
        await axios.delete(`https://my-json-server.typicode.com/Shirishashankar/cakeData/Products/${id}`);
        dispatch(deleteCardDataSuccess(id));
    } catch (error) {
        dispatch(deleteCardDataFailed(error.message));
    }
};


// +++++++++++++++++++++++PRODUCT SLICE for creating action on every Reducer+++++++++++++++++++++//
// ________________we cant manage here asynk Thunk fn and creats extra reducer__________________//
const productsSlice = createSlice({
    name: "products",
    initialState: initial_State,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        // __________fetching action payload and put object in state data array___________//
        fetchCardsDataSuccess: (state, action) => {
            state.data = action.payload;
            // console.log(action.payload)
            state.loading = false;
            state.error = null;
            localStorage.setItem("productItems", JSON.stringify(state.data));
        },
        fetchCardsDataFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // _________when you create new object simply push that payload in state data______//
        addCardDataSuccess: (state, action) => {
            state.data.push(action.payload);
            state.loading = false;
            state.error = null;
            localStorage.setItem("productItems", JSON.stringify(state.data));
            toast.info(`${action.payload.name} is added for Sell`, {
                position: "top-right"
            })
        },
        addCardDataFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
         // _________when you update object simply update state data by payload element______//
        updateCardDataSuccess: (state, action) => {
            const index = state.data.findIndex(card => card.id === action.payload.id);
            state.data[index] = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem("productItems", JSON.stringify(state.data));
            toast.info("Updated SuccessFully !!", {
                position: "top-right"
            })
        },
        updateCardDataFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // _____________action and state management for delete single card__________//
        deleteCardDataSuccess: (state, action) => {
            state.data = state.data.filter(card => card.id !== action.payload);
            state.loading = false;
            state.error = null;
            localStorage.setItem("productItems", JSON.stringify(state.data));
            toast.error(`Item is Removed successfully !`, {
                position: "top-right"
            })
        },
        deleteCardDataFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ____________function for sorting object by price_____________________//
        sortOblect: (state, action) => {
            let sortedData = state.data.sort((a, b) => a.price - b.price);
            state.data = sortedData;
            localStorage.setItem("productItems", JSON.stringify(state.data));
        },
        // ___________when you click any image then able to see product details ________//
        productView: (state, action) => {
            state.itemToDisplay = action.payload;
            // Set the JSON string in local storage
            localStorage.setItem("productView", JSON.stringify(action.payload));
        }
    }
})


// Export all the action creators
export const { setLoading, fetchCardsDataSuccess, fetchCardsDataFailed,
    addCardDataSuccess, addCardDataFailed,
    updateCardDataSuccess, updateCardDataFailed,
    deleteCardDataSuccess, deleteCardDataFailed, sortOblect, productView } = productsSlice.actions;



// Export the reducer for use in the application

export default productsSlice.reducer; 
