import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Ratings from './Ratings'; // Importing the Ratings component
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { removeFromCart, decreaseCart, addCart, clearCart, getTotals } from '../store/cartSlice';

function MyVerticallyCenteredModal(props) {
    const cart = useSelector((state) => state.cart); // Accessing cart data from Redux store
    
    const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions
    
    useEffect(() => {
        dispatch(getTotals()); // Dispatching getTotals action on component mount or when cart changes
    }, [cart, dispatch]); // Dependency array to watch for changes in cart or dispatch function

    // Handler to remove an item from cart
    const removeCartHandler = (element) => {
        dispatch(removeFromCart(element)); // Dispatching removeFromCart action with the selected element
    };
    
    // Handler to decrease quantity of an item in cart
    const decreaseCartItemHandle = (element) => {
        dispatch(decreaseCart(element)); // Dispatching decreaseCart action with the selected element
    };
   
    // Handler to increase quantity of an item in cart
    const increaseCartItemHandle = (element) => {
        dispatch(addCart(element)); // Dispatching addCart action with the selected element
    };
    
    // Handler to clear all items from cart
    const clearCartItemHandle = () => {
        dispatch(clearCart()); // Dispatching clearCart action
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* Modal header */}
            <Modal.Header closeButton className='bg-light text-dark'>
                <Modal.Title id="contained-modal-title-vcenter" className='ms-auto'>
                  <span>Number of Items : </span>
                    {
                        cart.cartItems.length ? cart.cartItems.length : " No Item in Cart"
                     }
                </Modal.Title>
            </Modal.Header>
            
            {/* Modal body */}
            <Modal.Body>
                {
                    cart.cartItems.map(element => {
                        return (
                            <div key={element.id}>
                                {/* Item details section */}
                                <section className='container mt-1'>
                                     <div className="itemsdetails">
                                         {/* Item image */}
                                         <div className="items__img">
                                            <img src={element.image} alt="" />
                                         </div>

                                         {/* Table for item description */}
                                        <div className="details">
                                          {/* React-Bootstrap table component */}
                                          <Table>
                                             <tr>
                                               <td style={{ color: "#fff" }}>
                                                 {/* Item details */}
                                                 <p> <strong>Cake Name</strong>  : {element.name} </p>
                                                 <p> <strong>Price</strong>  : ₹ {element.price}</p>
                                                 <p> <strong>Total</strong>  :₹  {element.price * element.qnty} </p>
                                                 
                                                 {/* Quantity control */}
                                                 <div className='mt-2 d-flex justify-content-between align-items-center' style={{ width: 90, height:30, borderRadius: 40, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                    <span style={{ fontSize: 24 }} onClick = {() => decreaseCartItemHandle(element)}>−</span>             
                                                    <span style={{ fontSize: 24 , color:'red' }}>{element.qnty}</span>
                                                    <span style={{ fontSize: 24 }} onClick = {()=> increaseCartItemHandle(element)}>+</span>
                                                </div>
                                                 </td>
                                                 
                                                 <td style={{ color: "#fff" }}>
                                                    {/* Item rating */}
                                                    <p><strong>Rating :</strong> <Ratings value="3" /></p>
                                                    
                                                    {/* Remove item button */}
                                                    <p onClick={() => removeCartHandler(element)}><strong>Remove :</strong> <span ><i className='fas fa-trash' style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i>	</span></p>
                                                 </td>
                                              </tr>
                                          </Table>
                                         </div>
                                     </div>
                                 </section>
                         </div>
                         )
                     })
                 }
            </Modal.Body>
            
            {/* Modal footer */}
            <Modal.Footer className='d-flex justify-content-between'>
                {/* Clear cart button */}
                <Button className="btn modal-btn" onClick={() => clearCartItemHandle()}>Clear Cart</Button>
                
                {/* Total payable amount */}
                <div style={{color:'Black' , fontSize:20}}><strong>Total payable Amount</strong> : ₹ {cart.cartTotalAmount}</div>
                
                {/* Close modal button */}
                <Button onClick={props.onHide} className="btn modal-btn">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default MyVerticallyCenteredModal;
