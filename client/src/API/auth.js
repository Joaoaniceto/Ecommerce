import axios from 'axios'



export const createOrUpdateUser = async (authToken) =>{
return await axios.post(process.env.REACT_APP_API_UPDATE,{},{
  headers:{
    authToken,
  }
})
}

export const currentUser = async (authToken) =>{
return await axios.post(process.env.REACT_APP_API_CURRENT,{},{
  headers:{
    authToken,
  }
})
}


export const currentAdmin = async (authToken) =>{
  return await axios.post(process.env.REACT_APP_API_ADMIN,{},{
    headers:{
      authToken,
    }
  })
  }
  
  