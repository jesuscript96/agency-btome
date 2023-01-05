import React from 'react';
import './header.scss'
import jwt_decode from "jwt-decode";
import { Container, Row, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { userout } from "../user/userSlice";
import { chartData } from "../../containers/services/chartSlice";
import Register from '../user/register/register';
import Login from '../user/login/login';
import Button from 'react-bootstrap/Button';
import Cart from '../cart/cart';


function OffcanvasExample() {

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [logged, setLogged] = useState(true);

  useEffect(() => {


  });

  let userMailHeader = localStorage.getItem('SAVEUSERMAIL');
  let jwt = localStorage.getItem('SAVEJWT');
  let decoded = jwt_decode(jwt)
  console.log(decoded.roleIdRole)

  const chartAdded = useSelector(chartData);
  console.log(chartAdded)
  console.log(chartAdded.lenght)
  console.log(chartAdded.details)
  console.log(chartAdded.details.length)

  const logOut = () => {
    localStorage.removeItem("SAVEJWT")
    dispatch(userout({
      credentials: {
        token: "",
        mail: "",
        role: ""
      }
    }))
    setLogged(false)
  }


  if (userMailHeader !== null) {
    return (
      <>
        {
          ['lg'].map((expand) => (
            <Navbar key={expand} bg="#a18cd1" expand={expand} className=" navbarDesign sticky-top" variant="variant">
              <Container fluid>
                <Navbar.Brand className='logoDesign' href="/">BusinessToMe</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas className="variant" bg="#fda085"
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      BusinessToMe
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-2 pe-5">
                      <Nav.Link onClick={navigate("/")}>Home</Nav.Link>
                      <Nav.Link onClick={navigate("/")}>Servicios</Nav.Link>
                      <Nav.Link onClick={navigate("/blog")}>Blog</Nav.Link>
                      <Nav.Link onClick={navigate("/")}>Conócenos</Nav.Link>
                      <Nav.Link onClick={() => setShowCart(true)}><Icon.Cart /></Nav.Link>
                      <Nav.Link onClick={() => setShowCart(true)}><div className='chart'>{chartAdded.details.length}</div></Nav.Link>
                      <Cart
                        show={showCart}
                        onHide={() => setShowCart(false)}
                      />
                      <NavDropdown className='variant'
                        title="Mi cuenta" bg="#C8dac7"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}>

                        <NavDropdown.Item>
                          {decoded.mail}
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={navigate("/myaccount")}>
                          Perfil
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={logOut}>
                          Cerrar sesión
                        </NavDropdown.Item>
                      </NavDropdown>
                      <Login
                        show={show}
                        onHide={() => setShow(false)}
                      />
                      <Register
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </Nav>

                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
      </>
    );
  } else {
    return (
      <>
        {
          ['lg'].map((expand) => (
            <Navbar key={expand} bg="#a18cd1" expand={expand} className=" navbarDesign sticky-top" variant="variant">
              <Container fluid>
                <Navbar.Brand className='logoDesign' href="/">BusinessToMe</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas className="variant" bg="#fda085"
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      BusinessToMe
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="justify-content-end flex-grow-2">
                    <Nav className="justify-content-end flex-grow-2 pe-5">
                      <Nav.Link onClick={navigate("/")}>Home</Nav.Link>
                      <Nav.Link onClick={navigate("/")}>Servicios</Nav.Link>
                      <Nav.Link onClick={navigate("/blog")}>Blog</Nav.Link>
                      <Nav.Link onClick={navigate("/")}>Conócenos</Nav.Link>
                      <Nav.Link onClick={() => setShowCart(true)}><Icon.Cart /></Nav.Link>
                      <Nav.Link onClick={() => setShowCart(true)}><div className='chart'>{chartAdded.details.length}</div></Nav.Link>
                      <Cart
                        show={showCart}
                        onHide={() => setShowCart(false)}
                      />
                      <NavDropdown className='variant'
                        title="Mi cuenta" bg="#C8dac7"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}>
                        <Button variant="primary" onClick={() => setShow(true)}>
                          Login
                        </Button>
                        <Login
                          show={show}
                          onHide={() => setShow(false)}
                        />
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                          Register
                        </Button>
                        <Register
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </NavDropdown>
                    </Nav>

                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
      </>
    );

  }
}

export default OffcanvasExample;