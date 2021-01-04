import axios from 'axios'


export const getOrders = async(authtoken)=>{
    return await axios.get('http://localhost:8000/api/admin/orders',{
        headers:{
            authtoken
        }
    })
}

export const changeStatus = async(orderId,orderstatus,authtoken)=>{
return await axios.put('http://localhost:8000/api/admin/orders-status',
{orderId,orderstatus},
{
    headers:{
    authtoken
}})
}