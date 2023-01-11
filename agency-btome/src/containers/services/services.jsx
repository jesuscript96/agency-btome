import React from "react";
import "../services/services.scss";
import { useNavigate } from "react-router-dom";
import { bringServices, bringFilteredServices } from '../../services/apicalls'
import { errorCheck } from '../../services/useful';
import { useState } from "react";
import { useEffect } from "react";
import { addSpa } from "../SPA/spaSlice";

import { useDispatch } from "react-redux";
import { addService, } from "./serviceSlice"
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Form from 'react-bootstrap/Form';



const Services = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [services, setServices] = useState([]);
    const [criteria, setCriteria] = useState({
        goal: "",
        price: 1000
    })
    const [priceError, setPriceError] = useState({
        priceError: ""
    })

   

    const inputHandler = (e) => {

        setCriteria((prevState) => ({
            ...prevState,
            price: e.target.value

        }));
    }

    const errorHandler = (field, value, type) => {

        let error = ""

        error = errorCheck(field, value, type)

        setPriceError(((prevState) => ({
            ...prevState,
            priceError: error

        })))
    };




    const clickedService = (service) => {

        //Guardo la service seleccionada en redux.

        dispatch(addService({ ...service, details: service }));

        console.log("vamos a por serviceDetail!")
        dispatch(addSpa({
          details: "serviceDetail"
        }))
    }

    const clickedServiceGoal = (e) => {
        setCriteria((prevState) => ({
            ...prevState,
            goal: e.target.name

        }))
    }

    const allServices = () => {
        bringServices().then(
            (res) => {
                setServices(res.data)

            }
        );
    }

    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.

        // console.log(services)

        if (services.length === 0) {


            //Adding a 1 seconds delay on purpose...



            setTimeout(() => {

                bringServices().then(
                    (res) => {
                        setServices(res.data)

                    }
                );

            }, 1000);



        };

    }, [services]);

    useEffect(() => {



        if (criteria.goal !== '') {

            //Voy a aplicar mi proceso de debounce....
            if (services.length === 0) {

            // console.log(criteria.goal, criteria.price)

            const bring = setTimeout(() => {

                bringFilteredServices(criteria.goal, criteria.price)
                    .then(res => {

                        setServices(res.data)

                    })
                    .catch(error => console.log(error));

            }, 150);

            return () => clearTimeout(bring);
        }

        } else if (criteria.goal === '') {
            // console.log(services)
            if (services.length === 0) {
            bringServices().then(
                (res) => {
                    setServices(res.data)

                }
            );
            }
        }

    }, [criteria])


    // console.log(services)

    if (services.length === 0) {
        return (
            <Container fluid className="servicesDesign" >
                <Row className="preServices h-50">
                    <Col className="preServices">
                        <div>
                            <h1>Nuestros Servicios</h1>
                            <h3>Sea cual sea su objetivo, tenemos servicios a la altura. Somos expertos en Growth Marketing. ¿Cómo podemos llevarte al éxito?</h3>

                        </div>
                    </Col>
                    <Col className="preServices">
                        <Container>
                            <Row>
                                <Col>
                                    <h3>Propósito:</h3>
                                </Col>
                                <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="sem">Crecimiento rápido</Button></Col>
                                <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="seo">Marca digital</Button></Col>
                                <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="web">Digitalización</Button></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3>Presupuesto:</h3>
                                </Col>
                                <Col>
                                    <div className="inputsContainer">
                                        <div className="errorInput">{priceError.priceError}
                                        </div>
                                        <div>
                                            <input type="number" name="price" placeholder="€" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "number")} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>

                </Row>

                <Row   >

                    <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={allServices}>Todos</Button></Col>
                    <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="sem">Crecimiento rápido</Button></Col>
                    <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="seo">Marca digital</Button></Col>
                    <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="web">Digitalización</Button></Col>

                </Row>

                <Row className="d-flex align-content-end justify-content-center w-100 spinnerDesign">
                    <Spinner className=" spinnerDesign" />

                </Row>

            </Container>
        )
    } else {
        return (
            <Container fluid className="servicesDesign" >
                <Row className="preServices h-50">
                    <Col className="preServices">
                        <div>
                            <h1>Nuestros Servicios</h1>
                            <h3>Sea cual sea su objetivo, tenemos servicios a la altura. Somos expertos en Growth Marketing. ¿Cómo podemos llevarte al éxito?</h3>

                        </div>
                    </Col>
                    <Col className="preServices">
                        <Container>
                            <Row>
                                <Col>
                                    <h3>Propósito:</h3>
                                </Col>
                                <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="sem">Crecimiento rápido</Button></Col>
                                <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="seo">Marca digital</Button></Col>
                                <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="web">Digitalización</Button></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3>Presupuesto:</h3>
                                </Col>
                                <Col>
                                    <div className="inputsContainer">
                                        <div className="errorInput">{priceError.priceError}
                                        </div>
                                        <div>
                                            <input type="number" name="price" placeholder="€" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "number")} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>

                </Row>

                <Row   >

                    <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={allServices}>Todos</Button></Col>
                    <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="sem">Crecimiento rápido</Button></Col>
                    <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="seo">Marca digital</Button></Col>
                    <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="web">Digitalización</Button></Col>

                </Row>

                <Row flex >

                    {/* Here I proceed to MAP the hook which contains all the Services */}

                    {
                services.map(service => {
                    return (
                        <Card onClick={() => clickedService(service)} style={{ width: '12rem' }} className="cards" key={service.id_service}>
                        <Card.Img className='imgCards' variant="top" src={`https://robohash.org/YOUR-TE${service.type}dsXT.png`} />
                        <Card.Body>
                            {/* <Card.Title>{service.film.title}</Card.Title> */}
                            <Card.Text>
                                {service.type}
                            </Card.Text>
                            <Card.Text>
                                    Nombre: {service.name} <br></br>
                                    Precio: {service.price} €
                            </Card.Text>
                            <Button className="buttonSearch" variant="warning" size="lg" active  onClick={() => clickedService(service)} name="web">+Info</Button>
                        </Card.Body>
                    </Card>
                    )
                })
            }



                </Row>

            </Container>
        )
    }



}

export default Services





