import React, { useState, useEffect } from 'react';
import "./allUsers.scss"

import { bringAllUsers, deleteUser } from '../../../services/apicalls';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([]);

    const [error, setError] = useState('');
    
    const userJWT = JSON.parse(localStorage.getItem("SAVEJWT"))



    const deleteMe = (userDelete) => {
        
        deleteUser(userDelete, userJWT)
            .then(res => {
                bringAllUsers(userJWT)
                    .then(
                        (res) => {
                            
                            setAllUsers(res.data)
                        }
                    )
                    .catch((error) => {
                       
                        setError(error.response?.data || 'ups intentalo de nuevo')
                    })

            })


    }

    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.
        bringAllUsers(userJWT)
            .then(
                (res) => {
                   
                    setAllUsers(res.data)
                }
            )
            .catch((error) => {
                
                setError(error.response?.data || 'ups intentalo de nuevo')
            })


    }, []);

    if (error) {
        return <h2>{error.repeat(999)} </h2>
    }
    if (allUsers.length !== 0) {
        return (
            // <pre>{JSON.stringify(allUsers, null, 2)}</pre>
            <div className='contentStyle2'>
                {
                    allUsers.map(allUser => {
                        return (
                            
                            <Card style={{ width: '12rem' }} className="cards" key={allUser.mail}>
                                <Card.Img variant="top" src={`https://robohash.org/YOUR-TE${allUser.mail}dsXT.png`} />
                                <Card.Body>
                                    <Card.Title>{allUser.name}</Card.Title>
                                    <Card.Text>
                                        {allUser.mail}
                                    </Card.Text>
                                   
                                    <Button variant="warning" onClick={() => deleteMe(allUser.mail)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>

        )
    } else {
        return <h2>no hay datos</h2>
    }
};

export default AllUsers;