import React, { useState, useEffect } from 'react';
import "./allOrders.scss"

import { bringAllOrders } from '../../../services/apicalls';

import Card from 'react-bootstrap/Card';

const AllOrders = () => {

    const [allOrders, setAllOrders] = useState([]);
    const [error, setError] = useState('');
    
    const userJWT = JSON.parse(localStorage.getItem("SAVEJWT"))

    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.

        if (allOrders.length === 0) {

            bringAllOrders(userJWT)
            .then(
                (res) => {
                   
                    setAllOrders(res.data)
                }
            )
            .catch((error) => {
                
                setError(error.response?.data  || 'ups intentalo de nuevo' )
            })

        };


    }, [allOrders]);

    

    if(error) {
        return <pre>{error.repeat(1)} </pre>
    }
    if (allOrders.length !== 0) {
        return (
        // <pre>{JSON.stringify(allOrders, null, 2)}</pre>
            <div className='contentStyle'>
                <div className='contentStyle'></div>
                <br></br>
            {
                allOrders.map(allOrder => {
                    return (
                        <Card style={{ width: '12rem' }} className="cards" key={allOrder.id_order}>
                        <Card.Img className='imgCards' variant="top" src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b0MxU37dNmMwKtoPVYPKOZSIrIn.jpg"} />
                        <Card.Body>
                            {/* <Card.Title>{allOrder.film.title}</Card.Title> */}
                            <Card.Text>
                                {allOrder.userMail}
                            </Card.Text>
                            <Card.Text>
                                {allOrder.name}
                            </Card.Text>
                            <Card.Text>
                                    Desde {allOrder.order_date} <br></br>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    )
                })
            }
        </div>
        
        )
    } else {
        return <pre>Todavía no hay pedidos en la plataforma</pre>
    }
};

export default AllOrders;