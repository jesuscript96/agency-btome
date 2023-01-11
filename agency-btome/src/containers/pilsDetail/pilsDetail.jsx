import React from "react";
import "./pilsDetail.scss";
import { Button } from 'antd';

import { pilData } from "../pils/pilSlice";
import { addSpa } from "../SPA/spaSlice";

import { useSelector } from "react-redux";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const PilsDetail = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const blogPage = () => {
    console.log("vamos a por pils!")
    dispatch(addSpa({
      details: "pils"
    }))
    // navigate("/")
  }

  const selectedPil = useSelector(pilData);

  if (selectedPil?.id_pil !== undefined) {

    return (

      <Container fluid className="filmsViewDesign">
        <Row className="align-items-center">
          <Col >
            <div><Image className="moviePicView fluid" src={`https://robohash.org/YOUR-TE${selectedPil.type}dsXT.png`} /></div>
            <Button className="buttonDesign"
              onClick={() => blogPage()}
            >Volver al blog</Button>
          </Col>
          <Col className=" align-items-center">
            <div className="titleDesign text-fluid">{selectedPil?.title}</div>
            <div className="genreDesign">Género: {selectedPil?.type}</div>
            <div className="ratingDesign align-items-center">date: {selectedPil?.creation_date}</div>
            <div className="sinopsisDesign text-break "> {selectedPil?.text}</div>
          </Col>



        </Row>
      </Container>
    )


  } else {
    return (
      <div className="filmsViewDesign"> <Spinner className=" spinnerDesign mb-5" />
        <h3>Ha habido un error</h3></div>

    )

  }

}


export default PilsDetail




