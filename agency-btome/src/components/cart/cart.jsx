import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./cart.scss";
import { useState } from "react";
import { useEffect } from "react";
import { chartData } from "../../containers/services/chartSlice";
import {  useDispatch } from "react-redux";
import { emptyChart } from '../../containers/services/chartSlice';
import { useSelector } from "react-redux";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { newOrder, addServiceToOrder } from "../../services/apicalls"

function Cart(props) {

    const chartAdded = useSelector(chartData);

    useEffect(() => {
    });

    const dispatch = useDispatch();  

    const [success, setSuccess] = useState({
        orderSuccess: ""
    })

    const orderServices = () => {
        createNewOrder()
            .then(res => {
                const userJWT = JSON.parse(localStorage.getItem("SAVEJWT"))    
                // console.log(chartAdded.details)           
                chartAdded.details.map(service => {
                    // console.log(service)
                    // console.log(res.data)
                    console.log(service.details)
                    let addServiceBody = {
                        "orderIdOrder": res.data,
                        "serviceIdService": service.details
                    }
                    console.log(addServiceBody)
                    addServiceToOrder(addServiceBody, userJWT)
                    setSuccess(((prevState) => ({
                        ...prevState,
                        orderSuccess: "Pedido realizado con éxito. En breves nos pondremos en contacto contigo."

                    })))
                    dispatch(emptyChart())
                })

            })

    }

    const createNewOrder = () => {
        try {
            const userJWT = JSON.parse(localStorage.getItem("SAVEJWT"))
            let today = new Date();
            let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
            let orderBody = {
                "order_date": date
            }

            let resp = newOrder(orderBody, userJWT)
            //   setTimeout(() => {
            //     navigate("/myaccount");
            // }, 750);
            return resp
        } catch (error) { }
    }


    // console.log(chartAdded.details)


    if (success.orderSuccess === "") {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Carrito
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='loginDesign'>
                        <ListGroup as="ol" numbered>
    
                            {
                                chartAdded.details.map(service => {
                                    return (
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{service.name}</div>
                                            </div>
                                            <Badge bg="" className="cartPrices" pill> <p>{service.price}€</p>
                                                
                                            </Badge>
                                        </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                        <div>
                            <Button
                                 onClick={() => orderServices()} 
                                className="buttonDesignCart">Tramitar pedido</Button>
                        </div>
    
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="buttonDesignCart" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Carrito
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="errorInput">{success.orderSuccess}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );    
    }

}

export default Cart