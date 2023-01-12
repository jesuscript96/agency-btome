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

  
  let loged = localStorage.getItem("SAVEUSERMAIL");
  
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
    console.log("carreando")
    //Guardo la service seleccionada en redux.
    console.log(service)
    console.log(service.id_service)
    dispatch(addServiceToChart({ 
      details: service.id_service,
      name: service.name,
      price: service.price
     }));

    setTimeout(() => {
      console.log("he dispachao")
      dispatch(addSpa({
        details: "services"
      }))
    }, 750);

    console.log("he navegao")

  }

  const chartAdded = useSelector(chartData);
  console.log(chartAdded)
  console.log(chartAdded.lenght)
  console.log(chartAdded.details)
  console.log(chartAdded.details.length)
  // console.log(JSON.stringify(chartAdded))
  // console.log(chartAdded.details.lenght)
  // console.log(JSON.stringify(chartAdded.lenght))
  // console.log(reviews)
  // console.log(JSON.stringify(reviews))
  // console.log(reviews.text)
  // console.log(JSON.stringify(reviews.text))

  if (selectedService?.id_service !== undefined) {

    if (loged) {
      return (

        <Container fluid className="filmsViewDesign" >
          <Row>
              <div className="titleDesign text-fluid">{selectedService?.name}</div>
          </Row>
          <Row className="align-items-center">
            <Col >
              <div><Image className="servicePicView fluid" src={selectedService.img} /></div>
            </Col>
            <Col className=" align-items-center">
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
          <Row className="align-items-center">
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




