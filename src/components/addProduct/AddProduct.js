import React, { useState } from 'react';
import './AddProduct.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCardDataSuccess } from '../../store/productSlice';


const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // __________useState for reflect Change in input data_______________//
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [urlImage, setUrlImage] = useState('');

    // -----------Functin For Handle Submit Action--------------//
    function handleSubmit(event) {
        event.preventDefault();

        let formData = {
            id: Date.now(),
            name: itemName,
            image: urlImage,
            price: price,
            rating: "3",
            qnty: 0
        }
        // ________we send this form data as action payload_________//
        dispatch(addCardDataSuccess(formData))
        // console.log(formData)
        navigate("/")
    }


    return (
        <div>
            <h4 className='text-danger text-center mt-2 mb-3'>Add Cake Details </h4>
            <div className='d-flex justify-content-center w-100'>
                {/* form and input with on change function  */}
                <form className='addproduct-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder="Write your Cake name" onChange={(e) => setItemName(e.target.value)} required />
                    <input type="text" placeholder="set price of item.. ₹" onChange={(e) => setPrice(e.target.value)} required />
                    <input type="text" placeholder='Image URL' onChange={(e) => setUrlImage(e.target.value)} />

                    <button type="submit" class="btn modal-btn">Add New Cake</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct