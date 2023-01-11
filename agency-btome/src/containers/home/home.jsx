
import 'bootstrap/dist/css/bootstrap.min.css';
import "./home.scss"
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { addSpa } from '../SPA/spaSlice';
import Carousel from 'react-bootstrap/Carousel';

function Home() {

    const dispatch = useDispatch();

    const servicesPage = () => {
        console.log("vamos a por services!")
        dispatch(addSpa({
            details: "services"
        }))
        // navigate("/")
    }
    const pilsPage = () => {
        console.log("vamos a por pils!")
        dispatch(addSpa({
            details: "pils"
        }))
        // navigate("/")
    }

    return (
        <Container fluid>
            <Row className="homeRow beige">
                <Col>
                    <div>
                        <p>BToMe, tu agencia líder en performanze digital</p>
                    </div>
                    <div>
                        <Button variant="primary" onClick={() => servicesPage()}>
                            Ver servicios
                        </Button>
                    </div>
                </Col>
                <Col></Col>
            </Row>
            <Row className="homeRow">
                <Col>
                    <div>
                        <p>Somos un equipo de expertos de alto rendimiento cuyo objetivo es estar a la vanguardia del mundo tecnológico y digital. Esto nos permite poder aplicar las estrategias más innovadoras y obtener si no resultados, conclusiones firmes.

                            En nuestro Lab desarrollamos y probamos nuevas ideas, procesos, productos, tecnología y estrategias innovadoras para aspirar a ser el último partner tecnológico con el que trabajes.</p>
                    </div>
                </Col>
            </Row>
            <Row className="homeRow beige">
                <Col>
                    <div>
                        <p>Descubre nuestros los servicios que transformarán tu negocio</p>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Button variant="primary" onClick={() => servicesPage()}>
                            Ver servicios
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="homeRow">
                <Col>
                    <div>
                        <Button variant="primary" onClick={() => pilsPage()}>
                            Ir al blog
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div>
                        <p>Manténte informado sobre las novedades y mejores prácticas del sector</p>
                    </div>
                </Col>
            </Row>
            <Row className="homeRow beige">
                <Col>
                    <Carousel variant="dark">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="holder.js/800x400?text=First slide&bg=f5f5f5"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h5>HermanosCamiseta</h5>
                                <p>No entendíamos porque no funcionaba nuestro go-to-market, así que contratamos a BToMe para diseñar la estrategia digital, desde la web y su UX hasta estrategias de CRM o contenido. Los resultados fueron inmediatos!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="holder.js/800x400?text=Second slide&bg=eee"
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h5>Ópticas Chuliá</h5>
                                <p>Nosotros hemos sido un negocio tradicional siempre, especialistas en todo lo ajeno a lo digital. Con BToMe hemos sido capaces de trasladar nuestro expertise a las nuevas tecnologías y hemos multiplicado el negocio x4 en el último año desde entonces.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;
