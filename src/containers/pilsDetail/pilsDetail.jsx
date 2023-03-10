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
    dispatch(addSpa({
      details: "pils"
    }))
    // navigate("/")
  }

  const selectedPil = useSelector(pilData);

  if (selectedPil?.id_pil !== undefined) {

    return (

      <Container fluid className="filmsViewDesign">
        <Row>
        <div className="titleDesign text-fluid">{selectedPil?.title}</div>
        </Row>
        <Row className="align-items-center pilsDetailsAlignment">
          <Col  sm={10} md={8} xs={12} lg={6}>
            <div><Image className="pilPicView fluid" src={selectedPil.img} /></div>
            <div className="ratingDesign">date: {selectedPil?.creation_date}</div>
          </Col>
          </Row>
          <Row className=" align-items-center justify-content-center">
          <Col sm={10} md={9} xs={12} lg={8} className=" align-items-center">
            <div className="reviewDesign text-break "> {selectedPil?.text}</div>
          <Button className="buttonDesign"
              onClick={() => blogPage()}
            >Volver al blog</Button>
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




