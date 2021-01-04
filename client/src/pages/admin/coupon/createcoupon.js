import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/Nav/AdminNav'
import DatePicker from 'react-datepicker'
import {getCoupons,deleteCoupon,createCoupons} from '../../../API/coupon'
import { DeleteOutlined } from '@ant-design/icons'
import "react-datepicker/dist/react-datepicker.css";



const CreateCoupon = ()=>{
    
const [name, setname] = useState('');
const [expiry, setexpiry] = useState('')
const [discount, setdiscount] = useState('')
const [loading, setloading] = useState(false)
const [coupons, setcoupons] = useState([])
const {user} = useSelector(state=>({...state}))



useEffect(() => {
    getCoupons().then((res)=>{
        setcoupons(res.data)
    })
   
}, [])


const handleSubmit = (e)=>{
e.preventDefault();
setloading(true);
createCoupons({name,discount,expiry},user.token).then((res)=>{

        toast.success(`coupon ${name} created`)
    setloading(false)
    setname('')
    setdiscount('')
    setexpiry('')
}).catch(err=>{
    console.log(err);
    toast.error(err);
    setloading(false)
})
}

const handleremove = (id)=>{
    setloading(true)
    deleteCoupon(id,user.token).then(res=>{
        console.log(res)
;        getCoupons().then((res)=>{
            setcoupons(res.data)
        })
        setloading(false)
        toast.success('coupon deleted')
    }).catch(err=>console.log(err))
}


    return(
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-2">
    <AdminNav />
        </div>

   
        <div className="col-md-10">
      {loading ?   <h4 className="text-danger">
            Loading
        </h4> :   <h4>
            Coupon
        </h4>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                 <label className="text-muted">Text</label>
                 <input placeholder="text" type="text" className="form-control" autoFocus required value={name} onChange={(e)=>{setname(e.target.value)
                     console.log(name,discount,expiry);
                 }}></input>
            </div>

            <div className="form-group">
                 <label className="text-muted">Discount %</label>
                 <input placeholder="text" type="text" className="form-control"  required value={discount} onChange={(e)=>{setdiscount(e.target.value)}}></input>
            </div>

            <div className="form-group">
                 <label className="text-muted">Expiry</label>
                 <DatePicker className="form-control" selected={new Date()} value={expiry} onChange={(date)=>{setexpiry(date)}} />
            </div>

            <button className="btn btn-outline-primary" >Save</button>
        </form>
        <h4> coupon {coupons.length}</h4>

        <table className="table table-bordered">
            <thead className="thead-ligtht">
                <tr>
                    <th>Name</th>
                    <th>Expire</th>
                    <th>Discount</th>
                    <th>Action</th>
                    
                </tr>
            </thead>
            <tbody>
                {coupons.map((c)=>{return(
                    <tr key={c._id}>
                    <th>{c.name}</th>
                    <th>{c.expiry}</th>
                    <th>{c.discount}</th>
                    <th><DeleteOutlined onClick={()=>handleremove(c._id)} /></th>
                    
                </tr>
                )
                })}
            </tbody>
        </table>
        </div>
        </div>
        </div>
    )
}

export default CreateCoupon;


