import React,{useEffect,useState} from 'react'
import {getProductsbyCount,getProducts} from '../API/product.js'
import ProductCard from '../components/cards/productCardd'
import Jumbotron from '../components/cards/jumbotron'
import LoadingCard from '../components/cards/loadingcard'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/Category/CategoryList'
import SubsList from  '../components/subList/subList'

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

       <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
           New Arrivals
       </h4>
       <NewArrivals/>

       <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
           Best Sellers
       </h4>

       <BestSellers/>

       <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
           Categories
       </h4>
       <CategoryList/>

       <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
           Subs
       </h4>
         <SubsList/>

       </>
    );
}

export default Home