import React from 'react';
import './header.scss'
import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';


function OffcanvasExample() {
  
   let userMailHeader = localStorage.getItem('SAVEUSERMAIL');

  
  if (userMailHeader !== null){
    return (
        <>
          {
          [ 'lg'].map((expand) => (
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
                      <Nav.Link>Home</Nav.Link>
                      <Nav.Link>Servicios</Nav.Link>
                      <Nav.Link>Blog</Nav.Link>
                      <Nav.Link>Conócenos</Nav.Link>
                      <NavDropdown className='variant'
                        title="Mi cuenta" bg="#C8dac7"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}>
                      
                        <NavDropdown.Item>
                        {userMailHeader}
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          Perfil
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          Cerrar sesión
                        </NavDropdown.Item>
                      </NavDropdown>
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
          [ 'lg'].map((expand) => (
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
                      <Nav.Link>Home</Nav.Link>
                      <Nav.Link>Servicios</Nav.Link>
                      <Nav.Link>Blog</Nav.Link>
                      <Nav.Link>Conócenos</Nav.Link>
                      <NavDropdown className='variant'
                        title="Mi cuenta" bg="#C8dac7"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}>
                        <NavDropdown.Item>
                          Registro
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          Login
                        </NavDropdown.Item>
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