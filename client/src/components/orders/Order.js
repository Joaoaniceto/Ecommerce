import React from 'react'
import ShowPaymentInfo from '../cards/showPaymentInfo'
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'



const Orders = ({orders,handlestatuschange}) =>{




    return(
        <>
          {
              orders.map((order,id)=>{return(
                  <div className="row pb-5" key={order._id}>
                   <div className="btn btn-block bg-light">
                   <ShowPaymentInfo order={order}/>

<div className="row">
 <div  className="col-md-4">Delivery Status</div>
 <div className="col-md-8">
 <select className="form-control"
 defaultValue={order.orderStatus} onChange={e => handlestatuschange(order._id,e.target.value)}>
  <option value="Not Processed">Not Processed</option>
  <option value="processing">Processing</option>
  <option value="Dispatched">Dispatched</option>
  <option value="Cancelled">Cancelled</option>
  <option value="completed">Completed</option>
 </select>
 </div>
</div>
                   </div>
                  </div>)
              })
          }

        </>
    )
}

export default Orders