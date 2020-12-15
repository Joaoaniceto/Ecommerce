import React from 'react'
import {useState ,useEffect} from 'react'
import AdminNav from '../../components/Nav/AdminNav'
import AdminProductCard from '../../components/cards/adminProductCard'
import {getProductsbyCount,removeProduct} from '../../API/product.js'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'


const AllProducts = ()=>{


const [products, setproducts] = useState([])
const [loading, setloading] = useState(false);

const {user}  = useSelector(state => ({...state}))

const loadAllProducts = ()=>{
    setloading(true);
    getProductsbyCount(100)
    .then(
        (res)=>{
            
            console.log(res.data)
            setproducts(res.data);
             setloading(false)
        }
    )
    .catch((err)=>{
        console.log(err)
         setloading(false)
    })
}


const handleRemove = (slug) =>{
if(window.confirm('Delete?')){
 removeProduct(slug,user.token)
 .then((res)=>{
loadAllProducts();
toast.error(`${res.data.title} was deleted`)
 })
 .catch((err)=>{
     toast.error(`${err}`)
     console.log(err)
 })
}
}

useEffect(()=>{
    loadAllProducts()
},[])



    return(
        <div className="container-fluid">
<div className="row"> 
<div className="col-md-2">
    <AdminNav />
</div>
<div className="col">
{loading ?  <h4 className="text-danger">loading...</h4>: <h4>user history page</h4>}

<div  className="row">
{products.map(p =>
<div key={p._id} className="col-md-4">
  <AdminProductCard handleRemove={handleRemove} product={p} />
  </div>
)}
</div>
</div>
</div>
    </div>
    )
}

export default AllProducts;