

import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getCart,emptyUserCart,saveUserAddress,applycoupon,createcashOrder} from '../../API/user'
import ReactQuill from 'react-quill'
import {toast} from 'react-toastify'
import 'react-quill/dist/quill.snow.css'




const Checkout = ({history})=>{

 const dispatch = useDispatch();
const [products, setproducts] = useState([]);
const [total, settotal] = useState(0);
const [address, setaddress] = useState('');
const [addresssaved, setaddresssaved] = useState(false)
const [coupon, setcoupon] = useState('')
const [totalafterDiscount, settotalafterDiscount] = useState(0)
const [discounterror, setdiscounterror] = useState(false)

const {user , cod} = useSelector(state => ({...state}))

useEffect(()=>{
getCart(user.token).then((res)=>{
    console.log(res.data.products);
setproducts(res.data.products);
settotal(res.data.cartTotal);
})
},[])


const emptyCart = ()=>{

    if (typeof window !== "undefined"){
        localStorage.removeItem('cart');
    }
    // remove from redux
    dispatch({
        type:"ADD_TO_CART",
        payload:[]
    })
    //remove from backend
    emptyUserCart(user.token).then((res)=>{
        setproducts([]);
        settotal(0);
        settotalafterDiscount(0);
        setcoupon("")
    }
    )
}

const saveAdressToDB = (e)=>{   
    e.preventDefault();
saveUserAddress(user.token,address).then((res)=>{
    if(res.data.ok){
        setaddresssaved(true)
        toast.success('Adress Saved')
    }
})
}

const applydiscountcoupon = ()=>{
    applycoupon(user.token,coupon).then(res=>{
        console.log(res.data)
        if (res.data){
            settotalafterDiscount(res.data)
            dispatch({
                type:'COUPON_APPLIED',
                payload: true,

            })
        }
        if(res.data.err){
            setdiscounterror(res.data.err);
            dispatch({
                type:'COUPON_APPLIED',
                payload: false,

            })
        }
    })
}


const showApplyCoupon = ()=>(
    <>
        <input value={coupon} onChange={(e)=>{
            setcoupon(e.target.value)
            setdiscounterror(false)
            }} type="text" className="form-control" />
      <button onClick={applydiscountcoupon} className="btn btn-primary">Apply</button>
       
    </>
)

const createcashorder= ()=>{
    createcashOrder(user.token,cod).then(res=>{
        console.log('new-order',res)
    })
}

    return(
        <div className="row">
         <div className="col-md-6">
             <h4>Delivery Adress</h4>
             <br/>
             <br/>
             <ReactQuill theme="snow" value={address} onChange={setaddress} />
             {addresssaved ?
               <button className="btn btn-primary mt-2" onClick={saveAdressToDB}>Saved</button> :
               <button className="btn btn-primary mt-2" onClick={saveAdressToDB}>Save</button>}
             <hr/>
             <h4>Got Coupon?</h4>
             <br/>
             {showApplyCoupon()}
             <br/>
             {discounterror && <p className="text-danger">{discounterror}</p>}
         </div>
         <div className="col-md-6">
            <h4>Order Summary</h4>
            <hr/>
            <p>{products.map((p,i)=>{return(
                <div key={i}>
                    <p>{p.product.title}({p.color})*{p.count} = {p.product.price * p.count}</p>
                </div>
                )
            })}</p>
            <hr/>
            <p>List of products</p>
            <hr/>
             <p>Cart Total: ${total}</p>

              {totalafterDiscount >0 && (
                  <p className="bg-success p-2">
                    Discount Applied total: ${totalafterDiscount}
                  </p>
              )}
             <div className="row">
             <div className="col-md-6">

             {cod ? (<div disabled={!addresssaved || !products.length } 
             onClick={createcashorder} 
             className="btn btn-primary">
             Place Order
             </div>) : ( <div disabled={!addresssaved || !products.length } onClick={()=> history.push('/payment')} className="btn btn-primary">
             Place Order
             </div>)}


             <div disabled={!products.length} onClick={emptyCart} className="btn btn-primary">
             Empty Card
             </div>

             </div>

             </div>
         </div>
        </div>
    )
}

export default Checkout