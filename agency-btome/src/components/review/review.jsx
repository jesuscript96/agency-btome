import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./review.scss";
import { useState } from "react";
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { reviewData } from './reviewSlice';
import { newReview } from '../../services/apicalls';


// import { chartData } from "../../containers/services/chartSlice";
// import { emptyChart } from '../../containers/services/chartSlice';
// import { newOrder, addServiceToOrder } from "../../services/apicalls"

function Review(props) {

    const serviceToReview = useSelector(reviewData);
    

    const [review, setReview] = useState({
        rating: "",
        text: ""
    });

    useEffect(() => {
    });

    const [success, setSuccess] = useState("")

    const inputHandler = (e) => {

        //Aqui setearemos DINÁMICAMENTE el BINDEO entre inputs y hook.
        setReview((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));
        
    }

    // const reviewService = () => {}

    const createNewReview = () => {
       
        try {

            const userJWT = JSON.parse(localStorage.getItem("SAVEJWT"))
            let today = new Date();
            let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
            let reviewBody = {
                "creation_date": date,
                "rating": review.rating,
                "text": review.text,
                "serviceIdService": serviceToReview.id_service
            }

            let resp = newReview(reviewBody, userJWT)

            setSuccess("Opinión realizada con éxito")

            return resp
        } catch (error) { }
    }

    console.log(success)
    console.log(success.reviewSuccess)

    if (
        success === "" || success === "undefined" || success === undefined 
        // success.reviewSuccess === "" || success.reviewSuccess === "undefined" || success.reviewSuccess === undefined
        ) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Deja tu opinión
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='loginDesign'>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Puntúa del 1 al 5</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="5"
                                    autoFocus
                                    name="rating"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Aquí tu opinión</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Estoy muy satisfech@, gracias!"
                                    name="text"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </Form.Group>
                        </Form>
                        <div>
                            <Button
                                onClick={() => createNewReview()}
                                className="buttonDesignLogin">Enviar</Button>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
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
                        Tu opinión es importante
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="errorInput">{JSON.stringify(success)}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default Review