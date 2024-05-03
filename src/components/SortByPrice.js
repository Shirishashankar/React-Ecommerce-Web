import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortOblect } from '../store/productSlice'; // Importing the sortOblect action
import { fetchCardsData } from '../store/productSlice'; // Importing the fetchCardsData action

const SortByPrice = () => {
    // State to manage sorting flag
    const [flag, setFlag] = useState(false);

    const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions

    // Function to sort products according to price
    function handleSort() {
        dispatch(sortOblect()); // Dispatching the sortOblect action
        setFlag(true); // Setting the sorting flag to true
    }

    // Function to cancel sorting and fetch original data
    function cancelSort() {
        dispatch(fetchCardsData()); // Dispatching the fetchCardsData action to get original data
        setFlag(false); // Resetting the sorting flag to false
    }

    return (
        <div className="sortitemsbtn">
            <span className='sortSpan'>
                {/* Sort button */}
                <span onClick={() => handleSort()}> Sort by Price </span>
                {/* Displaying cancel (cross) button when sorting is active */}
                {flag && (
                    <span id='cross' onClick={() => cancelSort()}>
                        ✕
                    </span>
                )}
            </span>
        </div>
    );
}

export default SortByPrice;
