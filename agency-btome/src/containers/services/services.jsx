import React from "react";
import "../services/services.scss";
import { useNavigate } from "react-router-dom";
import { bringServices, bringFilteredServices } from '../../services/apicalls'
import { useState } from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

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

    setCriteria((prevState) => ({
        ...prevState,
        price: e.target.value

    }))

    const inputHandler = (e) => {

        setCriteria(e.target.value);
    }

    const errorHandler = (field, value, type) => {

        let error = ""

        error = errorCheck(field, value, type)

        setPriceError(((prevState) => ({
            ...prevState,
            priceError: error

        })))
    };




    // const clickedService = (service) => {

    //     //Guardo la service seleccionada en redux.

    //     dispatch(addService({ ...service, details: service }));

    //     setTimeout(() => {
    //         navigate("/servicesView");
    //     }, 750);
    // }

    const clickedServiceGoal = () => {
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

    const filterServices = (type) => {
        bringFilteredServices(type)
            .then(res => {
                setServices(res.data)
            })
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



        if (criteria !== '') {

            //Voy a aplicar mi proceso de debounce....

            const bring = setTimeout(() => {

                bringFilteredServices(criteria)
                    .then(res => {

                        setServices(res.data)

                    })
                    .catch(error => console.log(error));

            }, 150);

            return () => clearTimeout(bring);

        } else if (criteria === '') {
            bringservices().then(
                (res) => {
                    setServices(res.data)

                }
            );
        }

    }, [criteria])




    if (services.length === 0) {
        return (
            <Container fluid className="servicesDesign" >
                <Row>
                    <Col>
                        <div>
                            <h1>Nuestros Servicios</h1>
                            <h3>Sea cual sea su objetivo, tenemos servicios a la altura. Somos expertos en Growth Marketing. ¿Cómo podemos llevarte al éxito?</h3>

                        </div>
                    </Col>
                    <Col>
                        <Container>
                            <Row>
                                <Col>
                                    <h3>Propósito:</h3>
                                </Col>
                                <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={clickedServiceGoal} name="sem">Crecimiento rápido</Button></Col>
                                <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={clickedServiceGoal} name="seo">Marca digital</Button></Col>
                                <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={clickedServiceGoal} name="web">Digitalización</Button></Col>
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
                    <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={filterServices(e.target.name)} name="sem">Crecimiento rápido</Button></Col>
                    <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={filterServices(e.target.name)} name="seo">Marca digital</Button></Col>
                    <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={filterServices(e.target.name)} name="web">Digitalización</Button></Col>

                </Row>

                <Row className="d-flex align-content-end justify-content-center w-100 spinnerDesign">
                    <Spinner className=" spinnerDesign" />

                </Row>

            </Container>
        )
    } else {
        return (
            <Container fluid className="servicesDesign" >
                <Row>
                    <Col>
                        <div>
                            <h1>Nuestros Servicios</h1>
                            <h3>Sea cual sea su objetivo, tenemos servicios a la altura. Somos expertos en Growth Marketing. ¿Cómo podemos llevarte al éxito?</h3>

                        </div>
                    </Col>
                    <Col>
                        <Container>
                            <Row>
                                <Col>
                                    <h3>Propósito:</h3>
                                </Col>
                                <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={clickedServiceGoal} name="sem">Crecimiento rápido</Button></Col>
                                <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={clickedServiceGoal} name="seo">Marca digital</Button></Col>
                                <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={clickedServiceGoal} name="web">Digitalización</Button></Col>
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
                    <Col><Button className="buttonSearch" variant="warning" size="lg" active onClick={filterServices(e.target.name)} name="sem">Crecimiento rápido</Button></Col>
                    <Col>  <Button className="buttonSearch" variant="warning" size="lg" active onClick={filterServices(e.target.name)} name="seo">Marca digital</Button></Col>
                    <Col> <Button className="buttonSearch" variant="warning" size="lg" active onClick={filterServices(e.target.name)} name="web">Digitalización</Button></Col>

                </Row>

                <Row flex >

                    {/* Here I proceed to MAP the hook which contains all the Services */}

                    {
                        services.map(service => (<Col>



                            <Image className="servicePic " src={service.poster} 
                            // onClick={() => clickedservice(service)} 
                            key={service.id} />

                        </Col>
                        ))
                    }



                </Row>

            </Container>
        )
    }



}

export default Services



