import React,{useState,useEffect} from 'react'
import {getCategory} from '../../API/category'
import {Link} from 'react-router-dom'
import ProductCard from '../../components/cards/productCardd'
import CategoryList from '../../components/Category/CategoryList'
import { productstar } from '../../API/product'



const CategoryHome =({match})=>{
  
    const [category, setcategory] = useState({});
   const [products, setproducts] = useState([]);
   const [loading, setloading] = useState(false)


   const {slug} = match.params;


    useEffect(()=>{
        setloading(true);

    getCategory(slug).then(res=>{
      setcategory(res.data.categori);
      setproducts(res.data.products)
      setloading(false)
    })


    },[])


    return(

        <div className="container-fluid">
            <div className="row">
<div className="col">
{loading? (<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Loading</h4>) : (
    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">{products.length} products in '{category.name}' category </h4>
)}
</div>

</div>

<div className="row">
{products.map(p =>(<div className="col" key={p._id}>
<ProductCard products={p} />
</div>))}
            </div>
        </div>
    )
}


export default CategoryHome;