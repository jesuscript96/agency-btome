import React from "react";
import "./servicesDetail.scss";
import { Button } from 'antd';
import Card from 'react-bootstrap/Card';
import { addSpa } from "../SPA/spaSlice";


import { serviceData } from "../services/serviceSlice";
import { chartData } from "../services/chartSlice";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addServiceToChart } from "../services/chartSlice";
import { useDispatch } from "react-redux";

import { bringServiceReviews } from "../../services/apicalls"


const ServicesDetail = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  
  let loged = localStorage.getItem("SAVEJWT");
  
  const selectedService = useSelector(serviceData);
  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    //This function is triggered when the component is mounted for the first time.

    if (reviews.length === 0 || reviews === "") {


        //Adding a 1 seconds delay on purpose...



        setTimeout(() => {

          bringServiceReviews(selectedService.id_service).then(
                (res) => {
                    setReviews(res.data)
                    
                }
            );

        }, 1000);



    };

}, [reviews]);

  const addToChartOnClick = (service) => {
    //Guardo la service seleccionada en redux.
    dispatch(addServiceToChart({ 
      details: service.id_service,
      name: service.name,
      price: service.price
     }));

    setTimeout(() => {
      dispatch(addSpa({
        details: "services"
      }))
    }, 750);

  }

  const chartAdded = useSelector(chartData);

  if (selectedService?.id_service !== undefined) {

    if (loged) {
      return (

        <Container fluid className="filmsViewDesign" >
          <Row>
              <div className="titleDesign text-fluid">{selectedService?.name}</div>
          </Row>
          <Row className="align-items-center">
            <Col  sm={8} md={6} xs={10} lg={4}>
              <div><Image className="servicePicView fluid" src={selectedService.img} /></div>
            </Col>
            <Col  sm={8} md={6} xs={10} lg={4} className=" align-items-center">
              <div className="sinopsisDesign text-break "> {selectedService?.description}</div>
              <Button className="serviceButtonDesign"
                onClick={() => addToChartOnClick(selectedService)}
              >Añadir al carrito</Button>
            </Col>
          </Row>
          <Row>
          {
                reviews.map(review => {
                    return (
                      <Card className="serviceReviews">
                      <Card.Header>{review.creation_date} - {review.rating}</Card.Header>
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <p>
                            {' '}
                            {review.text}
                            {' '}
                          </p>
                          <footer className="blockquote-footer">
                            <cite title="Source Title">{review.userMail}</cite>
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Card>
                    )
                })
            }
          </Row>
        </Container>
      )
    } else {
      return (

        <Container fluid className="filmsViewDesign">
         <Row>
              <div className="titleDesign text-fluid">{selectedService?.name}</div>
          </Row>
          <Row className="align-items-center">
            <Col  sm={8} md={6} xs={10} lg={4}>
              <div><Image className="servicePicView fluid" src={selectedService.img} /></div>
            </Col>
          </Row>
          <Row>
          {
                reviews.map(review => {
                    return (
                      <Card>
                      <Card.Header>{review.creation_date} - {review.rating}</Card.Header>
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <p>
                            {' '}
                            {review.text}
                            {' '}
                          </p>
                          <footer className="blockquote-footer">
                            <cite title="Source Title">{review.userMail}</cite>
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Card>



                    //     <Card
                    //     style={{ width: '12rem' }} className="cards" key={review.id_review}>
                    //     <Card.Img className='imgCards' variant="top" src={`https://robohash.org/YOUR-TE${review.id_review}dsXT.png`} />
                    //     <Card.Body>
                    //         {/* <Card.Title>{review.film.title}</Card.Title> */}
                    //         <Card.Text>
                    //             {review.userMail}
                    //             {review.creation_date}
                    //         </Card.Text>
                    //         <Card.Text>
                    //                 rating: {review.rating} <br></br>
                    //                 desc: {review.text} €
                    //         </Card.Text>
                    //     </Card.Body>
                    // </Card>
                    )
                })
            }
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




