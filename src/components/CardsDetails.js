import React from 'react';
//----------import Rating--------------------------------//
import Ratings from './Ratings'

//___importing useDispatch and useSelector from react-redux___//
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
//_______import addCart Fn from Cart Slice_________________//
import { addCart } from '../store/cartSlice';
// ___________similar Item Component_____________________//

const CardDetails = (props) => {
    const dispatch = useDispatch();


    // -------now subscribe the data(added to cart data) --------------//
    const viewItm = useSelector((state) => state.products.itemToDisplay)



    // --------Function for Add to Cart-------------------//
    const addCartHandle = (element) => {
        // ======Add this element in redux store======//
        dispatch(addCart(element));
    }
    return (
       
        <div className="container mt-6" style={{ marginTop: '150px' }}>
        <div className="row">
            <div className="col-md-6 border border-dark">
                <img src={viewItm.image} className="card-img-top " alt={viewItm.name} height="300px" width="300px" />
            </div>
            <div className="col-md-6">
                <h4 className='text-uppercase text-dark'>{viewItm.name}</h4>
                <h3 className="display-6 my-4">₹ {viewItm.price}</h3>
                <p className="lead fw-bolder">Rating : <Ratings value={viewItm.rating} /></p>
                <button className='btn ' style={{marginTop: "50px",width:"500px"}} onClick={() => addCartHandle(viewItm)}>Add To Cart</button>
            </div>
        </div>
    </div>
    )
}

export default CardDetails

