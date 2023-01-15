
import axios from 'axios';

export const loginUser = async (body, res) => {

    try {
        let resp = await axios.post(
            "https://backendagency-production.up.railway.app/auth/login",
            body
        );
        
    
        if (resp.data === "Password or email is incorrect") {
            return "El email o la contraseña son incorrectos"
    
        } else if (resp.data.message === "Login successful") {
            return resp
        }
    } catch (error) {
       
        return error.response
    }

    
};

export const registerUser = async (body) => {

    

    return axios.post(
        "https://backendagency-production.up.railway.app/auth/register",
        body
        // {
        //     "mail": 'elbanking@punsdhi.com',
        //     "password": 'gsdfg34563SFGSF'
        //   }
    );
};

export const bringServices = () => {

    try {

        return axios.get("https://backendagency-production.up.railway.app/services/");


    } catch (error) {
       
    }
};

export const bringFilteredServices = (type, price) => {

    try {

        return axios.get(`https://backendagency-production.up.railway.app/services/type/${type}/price/${price}`);


    } catch (error) {
       
    }
};


export const bringPils = async () => {
    
    
    try {
        
        return await axios.get(`https://backendagency-production.up.railway.app/pils/`)
        
    } catch (error) {
        
    }
}

export const bringPilsFilteredByName = async (criteria) => {

    
    try {

        return await axios.get(`https://backendagency-production.up.railway.app/pils/title/${criteria}`)
        
    } catch (error) {
        
    }
}

export const bringPilsFilteredByType = async (type) => {

    
    try {

        return await axios.get(`https://backendagency-production.up.railway.app/pils/type/${type}`)
        
    } catch (error) {
        
    }
}

export const bringServiceReviews = async (type) => {

    
    try {

        return await axios.get(`https://backendagency-production.up.railway.app/services/reviews/${type}`)
        
    } catch (error) {
        
    }
}



export const bringUserInfo = async (jwt) => {
    console.log("entro a traer al user")
    console.log(jwt)
    return await axios.get("https://backendagency-production.up.railway.app/users/profile", {
  headers: {
    'Authorization': `Bearer ${jwt}`
  }
})
// .catch(function (error) {
//   if (error.response) {
//     // Request made and server responded
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.log(error.request);
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log('Error', error.message);
//   }

// });
};

export const newOrder = async (order, jwt) => {
    return await axios.post("https://backendagency-production.up.railway.app/orders/neworder", order, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
};

export const addServiceToOrder = async (order, jwt) => {
    return await axios.post("https://backendagency-production.up.railway.app/orders/addservice", order, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
};

export const bringUserOrders = async (jwt) => {

    return await axios.get("https://backendagency-production.up.railway.app/users/orders", {
  headers: {
    'Authorization': `Bearer ${jwt}`
  }
})
};

export const bringUserReviews = async (jwt) => {

    return await axios.get("https://backendagency-production.up.railway.app/users/reviews", {
  headers: {
    'Authorization': `Bearer ${jwt}`
  }
})
};

export const bringAllUsers = async (jwt) => {

    return await axios.get("https://backendagency-production.up.railway.app/users/", {
  headers: {
    'Authorization': `Bearer ${jwt}`
  }
})
};

export const deleteUser = async (email, jwt) => {

    return await axios.delete("https://backendagency-production.up.railway.app/users/delete/" + email, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })

};

export const bringAllOrders = async (jwt) => {

    return await axios.get("https://backendagency-production.up.railway.app/orders/", {
  headers: {
    'Authorization': `Bearer ${jwt}`
  }
})
};

export const newReview = async (review, jwt) => {
  return await axios.post("https://backendagency-production.up.railway.app/reviews/newreview", review, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
};

export const updateUserName = async (name, jwt) => {
  console.log(name)
  return await axios.put("https://backendagency-production.up.railway.app/users/update/name", name, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
};

export const updateUserPhone = async (phone, jwt) => {
  return await axios.put("https://backendagency-production.up.railway.app/users/update/phone", phone, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
};
