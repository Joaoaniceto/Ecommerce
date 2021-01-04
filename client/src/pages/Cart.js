import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import{Link} from 'react-router-dom'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'
import {userCart} from '../API/user'


const Cart =({history})=>{

const {user,cart}  = useSelector(state => ({...state}))
let dispatch = useDispatch();
let total = 0;



const gettotal = ()=>{
 return cart.reduce((acumulador,nextvalue) =>{return acumulador + nextvalue.count * nextvalue.price},0) 
}

const saveOrderToDb = ()=>{
    userCart(cart,user.token).then(res=>{
        console.log(res)
        if (res.data.ok){
            history.push('/checkout')
        }
    }).catch(err=>{
        console.log(err)
    })
 
}

const savecashOrderToDb = ()=>{
    dispatch({
        type:'COD',
        payload:true
    })
    saveOrderToDb()
}

const showCardItems = ()=>{return(
    <table className="table table-bordered">
<thead className="thead-light">
<tr>
    <th scope="col">Image</th>
    <th scope="col">Title</th>
    <th scope="col">Price</th>
    <th scope="col">Brand</th>
    <th scope="col">Count</th>
    <th scope="col">Color</th>
    <th scope="col">Shiping status</th>
    <th scope="col">Remove</th>
</tr>
</thead>

{cart.map((p)=>(<ProductCardInCheckout key={p._id} p={p} / >))}

    </table>)
}


return(
    <div className="container-fluid pt-2">

         <div className="row">
       
           <div className="col-md-8">
           <h4>Cart / {cart.length} Products</h4>
           {!cart.length ? (<h4>No products in Cart <Link to="/shop">Continue Shopping</Link></h4>) : showCardItems()}</div>
           <div className="col-md-4">
               OrderSummary
               <hr/>
               <p>Products</p>
               {cart.map((c,i)=>{ total+=c.price;
                   return(<div key={i}>
                   <p>{c.title} x {c.count} = ${c.price * c.count} </p>
               </div>)} )}
               <hr/>
               Total:<b>{gettotal()}</b>
               <hr/>
               {user ? (<>
                <button 
               onClick={saveOrderToDb} 
               className="btn btn-sm btn-primary mt-2"
               disabled={!cart.length}>
               Posted to checkout</button>
               <br />
               <button 
               onClick={savecashOrderToDb} 
               className="btn btn-sm btn-primary mt-2"
               disabled={!cart.length}>
               Posted cash on delivery</button>
               </>) 
               : 
               (
                   
                   <button 
               className="h6 btn btn-sm btn-primary mt-2">
               <Link to={{
                   pathname:"/login",
                   state:{from:"cart"}
               }}>
               Login to checkout
               </Link>
               
               </button>)}
           </div>
         </div>
    
    </div>
)





}



export default Cart