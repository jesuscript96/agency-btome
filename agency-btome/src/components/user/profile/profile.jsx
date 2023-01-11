
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container,Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './profile.scss';

import { bringUserInfo } from '../../../services/apicalls';
// import UserOrders from '../UserOrders/UserOrders';

import { userData } from "../userSlice";

import { useSelector } from "react-redux";

const Profile = () => {

    //I will create a hook on which I will deposit the movies once they arrive to us...

    const [userInfo, setUserInfo] = useState([]);
    const user = useSelector(userData);
    const [error, setError] = useState('');
    const userJWT = JSON.parse(localStorage.getItem("SAVEJWT"))
    const navigate = useNavigate()

    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.

        if (userInfo.length === 0) {
            // bringmovies()
            bringUserInfo(userJWT)
                .then(
                    (res) => {
                        console.log(res.data)
                        setUserInfo(res.data)
                       
                    }
                )
                .catch((error) => {
                    setError(error.response?.data || 'ups intentalo de nuevo')
                })
        };


    }, [userInfo]);

    console.log(userInfo)
    

    // if (error) {
    //     return <h2>{error.repeat(1)} </h2>
    // }

    return (
<Container >
    <Row className='d-flex justify-content-center'>
        
                 <Card style={{ width: '12rem' }} className="cards">
                  <Card.Img className='imgCards' variant="top" src={`https://robohash.org/YOUR-TE${userInfo.mail}dsXT.png`} />
                      <Card.Body>
                           <Card.Title>{userInfo.name}</Card.Title>
                               <Card.Text>
                                    {userInfo.mail}
                               </Card.Text>
                                 <Button variant="warning" onClick={()=> navigate("/films")}>Contratar servicios</Button>
                          </Card.Body>
              </Card>
       
    </Row>
</Container>
    )

};

export default Profile;