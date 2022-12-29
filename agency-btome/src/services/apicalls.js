
import axios from 'axios';

// export const loginUser = async (body, res) => {

//     try {
//         let resp = await axios.post(
//             "https://proyecto04-videoclub-production-4de8.up.railway.app/auth/login",
//             body
//         );
        
    
//         if (resp.data === "Password or email is incorrect") {
//             return "El email o la contraseña son incorrectos"
    
//         } else if (resp.data.message === "Login successful") {
//             return resp
//         }
//     } catch (error) {
       
//         return error.response
//     }

    
// };

// export const registerUser = async (body) => {

    

//     return axios.post(
//         "https://proyecto04-videoclub-production-4de8.up.railway.app/auth/register",
//         body
//         // {
//         //     "mail": 'elbanking@punsdhi.com',
//         //     "password": 'gsdfg34563SFGSF'
//         //   }
//     );
// };

export const bringServices = () => {

    try {

        return axios.get("http://localhost:3000/services/");


    } catch (error) {
       
    }
};

export const bringFilteredServices = (type, price) => {

    try {

        return axios.get(`http://localhost:3000/services/type/${type}/price/${price}`);


    } catch (error) {
       
    }
};


export const bringPils = async () => {
    
    
    try {
        
        return await axios.get(`http://localhost:3000/pils/`)
        
    } catch (error) {
        
    }
}

export const bringPilsFilteredByName = async (criteria) => {

    
    try {

        return await axios.get(`http://localhost:3000/pils/title/${criteria}`)
        
    } catch (error) {
        
    }
}

export const bringPilsFilteredByType = async (type) => {

    
    try {

        return await axios.get(`http://localhost:3000/pils/type/${type}`)
        
    } catch (error) {
        
    }
}

export const bringServiceReviews = async (type) => {

    
    try {

        return await axios.get(`http://localhost:3000/services/reviews/${type}`)
        
    } catch (error) {
        
    }
}



// export const bringUserInfo = (email) => {

//     return axios.get("https://proyecto04-videoclub-production-4de8.up.railway.app/users/id/" + email)

// };

// export const bringUserOrders = (email) => {

//     return axios.get(`https://proyecto04-videoclub-production-4de8.up.railway.app/orders/${email}`)

// };

// export const bringUserActiveOrders = (email) => {

//     return axios.get(`https://proyecto04-videoclub-production-4de8.up.railway.app/orders/active/${email}`)

// };

// export const bringAllOrders = () => {

//     return axios.get(`https://proyecto04-videoclub-production-4de8.up.railway.app/orders/`)

// };

// export const bringActiveAllOrders = () => {

//     return axios.get(`https://proyecto04-videoclub-production-4de8.up.railway.app/orders/active/orders/all`)

// };

// export const bringAllUsers = () => {

//     return axios.get(`https://proyecto04-videoclub-production-4de8.up.railway.app/users/`)

// };

// export const deleteUser = (email) => {

//     return axios.delete("https://proyecto04-videoclub-production-4de8.up.railway.app/users/delete/" + email)

// };

// export const orderFilm = async (movie) => {
//     const jwt = localStorage.getItem("SAVEJWT")
//     let config = {
//         headers: {
//             Authorization: `Bearer ${jwt}`,
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
//             'Access-Control-Allow-Methods': '*',
//             "Content-Type": "application/json"
//         }

//     }
//     return await axios.post(`https://proyecto04-videoclub-production-4de8.up.railway.app/orders/neworder`,movie,config)
// };

// export const bringOneFilm = (film) => {
//         return axios.get(`https://proyecto04-videoclub-production-4de8.up.railway.app/films/title/${film}`)
   
//     }
