import React,{useEffect,useState} from 'react'
import {getProducts, getProductsbyCount, getproductCount} from '../../API/product.js'
import ProductCard from '../cards/productCardd'
import Jumbotron from '../cards/jumbotron'
import LoadingCard from '../cards/loadingcard'
import {Pagination} from 'antd'



const NewArrivals = () =>{



    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(false)
    const[page,setPage] = useState(1)
    const [productsCount, setproductsCount] = useState(0)

    useEffect(()=>{
   loadAllProducts()
    },[page])


    useEffect(()=>{
        getproductCount()
      .then(res=> setproductsCount(res.data))
      .catch(err=>console.log(err))
    },[])

    const loadAllProducts = ()=>{
        setloading(true)
        getProducts('createdAt','desc',page).then(
            (res)=>{
                setproducts(res.data);
                setloading(false)
            }
        )
    }
    
    return (
        <>
       {productsCount}
       <div className="containter">
       {loading ? <LoadingCard count={3} /> :
       <div className="row">
       
{products.map((product)=>
    <div key={product._id} className="col-md-4">
    <ProductCard products={product} />
    </div>
)}
       </div>
       }
       </div>
       <div className="row">
           <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
           <Pagination current={page} total={(productsCount / 3)*10} onChange={value =>setPage(value)} />

           </nav>
       </div>
       </>
    );
}

export default NewArrivals