import React, { useState, useEffect } from 'react';
import "./userOrders.scss"
import Button from 'react-bootstrap/Button';


import { bringUserOrders } from '../../../services/apicalls';
import { addServiceToReview } from '../../review/reviewSlice';
import { reviewData } from '../../review/reviewSlice';
import { useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card';
import { useSelector } from "react-redux";
import { Col, Row, Container } from 'react-bootstrap';
import Review from '../../review/review';

const UserOrders = () => {

    const [userOrders, setUserOrders] = useState([]);
    const [error, setError] = useState('');
    const [showReview, setShowReview] = useState(false);
    // const user = useSelector(userData);
    const userJWT = JSON.parse(localStorage.getItem("SAVEJWT"))
    const dispatch = useDispatch();
    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.

        if (userOrders.length === 0) {

            bringUserOrders(userJWT)
                .then(
                    (res) => {
                        
                        setUserOrders(res.data)
                        
                    }
                    
                )
                .catch((error) => {
                   
                    setError(error.response?.data || 'ups intentalo de nuevo')
                })

        };


    }, [userOrders]);

    const clickedService = (service) => {

        //Guardo la service seleccionada en redux.

        dispatch(addServiceToReview({ ...service, details: service }));
        setShowReview(true)
    }
    
    const selectedService = useSelector(reviewData);
    console.log(selectedService)
    

    if (error) {
        return <pre>{ error.repeat(1) } </pre>

    }
    if (userOrders.length !== 0) {
       
        return (
            // <pre>{JSON.stringify(userOrders, null, 2)}</pre>
            <div className='contentStyle'> 
                
              
                {userOrders.map(userOrder => {
                    
                  <div><h1> Todos los alquileres realizados por el usuario </h1> </div>
                return (
                    
                        <Card style={{ width: '12em' }} className="cards" key={userOrder.id_order}>
                    <Card.Img className='imgCards' variant="top" src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b0MxU37dNmMwKtoPVYPKOZSIrIn.jpg"} />
                    <Card.Body>
                        <Card.Title>{userOrder.name}</Card.Title>
                        <Card.Text>
                            {userOrder.type}
                        </Card.Text>
                        <Card.Text>
                                Desde  {userOrder.order_date} <br></br>
                               
                        </Card.Text>
                        <Card.Text>
                            {userOrder.price}
                        </Card.Text>
                        <Button className="buttonSearch" variant="warning" size="lg" active 
                         onClick={() => clickedService(userOrder)} 
                        name="web">Dejar una reseña</Button>
                        {/* <Register
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        /> */}
                        <Review
                            show={showReview}
                            onHide={() => setShowReview(false)}
                        />
                    </Card.Body>
                            </Card>
                    
                )

                
            })}
            </div>
        )
    } else {
        return <pre>Todavía no tienes pedidos</pre>
    }
        
};

export default UserOrders;