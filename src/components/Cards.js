import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Ratings from './Ratings';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteCardData } from '../store/productSlice';
import LoadSpinner from './footer/Spinner';

//___________________addCart Fn import from cartSlice_____________________//
import { addCart } from '../store/cartSlice';
// __________________Import ProductView Function from productSlice________//
import { productView } from '../store/productSlice';

// ----------Import sortByprice and updateItemModal Component-------------//
import SortByPrice from './SortByPrice';
import UpdateItemModal from './UpdateItemModal';


const Cards = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // ++++++++++++++ accesing Store+++++++++++++//
    const cardsData = useSelector(state => state.products.data);
    const loading = useSelector(state => state.products.loading);
    const data = cardsData;

    // --------Function for Add to Cart-------------------//
    const addCartHandle = (element) => {
        // ======Add this element in redux store======//
        dispatch(addCart(element));
    }


    //-----------function for cardDetailView----------//
    const cardDetailView = (element) => {
        dispatch(productView(element))
        navigate(`/productdetail`)
    }
    //  -------------fn for handle delete Item----------//
    const deleteItemHandler = (element) => {
        dispatch(deleteCardData(element.id))
        // console.log(element)
    }
    return (
        !loading ? (
            <div className='container mt-2'>
                <div><SortByPrice /></div>
                <div className="row d-flex justify-content-evenly align-items-center">
                    {
                        // if data is present simply map over it //
                        data.length > 0 && data.map((element, id) => {
                            return (

                                <Card key={element.id}  className="mx-2 mt-4 card_style">
                                    <Card.Img variant="top" src={element.image} style={{ height: "16rem" }} className="mt-3" onClick={() => cardDetailView(element)} />
                                    <Card.Body>
                                        <Card.Title>{element.name} </Card.Title>
                                        <Card.Text>
                                            <div className="price-rating d-flex justify-content-between">
                                                Price : ₹ {element.price}
                                                <Ratings value={element.rating} />
                                            </div>
                                            
                                        </Card.Text>
                                        <div className="row">
                                            <div className="col-8">
                                                <Button variant="danger"
                                                    onClick={() => addCartHandle(element)}
                                                    className='col-lg-12 btn'>Add to Cart</Button>
                                            </div>
                                            <div className="col-4 d-flex justify-content-between align-items-center">
                                                {/* on Clicking delete icon simply call deleteItemHandler Function  */}
                                                <DeleteIcon onClick={() => deleteItemHandler(element)} style={{ color: 'red' }} />
                                                <UpdateItemModal
                                                    updateitem={element} />
                                            </div>
                                        </div>

                                    </Card.Body>
                                </Card>

                            )
                        })
                    }

                </div>
            </div>
        ) : <LoadSpinner />
    )
}

export default Cards