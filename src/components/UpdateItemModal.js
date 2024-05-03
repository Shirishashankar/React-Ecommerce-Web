import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import { updateCardDataSuccess } from '../store/productSlice';
import { useDispatch } from 'react-redux';

function UpdateItemModal(props) {
    // Extracting the item to be updated from props
    const toBeUpdateElement = props.updateitem;

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    // Function to show the modal
    const handleShow = () => setShow(true);
    // Function to close the modal
    const handleClose = () => setShow(false);

    // State variables to manage the details of the product being updated
    const [name, setName] = useState(toBeUpdateElement.name);
    const [price, setPrice] = useState(toBeUpdateElement.price);
    const [rating, setRating] = useState(toBeUpdateElement.rating);

    // Function to handle saving the updated item
    const onSaveUpdateHandler = (e) => {
        e.preventDefault();
        const updateObject = {
            ...toBeUpdateElement,
            name: name,
            price: price,
            rating: rating
        };
        // Dispatching the action to update the item
        dispatch(updateCardDataSuccess(updateObject));
        // Closing the modal after saving changes
        handleClose();
    };

    return (
        <>
            {/* Icon to trigger the modal */}
            <ModeEditTwoToneIcon style={{ color: 'blue' }} onClick={handleShow} />

            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='text-dark bg-light'>
                    <Modal.Title className='ms-auto'>Update Cake Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form fields for updating item details */}
                    <div className="update-modal__flex">
                        <small>Cake name</small>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <small>Price: ₹</small>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <small>Rating</small>
                        <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    {/* Save changes and close buttons */}
                    <Button variant="success" onClick={onSaveUpdateHandler}>Save Changes</Button>
                    <Button variant="danger" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateItemModal;
