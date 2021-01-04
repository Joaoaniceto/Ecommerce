

import axios from 'axios'


export const createPayment = (authtoken,coupon)=>{
    return axios.post('http://localhost:8000/api/create-payment-intent',{coupona:coupon},{
        headers:{
            authtoken
        }
    })
}