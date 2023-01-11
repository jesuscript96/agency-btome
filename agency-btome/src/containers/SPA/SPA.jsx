import { useState } from "react";
import { useEffect } from "react";
import spaData from "./spaSlice"

import 'bootstrap/dist/css/bootstrap.min.css';

//Importaciones de containers y componentes

import Services from '../services/services';
// import ServicesDetail from './containers/servicesDetail/servicesDetail';
import Pils from '../pils/pils';
// import PilsDetail from './containers/pilsDetail/pilsDetail';
// import MyAccount from './containers/myAccount/myAccount';
import { useSelector } from "react-redux";
import MyAccount from "../myAccount/myAccount";
import ServicesDetail from "../servicesDetail/servicesDetail";
import PilsDetail from "../pilsDetail/pilsDetail";
import Home from "../home/home";

function SPA() {

    const [page, setPage] = useState('home')
    
    // const pageToSet2 = useSelector(spaData)
    const pageToSet = useSelector(state => state.spa)

    const [page2, setPage2] = useState(pageToSet)

    console.log(pageToSet.details)
    

    useEffect(() => {
        //This function is triggered when the component is mounted for the first time.
       console.log("ebtras o que")
        setPage(pageToSet.details)
                
    }, [pageToSet]);
    
    console.log(page)

    if (page === "services") {
        return (
            <div>
                <Services/>
            </div>
        )
    } else if (page === "pils") {
        return (
            <div>
            <Pils/>
        </div> 
        )
    } else if (page === "myaccount") {
        return (
            <div>
            <MyAccount/>
        </div> 
        )
    } else if (page === "serviceDetail") {
        return (
            <div>
            <ServicesDetail/>
        </div> 
        )
    } else if (page === "pilDetail") {
        return (
            <div>
            <PilsDetail/>
        </div> 
        )
    } else if (page === "home") {
        return (
            <div>
            <Home/>
        </div> 
        )
    } else {
        return (
            <div>
                <Services/>
            </div>
        ) 
    }
}

export default SPA;
