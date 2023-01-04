import "./myAccount.scss"
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../../components/user/profile/profile'

import { Container, Row, Tabs,  } from "react-bootstrap";
import TabsProfileInfo from "../../components/tabs/tabs";
// import UserOrders from '../User/UserOrders/UserOrders';
// import AllOrders from '../../components/Admin/AllOrders/AllOrders'

// import AllUsers from "../../components/Admin/AllUsers/AllUsers";

// import UserActiveOrders from "../User/UserActiveOrders/UserActiveOrders";
// import ActiveAllOrders from "../../components/Admin/ActiveAllOrders/ActiveAllOrders";

const MyAccount = () => {

    let navigate = useNavigate();

   

    const userRole = localStorage.getItem("SAVEUSERROLE")

    // const userRole = undefined

    // const userRole = "admin"

    useEffect(() => {
        

     
        // console.log(userReduxCredentials?.credentials?.token); 

        if (userRole === "null" || userRole === null) {          // TODO: redireccionar a una vista que diga que no puede acceder a registro si ya está logueado con un timeout y que luego redireccione a home            
            navigate("/");       
    };});

 

    
        return <div className = "myAccountDesign">
                <Container>
                <Row><h2>Usuario</h2></Row>
                <Row> <Profile /></Row>
                <Row>
                    <TabsProfileInfo/>
                </Row>
                </Container>
        </div>
   
};

export default MyAccount;