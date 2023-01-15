import React, { useState, useEffect } from 'react';
import "./allUsers.scss"

import { bringAllUsers, deleteUser } from '../../../services/apicalls';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

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
                <br></br>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Client</th>
                                    </tr>
                                </thead>
                {
                    allUsers.map(allUser => {
                        console.log(allUser.client)
                        return (
                            <tbody>
                                    <tr>
                                        <td>{allUser.name}</td>
                                        <td>{allUser.mail}</td>
                                        <td>{allUser.phone}</td>
                                        <td>{JSON.stringify(allUser.client)}</td>
                                    </tr>
                                </tbody>
                                    )
                                })
                            }
                            </Table>
            </div>

        )
    } else {
        return <h2>no hay datos</h2>
    }
};

export default AllUsers;