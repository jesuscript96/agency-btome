import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./register.scss";
import { loginUser, registerUser } from '../../../services/apicalls';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { login } from "../userSlice";
import { errorCheck } from '../../../services/useful';

function Register(props) {

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    mail: "",
    password: ""
  });

  const [userError, setUserError] = useState({
    mailError: "",
    passwordError: "",
    LoginError: ""
  })

  const [success, setSuccess] = useState({
    loginSuccess: ""
  })

  let navigate = useNavigate();
  useEffect(() => {

    let loged = localStorage.getItem("SAVEUSERMAIL")


    // if (loged) {          // TODO: redireccionar a una vista que diga que no puede acceder a registro si ya está logueado con un timeout y que luego redireccione a home            
    //     navigate("/");
    // };
  });

  //Handlers

  const inputHandler = (e) => {


    //Aqui setearemos DINÁMICAMENTE el BINDEO entre inputs y hook.
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value

    }));
  }

  const errorHandler = (field, value, type) => {

    let error = ""

    error = errorCheck(field, value, type)

    setUserError(((prevState) => ({
      ...prevState,
      [field + "Error"]: error

    })))
  };


  //Funciones

  const regMe = () => {
    registerUser(user)
      .then(res => {
        try {
          loginUser(user)
            .then(res => {
              //Aqui procedo a guardar el token en redux, o en alguna otra parte del proyecto

              if (res.data.message === "Password or email is incorrect") {

              } else {
                
                localStorage.setItem("SAVEJWT", JSON.stringify(res.data.jwt));
                
                dispatch(login({
                  credentials: {
                    token: res.data.jwt,
                    mail: res.data.mail,
                    role: res.data.role
                  }
                }));
                
                setSuccess(((prevState) => ({
                  ...prevState,
                  loginSuccess: "Register successful. Please close this tab."

                })))
                //   Navigate("/");

              }
            });
        } catch (error) {

        }
      })
  }

  const jwt = localStorage.getItem("SAVEJWT")
  console.log(success.loginSuccess)
  console.log(jwt)


  if (jwt === "" || jwt === null) {
    return (
      <Modal className='modals'
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalDesign'>
          <div className='loginDesign'>
            <pre className='modalDesign'><h3>Regístrate para obtener beneficios!</h3></pre>

            <div>
              <div className="errorInput">{userError.LoginError}</div>
              <div className="inputsContainer">
                <input type="mail" name="mail" placeholder="mail" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "mail")} />
                <div className="errorInput">{userError.mailError}</div>
              </div>
              <div className="inputsContainer">
                <input type="password" name="password" placeholder="password" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "password")} />
                <div className="errorInput">{userError.passwordError}</div>
              </div>
            </div>
            <div>
              <Button onClick={() => regMe()} className="buttonDesignLogin">Register</Button>
              <div className="errorInput">{success.loginSuccess}</div>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  } else if (jwt) {
    return ( <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='modalDesign'>
        <div className='loginDesign'>
          <div>
            <div className="successInput"><h2>
              {/* {success.loginSuccess} */}
              Register successful. Please close this tab.
              </h2></div>
          </div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}

export default Register