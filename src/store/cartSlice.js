// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Import toast for notifications
import { toast } from 'react-toastify';

// Initial state for the cart slice
const INIT_STATE = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [], // Cart items fetched from local storage or initialized as an empty array
    cartTotalQuantity: 0, // Total quantity of items in the cart
    cartTotalAmount: 0, // Total amount of items in the cart
};

// Cart slice for creating actions on the reducer
const cartSlice = createSlice({
    name: 'cart', // Slice name
    initialState: INIT_STATE, // Initial state
    reducers: {
        // Reducer function for adding an item to the cart
        addCart: (state, action) => {
            // Find the index of the item in the cart
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            // If item already exists in cart, increase quantity; otherwise, add new item to cart
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].qnty += 1; // Increase quantity of existing item
                toast.info('Item increased in cart!', {
                    position: 'top-right',
                });
            } else {
                const tempProduct = { ...action.payload, qnty: 1 }; // New item to be added with quantity 1
                state.cartItems.push(tempProduct); // Push the new item to cart
                toast.success(`Successfully added ${action.payload.name} in Cart!`, {
                    position: 'bottom-right',
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
        },
        // Reducer function for removing an item from the cart
        removeFromCart: (state, action) => {
            toast.error('Successfully removed from cart!', {
                position: 'top-right',
            });
            // Filter out the clicked cart item from the cart array
            const filterCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id);
            state.cartItems = filterCartItems; // Update cart items
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
        },
        // Reducer function for decreasing the quantity of an item in the cart
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (state.cartItems[itemIndex].qnty > 1) {
                state.cartItems[itemIndex].qnty -= 1; // Decrease quantity of item in cart
                toast.info('Decreased product quantity', {
                    position: 'bottom-left',
                });
            } else if (state.cartItems[itemIndex].qnty === 1) {
                // If item quantity in cart is 1, remove that item from cart
                const removeCartItem = state.cartItems.filter(item => item.id !== action.payload.id);
                state.cartItems = removeCartItem; // Update cart items
                toast.error('Product removed from cart!', {
                    position: 'bottom-left',
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
        },
        // Reducer function for calculating the total price of items in the cart
        getTotals: (state, action) => {
            let total = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, qnty } = cartItem;
                const itemTotal = price * qnty;
                cartTotal += itemTotal;
                return cartTotal;
            }, 0);
            state.cartTotalAmount = total; // Update cart total amount
        },
        // Reducer function for clearing the entire cart
        clearCart: (state, action) => {
            state.cartItems = []; // Clear cart items
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
            toast.error('Your Cart is Clear now!', {
                position: 'bottom-left',
            });
        },
    },
});

// Action creators generated for each case reducer function
export const { addCart, removeFromCart, decreaseCart, getTotals, clearCart } = cartSlice.actions;

// Export the reducer for use in the application
export default cartSlice.reducer;
