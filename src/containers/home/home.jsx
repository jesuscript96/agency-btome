
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
                <Col sm={8} md={6} xs={10} lg={4}>
                    <div>
                        <h2>BToMe, tu agencia líder en performanze digital</h2>
                    </div>
                    <div>
                        <Button className="buttonSearchHome" onClick={() => servicesPage()}>
                            Ver servicios
                        </Button>
                    </div>
                </Col>
                <Col sm={8} md={6} xs={10} lg={4}>
                <img src="https://mott.pe/noticias/wp-content/uploads/2021/01/mejores-agencias-de-marketing-digital-en-el-mundo.png" className="imgServices"/>
                </Col>
            </Row>
            <Row className="homeRow">
                <Col sm={8} md={6} xs={10} lg={4} className="homeText">
                    <div className="homeText">
                        <h3>Somos un equipo de expertos de alto rendimiento cuyo objetivo es estar a la vanguardia del mundo tecnológico y digital. Esto nos permite poder aplicar las estrategias más innovadoras y obtener si no resultados, conclusiones firmes.

                            En nuestro Lab desarrollamos y probamos nuevas ideas, procesos, productos, tecnología y estrategias innovadoras para aspirar a ser el último partner tecnológico con el que trabajes.</h3>
                    </div>
                </Col>
            </Row>
            <Row className="homeRow beige">
                <Col sm={8} md={6} xs={10} lg={4}>
                    <div>
                        <h2>Descubre nuestros los servicios que transformarán tu negocio</h2>
                    </div>
                    <div>
                        <Button className="buttonSearchHome" onClick={() => servicesPage()}>
                            Ver servicios
                        </Button>
                    </div>
                </Col>
                <Col sm={8} md={6} xs={10} lg={4}>
                <img src="https://directivosygerentes.es/wp-content/uploads/2017/02/transformacion-digital-negocio.1-1024x678.jpg" className="imgServices"/>
                </Col>
            </Row>
            <Row className="homeRow">
                <Col sm={8} md={6} xs={10} lg={4}>
                <img src="https://eoienglish.es/images/2021/03/10/news-1644696_1280.png" className="imgServices2"/>
                </Col>
                <Col sm={8} md={6} xs={10} lg={4}>
                    <div>
                        <h2>Manténte informado sobre las novedades y mejores prácticas del sector</h2>
                    </div>
                    <div>
                        <Button className="buttonSearchHome" onClick={() => pilsPage()}>
                            Ir al blog
                        </Button>
                    </div>
                </Col>
            </Row>
            {/* <Row className="homeRow beige">
                <Col className="homeOpinions">
                    <Carousel variant="dark" className="carouselCustom">
                        <Carousel.Item className="carouselCustom">
                            <div>
                            <img
                                className="d-block w-25"
                                src="https://www.lullabybebe.com/wp-content/uploads/2019/10/pack-2-camisetas-divertidas-super-hermano-de-nombre-super-hermana-de-nombre-_clipped_rev_1k.jpg"
                                alt="First slide"
                                />
                            </div>
                                
                            <div>
                            <h5>HermanosCamiseta</h5>
                                <p>No entendíamos porque no funcionaba nuestro go-to-market, así que contratamos a BToMe para diseñar la estrategia digital, desde la web y su UX hasta estrategias de CRM o contenido. Los resultados fueron inmediatos!</p>
                            </div>     
                            <Carousel.Caption>
                            <p>Tu opinión es importante!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="carouselCustom">
                            <div>

                            <img
                                className="d-block w-25"
                                src="https://scontent.fvlc6-1.fna.fbcdn.net/v/t39.30808-6/303117857_482530743884811_9211355143098927343_n.png?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=KiN3McyB9TQAX8lH7fN&_nc_ht=scontent.fvlc6-1.fna&oh=00_AfDwQm3pLJSPfOxq1wREeGaqhUAryvH0lna9PoKjLa_xZQ&oe=63C4C696"
                                alt="Second slide"
                            />
                            </div>
                            <div>

                                <h5>Ópticas Chuliá</h5>
                                <p>Nosotros hemos sido un negocio tradicional siempre, especialistas en todo lo ajeno a lo digital. Con BToMe hemos sido capaces de trasladar nuestro expertise a las nuevas tecnologías y hemos multiplicado el negocio x4 en el último año desde entonces.</p>
                            </div>
                            <Carousel.Caption>
                            <p>Tu opinión es importante!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row> */}
        </Container>
    )
}

export default Home;
