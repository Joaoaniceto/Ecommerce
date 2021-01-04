import axios from 'axios'



export const userCart = async (cart,authtoken)=>{
  return await axios.post(`http://localhost:8000/api/user/cart`,{cart},
   { 
       headers:{
        authtoken,
    }
})
}

export const getCart = async (authtoken)=>{
    return await axios.get(`http://localhost:8000/api/user/cart`,
     { 
         headers:{
          authtoken,
      }
  })
  }

  export const emptyUserCart = async (authtoken)=>{
      try{
    return await axios.put(`http://localhost:8000/api/user/cart`,{},
     { 
         headers:{
          authtoken,
      }
  })
}catch(err){
    console.log(err);
}
  }


  export const saveUserAddress = async (authtoken,address)=>{
    return await axios.post(`http://localhost:8000/api/user/address`,{address},
     { 
         headers:{
          authtoken,
      }
  })
  }

  export const applycoupon = async (authtoken,coupon)=>{
    return await axios.post(`http://localhost:8000/api/user/cart/coupon`,{coupon},
     { 
         headers:{
          authtoken,
      }
  })
  }

  export const createOrder = async (authtoken,striperesponse)=>{
  return await axios.post('http://localhost:8000/api/user/order',{striperesponse},
  {headers:{
      authtoken
  }})
  } 

  export const getUserOrders = async (authtoken)=>{
    return await axios.get('http://localhost:8000/api/users/orders',{
    headers:{
       authtoken,
    }
    })
  }

  export const getWishlist = async (authtoken)=>{
    return await axios.get('http://localhost:8000/api/user/getwishlist',{
    headers:{
       authtoken,
    }
    })
  }
  export const removeWishlist = async (productId,authtoken)=>{
    return await axios.put(`http://localhost:8000/api/user/wishlist/${productId}`,{},{
    headers:{
       authtoken,
    }
    })
  }
  export const addtowishlist = async (productId,authtoken)=>{
    return await axios.post('http://localhost:8000/api/user/wishlist',{productId},{
    headers:{
       authtoken,
    }
    })
  }


  export const createcashOrder = async (authtoken,cod)=>{
    return await axios.post('http://localhost:8000/api/user/cash-order',{cod},
    {headers:{
        authtoken
    }})
    } 