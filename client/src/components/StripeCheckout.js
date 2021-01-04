import React,{useState,useEffect} from 'react'
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import {useDispatch,useSelector} from 'react-redux'
import {createPayment} from '../API/stripe'
import {Link} from 'react-router-dom'
import {Card} from 'antd'
import {DollarOutlined,CheckOutlined} from '@ant-design/icons'
import laptop from '../images/laptop.png'
import {createOrder, emptyUserCart} from '../API/user'

const StripeCheckout = ({history})=>{


    const cartStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

    const dispatch = useDispatch();
    const {user ,coupona} = useSelector(state=>({...state}));

    const [error, seterror] = useState(null)
    const [succeeded, setsucceeded] = useState(false)
    const [processing, setprocessing] = useState('')
    const [disabled, setdisabled] = useState(true)
    const [clientsecret, setclientsecret] = useState('')

    const [carttotal, setcarttotal] = useState(0)
    const [totalafterdiscount, settotalafterdiscount] = useState(0)
    const [payable, setpayable] = useState(0)

    const stripe = useStripe();
    const elements = useElements();

useEffect(()=>{





    createPayment(user.token,coupona)
    .then((res)=>{
        console.log(res.data);
        setclientsecret(res.data.clientSecret);
        setcarttotal(res.data.cartTotal);
        settotalafterdiscount(res.data.totalAfterDiscount);
        setpayable(res.data.payable)
    })
},[])

const handlesubmit = async (e)=>{
e.preventDefault();
setprocessing(true);

const payload = await stripe.confirmCardPayment(
    clientsecret,{
        payment_method:{
           card:elements.getElement(CardElement)
        },
        billing_details:{
            name:e.target.name.value
        }
    }
)
if(payload.error){
    seterror('payment failed');
    console.log(payload.error.message);
    setprocessing(false)
} else{
    createOrder(user.token,payload).then(res=>{
        if (res.data.ok){
            if(typeof window !== undefined) localStorage.removeItem('cart')
            dispatch({
                type:'ADD_TO_CART',
                payload:[],
            })
            dispatch({
                type:'COUPON_APPLIED',
                payload:false,
            })
            emptyUserCart(user.token)
        }
    })
    console.log(JSON.stringify(payload))
    setprocessing(false);
    seterror(null);
    setsucceeded(true)
}
}

const handlechange =  (e)=>{
setdisabled(e.empty);
seterror(e.error ? e.error.message : "")
}
    
return(
    <div>

{!succeeded && <div>{coupona &&  totalafterdiscount !== undefined  ?
 (<p className="alert alert-sucess">Total after discount: {totalafterdiscount}</p>) 
:(<p className="alert alert-sanger"> No Coupon applied</p>)} </div>}


<div className="text-center pb-5">
    <Card 
    cover={<img src={laptop} alt="laptop" style={{height:"200px",marginBottom:"-50px",objectFit:"cover"}}  />}
    actions={[
        <><DollarOutlined className="text-info"/><br/> Total:${carttotal}</>,
        <><CheckOutlined className="text-info"/><br/> payable:${(payable/100).toFixed(2)}</>
    ]}
    >
   
    </Card>
</div>

     <form id="payment-form" className="stripe-form" onSubmit={handlesubmit}>
       <CardElement id="card-element" options={cartStyle} onChange={handlechange} />
       <button className="stripe-button" disabled={processing||disabled||succeeded}>
           <span id="button-text">
               {processing ? <div className="spinner" id="spinner"> </div> : 'PAY'}
           </span>
       </button>
       {error && <div className="card-error" role="alert">{error}</div>}
       <br/>
       <p className={succeeded ? "result-message" : 'result-message hiden'}>
    Payment successful.{" "} <Link to="/user/history">
    See it in the Purchase history</Link>
</p>
     </form>


    </div>
)
}

export default StripeCheckout