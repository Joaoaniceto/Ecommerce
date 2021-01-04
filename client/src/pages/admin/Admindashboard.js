import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/Nav/AdminNav'
import AdminProductCard from '../../components/cards/adminProductCard'
import {getProductsbyCount} from '../../API/product.js'
import {getOrders,changeStatus} from '../../API/admin'
import {useSelector,useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import Orders from '../../components/orders/Order'


const AdminDashboard = ()=>{


    const {user} = useSelector(state =>({...state}))
    const [orders, setorders] = useState([])

    useEffect(() => {
    getOrders(user.token).then((res)=>{
        setorders(res.data)
    })
    }, [])


    const handleStatusChange = (orderId,orderStatus)=>{
        console.log(orderStatus);
changeStatus(orderId,orderStatus,user.token)
.then(res=>{
toast.success('statusupdated')
})

    }

    return(
        <div className="container-fluid">
<div className="row"> 
<div className="col-md-2">
    <AdminNav />
</div>
<div className="col">
<h4>Dasheboard</h4>
<Orders orders={orders} handlestatuschange={handleStatusChange}/>
</div>
</div>
    </div>
    )
}

export default AdminDashboard