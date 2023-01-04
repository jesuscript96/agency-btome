import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./login.scss";
import { loginUser } from '../../../services/apicalls';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { login } from "../userSlice";
import { errorCheck } from '../../../services/useful';

function Login(props) {

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
    
    let navigate = useNavigate();
    useEffect(() => {
     
        let loged = localStorage.getItem("SAVEUSERMAIL")
       

        if (loged) {          // TODO: redireccionar a una vista que diga que no puede acceder a registro si ya está logueado con un timeout y que luego redireccione a home            
            navigate("/");
        };
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

    const logMe = () => {

        //Estoy ejecutando loginUser y le paso el body (que en este caso es el hook user)
       
        try {
            loginUser(user)
                .then(res => {
                    //Aqui procedo a guardar el token en redux, o en alguna otra parte del proyecto
                   

                    if (res.data.message === "Password or email is incorrect") {
                        setUserError(((prevState) => ({
                            ...prevState,
                            LoginError: "El email o la contraseña son incorrectos"

                        })))
                    } else {
                        localStorage.setItem("SAVEJWT", JSON.stringify(res.data.jwt));
                        localStorage.setItem("SAVEUSERMAIL", JSON.stringify(res.data.mail));
                        if (res.data.role === null) {
                            localStorage.setItem("SAVEUSERROLE", "userRole")
                        } else {
                            localStorage.setItem("SAVEUSERROLE", JSON.stringify(res.data.role))
                        }
                        

                        dispatch(login({
                            credentials: {
                                token: res.data.jwt,
                                mail: res.data.mail,
                                role: res.data.role
                            }
                        }));
                        setUserError(((prevState) => ({
                            ...prevState,
                            LoginError: ""

                        })))
                    }
                });
        } catch (error) {
           
        }

    }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='loginDesign'>
            <pre>Bienvenido de nuevo</pre>

            <div className="inputsContainer">
                <div className="errorInput">{userError.LoginError}</div>
                <div>
                    <input type="mail" name="mail" placeholder="mail" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "mail")} />
                    <div className="errorInput">{userError.mailError}</div>
                </div>
                <div>
                    <input type="password" name="password" placeholder="password" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "password")} />
                    <div className="errorInput">{userError.passwordError}</div>
                </div>
            </div>
            <div>
            <Button onClick={() => logMe()} className="buttonDesignLogin">Login</Button>
            </div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login