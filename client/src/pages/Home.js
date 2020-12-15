import React,{useEffect,useState} from 'react'
import {getProductsbyCount,getProducts} from '../API/product.js'
import ProductCard from '../components/cards/productCardd'
import Jumbotron from '../components/cards/jumbotron'
import LoadingCard from '../components/cards/loadingcard'


const Home = () =>{



    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(false)


    useEffect(()=>{
loadAllProducts()
    },[])


    const loadAllProducts = ()=>{
        setloading(true)
        getProducts('createdAt','desc',3).then(
            (res)=>{
                setproducts(res.data);
                setloading(false)
            }
        )
    }
    
    return (
        <>
       <div className="jumbotron text-danger h1 font-weight-bold text-center">
          <Jumbotron text={['Latest Product','New Arrivals','Best Sellers']}/>
       </div>
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
       </>
    );
}

export default Home