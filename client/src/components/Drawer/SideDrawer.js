import React from 'react'
import { Drawer,Button} from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import laptop from '../../images/laptop.png'




const Sidedrawer = ()=>{

    const {cart,drawer} = useSelector(state => ({...state}))
    let  dispatch = useDispatch();

    return(
<Drawer 
className="text-center"
title={`Cart /${cart.length} Products`}
placement="right"
closable={false}

onClose={()=>{dispatch({type:'SET_VISIBLE',payload: false})}} 
visible={drawer}>
    {cart.map((p)=>(
        <div key={p._id} className="row">
          <div className="col">
                {p.images[0] ?  
                <>
                <img alt="product" style={{width:"100%",objectFit:"cover",height:'50px'}} src={p.images[0].url} /> 
                <p className="text-center bg-secondary text-light">
                    {p.title} x {p.count}
                </p>
                </>
                :  <>
                <img alt="default" style={{width:"100%",objectFit:"cover",height:'50px'}} src={laptop} /> 
                <p className="text-center bg-secondary text-light">
                    {p.title} x {p.count}
                </p>
                </>
                }
          </div>
        </div>
    ))}

    <Link to="/cart" >
<button onClick={()=> dispatch({
    type:'SET_VISIBLE',
    payload:false,
})} className="text-center btn btn-primary btn-raised btn-block">
Go to Cart
</button>
    </Link>
</Drawer>
    );
}

export default Sidedrawer