import React, { useState, useEffect } from 'react';
import "./userReviews.scss"
import Accordion from 'react-bootstrap/Accordion';

import { bringUserReviews } from '../../../services/apicalls';
import Card from 'react-bootstrap/Card';
import { Col, Row, Container } from 'react-bootstrap';

const UserReviews = () => {

    const [userReviews, setUserReviews] = useState([]);
    const [error, setError] = useState('');
    // const user = useSelector(userData);
    const userJWT = JSON.parse(localStorage.getItem("SAVEJWT"))
    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.

        if (userReviews.length === 0) {

            bringUserReviews(userJWT)
                .then(
                    (res) => {
                        
                        setUserReviews(res.data)
                        
                    }
                    
                )
                .catch((error) => {
                   
                    setError(error.response?.data || 'ups intentalo de nuevo')
                })

        };


    }, []);

    

    if (error) {
        return <pre>{ error.repeat(1) } </pre>

    }
    if (userReviews.length !== 0) {
        return (
            // <pre>{JSON.stringify(userReviews, null, 2)}</pre>
            <div className='contentStyleReviews'> 
                
                <div><h1> Todas las reviews realizadas por el usuario </h1> </div>
              
                <Accordion defaultActiveKey="1">
                {userReviews.map(userReview => {
                    
                return (

      <Accordion.Item eventKey={userReview.id_review} key={userReview.id_review}>
        <Accordion.Header>Servicio: {userReview.name}</Accordion.Header>
        <Accordion.Body>
        <p> <h4>Rating:</h4> {userReview.rating}</p>  <br />
        <p> <h4>Review:</h4> {userReview.text}</p>  <br />
        <p> <h4>Date:</h4> {userReview.creation_date}</p>  <br />
        </Accordion.Body>
      </Accordion.Item>                    
                )               
                
            })}
            </Accordion>
            </div>
        )
       
        // return (
        //     // <pre>{JSON.stringify(userReviews, null, 2)}</pre>
        //     <div className='contentStyle'> 
                
              
        //         {userReviews.map(userReview => {
        //             console.log(userReview);
        //           <div><h1> Todos los alquileres realizados por el usuario </h1> </div>
        //         return (
                    
        //                 <Card style={{ width: '12em' }} className="cards" key={userReview.id_review}>
        //             <Card.Img className='imgCards' variant="top" src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b0MxU37dNmMwKtoPVYPKOZSIrIn.jpg"} />
        //             <Card.Body>
        //                 <Card.Title>{userReview.name}</Card.Title>
        //                 <Card.Text>
        //                     {userReview.text}
        //                 </Card.Text>
        //                 <Card.Text>
        //                         Desde  {userReview.creation_date} <br></br>
                               
        //                 </Card.Text>
        //                 <Card.Text>
        //                     {userReview.rating}
        //                 </Card.Text>
        //             </Card.Body>
        //                     </Card>
                    
        //         )

                
        //     })}
        //     </div>
        // )
    } else {
        return <pre>Todavía no tienes reviews</pre>
    }
        
};

export default UserReviews;