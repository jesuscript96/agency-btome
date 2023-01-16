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
            price: e.target.value,
            goal: prevState.goal

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

        
        dispatch(addSpa({
            details: "serviceDetail"
        }))
    }

    const clickedServiceGoal = (e) => {
        setCriteria((prevState) => ({
            ...prevState,
            goal: e.target.name,
            price: prevState.price

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

      

        if (criteria.goal !== '' || criteria.goal !== null) {

            //Voy a aplicar mi proceso de debounce....
            // if (services.length === 0) {

               

                const bring = setTimeout(() => {

                    bringFilteredServices(criteria.goal, criteria.price)
                        .then(res => {
                            setServices(res.data)

                        })
                        .catch(error => console.log(error));

                }, 150);

                return () => clearTimeout(bring);
            // }

        } else if (criteria.goal === '') {
      
            if (services.length === 0) {
                bringServices().then(
                    (res) => {
                        setServices(res.data)

                    }
                );
            }
        }

    }, [criteria])

    if (services.length === 0) {
        return (
            <Container fluid className="servicesDesign" >
                <Row className="preServices h-50">
                    <Col className="preServices">
                        <div className="preServices">
                            <h1>Nuestros Servicios</h1>
                            <h3>Sea cual sea su objetivo, tenemos servicios a la altura. Somos expertos en Growth Marketing. ¿Cómo podemos llevarte al éxito?</h3>

                        </div>
                    </Col>
                </Row>
                <Row className="filter h-50">
                   
                                <Col>
                                    <h3>Propósito:</h3>
                                    <div>
                                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="sem">Crecimiento rápido</Button>
                                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="seo">Marca digital</Button>
                                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="web">Digitalización</Button>
                                    </div>
                                </Col>
                                {/* <Col>
                                 </Col> */}
                                <Col>
                                    <h3>Presupuesto:</h3>
                                    <div className="inputsContainer">
                                        <div className="errorInput">{priceError.priceError}
                                        </div>
                                        <div>
                                            <input type="number" name="price" placeholder="€" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "number")} />
                                        </div>
                                    </div>
                                </Col>

                </Row>

                <Row className="filter">

                    <Col><Button className="buttonSearch" size="lg" active onClick={allServices}>Todos</Button>
                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="sem">Crecimiento rápido</Button>
                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="seo">Marca digital</Button>
                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="web">Digitalización</Button></Col>

                </Row>

                <Row className="d-flex align-content-end justify-content-center w-100 spinnerDesign">
                    <Spinner className=" spinnerDesign" />

                </Row>

            </Container>
        )
    } else {
        return (
            <Container fluid className="servicesDesign " >
                <Row className="preServices h-50">
                    <Col  sm={8} md={6} xs={10} lg={4} className="preServices">
                        <div className="preServices">
                            <h1>Nuestros Servicios</h1>
                            <h3>Sea cual sea su objetivo, tenemos servicios a la altura. Somos expertos en Growth Marketing. ¿Cómo podemos llevarte al éxito?</h3>

                        </div>
                    </Col>
                </Row>
                <Row className="filter h-50">
                   
                                <Col>
                                    <h3>Propósito:</h3>
                                    <div>
                                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="sem">Crecimiento rápido</Button>
                                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="seo">Marca digital</Button>
                                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="web">Digitalización</Button>
                                    </div>
                                </Col>
                                {/* <Col>
                                 </Col> */}
                                <Col>
                                    <h3>Presupuesto:</h3>
                                    <div className="inputsContainer">
                                        <div className="errorInput">{priceError.priceError}
                                        </div>
                                        <div>
                                            <input type="number" name="price" placeholder="€" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "number")} />
                                        </div>
                                    </div>
                                </Col>

                </Row>

                <Row className="filter">

                    <Col  sm={10} md={8} xs={12} lg={6}><Button className="buttonSearch" size="lg" active onClick={allServices}>Todos</Button>
                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="sem">Crecimiento rápido</Button>
                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="seo">Marca digital</Button>
                        <Button className="buttonSearch" size="lg" active onClick={(e) => clickedServiceGoal(e)} name="web">Digitalización</Button></Col>

                </Row>

                <Row flex >

                    {/* Here I proceed to MAP the hook which contains all the Services */}

                    {
                        services.map(service => {

                            if (service.id_service % 2 === 0) {
                                return (

                                    <Container fluid>
                                        <Row className="servicesRow">
                                            <Col  sm={8} md={6} xs={10} lg={4} className="serviceMoreInfo">
                                                <div>
                                                    <h1>{service.name}</h1>
                                                </div>
                                                <div>
                                                    <Button className="buttonSearch" onClick={() => clickedService(service)}>
                                                        +Info
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col  sm={8} md={6} xs={10} lg={4} className="alignImg">
                                                <div className="alignImg">

                                            <img src={service.img} className="imgServices"/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>)
                            } else {
                                return (
                                    <Container fluid>
                                        <Row className="servicesRow par">
                                            <Col  sm={8} md={6} xs={10} lg={4} className="alignImg">
                                                <div className="alignImg">

                                            <img src={service.img} className="imgServices"/>
                                                </div>
                                            </Col>
                                            <Col className="serviceMoreInfo">
                                                <div>
                                                    <h1>{service.name}</h1>
                                                </div>
                                                <div>
                                                    <Button className="buttonSearch" onClick={() => clickedService(service)}>
                                                        +Info
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>)
                            }
                        })
                    }



                </Row>

            </Container>
        )
    }



}

export default Services





