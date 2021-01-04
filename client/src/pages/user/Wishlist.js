import React,{useState,useEffect} from 'react'
import UserNav from '../../components/Nav/UserNav'
import {getWishlist,removeWishlist} from '../../API/user'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {DeleteOutlined} from '@ant-design/icons'


const Wishlist =()=>{

    const [products, setproducts] = useState([])

    const {user} = useSelector((state)=>({...state}))


    useEffect(() => {
       loadWishlist()
      
    }, [])

   const loadWishlist = ()=>{
    getWishlist(user.token)
    .then(res=>{
        setproducts(res.data[0].wishlist);
    })  
   }

    const handleremove =(productId)=>{

        removeWishlist(productId,user.token)
        .then(res=>{
            toast.success('product eliminated fro wishlist')
            loadWishlist()
        })

    }

    return(
    <div className="container-fluid">
    <div className="row"> 
    <div className="col-md-2">
        <UserNav />
    </div>
    <div className="col">
    {products.map((p)=>(
        <div key={p._id} className="alert alert-secondary">

<Link to={`/product/${p.slug}`}>
{p.title}
</Link>
<span onClick={() => handleremove(p._id)} className="btn btn-sm float-right">
<DeleteOutlined className="text-danger"/>
</span>


        </div>
    ))}
    </div>
    </div>
        </div>
)
    }

export default Wishlist;