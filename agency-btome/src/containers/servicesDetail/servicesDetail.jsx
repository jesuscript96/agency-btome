import React from "react";
import "./servicesDetail.scss";
import { Button } from 'antd';

import { serviceData } from "../services/serviceSlice";
import { chartData } from "../services/chartSlice";

import { useSelector } from "react-redux";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addServiceToChart } from "../services/chartSlice";
import { useDispatch } from "react-redux";


const ServicesDetail = () => {
  let navigate = useNavigate();
const dispatch = useDispatch();

  let loged = localStorage.getItem("SAVEUSERMAIL");


  const addToChartOnClick =  (service) => {
    console.log("carreando")
        //Guardo la service seleccionada en redux.
        console.log(service.id_service)
      dispatch(addServiceToChart({ ...service, details: service }));

      setTimeout(() => {
        console.log("he dispachao")
          navigate("/");
      }, 750);

      console.log("he navegao")

      }

  const chartAdded = useSelector(chartData);
  console.log(chartAdded)

  const selectedService = useSelector(serviceData);

  if (selectedService?.id_service !== undefined) {
      
    if (loged){
          return (

      <Container fluid className="filmsViewDesign" >
              <Row className= "align-items-center">
                <Col >
                <div><Image className="moviePicView fluid" src={`https://robohash.org/YOUR-TE${selectedService.type}dsXT.png`} /></div>  
                    <Button className="buttonDesign" 
                    onClick={()=>addToChartOnClick(selectedService)}
                    >Añadir al carrito</Button>
                </Col>
                <Col className=" align-items-center">
                    <div className="titleDesign text-fluid">{selectedService?.name}</div>
                  <div className="genreDesign">Género: {selectedService?.type}</div>  
                  <div className="ratingDesign align-items-center">Puntuación: {selectedService?.price}</div> 
               <div className="sinopsisDesign text-break "> {selectedService?.description}</div>
                </Col>
                
                
                
        </Row>  
</Container>
)
    } else {
      return (

      <Container fluid className="filmsViewDesign">
        <Row className= "align-items-center">
                <Col >
                <div><Image className="moviePicView fluid" src={`https://robohash.org/YOUR-TE${selectedService.type}dsXT.png`} /></div>  
                </Col>
                <Col className=" align-items-center">
                    <div className="titleDesign text-fluid">{selectedService?.name}</div>
                  <div className="genreDesign">Género: {selectedService?.type}</div>  
                  <div className="ratingDesign align-items-center">Puntuación: {selectedService?.price}</div> 
               <div className="sinopsisDesign text-break "> {selectedService?.description}</div>
                </Col>
                
                
                
        </Row>  
</Container>
)
        }


  } else {
    return (
      <div className="filmsViewDesign"> <Spinner className=" spinnerDesign mb-5" /> 
        <h3>Ha habido un error</h3></div>
      
    )
   
  }
  
}


export default ServicesDetail




