import axios from 'axios'

export const getCoupons = async () =>{
 
    return await axios.get('http://localhost:8000/api/coupons');

}

export const deleteCoupon = async (couponId,authtoken) =>{
 
    return await axios.delete(`http://localhost:8000/api/coupon/${couponId}`,{
        headers:{
            authtoken,
        }
    });

}

export const createCoupons = async (coupon,authtoken) =>{
 
    return await axios.post('http://localhost:8000/api/coupon',{coupon},{
        headers:{
            authtoken
        }
    });

}