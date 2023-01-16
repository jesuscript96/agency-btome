import React, { useState, useEffect } from 'react';
import "./allOrders.scss"
import Table from 'react-bootstrap/Table';

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

                    setError(error.response?.data || 'ups intentalo de nuevo')
                })

        };


    }, [allOrders]);

       

    if (error) {
        return <pre>{error.repeat(1)} </pre>
    }
    if (allOrders.length !== 0) {
        return (
            // <pre>{JSON.stringify(allOrders, null, 2)}</pre>
            <div className='contentStyle'>
                <div className='contentStyle'></div>
                <br></br>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Client</th>
                                        <th>Service</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                {
                    allOrders[0].map(allOrder => {
                        
                        return (
                                <tbody>
                                    <tr>
                                        <td>{allOrder.order_date}</td>
                                        <td>{allOrder.userMail}</td>
                                        <td>{allOrder.name}</td>
                                        <td>{allOrder.price}</td>
                                    </tr>
                                </tbody>
                                    )
                                })
                            }
                            </Table>
            </div>

        )
    } else {
        return <pre>Todavía no hay pedidos en la plataforma</pre>
    }
};

export default AllOrders;