import React from "react";
import "./pils.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { addSpa } from "../SPA/spaSlice";

import { useDispatch } from "react-redux";
import  { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { bringPils, bringPilsFilteredByName, bringPilsFilteredByType } from '../../services/apicalls'
import { addPil, } from "./pilSlice"


const Pils = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [pils, setPils] = useState([]);
    const [criteria, setCriteria] = useState('')

    const inputHandler = (e) => {
       
        setCriteria(e.target.value);
    }




    const clickedPil = (pil) => {

        //Guardo la película seleccionada en redux.

        dispatch(addPil({ ...pil, details: pil }));
        dispatch(addSpa({
          details: "pilDetail"
        }))
    }

    const pilsFilteredByName = (criteria) => {
        bringPilsFilteredByName(criteria)
            .then(res => {
                setPils(res.data)
            })
    }

    const pilsFilteredByType = (e) => {
        bringPilsFilteredByType(e.target.name)
            .then(res => {
                setPils(res.data)
            })
    }

    const allPils = () => {
        bringPils().then(
            (res) => {
                setPils(res.data)
                
            }
        );
    }

    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.

        if (pils.length === 0) {


            //Adding a 1 seconds delay on purpose...



            setTimeout(() => {

                bringPils().then(
                    (res) => {
                        setPils(res.data)
                        
                    }
                );

            }, 1000);



        };

    }, [pils]);

    useEffect(() => {

        

        if (criteria !== '') {

            //Voy a aplicar mi proceso de debounce....

            const bring = setTimeout(() => {

                pilsFilteredByName(criteria)
                    .then(res => {
                       
                        setPils(res.data)
                        
                    })
                    .catch(error => console.log(error));

            }, 150);

            return () => clearTimeout(bring);

        } else if (criteria === '') {
            bringPils().then(
                (res) => {
                    setPils(res.data)
                    
                }
            );
        }

    }, [criteria])




    if (pils.length === 0) {
        return (
            <Container fluid className="PilsDesign" >
                 <Row className="d-flex justify-content-center" >
                    <Form className="d-flex searchDesign ">
                        <Form.Control
                            type="criteria"
                            placeholder="search for a Pil!"
                            name="criteria"
                            aria-label="Go!"
                            onChange={(e) => inputHandler(e)}
                        />
                    </Form>

                </Row>
  <br></br>
                <Row   >

                    <Col  sm={8} md={6} xs={10} lg={4}><Button className="buttonSearchPils" variant="warning" size="lg" active onClick={allPils}>Todas</Button></Col>
                <Col  sm={8} md={6} xs={10} lg={4}>  <Button className="buttonSearchPils" variant="warning" size="lg" active onClick={(e) => pilsFilteredByType(e)} name="sem">Crecimiento rápido</Button></Col>
                 <Col  sm={8} md={6} xs={10} lg={4}> <Button className="buttonSearchPils" variant="warning" size="lg" active onClick={(e) => pilsFilteredByType(e)} name="seo">Marca digital</Button></Col> 
                 <Col  sm={8} md={6} xs={10} lg={4}> <Button className="buttonSearchPils" variant="warning" size="lg" active onClick={(e) => pilsFilteredByType(e)} name="web">Digitalización</Button></Col> 

                </Row>
              
                <Row className="d-flex align-content-end justify-content-center w-100 spinnerDesign">
                    <Spinner className=" spinnerDesign"/>

                </Row>

            </Container>
        )
    } else {
        return (
            <Container fluid className="PilsDesign" >
                <Row className="d-flex justify-content-center" >
                    <Form className="d-flex searchDesign">
                        <Form.Control
                            type="criteria"
                            placeholder="search for a Pil!"
                            name="criteria"
                            aria-label="Go!"
                            onChange={(e) => inputHandler(e)}
                        />
                    </Form>

                </Row>
<br></br>
                <Row   >

                <Col  sm={8} md={6} xs={10} lg={4}><Button className="buttonSearchPils" variant="warning" size="lg" active onClick={allPils}>Todas</Button></Col>
                <Col  sm={8} md={6} xs={10} lg={4}>  <Button className="buttonSearchPils" variant="warning" size="lg" active onClick={(e) => pilsFilteredByType(e)} name="sem">Crecimiento rápido</Button></Col>
                 <Col  sm={8} md={6} xs={10} lg={4}> <Button className="buttonSearchPils" variant="warning" size="lg" active onClick={(e) => pilsFilteredByType(e)} name="seo">Marca digital</Button></Col> 
                 <Col  sm={8} md={6} xs={10} lg={4}> <Button className="buttonSearchPils" variant="warning" size="lg" active onClick={(e) => pilsFilteredByType(e)} name="web">Digitalización</Button></Col> 

                </Row>

                <Row flex className="cardsPils pad" >

                    {/* Here I proceed to MAP the hook which contains all the Pils */}

                
                    {
                pils.map(pil => {
                    return (
                        <Col md={3} sm={4} className="cardsPils">

                        <Card 
                        onClick={() => clickedPil(pil)} 
                        style={{ width: '12rem' }} className="cardsPils" key={pil.id_pil}>
                        {/* <Card.Img className='imgCards' variant="top" src={`https://robohash.org/YOUR-TE${pil.type}dsXT.png`} /> */}
                        <Card.Body>
                            {/* <Card.Title>{pil.film.title}</Card.Title> */}
                            {/* <Card.Text>
                                {pil.type}
                            </Card.Text> */}
                            <Card.Text>
                                    {pil.title} <br></br>
                            </Card.Text>
                            <Button className="buttonSearchPils" variant="warning" size="lg" active 
                             onClick={() => clickedPil(pil)} 
                             name="web">Leer más</Button>
                        </Card.Body>
                    </Card>
                        </Col>
                    )
                })
            }
                



                </Row>
            </Container>
        )
    }



}

export default Pils