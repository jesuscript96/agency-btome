import "./myAccount.scss"
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../../components/user/profile/profile'

import { Container, Row, Tabs, } from "react-bootstrap";
import TabsProfileInfo from "../../components/tabs/tabs";

const MyAccount = () => {

    let navigate = useNavigate();

      return <div className="myAccountDesign">
        <Container>
            <Row><h1>Mi Usuario</h1></Row>
            <br />
            <Row> <Profile /></Row>
            <Row>
                <TabsProfileInfo />
            </Row>
        </Container>
    </div>

};

export default MyAccount;