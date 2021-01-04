import React,{useState,useEffect} from 'react'
import UserNav from '../../components/Nav/UserNav'
import {getUserOrders} from '../../API/user'
import {useSelector,useDispatch} from 'react-redux'
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'
import {toast} from 'react-toastify'
import showPaymentInfo from '../../components/cards/showPaymentInfo'

const History = () =>{
   
  const [orders, setorders] = useState([])
  const {user} =  useSelector(state => ({...state}))


    useEffect(() => {
        loadUserOrders()
        
    }, [])



const loadUserOrders = ()=>{
getUserOrders(user.token).then(res =>{
    console.log(JSON.stringify(res.data))
    setorders(res.data)
})
}


const showorderinTable =(order)=>{
    <table className="table table-bordered">
       <thead className="thead-light">
    <tr>
        <th scope="col">
             Title
        </th>
        <th scope="col">
             Price
        </th>
        <th scope="col">
             Brand
        </th>
        <th scope="col">
             Color
        </th>
        <th scope="col">
             Count
        </th>
        <th scope="col">
             Shipping
        </th> 
    </tr>
       </thead>
       <tbody>
           {order.product.map((elem,i)=>(<tr key={i}>
             <td><b>{elem.title}</b></td>
             <td><b>{elem.brand}</b></td>
             <td><b>{elem.color}</b></td>
             <td><b>{elem.shipping === "yes" ? (<CheckCircleOutlined style={{color:'green'}} />) 
             : (<CloseCircleOutlined style={{color:'red'}} />)}</b></td>
           </tr>))}
       </tbody>
    </table>
}


const showeachorders = ()=> orders.map((order,i)=>(<div key={i} className="m-5 p-3 card">
   <showPaymentInfo order={order} />
    {showorderinTable(order)}
    <div className="row">
    <div className="col">
     <p>PDF download</p>
    </div>
    </div>
</div>))

return(
    <div className="container-fluid">
<div className="row"> 
<div className="colmd-2">
    <UserNav />
</div>
<div className="col text-center">
<h4>
{orders.length >0 ? "user purchase orders":"No purchase orders"}
</h4>
{showeachorders()}
</div>
</div>
    </div>
)
}


export default History;