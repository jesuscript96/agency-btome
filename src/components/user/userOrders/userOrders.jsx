import React, { useState, useEffect } from 'react';
import "./userOrders.scss"
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';


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


    }, []);

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
            <div className='contentStyleOrders'> 
                
                <div><h1> Todos los alquileres realizados por el usuario </h1> </div>
              
                <Accordion defaultActiveKey="1">
                {userOrders.map(userOrder => {
                    
                return (

      <Accordion.Item eventKey={userOrder.id_ordersservices}>
        <Accordion.Header>Servicio: {userOrder.name}</Accordion.Header>
        <Accordion.Body>
        <p><h4>Precio:</h4>  {userOrder.price} €</p>   <br />
        <p> <h4>Date:</h4> {userOrder.order_date}</p>  <br />
        <Button className="buttonSearch" variant="warning" size="lg" active 
                         onClick={() => clickedService(userOrder)} 
                        name="web">Dejar una reseña</Button>
                        
                        <Review
                            show={showReview}
                            onHide={() => setShowReview(false)}
                        />
        
        </Accordion.Body>
      </Accordion.Item>                    
                )               
                
            })}
            </Accordion>
            </div>
        )
    } else {
        return <pre>Todavía no tienes pedidos</pre>
    }
        
};

export default UserOrders;